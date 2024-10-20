import { Route, Routes } from "react-router-dom";
import { Layout } from "./components/Layout";
import { Home } from "./pages/Home/Home";
import { Catalog } from "./pages/Catalog/Catalog";
import { About } from "./pages/About/About";
import "./app.css";
import { Contact } from "./pages/Contact/Contact";
import { News } from "./pages/News/News";
import { NotFound } from "./pages/NotFound/NotFound";
import { SignUp } from "./pages/Auth/SignUp/SignUp";
import { Login } from "./pages/Auth/Login/Login";
import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import translationUz from "./locales/uz.json";
import translationRu from "./locales/ru.json";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useState } from "react";
import { Loader } from "./components/Loader";
import { CatalogCarInfo } from "./pages/CatalogCarInfo/CatalogCarInfo";
import { Credit } from "./pages/Credit/Credit";
import { Search } from "./pages/Search/Search";
import NewsAbout from "./pages/NewsAbout/NewsAbout";

i18n.use(initReactI18next).init({
  resources: {
    uz: { translation: translationUz },
    ru: { translation: translationRu },
  },
  lng: localStorage.getItem("i18lng") || "uz",
  fallbackLng: localStorage.getItem("i18lng") || "uz",
});

function App() {
  const [contentLoading, setContentLoading] = useState(false);
  const [q, setQ] = useState("");
  const changeLang = (value) => {
    i18n.changeLanguage(value);
    localStorage.setItem("i18lng", value);
  };

  document.body.style = contentLoading ? "overflow:hidden" : "overflow:auto";

  return (
    <>
      <Routes>
        <Route
          path="/"
          element={<Layout changeLang={changeLang} setQ={setQ} />}
        >
          <Route
            index
            element={<Home setContentLoading={setContentLoading} />}
          />
          <Route
            path="catalog"
            element={<Catalog setContentLoading={setContentLoading} />}
          />
          <Route
            path="credit"
            element={<Credit setContentLoading={setContentLoading} />}
          />
          <Route
            path="catalog/car/:id"
            element={<CatalogCarInfo setContentLoading={setContentLoading} />}
          />
          <Route
            path="about"
            element={<About setContentLoading={setContentLoading} />}
          />
          <Route
            path="contact"
            element={<Contact setContentLoading={setContentLoading} />}
          />
          <Route path="catalog/car/:id" element={<CatalogCarInfo />} />
          <Route
            path="news"
            element={<News setContentLoading={setContentLoading} />}
          />
          <Route
            path="news/:id"
            element={<NewsAbout setContentLoading={setContentLoading} />}
          />
          <Route
            path="auth/signup"
            element={<SignUp setContentLoading={setContentLoading} />}
          />
          <Route
            path="auth/login"
            element={<Login setContentLoading={setContentLoading} />}
          />
          <Route
            path="search"
            element={<Search setContentLoading={setContentLoading} q={q} />}
          />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
      <ToastContainer />
      {contentLoading && <Loader />}
    </>
  );
}

export default App;
