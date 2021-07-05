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

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
