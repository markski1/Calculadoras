# Calculando Argentina
Una aplicación web en construccion, con calculadoras relevantes a la república argentina.

Actualmente corriendo en [https://calc.markski.ar](https://calc.markski.ar).

### Ayuda requerida
Siempre se busca ayuda para mantener los valores actualizados, ya sea impuesto o demás cosas. Necesito ayuda especialmente en el apartado de la calculadora de sueldo neto, ya que me cuesta entender las regulaciónes y donde encontrar la información más reciente de AFIP. Es todo muy inconsistente.

### Desarrollar localmente

Primero, clona el repositorio localmente en tu PC.

Vas a necesitar nodejs y npm. Si no lo tenes, instálalo (busca como se hace y fue).

En una terminal en la carpeta del repo, escribir `npm install` para instalar las dependencias que hagan falta.

Ahora, simplemente usar `npm run dev` para iniciar la página, y listo. La podés ver en [http://localhost:3000](http://localhost:3000).

### Consideraciones

- El código es de libre uso. Si lo usas en otra cosa solo pido credito en algún apartado.
- Se deployea de forma "static". Por lo tanto, no usar librerias que requieran estado del lado de servidor (por ejemplo Next/Image).
- Si queres agregar funcionalidad que requiere tomar datos de una api, y no tenes permiso para usar esa api, pregúntame primero a ver que se puede hacer.

### Objetivos
- Convertir en PWA.
- Agregar más funcionalidad.
- Mejoras visuales.
- Logo y favicon hechos por alguien competente.