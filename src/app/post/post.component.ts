import {Component } from '@angular/core';
import { ActivatedRoute} from "@angular/router";
import { mappings } from "../../content/mappings";


import {CommonModule} from "@angular/common";
import { MarkdownComponent } from "ngx-markdown";

@Component({
  selector: 'app-post',
  standalone: true,
  imports: [
    CommonModule,
    MarkdownComponent,
  ],
  templateUrl: './post.component.html',
  styleUrl: './post.component.css'
})
export class PostComponent {
  postUuid: string = ''
  postMapping: any = {}
  constructor(
    private route: ActivatedRoute
  ) {
    this.route.params.subscribe(params => {
      this.postUuid = params['uuid']
    })

    const availableUuids = mappings.map(map => map.uuid)
    if (!availableUuids.includes(this.postUuid)) {
      window.alert('THAT UUID DOES NOT EXIST')
    } else {
      this.postMapping = mappings.find(mapping => mapping.uuid === this.postUuid)
      console.log(this.postMapping)
    }
  }

  math = Math
}
