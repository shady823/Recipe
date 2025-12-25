import { HashRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Copyright from "./components/Copyright";
import Home from "./pages/Home";
import RecipeDetails from "./pages/RecipeDetails";
import CategoryPage from "./pages/CategoryPage";
import Ingredients from "./pages/Ingredients";
import IngredientsPage from "./pages/IngredientsPage";
import Area from "./pages/Area";
import AreaPage from "./pages/AreaPage";

function App() {
  return (
    <Router>
      <Navbar />
      <div className="flex flex-col min-h-screen">
        <main className="flex-grow pt-20 md:pt-14 pb-24 bg-[#F4F2EE] dark:bg-gray-900 ">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/meal/:id" element={<RecipeDetails />} />
            <Route path="/category/:name" element={<CategoryPage />} />
            <Route path="/ingredients" element={<Ingredients />} />
            <Route path="/ingredients/:name" element={<IngredientsPage />} />
            <Route path="/area" element={<Area />} />
            <Route path="/area/:name" element={<AreaPage />} />
          </Routes>
        </main>

        <Footer />
        <Copyright />
      </div>
    </Router>
  );
}

export default App;
