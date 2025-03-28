import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useLocalStorage } from "./use-local-storage";
interface SearchHistoryItem {
  id: string;
  query: string;
  lat: number;
  lon: number;
  name: string;
  country: string;
  state?: string;
  searchedAt: number;
}

export function useSearchHistory() {
  const queryClient = useQueryClient();
  const [history, setHistory] = useLocalStorage<SearchHistoryItem[]>(
    "searchHistory",
    []
  );
  const historyQuery = useQuery({
    queryKey: ["searchHistory"],
    queryFn: () => {
      return history;
    },
    initialData: history,
  });

  const addSearchHistoryItem = useMutation({
    mutationFn: async (item: Omit<SearchHistoryItem, "id" | "searchedAt">) => {
      const newSearch: SearchHistoryItem = {
        ...item,
        id: Math.random().toString(36).substr(2, 9),
        searchedAt: Date.now(),
      };
      setHistory((prev) => [newSearch, ...prev].slice(0, 10));
      return newSearch;
    },
    onSuccess: () => {
      queryClient.setQueryData(["searchHistory"], history);
    },
  });

  const clearSearchHistoryItem = useMutation({
    mutationFn: async () => {
      setHistory([]);
      return [];
    },
    onSuccess: () => {
      queryClient.setQueryData(["searchHistory"], []);
    },
  });
  return {
    history: historyQuery.data,
    addSearchHistoryItem,
    clearSearchHistoryItem,
  };
}
