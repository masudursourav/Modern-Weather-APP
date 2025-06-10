import { ThemeProvider } from "@/context/theme-provider";
import Header from "./header";

function Layout({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider defaultTheme="dark">
      <div className="bg-gradient-to-br from-background to-muted">
        <Header />
        <main className="min-h-screen container mx-auto px-4 py-8">
          {children}
        </main>
        <footer className="border-t-4 backdrop-blur supports-[backdrop-filter]:bg-background/60">
          <div className="container mx-auto px-4 py-8 text-center text-gray-400">
            <p>Made By MasudurSourav {new Date().getFullYear()}</p>
          </div>
        </footer>
      </div>
    </ThemeProvider>
  );
}

export default Layout;
