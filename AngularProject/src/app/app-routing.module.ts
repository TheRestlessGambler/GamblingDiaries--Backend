import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserDashboardComponent } from './user-dashboard/user-dashboard.component';
import { SigninComponent } from './signin/signin.component';
import { SignupComponent } from './signup/signup.component';
import { ProfileComponent } from './profile/profile.component';
import { JournalComponent } from './journal/journal.component';

const routes: Routes = [
  { path: 'user-dashboard', component: UserDashboardComponent },
  { path: '', component: SigninComponent },{path: 'profile', component: ProfileComponent },{path: 'signup', component: SignupComponent},{path: 'signin', component: SigninComponent},{path: 'journal',component: JournalComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
