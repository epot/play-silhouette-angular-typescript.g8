/**
 * System configuration for Angular samples
 * Adjust as necessary for your application needs.
 */
(function (global) {
    System.config({
        paths: {
            // paths serve as alias
            'npm:': 'assets/lib/'
        },
        // map tells the System loader where to look for things
        map: {
            // our app is within the app folder
            'app': 'assets/app',

            // angular bundles
            '@angular/core': 'npm:angular__core/bundles/core.umd.js',
            '@angular/common': 'npm:angular__common/bundles/common.umd.js',
            '@angular/common/http': 'npm:angular__common/bundles/common-http.umd.js',
            '@angular/compiler': 'npm:angular__compiler/bundles/compiler.umd.js',
            '@angular/platform-browser': 'npm:angular__platform-browser/bundles/platform-browser.umd.js',
            '@angular/platform-browser-dynamic': 'npm:angular__platform-browser-dynamic/bundles/platform-browser-dynamic.umd.js',
            '@angular/platform-browser/animations': 'npm:angular__platform-browser/bundles/platform-browser-animations.umd.js',   
            '@angular/animations/browser':'npm:angular__animations/bundles/animations-browser.umd.js',
            '@angular/animations':'npm:angular__animations/bundles/animations.umd.js',
            '@angular/http': 'npm:angular__http/bundles/http.umd.js',
            '@angular/router': 'npm:angular__router/bundles/router.umd.js',
            '@angular/forms': 'npm:angular__forms/bundles/forms.umd.js',

            // other libraries
            'ng2-ui-auth': 'npm:ng2-ui-auth/bundles/ng2-ui-auth.umd.js',
            'ng2-toastr': 'npm:ng2-toastr',
            'rxjs': 'npm:rxjs',
            'tslib': 'npm:tslib/tslib.js',
            'ngx-cookie': 'npm:ngx-cookie/bundles/ngx-cookie.umd.js',
            'angular-in-memory-web-api': 'npm:angular-in-memory-web-api/bundles/in-memory-web-api.umd.js'
        },
        // packages tells the System loader how to load when no filename and/or no extension
        packages: {
            app: {
                defaultExtension: 'js',
                meta: {
                    './*.js': {
                        loader: 'assets/systemjs-angular-loader.js'
                    }
                }
            },
            rxjs: {
                defaultExtension: 'js'
            },
            tslib: {
                defaultExtension: 'js'
            },
            'ng2-toastr': {
                defaultExtension: 'js'
            }
        }
    });
})(this);