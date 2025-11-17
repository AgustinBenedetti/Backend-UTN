import ChannelRepository from "../repositories/channel.repository.js";


class ChannelService {
    static async create(workspaceId, name) {
        // Lógica para crear un nuevo canal en el workspace
        // Por ejemplo, podrías interactuar con un repositorio de canales aquí
        const channel_created = await ChannelRepository.create(workspaceId, name)
        return channel_created
    }

    static async getAllChannelsByWorkspaceId(workspace_id) {
        const channels = await ChannelRepository.getAllByWorkspaceId(workspace_id)
        return channels
    }
}

export default ChannelService;