import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import axios from "axios";

axios.defaults.baseURL = "http://bbc.mebel-zakaz.uz";
axios.defaults.headers.common["Accept-Language"] =
  localStorage.getItem("i18lng") || "uz";
  
ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);
