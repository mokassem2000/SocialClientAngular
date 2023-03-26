import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanDeactivate,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { MemberEditeComponent } from '../Member/member-edite/member-edite.component';

@Injectable({
  providedIn: 'root',
})
export class UnsavedChangesGuard
  implements CanDeactivate<MemberEditeComponent>
{
  canDeactivate(component: MemberEditeComponent): boolean {
    if (component.editeform.dirty) {
      return confirm(
        '   are you sure u want continue ?any unsaved changes will be lost'
      );
    }
    return true;
  }
}
