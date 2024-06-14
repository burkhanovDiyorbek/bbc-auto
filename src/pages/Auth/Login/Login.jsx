import { IMaskInput } from "react-imask";
import "../auth.css";
import { useEffect, useState } from "react";
import { Button } from "../../../components/Button/Button";
import { FaEyeSlash } from "react-icons/fa";
import { FaEye } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";

export const Login = () => {
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);
  const navigate = useNavigate();
  const { t } = useTranslation();
  useEffect(() => {}, []);
  const onSubmit = async (e) => {
    e.preventDefault();
    const data = {
      phone: phone.replaceAll(" ", ""),
      password: password,
    };
    try {
      await axios.post("http://bbc.mebel-zakaz.uz/users/token/", data);
      toast.success("Succesfully", { position: "top-center" });
      navigate("/");
    } catch (error) {
      toast.error(error.message, { position: "top-center" });
    }
  };
  return (
    <section className="auth-section">
      <div className="container">
        <h2>{t("login.top")}</h2>
        <form onSubmit={onSubmit}>
          <label>
            <p>{t("login.phone.title")}</p>
            <IMaskInput
              mask={"{+998} 00 000 00 00"}
              type="tel"
              placeholder={t("signup.phone.input_placeholder")}
              onChange={(e) => setPhone(e.target.value)}
            />
          </label>
          <label>
            <p>{t("login.password.title")}</p>
            <div>
              <input
                type={!showPass ? "password" : "text"}
                placeholder={t("signup.password.input_placeholder")}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button onClick={() => setShowPass((prev) => !prev)}>
                {showPass ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
          </label>
          <Button content={t('login.top')} classname="register" />
        </form>
        <p>
          {t("login.bottom.p")}{" "}
          <Link to={"/auth/signup"}>{t("login.bottom.link")}</Link>
        </p>
      </div>
    </section>
  );
};
