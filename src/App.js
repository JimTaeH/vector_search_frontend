import { BrowserRouter, Routes, Route } from "react-router-dom";

import './App.css';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.bundle';
import MyNavBar from './components/Navbar';
import PriceComparison from "./pages/PriceComparison";
import Home from "./pages/Home";
import SearchResults from "./pages/SearchResults";

function App() {
  return (
    <div style={{backgroundColor: "#151515"}}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MyNavBar />}>
            <Route index element={<Home />} />
            <Route path="comparison" element={<PriceComparison />} />
            <Route path="searchresults" element={<SearchResults />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
