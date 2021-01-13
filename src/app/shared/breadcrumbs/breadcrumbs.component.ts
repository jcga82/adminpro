import { Component } from '@angular/core';
import { ActivationEnd, ActivationStart, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';

@Component({
  selector: 'app-breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
  styles: []
})
export class BreadcrumbsComponent {

  public titulo = '';
  public tituloSubs$ = Subscription;

  constructor(
    private router: Router
  ) {
    this.router.events
      .pipe(
        filter( (event: any) => event instanceof ActivationEnd ),
        filter( (event: ActivationEnd) => event.snapshot.firstChild === null ),
        map( (event: ActivationEnd) => event.snapshot.data ),
      )
      .subscribe( data => {
        this.titulo = data.titulo;
        document.title = `Smartkalea - ${data.titulo}`;
      });
   }

}
