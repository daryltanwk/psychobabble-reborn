import { MainStageComponent } from './play/main-stage/main-stage.component';
import { MainMenuComponent } from './play/main-menu/main-menu.component';
import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

import { InGameGuard } from './guards/in-game.guard';
import { AuthGuard } from './guards/auth.guard';
import { RegisterComponent } from './register/register.component';
import { HomeComponent } from './home/home.component';
import { PlayComponent } from './play/play.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    children: []
  },
  {
    path: 'play',
    component: PlayComponent,
    children: [
      {
        path: '',
        component: MainMenuComponent
      }, {
        path: ':lobbyId',
        component: MainStageComponent,
        canDeactivate:[InGameGuard],
      }
    ],
    canActivate: [AuthGuard],
  },
  {
    path: 'register',
    component: RegisterComponent,
    children: [],
    canActivate: [AuthGuard]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
