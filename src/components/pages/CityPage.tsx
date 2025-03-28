import { ForecastData, WeatherData } from "@/api/types";
import { useForecastQuery, useWeatherQuery } from "@/hooks/use-weather";
import { AlertCircle } from "lucide-react";
import { useParams, useSearchParams } from "react-router-dom";
import CurrentWeather from "../currentWeather";
import HourlyTemperature from "../hourlyTemperature";
import WeatherSkeleton from "../loading-skeleton";
import { Alert, AlertDescription, AlertTitle } from "../ui/alert";
import WeatherDetails from "../weatherDetails";
import WeatherForecast from "../weatherForecast";

function CityPage() {
  const [searchParams] = useSearchParams();
  const params = useParams();
  const lat = parseFloat(searchParams.get("lat") || "0");
  const lon = parseFloat(searchParams.get("lon") || "0");
  const coordinates = { lat, lon };
  const weatherQuery = useWeatherQuery(coordinates);
  const forecastQuery = useForecastQuery(coordinates);

  if (weatherQuery.isError || forecastQuery.isError) {
    return (
      <Alert variant="destructive">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>
          Opps! A Error Occur While Getting Your Weather Ready.
        </AlertTitle>
        <AlertDescription className="flex flex-col gap-4">
          <p>Something went wrong while fetching weather data.</p>
        </AlertDescription>
      </Alert>
    );
  }
  console.log(params.cityName);
  if (weatherQuery.isLoading || forecastQuery.isLoading || !params.cityName) {
    return <WeatherSkeleton />;
  }
  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold tracking-tight">{params.cityName}</h1>
      </div>
      <div className="grid gap-6">
        <div className="flex flex-col gap-4">
          <CurrentWeather data={weatherQuery.data ?? ({} as WeatherData)} />
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

export default CityPage;
