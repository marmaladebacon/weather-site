# weather-site

## Project setup
```
yarn install
```

### Run distributable
```
node server/
```

### Compiles and hot-reloads for development
```
yarn run serve
```

### Compiles and minifies for production
```
yarn run build
```

### Run unit tests
```
yarn run test
```

### Lints and fixes files
```
yarn run lint
```

### Run your unit tests
```
yarn run test
```

## Product
Interactable map that can be used to find out the weather at the current marker location and its five day forecast

Also able to save locations and view a grid of 5 day forecasts

## Thoughts:
Due to a time limit i've placed on myself:

Unit tests cover the 2 core components(WeatherComponent and FiveDayForecastComponent) built, and while I initially had a separate vuex module for storing weather data (see early commits), there appeared to be no real use for storing weather data for triggering rerenders when the position will do.

Future todo would be to add tests for the Home,SavedLocations and MapComponent.

Another future todo would be to hide the api keys. I would dearly like to know how other users of google maps hide their api keys. With the OpenWeatherMap api I'm thinking of moving the api calls to OpenWeatherMap to an express server and call there, using an environment variable storing the api key to be referenced at runtime.




