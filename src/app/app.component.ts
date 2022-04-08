import {Component} from '@angular/core';
import {OAuthService} from 'angular-oauth2-oidc';
import {authConfig} from './auth.config';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent {

  constructor(
    private http: HttpClient,
    private oauthService: OAuthService) {

    oauthService.configure(authConfig);
    oauthService.setupAutomaticSilentRefresh();
    oauthService.loadDiscoveryDocumentAndTryLogin().then(_ => {
      if (this.oauthService.hasValidAccessToken()) {
        return Promise.resolve();
      }
      this.oauthService.initImplicitFlow();
    }).then(_ => {
      const claims = this.oauthService.getIdentityClaims();
      const accessToken = this.oauthService.getAccessToken();
      const idToken = this.oauthService.getIdToken();
      console.log('access token', accessToken);
      console.log('ID token', idToken);
      console.log('claims', claims);
      document.write(`<p>Access token: ${accessToken}</p>`);
      document.write(`<p>ID token: ${idToken}</p>`);
      document.write(`<p>Identity claims: ${JSON.stringify(claims)}</p>`);
    });
  }

}
