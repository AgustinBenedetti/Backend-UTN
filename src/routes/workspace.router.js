import express from 'express'
import WorkspaceController from '../controllers/workspace.controller.js'
import authMiddleware from '../middlewares/authMiddleware.js'
import workspaceMiddleware from '../middlewares/workspaceMiddleware.js'
import ChannelController from '../controllers/channel.controller.js'
import channelMiddleware from '../middlewares/channelMiddleware.js'
import MessagesController from '../controllers/messages.controller.js'



const workspaceRouter = express.Router()


workspaceRouter.get(
    '/', 
    authMiddleware,
    WorkspaceController.getAll
)

workspaceRouter.post(
    '/', 
    authMiddleware,
    WorkspaceController.create
)

workspaceRouter.get(
    '/:workspace_id',
    authMiddleware,
    workspaceMiddleware(['member', 'admin']),
    WorkspaceController.getAllDetail
)

workspaceRouter.post(
    '/:workspace_id/channels',
    authMiddleware,
    workspaceMiddleware(['admin']),
    ChannelController.create
)

//Crear mensajes
workspaceRouter.post(
    '/:workspace_id/channels/:channel_id/messages',
    authMiddleware,
    workspaceMiddleware(),
    channelMiddleware,
    MessagesController.create
)

//Obtener todos los mensajes de un canal
workspaceRouter.get(
    '/:workspace_id/channels/:channel_id/messages',
    authMiddleware,
    workspaceMiddleware(),
    channelMiddleware,
    MessagesController.getAllMessagesByChannelId
)


workspaceRouter.post(
    '/:workspace_id/invite',
    authMiddleware,
    workspaceMiddleware(['admin']),
    WorkspaceController.invite
)


export default workspaceRouter