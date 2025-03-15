import Link from "next/link";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/router";
import { logout } from "@/redux/slices/authSlice";
import {
  FaShoppingCart,
  FaBoxOpen,
  FaSignOutAlt,
  FaUser,
  FaUserPlus,
} from "react-icons/fa";

const Header = () => {
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();
  const router = useRouter();

  const handleLogout = () => {
    dispatch(logout());
    localStorage.removeItem("token");
    router.push("/login");
  };

  return (
    <nav className="navbar navbar-expand-lg shadow-sm fixed-top bg-primary">
      <div className="container">
        <Link className="navbar-brand text-white fw-bold" href="/">
          E-Commerce
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div
          className="collapse navbar-collapse justify-content-end"
          id="navbarNav"
        >
          <ul className="navbar-nav align-items-center">
            {!user ? (
              <>
                <li className="nav-item">
                  <Link className="nav-link text-white" href="/login">
                    <FaUser className="me-1" /> Login
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link text-white" href="/register">
                    <FaUserPlus className="me-1" /> Register
                  </Link>
                </li>
              </>
            ) : (
              <>
                <li className="nav-item">
                  <Link className="nav-link nav-hover" href="/cart">
                    <FaShoppingCart className="me-1" /> Cart
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link nav-hover" href="/orders">
                    <FaBoxOpen className="me-1" /> Orders
                  </Link>
                </li>
                <li className="nav-item">
                  <button
                    className="btn btn-outline-light ms-2"
                    onClick={handleLogout}
                  >
                    <FaSignOutAlt className="me-1" /> Logout
                  </button>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Header;
