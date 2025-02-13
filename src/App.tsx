import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Layout from "./components/layout";
import CityPage from "./components/pages/CityPage";
import WeatherDashboard from "./components/pages/WeatherDashboard";

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<WeatherDashboard />} />
          <Route path="city/:cityName" element={<CityPage />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
