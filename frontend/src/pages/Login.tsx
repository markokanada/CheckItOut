import React, { Component, FormEvent, ChangeEvent } from "react";
import { makeObservable, observable, action, computed } from "mobx";
import { NavigateFunction } from "react-router-dom";
import "./css/Login.css";
import ViewComponent from "../interfaces/ViewComponent";

export default class Login implements ViewComponent {
    formData = {
        email: "",
        password: "",
    };

    errors: { [key: string]: string } = {};

    constructor(public navigate: NavigateFunction) {
        makeObservable(this, {
            formData: observable,
            errors: observable,
            handleChange: action,
            isValidForm: computed,
            handleSubmit: action
        });
    }

    @action handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        this.formData[e.target.name as keyof typeof this.formData] = e.target.value;
    };

    @computed get isValidForm() {
        const newErrors: { [key: string]: string } = {};
        if (!this.formData.email.includes("@")) newErrors.email = "Érvényes e-mail szükséges!";
        if (this.formData.password.length < 6) newErrors.password = "A jelszónak legalább 6 karakterből kell állnia!";
        
        this.errors = newErrors;
        return Object.keys(newErrors).length === 0;
    }

    @action handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        if (this.isValidForm) {
            alert("Sikeres bejelentkezés!");
            this.navigate("/");
        }
    };

    View = () => (
        <div className="login-container">
            <h1>Bejelentkezés</h1>
            <form onSubmit={this.handleSubmit}>
                <div className="form-group">
                    <label>E-mail</label>
                    <input
                        type="email"
                        name="email"
                        value={this.formData.email}
                        onChange={this.handleChange}
                    />
                    {this.errors.email && <span className="error">{this.errors.email}</span>}
                </div>

                <div className="form-group">
                    <label>Jelszó</label>
                    <input
                        type="password"
                        name="password"
                        value={this.formData.password}
                        onChange={this.handleChange}
                    />
                    {this.errors.password && <span className="error">{this.errors.password}</span>}
                </div>

                <button type="submit">Bejelentkezés</button>
            </form>

            <p>
                Még nincs fiókod?{" "}
                <span className="register-link" onClick={() => this.navigate("/register")}>
                    Regisztrálj itt
                </span>
            </p>
        </div>
    );
}