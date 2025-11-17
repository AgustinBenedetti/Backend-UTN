import e from "express"
import MessagesService from "../services/messages.service.js"

class MessagesController{

    static async create(request, response){
        try {
            const {channel_selected, member} = request
            const {content} = request.body
            
            const {messages, message_created} = await MessagesService.create(channel_selected._id, member._id, content)
             response.status(201).json({
                ok: true,
                status: 201,
                message: 'Mensaje creado exitosamente',
                data: { 
                    messages: messages, 
                    message_created: message_created 

                }
            })

        } 
        catch (error) {
            if (error.status) {
                return response.status(error.status).json({
                    ok: false,
                    message: error.message,
                    status: error.status
                })
            }
            else {
                console.error(
                    'ERROR AL CREAR MENSAJE', error
                )
                return response.status(500).json({
                    ok: false,
                    message: 'Error interno del servidor',
                    status: 500
                })
            }
        }
    }

    static async getAllMessagesByChannelId(request, response){
        try {
            const {channel_selected} = request

            const {messages} = await MessagesService.getAllMessagesByChannelId(channel_selected._id)
            response.status(200).json({
                ok: true,
                status: 200,
                message: 'Lista de mensajes obtenida exitosamente',
                data: { 
                    messages: messages
                }
            })
        } 
        catch (error) {
            if (error.status) {
                return response.status(error.status).json({
                    ok: false,
                    message: error.message,
                    status: error.status
                })
            }
            else {
                console.error(
                    'ERROR AL OBTENER MENSAJES', error
                )
                return response.status(500).json({
                    ok: false,
                    message: 'Error interno del servidor',
                    status: 500
                })
            }
        }
    }
}

export default MessagesController