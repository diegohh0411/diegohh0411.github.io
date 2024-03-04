import { Routes } from '@angular/router';
import { PostComponent} from "./post/post.component";

export const routes: Routes = [
  { path: 'p/:uuid', component: PostComponent }
];
