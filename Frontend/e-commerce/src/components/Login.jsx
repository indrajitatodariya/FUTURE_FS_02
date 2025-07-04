import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../AuthContext';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();
      if (res.ok && data.token && data.userId) {
        login(data.token, data.userId);
        navigate("/main");
      } else {
        alert(data.message || "Login failed");
      }
    } catch (err) {
      console.error("Login error:", err);
      alert("Login error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gradient-to-br from-white via-gray-100 to-white relative overflow-hidden">


      <div className="absolute w-[500px] h-[500px] bg-gradient-to-r from-blue-300 to-purple-300 rounded-full blur-3xl opacity-30 animate-pulse"></div>

      <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
        <svg viewBox="0 0 600 600" className="w-full h-full">
          <defs>
            <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#60a5fa" />
              <stop offset="100%" stopColor="#c084fc" />
            </linearGradient>
          </defs>
          <circle
            cx="300"
            cy="300"
            r="220"
            stroke="url(#grad)"
            strokeWidth="4"
            fill="none"
            className="animate-spin-slow"
          />
        </svg>
      </div>

      <div className="relative bg-white/60 backdrop-blur-md p-8 rounded-xl shadow-xl w-full max-w-md z-10">
        <h1 className="text-3xl font-bold mb-6 text-center bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
          Login
        </h1>
        <p className="text-center text-gray-600 mb-6">
          Login with your registered email and password.
        </p>

        <form onSubmit={handleLogin}>
          <label className="label">Email</label>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="input input-bordered w-full mb-4"
          />
          <label className="label">Password</label>
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="input input-bordered w-full mb-2"
          />
          <div className="flex justify-end mb-4">
            <a className="link link-hover text-sm">Forgot password?</a>
          </div>
          <button
            className="btn btn-primary w-full bg-gradient-to-r from-blue-500 to-purple-500 border-none text-white"
            type="submit"
            disabled={loading}
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        <p className="mt-4 text-center text-gray-600">
          Not registered yet?{" "}
          <Link to="/register" className="text-blue-500 font-medium hover:underline">
            Register
          </Link>
        </p>
      </div>
    </div>
  );
}
