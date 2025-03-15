import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./css/Register.css";

const Register: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    let newErrors: { [key: string]: string } = {};
    if (!formData.fullName) newErrors.fullName = "Név megadása kötelező!";
    if (!formData.email.includes("@")) newErrors.email = "Érvényes e-mail szükséges!";
    if (formData.password.length < 6) newErrors.password = "A jelszónak legalább 6 karakterből kell állnia!";
    if (formData.password !== formData.confirmPassword) newErrors.confirmPassword = "A jelszavak nem egyeznek!";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      alert("Sikeres regisztráció!");
      navigate("/");
    }
  };

  return (
    <div className="register-container">
      <h1>Regisztráció</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Név</label>
          <input type="text" name="fullName" value={formData.fullName} onChange={handleChange} />
          {errors.fullName && <span className="error">{errors.fullName}</span>}
        </div>

        <div className="form-group">
          <label>E-mail</label>
          <input type="email" name="email" value={formData.email} onChange={handleChange} />
          {errors.email && <span className="error">{errors.email}</span>}
        </div>

        <div className="form-group">
          <label>Jelszó</label>
          <input type="password" name="password" value={formData.password} onChange={handleChange} />
          {errors.password && <span className="error">{errors.password}</span>}
        </div>

        <div className="form-group">
          <label>Jelszó megerősítése</label>
          <input type="password" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} />
          {errors.confirmPassword && <span className="error">{errors.confirmPassword}</span>}
        </div>

        <button type="submit">Regisztráció</button>
      </form>
    </div>
  );
};

export default Register;
