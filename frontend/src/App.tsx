import { Routes, Route } from "react-router";
import "./App.css";
import MainLayout from "./layouts/MainLayout";
import AboutPage from "./pages/AboutPage";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import RegistrierungPage from "./pages/RegistrierungPage";
import AdminBereichPage from "./pages/AdminBereichPage";
import ProtectedLayout from "./layouts/ProtectedLayout";
import AddAnimalPage
  from "./pages/AddAnimalPage";
import UserProfilePage from "./pages/UserProfilePage";  
import AnimalDetailPage from "./pages/AnimalDetailPage";
import SearchAnimalPage from "./pages/SearchAnimalPage";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<HomePage />} />
          <Route path="/tier-suchen" element={<SearchAnimalPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/details" element={<AnimalDetailPage />} />
          <Route path="/registrierung" element={<RegistrierungPage />} />
          <Route element={<ProtectedLayout />}>
            <Route path="/admin-bereich" element={<AdminBereichPage />} />
            <Route path="/tier-einstellen" element={<AddAnimalPage/>} />
            <Route path="/mein-konto" element={<UserProfilePage/>} />
          </Route>
        </Route>
      </Routes>
    </>
  );
}

export default App;
