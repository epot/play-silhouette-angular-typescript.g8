Play Silhouette Angular Typescript Giter8 Template
=====================================

The Play Silhouette Angular Giter8 Template shows how [Silhouette](https://github.com/mohiva/play-silhouette) can be used
to create a SPA with [Angular](https://angular.io/)/[ng2-ui-auth](https://github.com/ronzeidman/ng2-ui-auth). It's a starting point which can be extended to fit
your needs. It was migrated from the existing seed with AngularJS: [play-silhouette-angular-seed](https://github.com/mohiva/play-silhouette-angular-seed).

## Dependencies

* Play! Framework 2.6
* Scala 2.12
* Silhouette 5
* Angular 5
* Bootstrap 4
* Webpack
* RxJS

## Features

* Sign Up
* Sign In (Credentials)
* Password forgotten (Credentials)
* JWT authentication
* Social Auth (Facebook, Google+, VK, Twitter, Xing)
* Dependency Injection with Guice
* Publishing Events
* Avatar service

## Getting started

Install sbt and node.js first.

In order to play with this sample locally you need to:

 * go to the app-ui subfolder and run:
   ```
   npm install
   ```
 * configure the social providers by putting client id and secrets in your environment (see silhouette.conf to know 
 the exact syntax). For instance it is GOOGLE_CLIENT_ID and GOOGLE_CLIENT_SECRET for Google.
 * run "sbt start" from this sample rootfolder
 
## Documentation

Consult the [Silhouette documentation](http://silhouette.mohiva.com/docs) for more information. If you need help with the integration of Silhouette into your project, don't hesitate and ask questions in our [mailing list](https://groups.google.com/forum/#!forum/play-silhouette) or on [Stack Overflow](http://stackoverflow.com/questions/tagged/playframework).
For specific issues or questions related to this template, please do not hesitate to open issues on github.

## Test it live
This sample is deployed with Heroku here:
https://play-silhouette-angular-ts.herokuapp.com/

# License

The code is licensed under [Apache License v2.0](http://www.apache.org/licenses/LICENSE-2.0).
