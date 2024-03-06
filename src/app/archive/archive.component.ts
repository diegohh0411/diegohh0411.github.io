import {Component, OnInit} from '@angular/core';
import { mappings } from "../../content/mappings";
import { CommonModule } from "@angular/common";
import {RouterLink} from "@angular/router";

@Component({
  selector: 'app-archive',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './archive.component.html',
  styleUrl: './archive.component.css'
})
export class ArchiveComponent implements OnInit {
  archiveMappings: any
  constructor() {

  }

  ngOnInit() {
    this.archiveMappings = mappings.map((map: any) => {
      map.publishDateISO8601 = map.publishDateISO8601 ? new Date(map.publishDateISO8601) : new Date()
      return map
    })
    this.archiveMappings.sort((a: any, b: any) => b.publishDateISO8601 - a.publishDateISO8601)
  }

}
