import { WeatherData } from "@/api/types";
import { useFavorite } from "@/hooks/use-favorite";
import { Star } from "lucide-react";
import { toast } from "sonner";
import { Button } from "./button";

function FavoriteButton({ data }: { data: WeatherData }) {
  const { addFavoriteItem, clearFavoriteItem, isFavorite } = useFavorite();
  const isCurrentCityFavorite = isFavorite(data.coord.lat, data.coord.lon);
  const handleToggleFavorite = () => {
    if (isCurrentCityFavorite) {
      clearFavoriteItem.mutate(`${data.coord.lat}-${data.coord.lon}`);
      toast.error(`Removed ${data.name} from your favorite cities list.`, {
        description: "You can add it back anytime.",
      });
    } else {
      addFavoriteItem.mutate({
        name: data.name,
        lat: data.coord.lat,
        lon: data.coord.lon,
        country: data.sys.country,
      });
      toast.success(`Added ${data.name} to your favorite cities list.`, {
        description: "You can remove it anytime.",
      });
    }
  };
  return (
    <>
      <Button
        variant={isCurrentCityFavorite ? "default" : "outline"}
        size={"icon"}
        className={`${
          isCurrentCityFavorite ? "bg-yellow-500 hover:bg-yellow-600" : ""
        }`}
        onClick={handleToggleFavorite}
      >
        <Star
          className={`h-4 w-4 ${isCurrentCityFavorite ? "fill-current" : ""}`}
        />
      </Button>
    </>
  );
}

export default FavoriteButton;
