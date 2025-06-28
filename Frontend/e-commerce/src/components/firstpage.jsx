import bg from '../assets/download.jpeg'
import { Link } from 'react-router-dom'


function Firstpage(){
    return<>
    <div
  className="hero min-h-screen"
  style={{
    backgroundImage:
      "url(https://i.pinimg.com/736x/ef/a5/19/efa519f959ffd532ee69c9deddccd3d1.jpg)",
  }}
>
  <div className="hero-overlay"></div>
  <div className="hero-content text-neutral-content text-center">
    <div className="max-w-md">
      <h1 className="mb-5 text-5xl font-bold">Hello there</h1>
      <p className="mb-5">
        Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem
        quasi. In deleniti eaque aut repudiandae et a id nisi.
      </p>
      <Link to="/main" className="btn btn-primary"><button className="btn btn-primary">Get Started</button></Link>
    </div>
  </div>
</div>
    </>
}

export default Firstpage