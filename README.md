# angular-oauth2-oidc-bug
Minimal project showing bug in angular-oauth2-oidc library: https://github.com/manfredsteyer/angular-oauth2-oidc/issues/1217

## Update
The bug could be fixed by using sessionStorage instead of localStorage and following the article on https://angular.de/artikel/oauth-odic-plugin/#umsetzung-in-angular

The original code to reproduce the issue is still available in the `original-bug` branch.
