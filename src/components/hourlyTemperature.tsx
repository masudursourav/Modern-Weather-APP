import { ForecastData } from "@/api/types";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";

function HourlyTemperature({ data }: { data: ForecastData }) {
  return (
    <Card className="flex-1">
      <CardHeader>
        <CardTitle>Hourly Temperature</CardTitle>
      </CardHeader>
      <CardContent></CardContent>
    </Card>
  );
}

export default HourlyTemperature;
