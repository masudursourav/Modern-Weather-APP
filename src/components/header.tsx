import { useTheme } from "@/contex/theme-provider";
import { Moon, Sun } from "lucide-react";
import { Link } from "react-router-dom";
import CitySearch from "./citySearch";
import { Button } from "./ui/button";

function Header() {
  const { theme, setTheme } = useTheme();
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur py-4 supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <div>
          <Link to={"/"} className="flex items-center space-x-4">
            <img src="/logo.png" alt="logo" className="h-14" />{" "}
            <span className="text-2xl"> Weather App</span>
          </Link>
        </div>
        <div className="flex items-center space-x-4">
          <CitySearch />
          <Button
            variant={"ghost"}
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className={`flex items-center transition-transform duration-500 ${
              theme === "dark" ? "rotate-180" : "rotate-0"
            }`}
          >
            {theme === "dark" ? (
              <Sun className="h-8 w-8 text-yellow-500 rotate-0 transition-all" />
            ) : (
              <Moon className="h-8 w-8 text-blue-500 rotate-0 transition-all" />
            )}
          </Button>
        </div>
      </div>
    </header>
  );
}

export default Header;
