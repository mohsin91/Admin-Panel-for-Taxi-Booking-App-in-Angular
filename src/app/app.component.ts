import { Component } from '@angular/core';
import { NgProgress } from '@ngx-progressbar/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'taxi';
  constructor(
    public ngProgress: NgProgress
  ) {

  }
  spinnerAlert(show) {
    if(show === 'show') {      
      this.ngProgress.start();
    } else {
        this.ngProgress.done();
  }
  }  
}
