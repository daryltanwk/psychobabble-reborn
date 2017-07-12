import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppRoutingModule } from './app-routing.module';

import { ModalModule } from 'ngx-bootstrap/modal';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { PlayComponent } from './play/play.component';
import { InGameGuard } from './guards/in-game.guard';
import { AuthGuard } from './guards/auth.guard';
import { DatastoreService } from './services/datastore.service';
import { PlayersService } from './services/players.service';
import { LobbyService } from './services/lobby.service';
import { RegisterComponent } from './register/register.component';
import { MainMenuComponent } from './play/main-menu/main-menu.component';
import { TestareaComponent } from './play/testarea/testarea.component';
import { MainStageComponent } from './play/main-stage/main-stage.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    PlayComponent,
    RegisterComponent,
    MainMenuComponent,
    TestareaComponent,
    MainStageComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    AppRoutingModule,
    ModalModule.forRoot(),
  ],
  providers: [PlayersService, LobbyService, DatastoreService, AuthGuard, InGameGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
