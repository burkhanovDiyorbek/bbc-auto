import { Route, Routes } from "react-router-dom";
import { Layout } from "./components/Layout";
import { Home } from "./pages/Home/Home";
import { Catalog } from "./pages/Catalog/Catalog";
import { Credit } from "./pages/Credit/Credit";
import { About } from "./pages/About/About";
import "./app.css";
import Chat from "./pages/Chat/Chat";
import { Contact } from "./pages/Contact/Contact";
import { News } from "./pages/News/News";
import { NotFound } from "./pages/NotFound/NotFound";
import { SignUp } from "./pages/Auth/SignUp/SignUp";
import { Login } from "./pages/Auth/Login/Login";
import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import translationEn from "./locales/en.json";
import translationUz from "./locales/uz.json";
import translationRu from "./locales/ru.json";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

i18n.use(initReactI18next).init({
  resources: {
    en: { translation: translationEn },
    uz: { translation: translationUz },
    ru: { translation: translationRu },
  },
  lng: localStorage.getItem("i18lng") || "uz",
  fallbackLng: localStorage.getItem("i18lng") || "uz",
});

function App() {
  const changeLang = (value) => {
    i18n.changeLanguage(value);
    localStorage.setItem("i18lng", value);
  };
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout changeLang={changeLang} />}>
          <Route index element={<Home />} />
          <Route path="catalog" element={<Catalog />} />
          <Route path="credit" element={<Credit />} />
          <Route path="about" element={<About />} />
          <Route path="contact" element={<Contact />} />
          <Route path="chat" element={<Chat />} />
          <Route path="news" element={<News />} />
          <Route path="auth/signup" element={<SignUp />} />
          <Route path="auth/login" element={<Login />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
      <ToastContainer />
    </>
  );
}

export default App;
