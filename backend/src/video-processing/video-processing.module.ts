import { Module } from '@nestjs/common';
import { VideoProcessingService } from './video-processing.service';
import { Video, VideoSchema } from '../videos/schemas/videos.schema';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'Video', schema: VideoSchema }])],
  providers: [VideoProcessingService],
  exports: [VideoProcessingService]
})
export class VideoProcessingModule {}
