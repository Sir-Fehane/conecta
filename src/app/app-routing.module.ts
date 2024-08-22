import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { LoginComponent } from './auth/login/login.component'
import { RegisterComponent } from './auth/register/register.component'
import { DashboardComponent } from './dashboard/dashboard.component'
import { FriendManagerComponent } from './components/friend-manager/friend-manager.component';
import { PreSalaComponent } from './pre-sala/pre-sala.component';

import { AuthGuard } from './auth.guard'
import { PlayerGamesComponent } from './player-games/player-games.component'
import { BoardComponent } from './board/board.component'

const routes: Routes = [
  { path: 'login', component: LoginComponent, canActivate:[AuthGuard] },
  { path: 'register', component: RegisterComponent, canActivate:[] },
  { path: 'dashboard', component: DashboardComponent, canActivate:[AuthGuard] },
  { path: 'friends', component: FriendManagerComponent, canActivate:[AuthGuard] },
  { path: 'room/:code', component: PreSalaComponent, canActivate: [AuthGuard]},
  { path: 'history', component: PlayerGamesComponent, canActivate: []},
  { path: 'board', component: BoardComponent, canActivate: [AuthGuard]},
  { path: '**', redirectTo: '/login', pathMatch: 'full' }
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}

