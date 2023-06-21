import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CadComponent } from './cad/cad.component';
import { ArsComponent } from './ars/ars.component';
import { GbpComponent } from './gbp/gbp.component';
import { ConverterComponent } from './converter/converter.component';

@NgModule({
  declarations: [
    AppComponent,
    CadComponent,
    ArsComponent,
    GbpComponent,
    ConverterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
