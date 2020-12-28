import { Component } from '@angular/core';

@Component({
  selector: 'app-nopagefound',
  templateUrl: './nopagefound.component.html',
  styles: ['./nopagefound.component.scss']
})
export class NopagefoundComponent {

  year = new Date().getFullYear();

}
