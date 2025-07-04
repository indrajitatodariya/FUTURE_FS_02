import { Link } from 'react-router-dom'

function Firstpage() {
  return (
    <>
      <div
        className="hero min-h-screen"
        style={{
          backgroundImage:
            "url(https://images.unsplash.com/photo-1523275335684-37898b6baf30)",
        }}
      >
        <div className="hero-overlay bg-black/50"></div>
        <div className="hero-content text-neutral-content text-center">
          <div className="max-w-md">
            <h1 className="mb-5 text-5xl font-bold">Hello</h1>
            <p className="mb-5">
              Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem
              quasi. In deleniti eaque aut repudiandae et a id nisi.
            </p>
            <Link to="/main" className="btn btn-primary">
              Get Started
            </Link>
          </div>
        </div>
      </div>
    </>
  )
}

export default Firstpage
