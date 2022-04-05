import {Injectable} from '@angular/core';
import {OAuthErrorEvent, OAuthService} from "angular-oauth2-oidc";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly errorResponsesRequiringUserInteraction = [
    'interaction_required',
    'login_required',
    'account_selection_required',
    'consent_required',
  ];

  constructor(private oauthService: OAuthService) {
    this.oauthService.events.subscribe(event => {
      if (event instanceof OAuthErrorEvent) {
        document.write(`<p>error: ${event.type}, ${event.reason}</p>`)
        console.log('error:', event)
      }
    })
  }

  runInitialLoginSequence(): Promise<void> {
    return this.oauthService
      // .loadDiscoveryDocumentAndLogin({ disableNonceCheck: true }) // this would work but since nonce is not checked the application is vulnerable to replay attacks
      .loadDiscoveryDocumentAndLogin() // will not work: invalid_nonce_in_state
      // .loadDiscoveryDocumentAndTryLogin() // will also not work: invalid_nonce_in_state
      // .loadDiscoveryDocument().then(() => this.oauthService.tryLogin()) // will also not work: silent_refresh_timeout
      .then(() => {
        if (this.oauthService.hasValidAccessToken()) {
          return Promise.resolve();
        }
        this.oauthService.initImplicitFlow()
        return this.oauthService
          .silentRefresh()
          .then(() => Promise.resolve())
          .catch((result) => {
            if (this.errorResponsesRequiringUserInteraction.includes(result?.reason?.error)) {
              console.warn('User interaction is needed to log in, we will wait for the user to manually log in.');
              return Promise.resolve();
            }
            document.write(`<p>error: ${result}</p>`)
            return Promise.reject(result);
          });
      })
      .then(() => {
        if (this.oauthService.state !== 'undefined' && this.oauthService.state !== 'null') {
          const accessToken = this.oauthService.getAccessToken()
          const idToken = this.oauthService.getIdToken()
          console.log('access token', accessToken);
          console.log('ID token', idToken);
          document.write(`<p>Access token: ${accessToken}</p>`)
          document.write(`<p>ID token: ${idToken}</p>`)
        }
      });
  }

}
