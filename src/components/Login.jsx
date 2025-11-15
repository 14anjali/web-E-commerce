import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Eye, EyeOff, Lock, Mail } from "lucide-react";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    setError("");

    const users = JSON.parse(localStorage.getItem("users")) || [];

    const foundUser = users.find(
      (user) => user.email === email && user.password === password
    );

    if (!foundUser) {
      setError("Invalid email or password");
      return;
    }

    // 🔥 SAVE CURRENT USER SO WE KNOW WHO IS LOGGED IN
    localStorage.setItem("currentUser", JSON.stringify(foundUser));

    // 🔥 LOAD THIS USER'S CART & WISHLIST
    const userCart = JSON.parse(localStorage.getItem(`cart_${foundUser.email}`)) || [];
    const userWishlist = JSON.parse(localStorage.getItem(`wishlist_${foundUser.email}`)) || [];

    localStorage.setItem("cartItems", JSON.stringify(userCart));
    localStorage.setItem("wishlist", JSON.stringify(userWishlist));

    // 🔥 Save fake JWT token
    localStorage.setItem("token", "fake-jwt-token");

    navigate("/");
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 px-4">
      <div className="w-full max-w-md bg-white p-8 rounded-xl shadow-lg">
        <h2 className="text-2xl font-bold text-center mb-6">
          Login to Your Account
        </h2>

        {error && (
          <div className="mb-4 bg-red-100 text-red-700 p-2 rounded text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-5">
          {/* Email */}
          <div>
            <label className="block mb-1 font-medium">Email</label>
            <div className="flex items-center border rounded-lg px-3 py-2">
              <Mail className="w-5 h-5 text-gray-400" />
              <input
                type="email"
                placeholder="Enter email"
                className="w-full ml-2 outline-none"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
          </div>

          {/* Password */}
          <div>
            <label className="block mb-1 font-medium">Password</label>
            <div className="flex items-center border rounded-lg px-3 py-2">
              <Lock className="w-5 h-5 text-gray-400" />

              <input
                type={showPass ? "text" : "password"}
                placeholder="Enter password"
                className="w-full ml-2 outline-none"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />

              <button
                type="button"
                className="ml-2"
                onClick={() => setShowPass(!showPass)}
              >
                {showPass ? (
                  <EyeOff className="w-5 h-5 text-gray-500" />
                ) : (
                  <Eye className="w-5 h-5 text-gray-500" />
                )}
              </button>
            </div>
          </div>

          {/* Login */}
          <button
            type="submit"
            className="w-full py-2 bg-purple-600 text-white rounded-lg font-medium
            hover:bg-purple-700 transition"
          >
            Login
          </button>
        </form>

        {/* Signup Link */}
        <p className="text-center mt-4 text-sm">
          Don’t have an account?{" "}
          <Link to="/signup" className="text-purple-600 hover:underline">
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
}
