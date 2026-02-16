//setup react router declarative
import { Routes, Route } from "react-router";
import Home from "./pages/home";
import About from "./pages/about";
import Search from "./pages/search";
import Property from "./pages/property";
import NotFound from "./pages/NotFound";
import MainLayout from "./layout/MainLayout";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route element={<MainLayout />}>
        <Route path="/about" element={<About />} />
        <Route path="/search" element={<Search />} />
        <Route path="/property/:propertyId" element={<Property />} />
      </Route>
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
