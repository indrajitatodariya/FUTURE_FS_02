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
    <>
 <div
  className="hero min-h-screen"
  style={{
    backgroundImage:
      "url(https://images.unsplash.com/photo-1523275335684-37898b6baf30)",
  }}
>
    <div className="hero  min-h-screen">
  <div className="hero-content flex-col lg:flex-row-reverse">
    <div className="text-center lg:text-left">
      <h1 className="text-5xl font-bold">Register</h1>
      <p className="py-6">
        After register click below and login to your account,<br /><br />
        <Link to="/verify-notice" className="btn btn-primary">Verify</Link>
      </p>
    </div>
    <div className="card bg-base-00 w-full max-w-sm shrink-0 shadow-2xl">
      <div className="card-body">
        <form onSubmit={handleRegister} className="flex flex-col gap-2 p-4">
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
        className="input input-bordered" />
          <div><a className="link link-hover">Forgot password?</a></div>
          <button className="btn btn-primary mt-4" type="submit">Register</button>
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
