import {APP_INITIALIZER, NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {authConfig} from "./auth/auth-config";
import {
  AuthConfig,
  OAuthModule,
  OAuthModuleConfig,
  OAuthService,
  OAuthStorage,
  ValidationHandler
} from "angular-oauth2-oidc";
import {JwksValidationHandler} from "angular-oauth2-oidc-jwks";
import {AuthService} from "./auth/auth.service";
import {HttpClientModule} from "@angular/common/http";
import {RouterModule} from "@angular/router";

export const authModuleConfig: OAuthModuleConfig = {
  resourceServer: {
    sendAccessToken: true,
  }
};

export function initializeApp(authService: AuthService, oAuthService:OAuthService): () => Promise<void> {
  return () => {
    oAuthService.configure(authConfig);
    return authService.runInitialLoginSequence()
  }
}

// We need a factory since localStorage is not available at AOT build time
export function storageFactory(): OAuthStorage {
  return localStorage;
}

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    OAuthModule.forRoot(),
    RouterModule.forRoot([
      {path: '', component: AppComponent},
      {path: '**', redirectTo: ''}
    ])
  ],
  providers: [
    AuthService,
    {
      provide: APP_INITIALIZER,
      useFactory: initializeApp,
      deps: [AuthService, OAuthService],
      multi: true,
    },
    {provide: AuthConfig, useValue: authConfig},
    {provide: OAuthModuleConfig, useValue: authModuleConfig},
    {provide: ValidationHandler, useClass: JwksValidationHandler},
    {provide: OAuthStorage, useFactory: storageFactory},
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
