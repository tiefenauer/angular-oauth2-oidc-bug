import {AuthConfig} from 'angular-oauth2-oidc';

export const authConfig: AuthConfig = {
  disableAtHashCheck: true,
  strictDiscoveryDocumentValidation: false,
  issuer: 'insert_issuer_here', // url to IDP with discovery document (omitted for security reasons)
  redirectUri: 'http://localhost:4200/assets/signin-callback.html',
  clientId: 'insert_clientId_here', // client ID  (omitted for security reasons)
  scope: 'openid roles',
};
