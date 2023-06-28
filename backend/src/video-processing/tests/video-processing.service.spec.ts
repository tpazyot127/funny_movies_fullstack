import { Test, TestingModule } from '@nestjs/testing';
import { VideoProcessingService } from '../video-processing.service';
import { getModelToken } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Video } from '../../videos/schemas/videos.schema';

describe('VideoProcessingService', () => {
  let service: VideoProcessingService;
  let videoModel: Model<Video>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        VideoProcessingService,
        {
          provide: getModelToken('Video'),
          useValue: {
            constructor: jest.fn(),
            findOne: jest.fn(),
            find: jest.fn(),
            updateOne: jest.fn(),
            deleteOne: jest.fn(),
            save: jest.fn().mockResolvedValue({}),
            create: jest.fn().mockReturnValue({}),
          },
        },
      ],
    }).compile();

    service = module.get<VideoProcessingService>(VideoProcessingService);
    videoModel = module.get<Model<Video>>(getModelToken('Video'));
  });

  describe('createVideo', () => {
    it('should create a new video', async () => {
      const title = 'Test Video';
      const username = 'testuser';
  
      const newVideo = {
        title,
        url: title,
        username,
        likes: 0,
        dislikes: 0,
      };
  
      jest.spyOn(videoModel, 'create').mockReturnValueOnce({
        save: jest.fn().mockResolvedValue(newVideo as Video),
      } as any);
    });
  });
  
});
