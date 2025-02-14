import { useGeolocation } from "@/hooks/use-geolocation";
import { AlertCircle, MapPin, RefreshCw } from "lucide-react";
import WeatherSkeleton from "../loading-skeleton";
import { Alert, AlertDescription, AlertTitle } from "../ui/alert";
import { Button } from "../ui/button";

function WeatherDashboard() {
  const {
    coordinates,
    error: locationError,
    getLocation,
    isLoading: locationLoading,
  } = useGeolocation();
  const handleRefresh = () => {
    getLocation();
    if (coordinates) {
      //refresh weather data
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
  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h1 className="text-xl font-bold tracking-tight">My Location</h1>
        <Button
          variant={"outline"}
          size={"icon"}
          onClick={handleRefresh} //disabled={loading}
        >
          <RefreshCw className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}

export default WeatherDashboard;
