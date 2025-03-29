import { ForecastData, GeocodingResponse, WeatherData } from "@/api/types";
import { useGeolocation } from "@/hooks/use-geolocation";
import {
  useForecastQuery,
  useReversGeoCode,
  useWeatherQuery,
} from "@/hooks/use-weather";
import { AlertCircle, MapPin, RefreshCw } from "lucide-react";
import CurrentWeather from "../currentWeather";
import FavoriteCities from "../favoriteCities";
import HourlyTemperature from "../hourlyTemperature";
import WeatherSkeleton from "../loading-skeleton";
import { Alert, AlertDescription, AlertTitle } from "../ui/alert";
import { Button } from "../ui/button";
import WeatherDetails from "../weatherDetails";
import WeatherForecast from "../weatherForecast";

function WeatherDashboard() {
  const {
    coordinates,
    error: locationError,
    getLocation,
    isLoading: locationLoading,
  } = useGeolocation();
  const locationQuery = useReversGeoCode(coordinates);
  const weatherQuery = useWeatherQuery(coordinates);
  const forecastQuery = useForecastQuery(coordinates);

  const handleRefresh = () => {
    getLocation();
    if (coordinates) {
      weatherQuery.refetch();
      forecastQuery.refetch();
      locationQuery.refetch();
    }
  };
  if (locationLoading) {
    return <WeatherSkeleton />;
  }
  if (locationError || !coordinates) {
    return (
      <Alert variant="destructive">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>
          Opps! A Error Occur While Getting Your Weather Ready.
        </AlertTitle>
        <AlertDescription className="flex flex-col gap-4">
          <p>{locationError}</p>
          <Button onClick={getLocation} variant="outline" className="w-fit">
            <MapPin className="h-4 w-4" />
            Enable Location Access
          </Button>
        </AlertDescription>
      </Alert>
    );
  }
  const locationName = locationQuery.data?.[0] ?? ({} as GeocodingResponse);

  if (weatherQuery.isLoading || forecastQuery.isLoading) {
    return <WeatherSkeleton />;
  }
  if (weatherQuery.isError || forecastQuery.isError) {
    return (
      <Alert variant="destructive">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>
          Opps! A Error Occur While Getting Your Weather Ready.
        </AlertTitle>
        <AlertDescription className="flex flex-col gap-4">
          <p>Something went wrong while fetching weather data.</p>
          <Button onClick={handleRefresh} variant="outline" className="w-fit">
            <RefreshCw className="h-4 w-4" />
            Try Again
          </Button>
        </AlertDescription>
      </Alert>
    );
  }
  return (
    <div className="space-y-4">
      <FavoriteCities />
      <div className="flex justify-between items-center">
        <h1 className="text-xl font-bold tracking-tight">My Location</h1>
        <Button
          variant={"outline"}
          size={"icon"}
          onClick={handleRefresh}
          disabled={weatherQuery.isFetching}
        >
          <RefreshCw
            className={`h-4 w-4 ${
              weatherQuery.isFetching ? "animate-spin" : ""
            }`}
          />
        </Button>
      </div>
      <div className="grid gap-6">
        <div className="flex flex-col lg:flex-row gap-4">
          <CurrentWeather
            data={weatherQuery.data ?? ({} as WeatherData)}
            locationName={locationName ?? ""}
          />
          <HourlyTemperature
            data={forecastQuery.data ?? ({} as ForecastData)}
          />
        </div>
        <div className="grid gap-2 md:grid-cols-2 items-start">
          <WeatherDetails data={weatherQuery.data ?? ({} as WeatherData)} />
          <WeatherForecast data={forecastQuery.data ?? ({} as ForecastData)} />
        </div>
      </div>
    </div>
  );
}

export default WeatherDashboard;
