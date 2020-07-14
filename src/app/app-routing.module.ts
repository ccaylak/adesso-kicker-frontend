import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {MatchResultComponent} from './match-result/match-result.component';
import {ProfileComponent} from './profile/profile.component';
import {RankingComponent} from './ranking/ranking.component';
import {NotFoundComponent} from './not-found/not-found.component';
import {HeaderComponent} from './header/header.component';
import {StatisticComponent} from './statistic/statistic.component';
import {AuthGuard} from './services/auth.guard';


const routes: Routes = [
  {path: '', redirectTo: 'ranking', pathMatch: 'full'},
  {path: 'matches/add', canActivate: [AuthGuard] , component: MatchResultComponent},
  {path: 'ranking', component: RankingComponent},
  {path: 'users/u/:userId', component: ProfileComponent},
  {path: '**', component: NotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}

export const routingComponents = [
  MatchResultComponent,
  RankingComponent,
  ProfileComponent,
  NotFoundComponent,
  HeaderComponent,
  StatisticComponent
];
