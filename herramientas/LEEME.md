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

> Las estaciones del mapa (nombres y posiciones) están definidas en `herramientas/plantilla_opometro.html` (constante `ST`). Para otro tema habrá que adaptarlas.

## Modo docente

Añade `?docente=1` a la URL del juego para ver las notas de revisión y el listado de claves discutidas en el Archivo crítico.

## SCORM

Sube `opometro-digestivo-scorm.zip` como actividad SCORM. La plataforma recibirá como nota el % del tema dominado (completado a partir del 80 %) y el progreso se sincroniza entre dispositivos del alumno.
