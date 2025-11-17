
# Backend UTN - Endpoints
Guía rápida de los endpoints disponibles en la API. Todas las rutas están montadas bajo `/api` según se configura en `src/main.js` y las respuestas siguen el formato `{ ok, status, message, data? }` de los controladores.

## Inicio rápido
- **Instalación**: `npm install`
- **Variables de entorno mínimas**: `PORT`, `URL_FRONTEND`, `URL_BACKEND`, `SECRET` y credenciales del transportador SMTP para las invitaciones.
- **Ejecución**: `npm run dev` (modo desarrollo) o `npm start` (producción). El servidor expone el prefijo `/api` según `src/main.js`.

### Cabeceras comunes
- `Content-Type: application/json` para los cuerpos JSON.
- `Authorization: Bearer <auth_token>` en todas las rutas protegidas por `authMiddleware`.

### Estructura de respuestas
```
{
  "ok": true,
  "status": 200,
  "message": "Operación exitosa",
  "data": { ... }
}
```
Los errores mantienen la misma estructura con `ok: false`, `status` según el código HTTP y un mensaje descriptivo.

## Autenticación (`/api/auth`)

### POST `/register`
- **Body**: `email`, `name`, `password` (validados con `auth.schema.js`, mínimo 6 caracteres y complejidad requerida).
- **Respuesta**: `201 Created` con mensaje de registro exitoso.

### GET `/verify-email/:verification_token`
- **Descripción**: confirma el correo del usuario y redirige al frontend (`URL_FRONTEND/login?from=verified_email`).

### POST `/login`
- **Body**: `email`, `password`.
- **Respuesta**: `200 OK` con `auth_token` JWT en `data.auth_token`.

## Invitaciones de miembros (`/api/member`)

### GET `/confirm/:invitation_token`
- **Descripción**: valida el token de invitación generado para un workspace y redirige al inicio de sesión del frontend.
- **Errores**: `400` si el token es inválido, códigos personalizados si la invitación no es válida.

## Workspaces (`/api/workspace`)
+Todas las rutas de este grupo usan `authMiddleware`, por lo que requieren el header `Authorization: Bearer <auth_token>`.

### GET `/`
- **Descripción**: lista los workspaces asociados al usuario autenticado.
- **Respuesta**: `200 OK` con arreglo `data.workspaces`.

### POST `/`
- **Body**: `name`, `url_image` (opcional).
- **Descripción**: crea un nuevo workspace asociado al usuario.
- **Respuesta**: `201 Created` con `data.workspaces_created`.

### GET `/:workspace_id`
- **Middlewares**: `workspaceMiddleware(['member','admin'])` verifica que el usuario pertenezca al workspace y almacena `workspace_selected` y `member` en la request.
- **Descripción**: devuelve el detalle del workspace y sus canales.
- **Respuesta**: `200 OK` con `data.workspace_detail` y `data.channels`.

### POST `/:workspace_id/invite`
- **Middlewares**: `workspaceMiddleware(['admin'])` (solo admins del workspace).
- **Body**: `email_invited`, `role` (rol para el invitado).
- **Descripción**: envía un correo de invitación para unir un miembro al workspace.
- **Respuesta**: `200 OK` con mensaje de invitación enviada.

## Canales
Rutas anidadas bajo un workspace. Requieren `authMiddleware` y `workspaceMiddleware` para validar la pertenencia al workspace.

### POST `/:workspace_id/channels`
- **Middlewares**: `workspaceMiddleware(['admin'])`.
- **Body**: `name` (obligatorio).
- **Descripción**: crea un canal dentro del workspace.
- **Respuesta**: `201 Created` con `data.channel_created`.

## Mensajes
Las rutas usan también `channelMiddleware` para asegurar que el canal pertenece al workspace y guardar `channel_selected`.

### POST `/:workspace_id/channels/:channel_id/messages`
- **Body**: `content`.
- **Descripción**: crea un mensaje en el canal. Usa el miembro autenticado (`member`) como autor.
- **Respuesta**: `201 Created` con `data.messages` actualizados y `data.message_created`.

### GET `/:workspace_id/channels/:channel_id/messages`
- **Descripción**: obtiene todos los mensajes del canal.
- **Respuesta**: `200 OK` con `data.messages`.

## Notas de seguridad y validaciones
- Los JWT se verifican con `authMiddleware`; errores de token retornan `400` o `401` según corresponda.
- `workspaceMiddleware` controla que el workspace exista y que el usuario sea miembro con el rol requerido.
- `channelMiddleware` valida que el canal exista y pertenezca al workspace antes de procesar mensajes.
 
