import { useState } from "react";
import { useRouter } from "next/router";
import apiClient from "../api/apiClient";
import Link from "next/link";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await apiClient.post("/auth/register", { name, email, password });
      router.push("/login");
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed");
    }
  };

  return (
    <div className="container d-flex justify-content-center align-items-center vh-100">
      <div className="card p-4 shadow-sm" style={{ width: "400px" }}>
        <h3 className="text-center text-primary mb-3">Create an Account</h3>
        {error && <p className="text-danger text-center">{error}</p>}
        <form onSubmit={handleRegister}>
          <div className="mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Full Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <input
              type="email"
              className="form-control"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <input
              type="password"
              className="form-control"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button className="btn btn-primary w-100">Register</button>
        </form>
        <p className="text-center mt-3">
          Already have an account?
          <Link className="text-primary fw-bold" href="/login">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
