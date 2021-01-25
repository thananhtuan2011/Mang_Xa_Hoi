// Angular
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
// RxJS
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
// NGRX
import { select, Store } from '@ngrx/store';
// Auth reducers and selectors
import { AppState} from '../../../core/reducers/';
import { isLoggedIn } from '../_selectors/auth.selectors';
import { AuthService } from '../_services/auth.service';


@Injectable()
export class AuthGuard implements CanActivate {
    constructor(private store: Store<AppState>, private router: Router, private AuthService: AuthService) {
            /* khi chạy lên thì nó sẽ vào đây check kiểm tra xem đã có user 
             nào hay  chưa nếu có rồi thì có thể load các page còn chưa thì bắt buộc phải đăng nhập*/
        // this.AuthService.logout();
        //     this.router.navigate(['/login']);
       
     }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {

        const currentUser = this.AuthService.currentUserValue;
        if (currentUser) {
            // logged in so return true
			return true;
        }

        // not logged in so redirect to login page with the return url
        this.router.navigate(['/auth']);
        return false;
    }

    // const currentUser = this.authenticationService.currentUserValue;
    //     if (currentUser) {
    //         // logged in so return true
    //         return true;
    //     }

    //     // not logged in so redirect to login page with the return url
    //     this.router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
    //     return false;
    // }

    }


