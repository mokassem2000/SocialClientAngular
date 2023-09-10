import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { MemberDitailComponent } from './Member/member-ditail/member-ditail.component';
import { MemberEditeComponent } from './Member/member-edite/member-edite.component';
import { MemberListComponent } from './Member/member-list/member-list.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { UnsavedChangesGuard } from './_guards/unsaved-changes.guard';
import { ListsComponent } from './Member/lists/lists.component';
import { MessagesComponent } from './messages/messages.component';
import { IsauthenticatedGuard } from './_guards/isauthenticated.guard';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'signUp', component: SignUpComponent, title: 'SignUp' },
  {
    path: 'Members',
    component: MemberListComponent,
    canActivate: [IsauthenticatedGuard],
  },
  { path: 'Members/:id', component: MemberDitailComponent, title: 'Members' },

  {
    path: 'Member/edite',
    component: MemberEditeComponent,
    title: 'Profile',
    canDeactivate: [UnsavedChangesGuard],
  },
  {
    path: 'Likes',
    component: ListsComponent,
    title: 'Profile',
    canActivate: [IsauthenticatedGuard],
  },
  { path: 'messages/:id', component: MessagesComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
