import { VideosInterface } from '../../interfaces';


export interface VideosState {
  loading: boolean;
  error: any;
  data: VideosInterface[];
}
