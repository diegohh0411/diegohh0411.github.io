import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, RouterLink} from "@angular/router";
import { Router } from "@angular/router";
import { mappings } from "../../content/mappings";

import { CommonModule } from "@angular/common";
import { MarkdownComponent } from "ngx-markdown";

import { CookieService } from "ngx-cookie-service";

import anime from 'animejs';
import {LazyLoadImageModule} from "ng-lazyload-image";

@Component({
  selector: 'app-post',
  standalone: true,
  imports: [
    CommonModule,
    MarkdownComponent,
    RouterLink,
    LazyLoadImageModule,
  ],
  providers: [
    CookieService
  ],
  templateUrl: './post.component.html',
  styleUrl: './post.component.css'
})
export class PostComponent implements OnInit, OnDestroy {
  postUuid: string = ''
  postMapping: any = {}
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private cookieService: CookieService
  ) {
    this.route.params.subscribe(params => {
      this.postUuid = params['uuid']
    })

    const availableUuids = mappings.map(map => map.uuid)
    if (this.route.snapshot.url.length === 0) {
      this.postMapping = mappings.find(mapping => mapping.uuid === 'feb2024')
    } else if (!availableUuids.includes(this.postUuid)) {
      this.router.navigate(['404'], { skipLocationChange: true })
    } else {
      this.postMapping = mappings.find(mapping => mapping.uuid === this.postUuid)
    }

    this.postMapping.publishDateISO8601 = new Date(this.postMapping.publishDateISO8601)
  }

  get md() {
    return window.innerWidth >= 768
  }

  protected readonly math = Math;

  hintIsHidden = false
  async ngOnInit() {
    this.hintIsHidden = this.cookieService.get('hintIsHidden') === 'true'
  }

  hideHint() {
    this.hintIsHidden = true
    this.cookieService.set('hintIsHidden', 'true')
  }

  overlayIsOpen = false
  overlayedImage = ''
  toggleOverlay(imageToOverlay: string) {
    this.overlayIsOpen = !this.overlayIsOpen
    this.overlayedImage = imageToOverlay
  }

  get currentIndex() {
    return this.postMapping.imageFilenames.indexOf(this.overlayedImage)
  }
  newIndex(dir: "next"|"prev") {
    const indexDiff = dir === 'next' ? 1 : -1
    const newIndex = this.postMapping.imageFilenames.indexOf(this.overlayedImage) + indexDiff
    return newIndex
  }
  changeImage(dir: "next"|"prev") {
    const newIndex = this.newIndex(dir)
    if (newIndex > this.postMapping.imageFilenames.length - 1 || newIndex < 0) {
      return
    }

    const currentImage = document.getElementById(this.overlayedImage + '_overlayedImage')
    this.overlayedImage = this.postMapping.imageFilenames[newIndex]

    anime({
      targets: [currentImage],
      translateX: dir === 'next' ? ['100vw', '0'] : ['-100vw', '0'],
      easing: 'spring(1, 80, 15, 15)'
    })
  }


  ngOnDestroy() {
  }
}
