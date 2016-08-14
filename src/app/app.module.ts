import { NgModule }       from '@angular/core';
import { BrowserModule  } from '@angular/platform-browser';
import { App }   from './app.component';

@NgModule({
    declarations: [App],
    imports:      [BrowserModule],
    bootstrap:    [App],
})
export class AppModule {}