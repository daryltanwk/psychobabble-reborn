import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { PlayComponent } from './play/play.component';
import { DatastoreService } from './services/datastore.service';
import { PlayersService } from './services/players.service';
import { LobbyService } from './services/lobby.service';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    PlayComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AppRoutingModule
  ],
  providers: [PlayersService, LobbyService, DatastoreService],
  bootstrap: [AppComponent]
})
export class AppModule { }
