import { Component } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import {mappings} from "../../content/mappings";
import {LazyLoadImageModule} from "ng-lazyload-image";
import { CommonModule} from "@angular/common";

@Component({
  selector: 'app-gallery',
  standalone: true,
  imports: [
    LazyLoadImageModule,
    CommonModule
  ],
  templateUrl: './gallery.component.html',
  styleUrl: './gallery.component.css'
})
export class GalleryComponent {
  postUuid: string = ''
  filename: string = ''
  postMapping: any = {}
  constructor(
    private route: ActivatedRoute
  ) {
    this.route.params.subscribe(params => {
      this.postUuid = params['uuid']
      this.filename = params['filename'].replace('%2E', '.')
    })

    this.postMapping = mappings.filter(mapping => mapping.uuid === this.postUuid)[0]
  }

  get currentIndex() {
    return this.postMapping.imageFilenames.indexOf(this.filename)
  }

  move(dir: "prev"|"next") {
    const newIndex = dir === "prev" ? this.currentIndex - 1 : this.currentIndex + 1

    if (newIndex < 0 || newIndex >= this.postMapping.imageFilenames.length) {
      return
    }

    this.filename = this.postMapping.imageFilenames[newIndex]
  }

  get height(): string {
    const navbar = document.getElementById('navbar')
    if (!navbar) { return '100%'; }

    const { height, marginTop, marginBottom } = window.getComputedStyle(navbar)
    return `calc(100svh - ${height} - ${marginTop} - ${marginBottom})`
  }
}
