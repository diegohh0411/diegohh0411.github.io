import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, RouterLink} from "@angular/router";
import { Router } from "@angular/router";
import { mappings } from "../../content/mappings";

import {CommonModule, NgOptimizedImage} from "@angular/common";
import { MarkdownComponent } from "ngx-markdown";

import { CookieService } from "ngx-cookie-service";

import {LazyLoadImageModule} from "ng-lazyload-image";

@Component({
  selector: 'app-post',
  standalone: true,
  imports: [
    CommonModule,
    MarkdownComponent,
    RouterLink,
    LazyLoadImageModule,
    NgOptimizedImage,
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
      const sortedMappings = mappings.map((map: any) => {
        map.publishDateISO8601 = map.publishDateISO8601 ? new Date(map.publishDateISO8601) : new Date()
        return map
      }).sort((a: any, b: any) => b.publishDateISO8601 - a.publishDateISO8601)

      this.postMapping = sortedMappings[1]
      this.postUuid = this.postMapping.uuid
    } else if (!availableUuids.includes(this.postUuid)) {
      this.router.navigate(['404'], { skipLocationChange: true })
    } else {
      this.postMapping = mappings.find(mapping => mapping.uuid === this.postUuid)
    }

    this.postMapping.publishDateISO8601 = new Date(this.postMapping.publishDateISO8601)

    this.postMapping.imageObjects = this.postMapping.imageFilenames.map((filename: string) => {
      return {
        filename: filename,
        loaded: false,
        left: {
          md: `${Math.random() * 50 + 15}%`,
          base: `${Math.random() * 23}%`
        },
        top: {
          base: `${Math.random() * 20 + 10}svh`
        }
      }
    })
  }

  get md() {
    return window.innerWidth >= 768
  }

  hintIsHidden = false
  async ngOnInit() {
    this.hintIsHidden = this.cookieService.get('hintIsHidden') === 'true'
  }

  hideHint() {
    this.hintIsHidden = true
    this.cookieService.set('hintIsHidden', 'true')
  }

  ngOnDestroy() {
  }
}
