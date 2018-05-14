import { LocalStorageService } from './shared/services/local-storage.service';
import { DataService } from './shared/services/data.service';
;

import { PapaParseService } from 'ngx-papaparse';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';


import { AlertModule } from 'ngx-bootstrap';
import { NotFoundComponent } from './shared/component/not-found/not-found.component';
import { CoinIndexComponent } from './coin-index/coin-index.component'
import { HttpClientModule } from '@angular/common/http';
import { NgPipesModule } from 'ngx-pipes';



@NgModule({
  declarations: [
    AppComponent,
    NotFoundComponent,
    CoinIndexComponent
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    [AlertModule.forRoot()],
    HttpClientModule,
    NgPipesModule


  ],
  providers: [
    PapaParseService,
    DataService,
    LocalStorageService

  ],
  bootstrap: [AppComponent]
})
export class AppModule { } 
