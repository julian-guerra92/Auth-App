import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TokenValidatorGuard } from './guards/token-validator.guard';

const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then(module => module.AuthModule)
  },
  {
    path: 'dashboard',
    loadChildren: () => import('./protected/protected.module').then(module => module.ProtectedModule),
    canActivate: [TokenValidatorGuard],
    canLoad: [TokenValidatorGuard]
  },
  {
    path: '**',
    redirectTo: 'auth'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
