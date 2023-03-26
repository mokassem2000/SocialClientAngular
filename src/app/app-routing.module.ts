import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { MemberDitailComponent } from './Member/member-ditail/member-ditail.component';
import { MemberEditeComponent } from './Member/member-edite/member-edite.component';
import { MemberListComponent } from './Member/member-list/member-list.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { UnsavedChangesGuard } from './_guards/unsaved-changes.guard';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'signUp', component: SignUpComponent },
  { path: 'Members', component: MemberListComponent },
  { path: 'Members/:id', component: MemberDitailComponent },
  {
    path: 'Member/edite',
    component: MemberEditeComponent,
    canDeactivate: [UnsavedChangesGuard],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
