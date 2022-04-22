import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from "@angular/router";
import {Injectable} from "@angular/core";
import {TokenStorageService} from "../services/token-storage.service";

@Injectable()
export class AuthenticationGuard implements CanActivate {

  constructor(private tokenStorageService: TokenStorageService, private router: Router) {
  }

  public async canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean> {

    if (!this.tokenStorageService.isUserLoggedIn())
      await this.router.navigate(['/login']);

    if (route.routeConfig?.path === 'management' && this.tokenStorageService.getUser().roles == 'ROLE_USER')
      await this.router.navigate(['/home']);

    return this.tokenStorageService.isUserLoggedIn();
  }

}
