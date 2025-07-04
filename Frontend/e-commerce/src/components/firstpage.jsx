import { Link } from 'react-router-dom';

function Firstpage() {
  return (
    <>
      <div
        className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-br from-white via-gray-100 to-white relative overflow-hidden"
      >

        <div className="absolute w-[600px] h-[600px] bg-gradient-to-r from-blue-300 to-purple-300 rounded-full blur-3xl opacity-40 animate-pulse"></div>

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

        {/* Main content */}
        <div className="relative text-center z-10">
          <h1 className="text-5xl md:text-7xl font-extrabold bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent drop-shadow-md">
            Welcome to E-commerce
          </h1>
          <p className="mt-6 text-lg md:text-xl text-gray-600 max-w-xl mx-auto">
            Discover premium products with a bright, modern shopping experience. Shop smart, live better.
          </p>
          <Link
            to="/main"
            className="mt-8 inline-block px-8 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white font-semibold rounded-full shadow-lg hover:scale-105 transition transform duration-300"
          >
            Get Started
          </Link>
        </div>
      </div>
    </>
  );
}

export default Firstpage;
