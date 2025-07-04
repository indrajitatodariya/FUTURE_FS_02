import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

export default function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('http://localhost:5000/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();

      if (res.ok) {
        alert('Registered successfully! Please check your email to verify.');
        navigate('/');
      } else {
        alert(data.message);
      }
    } catch (err) {
      console.error(err);
      alert('Server error');
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gradient-to-br from-white via-gray-100 to-white relative overflow-hidden">

      {/* Decorative glow circle */}
      <div className="absolute w-[500px] h-[500px] bg-gradient-to-r from-blue-300 to-purple-300 rounded-full blur-3xl opacity-30 animate-pulse"></div>

      {/* Decorative ring */}
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
          Register
        </h1>
        <p className="text-center text-gray-600 mb-6">
          After registering, click below and login to your account.
        </p>

        <form onSubmit={handleRegister} className="flex flex-col gap-4">
          <label className="label">Email</label>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="input input-bordered w-full"
          />
          <label className="label">Password</label>
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="input input-bordered w-full"
          />
          <div className="flex justify-end text-sm">
            <a className="link link-hover">Forgot password?</a>
          </div>
          <button className="btn btn-primary bg-gradient-to-r from-blue-500 to-purple-500 border-none text-white w-full" type="submit">
            Register
          </button>
        </form>

        <div className="mt-6 text-center">
          <Link to="/verify-notice" className="btn btn-outline btn-primary">
            Verify
          </Link>
        </div>
      </div>
    </div>
  );
}
