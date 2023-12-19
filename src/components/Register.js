import React from "react";
import { Navigate, Link } from "react-router-dom";
import { useState } from "react";

function Register({ registrationUser }) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    function handleSubmit(event) {
        event.preventDefault();
        registrationUser(email, password);
    }

    return (
        <main className="content">
            <section className="auth">
                <h2 className="auth__title">Register</h2>
                <form onSubmit={handleSubmit} className="auth__form">
                    <input
                        id="email"
                        name="email"
                        type="email"
                        placeholder="Email"
                        value={email}
                        minLength={3}
                        className="auth__input"
                        onChange={(e) => setEmail(e.target.value)}
                    />

                    <input
                        id="password"
                        name="password"
                        type="password"
                        placeholder="Пароль"
                        value={password}
                        minLength={3}
                        className="auth__input"
                        onChange={(e) => setPassword(e.target.value)}
                    />

                    <button type="submit" className="auth__button">
                        Register
                    </button>
                    <Link to="/sign-in" className="auth__link">
                        Already have an account? Login
                    </Link>
                </form>
            </section>
        </main>
    );
}

export default Register;
