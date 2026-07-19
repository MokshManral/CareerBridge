import { useState } from "react";
import { signup } from "../services/authService";
import { Link, useNavigate } from "react-router-dom";

function Signup() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    username: "",
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

    if (!form.username.trim()) {
      newErrors.username = "Username is required";
    }

    if (!form.email.trim()) {
      newErrors.email = "Email is required";
    } else {
      const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

      if (!regex.test(form.email)) {
        newErrors.email = "Invalid email format";
      }
    }

    if (!form.password) {
      newErrors.password = "Password is required";
    } else if (form.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validate()) return;

    setLoading(true);

    try {
      await signup(form);

      alert("Signup successful!");

      navigate("/login");

    } catch (err) {

      if (!err.response) {
        setServerError("Can't reach server.");
      }

      else if (err.response.status === 409) {
        setServerError(err.response.data.detail);
      }

      else {
        setServerError("Something went wrong.");
      }

    } finally {
      setLoading(false);
    }
  };

  return (
    <div>

      <h2>Signup</h2>

      <form onSubmit={handleSubmit}>

        <input
          name="username"
          placeholder="Username"
          value={form.username}
          onChange={handleChange}
        />
        <p>{errors.username}</p>

        <input
          name="email"
          type="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
        />
        <p>{errors.email}</p>

        <input
          name="password"
          type="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
        />
        <p>{errors.password}</p>

        <p>{serverError}</p>

        <button
          disabled={
            loading ||
            !form.username ||
            !form.email ||
            !form.password
          }
        >
          {loading ? "Creating..." : "Signup"}
        </button>

      </form>

      <p>
        Already have an account?
        <Link to="/login"> Login</Link>
      </p>

    </div>
  );
}

export default Signup;