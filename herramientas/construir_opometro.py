#!/usr/bin/env python3
"""Construye un juego OpoMetro a partir de su Excel de preguntas y su contenido.

Uso (desde la raíz del repositorio):
    python3 herramientas/construir_opometro.py                # tema digestivo (por defecto)
    python3 herramientas/construir_opometro.py digestivo

Lee  datos/<tema>/preguntas_<tema>.xlsx, datos/<tema>/contenido.json
y las imágenes de marca de datos/marca/ (p. ej. logo-oposalud.svg), que se incrustan en el juego.
Escribe juegos/opometro-<tema>/index.html  y  juegos/opometro-<tema>/opometro-<tema>-scorm.zip
Requiere: pip install openpyxl
"""
import json, re, sys, zipfile, io
from pathlib import Path

try:
    import openpyxl
except ImportError:
    sys.exit('Falta openpyxl. Instálalo con:  pip install openpyxl')

RAIZ = Path(__file__).resolve().parent.parent
TEMA = sys.argv[1] if len(sys.argv) > 1 else 'digestivo'
DATOS = RAIZ / 'datos' / TEMA
SALIDA = RAIZ / 'juegos' / f'opometro-{TEMA}'
ESTACIONES = {'anat', 'boca', 'estom', 'agudo', 'intestino', 'higado', 'bilipan', 'valor', 'sondas', 'ostom'}
ESTADOS = {'Válida': None, 'Anulada': 'N', 'Obsoleta': 'O'}
LETRA = {'a': 0, 'b': 1, 'c': 2, 'd': 3, 'e': 4}

def txt(v):
    return re.sub(r'[ \t]+', ' ', str(v)).strip() if v is not None else ''

def leer_preguntas(contenido):
    ws = openpyxl.load_workbook(DATOS / f'preguntas_{TEMA}.xlsx', data_only=True)['Preguntas']
    filas = list(ws.iter_rows(values_only=True))
    cab = [txt(c) for c in filas[0]]
    col = {n: i for i, n in enumerate(cab)}
    errores, preguntas, ids = [], [], set()
    trampas = {t['id'] for t in contenido.get('trampas', [])}
    for n, f in enumerate(filas[1:], start=2):
        g = lambda k: txt(f[col[k]]) if col.get(k) is not None and col[k] < len(f) else ''
        if not g('ID') and not g('Pregunta'):
            continue
        err = lambda m: errores.append(f'Fila {n} (ID {g("ID")}): {m}')
        try:
            pid = int(float(g('ID')))
        except ValueError:
            err('ID no numérico'); continue
        if pid in ids:
            err('ID repetido')
        ids.add(pid)
        estado = g('Estado') or 'Válida'
        if estado == 'Anulada':
            continue  # las anuladas no se publican en el juego
        opciones = [g(f'Opción {l}') for l in 'abcd']
        while opciones and not opciones[-1]:
            opciones.pop()
        if g('Opción e (repaso)'):
            if estado != 'Obsoleta':
                err('«Opción e (repaso)» solo se admite en preguntas obsoletas')
            opciones.append(g('Opción e (repaso)'))
        if len(opciones) < 2:
            err('necesita al menos 2 opciones')
        if estado not in ESTADOS:
            err(f'estado «{estado}» no válido (Válida, Anulada u Obsoleta)')
        clave = g('Clave').lower()
        q = {'id': pid, 'ex': g('Examen'), 'org': g('Organismo') or 'Otros', 'y': int(float(g('Año') or 0)),
             's': g('Estación'), 't': g('Concepto'), 'q': g('Pregunta'), 'o': opciones, 'e': g('Explicación')}
        if q['s'] not in ESTACIONES:
            err(f'estación «{q["s"]}» desconocida')
        if q['t'] and q['t'] not in contenido.get('conceptos', {}):
            err(f'concepto «{q["t"]}» no está en la hoja Códigos / contenido.json')
        if g('Trampa'):
            if g('Trampa') not in trampas:
                err(f'trampa «{g("Trampa")}» desconocida')
            q['tr'] = g('Trampa')
        if ESTADOS.get(estado):
            q['st'] = ESTADOS[estado]
            hoy = g('Hoy correcta').lower()
            if hoy not in LETRA or LETRA[hoy] >= len(opciones):
                err('las obsoletas necesitan «Hoy correcta» (la respuesta vigente)'); continue
            q['a'] = LETRA[hoy]
            if clave in LETRA:
                q['orig'] = LETRA[clave]
        else:
            if clave not in LETRA or LETRA[clave] >= len(opciones):
                err(f'clave «{clave}» no válida'); continue
            q['a'] = LETRA[clave]
        if not q['e']:
            err('falta la explicación')
        if g('No barajar').lower().startswith('s'):
            q['ns'] = 1
        po = [g(f'Por qué no {l}') for l in 'abcd'][:len(opciones)]
        if any(po):
            q['po'] = po
        if g('Nota de revisión'):
            q['f'] = g('Nota de revisión')
        preguntas.append(q)
    return preguntas, errores

