import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function SignUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSignUp = (e) => {
    e.preventDefault();

    // Simple validation
    if (!email || !password) {
      alert("Please enter email and password");
      return;
    }

    // Check if a user already exists in localStorage
    const users = JSON.parse(localStorage.getItem("users")) || [];

    const userExists = users.find((user) => user.email === email);

    if (userExists) {
      alert("User already exists. Please login.");
      return;
    }

    // Add new user to localStorage
    users.push({ email, password });
    localStorage.setItem("users", JSON.stringify(users));

    alert("Account created successfully!");
    navigate("/login"); // redirect to login page
  };

  return (
    <div className="max-w-sm mx-auto mt-20 p-6 border rounded shadow">
      <h2 className="text-xl font-bold mb-4">Sign Up</h2>
      <form onSubmit={handleSignUp} className="flex flex-col gap-3">
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="p-2 border rounded"
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="p-2 border rounded"
          required
        />
        <button
          type="submit"
          className="p-2 bg-purple-600 text-white rounded hover:bg-purple-700"
        >
          Sign Up
        </button>
      </form>
    </div>
  );
}
