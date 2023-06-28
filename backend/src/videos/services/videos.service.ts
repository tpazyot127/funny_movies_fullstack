import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { Video } from '../schemas/videos.schema';

@Injectable()
export class VideosService {
  constructor(@InjectModel('Video') private readonly videoModel: Model<Video>) {}

  async findAllVideos(): Promise<Video[]> {
    return await this.videoModel.find().exec();
  }
  
  async createVideo(title: string, username: string): Promise<Video> {
    const newVideo = new this.videoModel({ title, username });
    return await newVideo.save();
  }

  async likeVideo(videoId: string): Promise<Video> {
    const video = await this.videoModel.findById(videoId).exec();
    if (!video) {
      throw new Error('Video not found.');
    }
    video.likes++;
    return await video.save();
  }

  async dislikeVideo(videoId: string): Promise<Video> {
    const video = await this.videoModel.findById(videoId).exec();
    if (!video) {
      throw new Error('Video not found.');
    }
    video.dislikes++;
    return await video.save();
  }
}
