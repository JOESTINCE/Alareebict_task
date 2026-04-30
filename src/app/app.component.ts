import { Component, OnInit, ViewChild, inject, DestroyRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet, NavigationEnd, Router } from '@angular/router';
import { MatSidenavModule, MatSidenav } from '@angular/material/sidenav';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { filter, map, shareReplay, switchMap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { LoaderComponent } from './shared/components/loader/loader.component';
import { TopToolbarComponent } from './shared/components/top-toolbar/top-toolbar.component';
import { LeftMenuComponent } from './shared/components/left-menu/left-menu.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    MatSidenavModule,
    LoaderComponent,
    TopToolbarComponent,
    LeftMenuComponent
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  @ViewChild('sidenav') sidenav!: MatSidenav;

  private breakpointObserver = inject(BreakpointObserver);
  private router = inject(Router);
  private destroyRef = inject(DestroyRef);

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(['(max-width: 1024px)'])
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  ngOnInit() {
    // Automatically close sidenav on navigation in mobile mode
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd),
      switchMap(() => this.isHandset$),
      takeUntilDestroyed(this.destroyRef)
    ).subscribe({
      next: (isHandset) => {
        if (isHandset && this.sidenav) {
          this.sidenav.close();
        }
      },
      error: (err) => console.error('Router/Handset observer error:', err)
    });
  }
}
