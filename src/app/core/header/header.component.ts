import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, NavigationStart } from '@angular/router';
import 'rxjs/add/operator/filter';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {
  sub: any;
  activeLink: string;
  searchCategory: string;

  constructor(private router: Router) { }

  ngOnInit() {
    this.sub = this.router.events
      .filter(event => event instanceof NavigationStart)
      .subscribe((event: NavigationStart) => {
        console.log('event from header bar: ' + event);
        // update search category based on route
        if (event.url.startsWith('/items')) {
          this.searchCategory = 'items';
        } else if (event.url.startsWith('/champions')) {
          this.searchCategory = 'champions';
        } else if (event.url.startsWith('/runes')) {
          this.searchCategory = 'runes';
        } else if (event.url.startsWith('/masteries')) {
          this.searchCategory = 'masteries';
        } else if (event.url === '/') {
          this.searchCategory = 'champions';
        }
      });
  }

  ngOnDestroy() {
    if (this.sub) {
      this.sub.unsubscribe();
    }
  }

}
