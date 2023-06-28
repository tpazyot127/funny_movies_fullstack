import { Test, TestingModule } from '@nestjs/testing';
import { ClientGateway } from './client.gateway';
import { VideoProcessingService } from '../video-processing/video-processing.service';
import { Server, Socket } from 'socket.io';
import { VideoDTO } from './client.dto';

describe('ClientGateway', () => {
  let clientGateway: ClientGateway;
  let videoProcessingService: VideoProcessingService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ClientGateway,
        {
          provide: VideoProcessingService,
          useValue: {
            createVideo: jest.fn(),
          },
        },
      ],
    }).compile();

    clientGateway = module.get<ClientGateway>(ClientGateway);
    videoProcessingService = module.get<VideoProcessingService>(
      VideoProcessingService,
    );
  });

  it('should initialize ClientGateway', () => {
    const clients: Server = {} as Server;
    clientGateway.afterInit(clients);
    // Add your assertions here
  });

  it('should handle client connection', () => {
    const client: Socket = { id: '123' } as Socket;
    const args: any[] = [];
    clientGateway.handleConnection(client, ...args);
    // Add your assertions here
  });

  it('should handle client disconnection', () => {
    const client: Socket = { id: '123' } as Socket;
    clientGateway.handleDisconnect(client);
    // Add your assertions here
  });

  it('should handle client message', () => {
    const client: any = { emit: jest.fn() };
    const payload: Object = {};
    clientGateway.handleMessage(client, payload);
    // Add your assertions here
    expect(client.emit).toHaveBeenCalledWith('client', { message: 'Hello world' });
  });

  it('should handle new video', async () => {
    const client: any = { broadcast: { emit: jest.fn() } };
    const payload: VideoDTO = { title: 'Video title', username: 'User' };
    await clientGateway.handleNewVideo(client, payload);
    // Add your assertions here
    expect(videoProcessingService.createVideo).toHaveBeenCalledWith(
      payload.title,
      payload.username,
    );
    expect(client.broadcast.emit).toHaveBeenCalledWith('latestVideo', payload);
  });
});
