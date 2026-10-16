# Cómo actualizar un juego OpoMetro

El juego **no se edita a mano**: se genera a partir de dos archivos de datos.

| Archivo | Qué contiene |
|---|---|
| `datos/digestivo/preguntas_digestivo.xlsx` | Las preguntas, claves, explicaciones, «por qué no» de cada opción, estación, concepto y trampa. La hoja **Instrucciones** explica cada columna. |
| `datos/digestivo/contenido.json` | Claves de cada estación, mazo de OpoEscalas, conceptos, trampas y supuestos clínicos. |

## Pasos

1. Edita el Excel (por ejemplo, corrige una explicación o marca «Validada: Sí»).
2. Desde la raíz del repositorio ejecuta:

   ```bash
   pip install openpyxl          # solo la primera vez
   python3 herramientas/construir_opometro.py
   ```

3. El script comprueba los datos (claves, estaciones, conceptos…). Si algo falla, indica la fila y **no** genera el juego.
4. Si todo va bien, actualiza:
   - `juegos/opometro-digestivo/index.html` (el juego);
   - `juegos/opometro-digestivo/opometro-digestivo-scorm.zip` (paquete SCORM 1.2 para Moodle u otra plataforma).
5. Sube los cambios a GitHub.

## Un tema nuevo (p. ej. Respiratorio)

Copia `datos/digestivo/` a `datos/respiratorio/`, renombra el Excel a `preguntas_respiratorio.xlsx`, sustituye su contenido y ejecuta:

```bash
python3 herramientas/construir_opometro.py respiratorio
```

> La plantilla del juego está en `herramientas/plantilla/` (página, estilos y motor). Las estaciones del mapa (nombres y posiciones) se definen en `app.js` (constante `ST`); para otro tema habrá que adaptarlas.

## Preguntas anuladas y obsoletas

- **Anuladas**: se mantienen en el Excel como registro, pero **no se publican** en el juego.
- **Obsoletas**: se juegan como repaso. El alumno responde según la evidencia actual (columna «Hoy correcta»), ve la clave que dio el tribunal (columna «Clave», si se conoce) y la explicación de qué cambió. Si ninguna opción del examen es válida hoy, añade una en «Opción e (repaso)»; el juego la señala como «añadida para el repaso».

## Logo e imágenes de un maquetador

- Logo: guarda el archivo oficial como `datos/marca/logo-oposalud.svg` (o `.png`) y vuelve a construir.
- Colores y tipografía: están al principio de `herramientas/plantilla/estilos.css` (bloque `:root`).
- Iconos: son SVG propios definidos en `herramientas/plantilla/app.js` (objeto `P`); se pueden sustituir por los de un maquetador manteniendo la retícula de 24 × 24.

## Modo docente

Añade `?docente=1` a la URL del juego para ver las notas de revisión y el listado de claves discutidas en el Archivo crítico.

## SCORM

Sube `opometro-digestivo-scorm.zip` como actividad SCORM. La plataforma recibirá como nota el % del tema dominado (completado a partir del 80 %) y el progreso se sincroniza entre dispositivos del alumno.

## Imágenes de clase (láminas interactivas)

Las imágenes de `datos/digestivo/imagenes/` se incrustan en el juego al construirlo (no hay que subirlas aparte).
Ahora mismo contiene `ostomias.webp`, el dibujo de clase que usa **Laboratorio visual → La lámina de las ostomías**.

- Si se sustituye el dibujo, debe mantener **la misma composición** (proporción 16:9 y rótulos en el mismo sitio):
  los huecos que se tapan están definidos en `herramientas/plantilla/app.js` (constante `OSTO`) en píxeles del
  dibujo original de 2000 × 1125.
- Para cambiar textos, pistas o datos clínicos de cada hueco, edítese también `OSTO` (campos `v`, `i`, `pista`, `regla`).
