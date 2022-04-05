import { AuthConfig } from 'angular-oauth2-oidc';

export const authConfig: AuthConfig = {
  disableAtHashCheck: true,
  issuer: 'insert_issuer_here', // url to IDP with discovery document (omitted for security reasons)
  strictDiscoveryDocumentValidation: false,
  clientId: 'insert_clientId_here', // client ID  (omitted for security reasons)
  redirectUri: 'http://localhost:4200/assets/signin-callback.html', // is configured as valid redirect URL in IDP
  silentRefreshRedirectUri: window.location.origin + '/silent-refresh.html',
  userinfoEndpoint: 'insert_userInfoEndpoint_here', // url to IDP user-info endpoint  (omitted for security reasons)
  scope: 'openid roles', // Ask offline_access to support refresh token refreshes
  silentRefreshTimeout: 5000, // For faster testing
  timeoutFactor: 0.25, // For faster testing
  sessionChecksEnabled: true,
  showDebugInformation: true, // Also requires enabling "Verbose" level in devtools
  clearHashAfterLogin: false, // https://github.com/manfredsteyer/angular-oauth2-oidc/issues/457#issuecomment-431807040
};
