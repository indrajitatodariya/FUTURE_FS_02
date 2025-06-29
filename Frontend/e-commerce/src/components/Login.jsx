import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../AuthContext';
import { Link } from 'react-router-dom';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { setIsAuthenticated } = useContext(AuthContext);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      console.log("Sending to backend:", { email, password });
      const res = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();
      console.log("Response from backend:", data);

      if (res.ok && data.token) {
        setIsAuthenticated(true);
        // ✅ Navigate to /main after login
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
   <><div
  className="hero min-h-screen"
  style={{
    backgroundImage:
      "url(https://i.pinimg.com/736x/ef/a5/19/efa519f959ffd532ee69c9deddccd3d1.jpg)",
  }}
>
    <div className="hero  min-h-screen">
  <div className="hero-content flex-col lg:flex-row-reverse">
    <div className="text-center lg:text-left">
      <h1 className="text-5xl font-bold">Login now!</h1>
      <p className="py-6">
        Login with your registerd email and password , and if not registered yet click below,<br /><br />
        <Link to="/register" className="btn btn-primary">Register</Link>
      </p>
    </div>
    <div className="card bg-base-0 w-full max-w-sm shrink-0 shadow-2xl">
      <div className="card-body">
        <form onSubmit={handleLogin}>
        <fieldset className="fieldset">
          <label className="label">Email</label>
          <input type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
        className="input input-bordered" />
          <label className="label">Password</label>
          <input type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
        className="input input-bordered bg-natural-100" />
          <div><a className="link link-hover">Forgot password?</a></div>
          <button className="btn btn-neutral mt-4 btn-primary" type="submit"  disabled={loading}>{loading ? "Logging in..." : "Login"}</button>
        </fieldset>
        </form>
      </div>
    </div>
  </div>
</div>
</div>
</>
  );
}
