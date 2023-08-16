# API de Información de Lenguajes de Programación

¡Bienvenido a la API de Información de Lenguajes de Programación! Esta API te permite acceder a detalles sobre varios lenguajes de programación. Puedes usarla para obtener información sobre lenguajes específicos, buscar lenguajes por nombre o paradigma, agregar nuevos lenguajes, actualizar detalles existentes y eliminar lenguajes del json, ya que la informacion no persiste en una base de datos sino en memoria.

La API está implementada utilizando ExpressJS y está desplegada en Vercel para que puedas acceder a ella en cualquier momento.

## Endpoints Disponibles

### Obtener Información de Todos los Lenguajes

- **Método:** GET
- **Endpoint:** `/api/languages`

Este endpoint te proporciona información sobre todos los lenguajes de programación registrados en la json.

### Obtener Información de un Lenguaje por ID

- **Método:** GET
- **Endpoint:** `/api/languages/:id`

Proporciona detalles sobre un lenguaje específico identificado por su ID.

### Obtener Información de un Lenguaje por Nombre

- **Método:** GET
- **Endpoint:** `/api/languages?name={name}`

Obtén información sobre un lenguaje mediante su nombre.

### Obtener Información de un Lenguaje por Paradigma

- **Método:** GET
- **Endpoint:** `/api/languages?paradigm={paradigm}`

Este endpoint te permite obtener información sobre lenguajes según su paradigma de programación.

### Crear un Nuevo Lenguaje

- **Método:** POST
- **Endpoint:** `/api/languages`
- **Encabezado:** `Content-Type: application/json`

Crea un nuevo lenguaje proporcionando los detalles en formato JSON en el cuerpo de la solicitud. Asegúrate de establecer el encabezado `Content-Type` como `application/json`. A continuación se muestra un ejemplo del formato de datos:

```json
{
    "name": "Nombre del Lenguaje",
    "description": "Descripción del Lenguaje",
    "authors": ["Nombre Autor 1", "Nombre Autor 2"],
    "year": 2023,
    "paradigms": ["Paradigma 1", "Paradigma 2"],
    "logo": "Enlace al Logo"
}
```
## Actualizar Información de un Lenguaje

- **Método:** PATCH
- **Endpoint:** `/api/languages/:id`
- **Encabezado:** `Content-Type: application/json`

Actualiza los detalles de un lenguaje existente identificado por su ID. Proporciona los campos que deseas actualizar en formato JSON en el cuerpo de la solicitud. Asegúrate de establecer el encabezado `Content-Type` como `application/json`. A continuación, se muestra un ejemplo:

```json
{
    "name": "Nombre Actualizado",
    "description": "Descripción Actualizada"
}
```
## Eliminar un Lenguaje por ID

- **Método:** DELETE
- **Endpoint:** `/api/languages/:id`

Elimina un lenguaje de la json según su ID.

## Uso de la API

La API está disponible para ser utilizada. Puedes realizar solicitudes a los endpoints mencionados utilizando las URL adecuadas. Asegúrate de incluir los parámetros necesarios en las solicitudes y los encabezados correspondientes según se indique.

¡Disfruta utilizando la API de Información de Lenguajes de Programación para obtener detalles sobre tus lenguajes favoritos! Si tienes alguna pregunta o comentario, no dudes en ponerte en contacto con nosotros.
