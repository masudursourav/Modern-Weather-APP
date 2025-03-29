import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useLocalStorage } from "./use-local-storage";
interface FavoriteItem {
  id: string;
  name: string;
  lat: number;
  lon: number;
  country: string;
  state?: string;
  addedAt: number;
}

export function useFavorite() {
  const queryClient = useQueryClient();
  const [favorites, setFavorites] = useLocalStorage<FavoriteItem[]>(
    "favoriteCities",
    []
  );
  const favoriteQuery = useQuery({
    queryKey: ["favoriteCities"],
    queryFn: () => {
      return favorites;
    },
    initialData: favorites,
  });

  const addFavoriteItem = useMutation({
    mutationFn: async (item: Omit<FavoriteItem, "id" | "addedAt">) => {
      const newCity: FavoriteItem = {
        ...item,
        id: `${item.lat}-${item.lon}`,
        addedAt: Date.now(),
      };
      setFavorites((prev) => [newCity, ...prev].slice(0, 10));
      return newCity;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: "favoriteCities" });
    },
  });

  const clearFavoriteItem = useMutation({
    mutationFn: async (cityId: string) => {
      const newFavorites = favorites.filter((city) => city.id !== cityId);
      setFavorites(newFavorites);
      return newFavorites;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["favoriteCities"] });
    },
  });
  return {
    favorites: favoriteQuery.data,
    addFavoriteItem,
    refetchFavorites: favoriteQuery.refetch,
    clearFavoriteItem,
    isFavorite: (lat: number, lon: number) => {
      return favorites.some((item) => item.lat === lat && item.lon === lon);
    },
  };
}
