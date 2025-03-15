import { useState } from "react";
import { useDispatch } from "react-redux";
import { useRouter } from "next/router";
import apiClient from "../api/apiClient";
import { loginSuccess } from "@/redux/slices/authSlice";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import Link from "next/link";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const { data } = await apiClient.post("/auth/login", { email, password });
      dispatch(loginSuccess(data));
      localStorage.setItem("token", data.token);
      router.push("/");
    } catch (err) {
      console.log(err);
      setError(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="container d-flex justify-content-center align-items-center vh-100">
      <div className="card p-4 shadow-sm" style={{ width: "400px" }}>
        <h3 className="text-center text-primary mb-3">Login</h3>
        {error && <p className="text-danger text-center">{error}</p>}
        <form onSubmit={handleLogin}>
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
          <div className="mb-3 position-relative">
            <input
              type={showPassword ? "text" : "password"}
              className="form-control"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <span
              className="position-absolute top-50 end-0 translate-middle-y me-3"
              style={{ cursor: "pointer" }}
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>
          <button className="btn btn-primary w-100">Login</button>
        </form>
        <p className="text-center mt-3">
          New User?{" "}
          <Link className="text-primary fw-bold" href="/register">
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
