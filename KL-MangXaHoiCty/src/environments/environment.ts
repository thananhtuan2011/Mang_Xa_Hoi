// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
	production: false,
	isMockEnabled: true, // You have to switch this, when your real back-end is done
	authTokenKey: 'authce9d77b308c149d5992a80073637e4d5',
		//Apiroot: 'http://192.168.3.49/api/KhoaLuan' // ip khi ở công ty
	//	Apiroot: 'http://192.168.0.106/api/KhoaLuan' //ip ở  cafe
	//Apiroot: 'http://192.168.1.12//api/KhoaLuan' // api ở  nhà
	//Apiroot: 'http://192.168.1.2//api/KhoaLuan'
		// Apiroot: 'https://localhost:44340/api/KhoaLuan',
		// Api: 'https://localhost:44340'


		Apiroot: 'http://192.168.43.236/api/KhoaLuan',
		Api: 'http://192.168.43.236/'


		

		
	//Apiroot: 'http://192.168.43.236//api/KhoaLuan'
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
