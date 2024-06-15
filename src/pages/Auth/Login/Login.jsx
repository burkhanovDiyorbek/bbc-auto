import { IMaskInput } from "react-imask";
import { useEffect, useState } from "react";
import { Button } from "../../../components/Button/Button";
import { FaEyeSlash } from "react-icons/fa";
import { FaEye } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";
import "../auth.css";

export const Login = () => {
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { t } = useTranslation();

  useEffect(() => {
    localStorage.getItem("token") && navigate("/");
  }, []);

  const onSubmit = (e) => {
    const fetchData = async () => {
      e.preventDefault();
      setIsLoading(true);
      const data = {
        phone: phone.replaceAll(" ", ""),
        password: password,
      };
      try {
        const req = await axios.post("/users/token/", data);
        localStorage.setItem("token", req.data.access);
        toast.success("Succesfully", { position: "top-center" });
        navigate("/");
      } catch (error) {
        toast.error(error.message, { position: "top-center" });
      }
      setIsLoading(false);
    };
    fetchData();
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
              <div onClick={() => setShowPass((prev) => !prev)}>
                {showPass ? <FaEyeSlash /> : <FaEye />}
              </div>
            </div>
          </label>
          <Button
            content={t("login.top")}
            classname="register"
            isLoading={isLoading}
          />
        </form>
        <p>
          {t("login.bottom.p")}{" "}
          <Link to={"/auth/signup"}>{t("login.bottom.link")}</Link>
        </p>
      </div>
    </section>
  );
};
