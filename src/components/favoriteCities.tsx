import { useFavorite } from "@/hooks/use-favorite";
import { useEffect } from "react";
import FavoriteCityBadge from "./favoriteCityBadge";
import { ScrollArea, ScrollBar } from "./ui/scroll-area";

function FavoriteCities() {
  const { favorites, clearFavoriteItem, refetchFavorites } = useFavorite();
  useEffect(() => {
    refetchFavorites();
  }, [refetchFavorites]);
  if (!favorites?.length) {
    return null;
  }
  return (
    <>
      <h1 className="text-xl font-bold tracking-tight"> Favorites </h1>
      <ScrollArea className="w-full pb-4">
        <div className="flex gap-4">
          {favorites.map((city) => (
            <FavoriteCityBadge
              key={city.id}
              {...city}
              onRemove={() => clearFavoriteItem.mutate(city.id)}
            />
          ))}
        </div>
        <ScrollBar orientation="horizontal" className="mt-2" />
      </ScrollArea>
    </>
  );
}

export default FavoriteCities;
