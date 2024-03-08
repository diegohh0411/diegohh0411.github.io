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

  availableTags: string[] = []
  ngOnInit() {
    this.archiveMappings = mappings.map((map: any) => {
      map.publishDateISO8601 = map.publishDateISO8601 ? new Date(map.publishDateISO8601) : new Date()
      return map
    })
    this.archiveMappings.sort((a: any, b: any) => b.publishDateISO8601 - a.publishDateISO8601)

    this.archiveMappings.map((obj: any) => obj.tags).forEach((mapping: any) => {
      mapping.forEach((tag: string) => {
        if (!this.availableTags.includes(tag)) {
          this.availableTags.push(tag)
        }
      })
    })
  }

  appliedTags: string[] = []

  toggleTagAppliance(tag: string) {
    if (this.appliedTags.includes(tag)) {
      this.appliedTags.splice(this.appliedTags.indexOf(tag),1)
    } else {
      this.appliedTags.push(tag)
    }
  }

  get filteredMappings() {
    if (this.appliedTags.length === 0) {
      return this.archiveMappings
    } else {
      return this.archiveMappings.filter((mapping: any) => {
        return this.appliedTags.every((tag: string) => {
          return mapping.tags.includes(tag)
        })
      })
    }
  }
}
