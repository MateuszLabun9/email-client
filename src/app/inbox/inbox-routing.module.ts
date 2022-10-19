import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  { path: '', component: HomeComponent }, //here we are using lazy loading and that's why route is just '' because
  //in app module there is a rule if we are in /inbox - it has to load Inbox module and here we want to say that
  //if we are already at /inbox we dont wat to add anything else to path that's why ''
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class InboxRoutingModule {}
