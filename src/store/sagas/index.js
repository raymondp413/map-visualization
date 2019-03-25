import DroneSagas from "./Drone";
import WeatherSagas from "./Weather";
import ApiErrors from "./ApiErrors";

export default [...ApiErrors, ...WeatherSagas, ...DroneSagas];
