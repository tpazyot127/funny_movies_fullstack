import {
  Controller,
  Post,
  Body,
  Inject,
  UseGuards,
  Get,
  Param,
} from '@nestjs/common';
import { AuthGuard } from 'src/guards/auth.guard';
import { VideosService } from '../services/videos.service';

@Controller('videos')
export class VideosController {
  constructor(private readonly videosService: VideosService) {}

  @Get()
  async getAllVideos() {
    const videos = await this.videosService.findAllVideos();
    return videos;
  }

  @Post(':videoId/like')
  async likeVideo(@Param('videoId') videoId: string) {
    // Save the like for the video
    await this.videosService.likeVideo(videoId);
    this.getAllVideos();
    const videos = await this.videosService.findAllVideos();
    return videos;
  }

  @Post(':videoId/dislike')
  async dislikeVideo(@Param('videoId') videoId: string) {
    // Save the dislike for the video
    await this.videosService.dislikeVideo(videoId);
    this.getAllVideos();
    const videos = await this.videosService.findAllVideos();
    return videos;
  }
}
