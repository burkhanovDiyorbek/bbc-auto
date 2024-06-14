import { IMaskInput } from "react-imask";
import "../auth.css";
import { useState } from "react";
import { Button } from "../../../components/Button/Button";
import { FaEyeSlash } from "react-icons/fa";
import { FaEye } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";

export const SignUp = () => {
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [fullname, setFullname] = useState(false);
  const [email, setEmail] = useState(false);
  const [password2, setPassword2] = useState(false);
  const { t } = useTranslation();
  const navigate = useNavigate();

  const onSubmit = async (e) => {
    e.preventDefault();
    const data = {
      full_name: fullname,
      phone: phone.replaceAll(" ", ""),
      password: password,
      email: email,
      password2: password2,
    };
    try {
      await axios.post("http://bbc.mebel-zakaz.uz/users/register/", data);
      toast.success("Succesfully", { position: "top-center" });
      navigate("/auth/login");
    } catch (error) {
      toast.error(error.message, { position: "top-center" });
      console.log(error.message);
    }
  };

  return (
    <section className="auth-section">
      <div className="container">
        <h2>{t("signup.top")}</h2>
        <form onSubmit={onSubmit}>
          <label>
            <p>{t("signup.full_name.title")}</p>
            <input
              type="name"
              required
              placeholder={t("signup.full_name.input_placeholder")}
              onInput={(e) => setFullname(e.target.value)}
            />
          </label>
          <label>
            <p>{t("signup.phone.title")}</p>
            <IMaskInput
              mask={"{+998} 00 000 00 00"}
              type="tel"
              placeholder="+998 00 000 00 00"
              onChange={(e) => setPhone(e.target.value)}
              required
            />
          </label>
          <label>
            <p>{t("signup.email.title")}</p>
            <input
              type="email"
              required
              placeholder={t("signup.email.input_placeholder")}
              onInput={(e) => setEmail(e.target.value)}
            />
          </label>
          <label>
            <p>{t("signup.password.title")}</p>
            <div>
              <input
                required
                type={!showPass ? "password" : "text"}
                placeholder={t("signup.password.input_placeholder")}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button onClick={() => setShowPass((prev) => !prev)}>
                {showPass ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
          </label>
          <label>
            <p>{t("signup.password2.title")}</p>
            <input
              placeholder={t("signup.password2.input_placeholder")}
              type="password"
              onInput={(e) => setPassword2(e.target.value)}
            />
          </label>
          <Button content={t("signup.top")} classname="register" />
        </form>
        <p>
          {t("signup.bottom.p")}{" "}
          <Link to={"/auth/login"}>{t("signup.bottom.link")}</Link>
        </p>
      </div>
    </section>
  );
};
