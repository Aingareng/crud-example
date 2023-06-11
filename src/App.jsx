import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import ToggleProvider from "./context/togglePopUp";
import ProductProvider from "./context/product";
import ToggleModeProvider from "./context/toggleMode";
import FieldValueProvider from "./context/fieldValue";
import SearchProvider from "./context/searchContext";

function App() {
  return (
    <ToggleProvider>
      <ProductProvider>
        <ToggleModeProvider>
          <FieldValueProvider>
            <SearchProvider>
              <Router>
                <Routes>
                  <Route path="/" element={<Home />} />
                </Routes>
              </Router>
            </SearchProvider>
          </FieldValueProvider>
        </ToggleModeProvider>
      </ProductProvider>
    </ToggleProvider>
  );
}

export default App;
