import {Component, OnInit } from '@angular/core';
import {RouterLink} from "@angular/router";
import { Router, NavigationEnd } from "@angular/router";
import { CommonModule } from "@angular/common";

@Component({
  selector: 'app-navigation',
  standalone: true,
  imports: [
    RouterLink,
    CommonModule
  ],
  templateUrl: './navigation.component.html',
  styleUrl: './navigation.component.css'
})
export class NavigationComponent implements OnInit {
  constructor(
    private router: Router
  ) {

  }

  ngOnInit() {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.updateActiveLink()
      }
    })
  }

  activePathIs = ''
  updateActiveLink() {
    this.activePathIs = this.router.routerState.snapshot.url
  }
}
