import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, RouterLink} from "@angular/router";
import { Router } from "@angular/router";
import { mappings } from "../../content/mappings";

import { CommonModule } from "@angular/common";
import { MarkdownComponent } from "ngx-markdown";

import anime from "animejs";

@Component({
  selector: 'app-post',
  standalone: true,
  imports: [
    CommonModule,
    MarkdownComponent,
    RouterLink,
  ],
  templateUrl: './post.component.html',
  styleUrl: './post.component.css'
})
export class PostComponent implements OnInit {
  postUuid: string = ''
  postMapping: any = {}
  constructor(
    private route: ActivatedRoute,
    private router: Router
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
  async ngOnInit() {
    for (let i = 0; i < 10; i++) {
      setTimeout(() => {
        console.debug('.')
      }, i * 7000)
    }
  }
}
