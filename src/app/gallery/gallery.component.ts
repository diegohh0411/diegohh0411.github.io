import {AfterViewChecked, Component} from '@angular/core';
import { CommonModule } from "@angular/common";

import {ActivatedRoute, Router} from "@angular/router";
import {mappings} from "../../content/mappings";

@Component({
  selector: 'app-gallery',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './gallery.component.html',
  styleUrl: './gallery.component.css'
})
export class GalleryComponent implements AfterViewChecked {
  postUuid: string = ''
  postMapping: any = {}
  f: string = ''
  constructor(
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.route.params.subscribe(params => {
      this.postUuid = params['uuid']
    })
    this.route.queryParams.subscribe(params => {
      this.f = params['f']
    })

    const availableUuids = mappings.map(map => map.uuid)
    if (!availableUuids.includes(this.postUuid)) {
      this.router.navigate(['404'], { skipLocationChange: true })
    } else {
      this.postMapping = mappings.find(mapping => mapping.uuid === this.postUuid)
    }
  }

  protected readonly math = Math;

  ngAfterViewChecked() {
    document.getElementById(this.f)?.scrollIntoView({
      behavior: 'instant',
      inline: "center"
    });
  }
}
