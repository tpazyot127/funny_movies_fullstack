import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Video extends Document {
  @Prop()
  title: string;

  @Prop()
  url: string;

  @Prop()
  username: string;

  @Prop({ default: 0 })
  likes: number;

  @Prop({ default: 0 })
  dislikes: number;
}

export const VideoSchema = SchemaFactory.createForClass(Video);
