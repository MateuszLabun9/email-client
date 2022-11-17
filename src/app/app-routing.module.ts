import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth/auth.guard';

const routes: Routes = [
  {
    path: 'inbox',
    canLoad: [AuthGuard], //Chech befor loading a module if this one can ce accesed by user. 
    loadChildren: () =>
      import('./inbox/inbox.module').then((mod) => mod.InboxModule), //lazy loading of module
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
