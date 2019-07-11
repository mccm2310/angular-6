import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  time = new Observable(observer => {
    setInterval(() => observer.next(new Date().toString()),1000);
  });
  
  constructor(private translate: TranslateService) {
    //console.log('***************** get translation');
    translate.getTranslation('en').subscribe();
    translate.setDefaultLang('es');
  }
}


