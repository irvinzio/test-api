import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styles: [`
    .container{
      display:flex;
      align-items: center;
      justify-content: center;
    }
  `],
})
export class AppComponent {
  title = 'app';
}
