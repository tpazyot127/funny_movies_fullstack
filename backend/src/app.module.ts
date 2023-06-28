import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ClientGateway } from './client/client.gateway';
import { UsersModule } from './users/users.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { connectDB } from './utils/config';
import { VideosModule } from './videos/videos.module';
import { VideoProcessingService } from './video-processing/video-processing.service';
import { VideoSchema } from './videos/schemas/videos.schema';

@Module({
	imports: [
		ConfigModule.forRoot({
			isGlobal: true,
		}),
		MongooseModule.forRootAsync({
			inject: [ConfigService],
			useFactory: connectDB,
		}),
		UsersModule,
		VideosModule,
		MongooseModule.forFeature([{ name: 'Video', schema: VideoSchema }])
	],
	controllers: [AppController],
	providers: [AppService, ClientGateway, VideoProcessingService],
})
export class AppModule { }