def main():
    contenido = json.loads((DATOS / 'contenido.json').read_text(encoding='utf-8'))
    preguntas, errores = leer_preguntas(contenido)
    if errores:
        print('Se han encontrado errores; no se genera el juego:\n  ' + '\n  '.join(errores))
        sys.exit(1)
    dump = lambda o: json.dumps(o, ensure_ascii=False, separators=(',', ':')).replace('</', '<\\/')
    plantilla = RAIZ / 'herramientas' / 'plantilla'
    html = (plantilla / 'pagina.html').read_text(encoding='utf-8')
    html = html.replace('/*__ESTILOS__*/', (plantilla / 'estilos.css').read_text(encoding='utf-8'))
    html = html.replace('/*__APP__*/', (plantilla / 'app.js').read_text(encoding='utf-8'))
    marca = {}
    import base64, mimetypes
    for f in sorted((DATOS.parent / 'marca').glob('*')) if (DATOS.parent / 'marca').exists() else []:
        tipo = mimetypes.guess_type(f.name)[0]
        if tipo and tipo.startswith('image/'):
            marca[f.stem] = f'data:{tipo};base64,' + base64.b64encode(f.read_bytes()).decode()
    imagenes = {}
    for f in sorted((DATOS / 'imagenes').glob('*')) if (DATOS / 'imagenes').exists() else []:
        tipo = mimetypes.guess_type(f.name)[0] or ('image/webp' if f.suffix == '.webp' else None)
        if tipo and tipo.startswith('image/'):
            imagenes[f.stem] = f'data:{tipo};base64,' + base64.b64encode(f.read_bytes()).decode()
    html = html.replace('/*__IMAGENES__*/{}', dump(imagenes))
    html = html.replace('/*__PREGUNTAS__*/[]', dump(preguntas)).replace('/*__CONTENIDO__*/{}', dump(contenido)).replace('/*__MARCA__*/{}', dump(marca))
    SALIDA.mkdir(parents=True, exist_ok=True)
    (SALIDA / 'index.html').write_text(html, encoding='utf-8')
    # Paquete SCORM 1.2 para Moodle u otras plataformas
    manifest = f'''<?xml version="1.0" encoding="UTF-8"?>
<manifest identifier="opometro-{TEMA}" version="1.0" xmlns="http://www.imsproject.org/xsd/imscp_rootv1p1p2" xmlns:adlcp="http://www.adlnet.org/xsd/adlcp_rootv1p2">
  <metadata><schema>ADL SCORM</schema><schemaversion>1.2</schemaversion></metadata>
  <organizations default="org"><organization identifier="org"><title>OpoMetro · {TEMA.capitalize()}</title>
    <item identifier="item1" identifierref="res1"><title>OpoMetro · {TEMA.capitalize()}</title><adlcp:masteryscore>80</adlcp:masteryscore></item>
  </organization></organizations>
  <resources><resource identifier="res1" type="webcontent" adlcp:scormtype="sco" href="index.html"><file href="index.html"/></resource></resources>
</manifest>'''
    buf = io.BytesIO()
    with zipfile.ZipFile(buf, 'w', zipfile.ZIP_DEFLATED) as z:
        z.writestr('imsmanifest.xml', manifest)
        z.writestr('index.html', html.replace('href="../../"', 'href="#"'))
    (SALIDA / f'opometro-{TEMA}-scorm.zip').write_bytes(buf.getvalue())
    obs = sum(1 for q in preguntas if q.get('st'))
    print(f'✓ {len(preguntas)} preguntas publicadas ({obs} obsoletas como repaso; logos: {", ".join(marca) or "ninguno"}) → {SALIDA.relative_to(RAIZ)}/index.html y paquete SCORM')

if __name__ == '__main__':
    main()
