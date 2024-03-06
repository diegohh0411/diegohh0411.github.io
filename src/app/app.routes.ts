import { Routes } from '@angular/router';
import { PostComponent} from "./post/post.component";
import {ArchiveComponent} from "./archive/archive.component";
import {FourOFourComponent} from "./four-ofour/four-ofour.component";
import {GalleryComponent} from "./gallery/gallery.component";

export const routes: Routes = [
  {
    path: '',
    component: PostComponent
  },
  { path: 'p/:uuid', component: PostComponent },
  { path: 'g/:uuid', component: GalleryComponent },
  { path: 'archive', component: ArchiveComponent },
  { path: '**', pathMatch: 'full', component: FourOFourComponent }
];
