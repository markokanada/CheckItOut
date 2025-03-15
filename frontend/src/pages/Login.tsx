import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./css/Login.css";

const Login: React.FC = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });

    const [errors, setErrors] = useState<{ [key: string]: string }>({});

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const validateForm = () => {
        let newErrors: { [key: string]: string } = {};
        if (!formData.email.includes("@")) newErrors.email = "Érvényes e-mail szükséges!";
        if (formData.password.length < 6) newErrors.password = "A jelszónak legalább 6 karakterből kell állnia!";
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (validateForm()) {
            alert("Sikeres bejelentkezés!");
            navigate("/");
        }
    };

    return (
        <div className="login-container">
            <h1>Bejelentkezés</h1>
            <form onSubmit={handleSubmit}>
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

                <button type="submit">Bejelentkezés</button>
            </form>

            <p>Még nincs fiókod? <span className="register-link" onClick={() => navigate("/register")}>Regisztrálj itt</span></p>
        </div>
    );
};

export default Login;
