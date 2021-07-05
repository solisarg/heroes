import { Component } from '@angular/core';
import { delay } from 'rxjs/operators';
import { LoadingService } from './services/loading.services';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  loading:boolean = false;
  title = 'heroes';
  private timeout:number = 5000;
  private timeoutInterval;

  constructor(
    private _loading:LoadingService
  ){ }

  ngOnInit() {
    this.listenToLoading();
  }

  /**
   * Listen to the loadingSub property in the LoadingService class.
   * This drives the display of the loading spinner.
   */
  listenToLoading(): void {
    this._loading.loadingSub
    .pipe(delay(0)) // This prevents a ExpressionChangedAfterItHasBeenCheckedError for subsequent requests
      .subscribe((cargando) => {
        if(cargando){
          this.loading = cargando;
          //timeout to avoid blocking UI
          this.timeoutInterval = setTimeout(()=>{
            this.loading = false;
          }, this.timeout)
        } else //delay so it can be seen
          setTimeout(()=>{
            this.loading = cargando;
          }, 1000)
      });
  }
}
