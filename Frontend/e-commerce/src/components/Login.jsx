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
    <div
      className="hero min-h-screen"
      style={{
        backgroundImage: "url(https://i.pinimg.com/736x/ef/a5/19/efa519f959ffd532ee69c9deddccd3d1.jpg)"
      }}
    >
      <div className="hero min-h-screen">
        <div className="hero-content flex-col lg:flex-row-reverse">
          <div className="text-center lg:text-left">
            <h1 className="text-5xl font-bold">Login now!</h1>
            <p className="py-6">
              Login with your registered email and password.<br /><br />
              Not registered yet? <Link to="/register" className="btn btn-primary mt-2">Register</Link>
            </p>
          </div>
          <div className="card w-full max-w-sm shrink-0 shadow-2xl bg-base-100">
            <div className="card-body">
              <form onSubmit={handleLogin}>
                <fieldset>
                  <label className="label">Email</label>
                  <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="input input-bordered"
                  />
                  <label className="label">Password</label>
                  <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="input input-bordered"
                  />
                  <div><a className="link link-hover">Forgot password?</a></div>
                  <button className="btn btn-primary mt-4" type="submit" disabled={loading}>
                    {loading ? "Logging in..." : "Login"}
                  </button>
                </fieldset>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
