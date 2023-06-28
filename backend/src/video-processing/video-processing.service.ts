import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Video } from '../videos/schemas/videos.schema';

@Injectable()
export class VideoProcessingService {
  constructor(
    @InjectModel('Video') private readonly videoModel: Model<Video>,
  ) {}

  async createVideo(title: string, username: string): Promise<Video> {
    const newVideo = new this.videoModel({
      title,
      url: title,
      username,
      likes: 0,
      dislikes: 0,
    });
    return newVideo.save();
  }
}
