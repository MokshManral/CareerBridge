import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { login, getCurrentUser } from "../services/authService";
import { useAuth } from "../context/AuthContext";
import { setAccessToken } from "../api/token";

function Login() {

  const navigate = useNavigate();

  const { login: authLogin } = useAuth();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({});
  const [serverError, setServerError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {

    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });

    setErrors({
      ...errors,
      [e.target.name]: "",
    });

    setServerError("");
  };

  const validate = () => {

    const newErrors = {};

    if (!form.email.trim()) {
      newErrors.email = "Email is required";
    }

    else {

      const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

      if (!regex.test(form.email)) {
        newErrors.email = "Invalid email";
      }

    }

    if (!form.password.trim()) {
      newErrors.password = "Password is required";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    if (!validate()) return;

    setLoading(true);

    try {

      const tokenResponse = await login(form);

      setAccessToken(tokenResponse.access_token);

      const currentUser = await getCurrentUser();

      authLogin(
        tokenResponse.access_token,
        currentUser
      );

      navigate("/dashboard");

    }

    catch (err) {

      if (!err.response) {
        setServerError("Can't reach server.");
      }

      else if (err.response.status === 401) {
        setServerError("Invalid email or password.");
      }

      else {
        setServerError("Something went wrong.");
      }

    }

    finally {
      setLoading(false);
    }

  };

  return (

    <div>

      <h2>Login</h2>

      <form onSubmit={handleSubmit}>

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
        />

        <p>{errors.email}</p>

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
        />

        <p>{errors.password}</p>

        <p>{serverError}</p>

        <button
          disabled={
            loading ||
            !form.email ||
            !form.password
          }
        >
          {loading ? "Logging in..." : "Login"}
        </button>

      </form>

      <p>
        Don't have an account?
        <Link to="/signup">
          Signup
        </Link>
      </p>

    </div>

  );

}

export default Login;