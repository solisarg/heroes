# Heroes
Project for a technical test featuring a basic super-hero CRUD, tribute to original heroes tutorial by John Papa 

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 10.0.5.
You can load a list of heroes, edit, add or delete new entries.
The application use a local temporal list that will be recreated each time you reload a page.
The services are simulated using an interceptor that load a local json file, and the same technique is used to show the loading spinner (delayed for 1 second, since there´s no loading time because data is local)
Basic unit testing is in place. The list of heroes comes from the original Heroes tutorial. 
where everyone begins at some point.
We use Angular Material as the base build elements for the whole app.

You can play with the demo at https://devarg3818.com/heroes/

 ## Dynamic forms
There´s a version that use dynamic forms for the edit form that you can check on the dynamic-form branch

 ## Installing
 After download the project, run npm install to download all the dependencies. If you don´t have Node installed, download the latest stable version from https://nodejs.org

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).
