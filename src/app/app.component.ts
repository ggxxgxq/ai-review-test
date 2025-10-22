import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  standalone: false,
})
export class AppComponent {
  title = 'my-angular-app';

  // tslint:disable-next-line:typedef
  testCode() {
    console.log('testCode');
  }
}
