import { BrowserRouter } from "react-router-dom";
import "./App.css";
import Layout from "./components/layout";

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <div className="App">
          <h1>React App</h1>
        </div>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
