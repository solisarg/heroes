import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatInputModule } from '@angular/material/input';
import { MatSortModule } from '@angular/material/sort';
import {MatDialogModule} from '@angular/material/dialog';
import {MatButtonModule} from '@angular/material/button';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HomeComponent } from './pages/home/home.component';
import { HttpClient, HttpClientModule, HttpHandler, HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpMockApiInterceptor } from './services/http-mock-api.interceptor';
import { HeroService } from './services/hero.service';
import { EditComponent } from './pages/edit/edit.component';
import { FormsModule } from '@angular/forms';
import { LoadingService } from './services/loading.services';
import { HttpRequestInterceptor } from './services/http-request-interceptor';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    EditComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule, MatInputModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule, MatButtonModule,
    MatProgressSpinnerModule,MatDialogModule
  ],
  providers: [
    HeroService,HttpClient,LoadingService,
    { provide: HTTP_INTERCEPTORS,
      useClass: HttpRequestInterceptor,
      multi: true},{ provide: HTTP_INTERCEPTORS,
        useClass: HttpMockApiInterceptor,
        multi: true}
    ],
  bootstrap: [AppComponent]
})
export class AppModule { }
