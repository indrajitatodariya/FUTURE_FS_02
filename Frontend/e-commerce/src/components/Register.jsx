import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

export default function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);
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
        alert(data.message || 'Registration failed');
      }
    } catch (err) {
      console.error('Registration error:', err);
      alert('Server error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gradient-to-br from-white via-gray-100 to-white relative overflow-hidden">
      
      {/* Background glow */}
      <div className="absolute w-[500px] h-[500px] bg-gradient-to-r from-blue-300 to-purple-300 rounded-full blur-3xl opacity-30 animate-pulse" />

      {/* Decorative SVG ring */}
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
          <label className="label" htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="input input-bordered w-full"
            aria-label="Email address"
          />

          <label className="label" htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            placeholder="Create a password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="input input-bordered w-full"
            aria-label="Password"
          />

          <div className="flex justify-end text-sm">
            <a className="link link-hover cursor-pointer">Forgot password?</a>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="btn btn-primary bg-gradient-to-r from-blue-500 to-purple-500 border-none text-white w-full"
          >
            {loading ? 'Registering...' : 'Register'}
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
