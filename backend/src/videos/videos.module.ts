import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { VideosService } from '../videos/services/videos.service';
import { VideoSchema } from '../videos/schemas/videos.schema';
import { VideosController } from './controller/videos.controller';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'Video', schema: VideoSchema }])],
  providers: [VideosService],
  exports: [VideosService],
  controllers: [VideosController],
})
export class VideosModule {}
