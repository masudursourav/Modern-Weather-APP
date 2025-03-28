import { useSearchHistory } from "@/hooks/use-search-history";
import { useLocationSearch } from "@/hooks/use-weather";
import { CommandSeparator } from "cmdk";
import { format } from "date-fns";
import { Clock, Loader2, Search, XCircle } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "./ui/button";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "./ui/command";

function CitySearch() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const { data: locations, isLoading } = useLocationSearch(query);
  const { history, addSearchHistoryItem, clearSearchHistoryItem } =
    useSearchHistory();
  const navigate = useNavigate();
  const handleSelect = (cityData: string) => {
    const [lat, lon, name, country] = cityData.split("|");
    addSearchHistoryItem.mutate({
      query,
      name,
      country,
      lat: parseFloat(lat),
      lon: parseFloat(lon),
    });
    navigate(`/city/${name}?${country}??${lat}&${lon}`);
    setQuery("");
    setOpen(false);
  };
  return (
    <>
      <Button
        onClick={() => setOpen(true)}
        variant={"outline"}
        className="relative w-full rounded-3xl justify-start text-sm text-muted-foreground sm:pr-12 md:w-40 lg:w-64"
      >
        <Search className="h-6 w-6" />
        Search Cities ...
      </Button>
      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput
          placeholder="Search Cities..."
          value={query}
          onValueChange={setQuery}
        />
        <CommandList>
          {query.length > 2 && !!isLoading && (
            <CommandEmpty>No Cities Found...</CommandEmpty>
          )}
          <CommandGroup heading="Favorites">
            <CommandItem>Calendar</CommandItem>
          </CommandGroup>

          {history && history.length > 0 && (
            <>
              <CommandSeparator />
              <CommandGroup>
                <div className="flex justify-between items-center px-2 py-2">
                  <p className="text-xs text-muted-foreground">
                    Recent Searches
                  </p>
                  <Button
                    variant={"ghost"}
                    size={"sm"}
                    onClick={() => clearSearchHistoryItem.mutate()}
                  >
                    <XCircle className="h-4 w-4" />
                    Clear
                  </Button>
                </div>
                {history.map((location) => (
                  <CommandItem
                    key={`${location.lat}-${location.lon}`}
                    value={`${location.lat}|${location.lon}|${location.name}|${location.country}`}
                    onSelect={handleSelect}
                  >
                    <Clock className="mr-2 h-4 w-4 text-muted-foreground" />
                    <span>{location.name}</span>
                    {location.state && (
                      <span className="text-muted-foreground">
                        , {location.state}
                      </span>
                    )}
                    <span className="text-muted-foreground">
                      , {location.country}
                    </span>
                    <span className="text-muted-foreground">
                      , {format(location.searchedAt, "MMM dd, h:mm a")}
                    </span>
                  </CommandItem>
                ))}
              </CommandGroup>
            </>
          )}

          <CommandSeparator />
          {locations && locations.length > 0 && (
            <CommandGroup heading="Suggestions">
              {isLoading && (
                <div className="flex items-center justify-center p-4">
                  <Loader2 className="h-4 w-4 animate-spin" />
                </div>
              )}
              {locations.map((location) => (
                <CommandItem
                  key={`${location.lat}-${location.lon}`}
                  value={`${location.lat}|${location.lon}|${location.name}|${location.country}`}
                  onSelect={handleSelect}
                >
                  <Search className="mr-2 h-4 w-4" />
                  <span>{location.name}</span>
                  {location.state && (
                    <span className="text-muted-foreground">
                      , {location.state}
                    </span>
                  )}
                  <span className="text-muted-foreground">
                    , {location.country}
                  </span>
                </CommandItem>
              ))}
            </CommandGroup>
          )}
        </CommandList>
      </CommandDialog>
    </>
  );
}

export default CitySearch;
