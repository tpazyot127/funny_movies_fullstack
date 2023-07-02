import { ConnectedSocket, MessageBody, OnGatewayConnection, OnGatewayDisconnect, OnGatewayInit, SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { VideoProcessingService } from '../video-processing/video-processing.service';
import { VideoDTO } from './client.dto';

@WebSocketGateway({
	namespace: '/client',
	cors: {
        origin: process.env.CLIENT_URL,	
        methods: ["GET", "POST"]
    },
})
export class ClientGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
	constructor(
		private readonly videoProcessingService: VideoProcessingService) {}
	
	// client websocket set
	@WebSocketServer() clients: Server;

	// in event initialize the dashboard socket
	afterInit(clients: any) {
		console.log('Initialize ClientGateway!');
	}

	// in case there is a connect to this session
	handleConnection(client: Socket, ...args: any[]) {
		console.log(`Client connected: ${client.id}`);
	}

	// in case of there is a client disconnect from socket server
	handleDisconnect(client: Socket) {
		console.log(`Client disconnected: ${client.id}`);
	}


	// using for test if client domain working
	@SubscribeMessage('client')
	handleMessage(client: Socket, payload: Object) {
		client.emit("client", { message: "Hello world" });
	}


	@SubscribeMessage('videos')
	async handleNewVideo(client: Socket, payload: VideoDTO): Promise<void> {
		await this.videoProcessingService.createVideo(payload.title, payload.username);
		client.broadcast.emit('latestVideo', payload);
	}

}
