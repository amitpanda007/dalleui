// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  apiUrl: 'http://localhost:80',
  firebase: {
    projectId: 'dalleui',
    appId: '1:312230679942:web:1a26386e08e4b31c9a0807',
    storageBucket: 'dalleui.appspot.com',
    apiKey: 'AIzaSyD-1fv0ah7sNaNBfX72eWySTLz2mppkAMw',
    authDomain: 'dalleui.firebaseapp.com',
    messagingSenderId: '312230679942',
    measurementId: 'G-KJM36DMV2C',
  },
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
