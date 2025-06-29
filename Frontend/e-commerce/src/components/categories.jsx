import tv from '../assets/tv.jpg'
import fashion from '../assets/style.jpg'
import mobile from '../assets/mobile.jpg'
import groce from '../assets/groce.jpg'


function Categories(){
    return <>
    <div className="carousel rounded-box flex justify-center align-center m-10">
  <div className="carousel-item">
    <div className="card bg-base-100 w-46 shadow-sm">
  <figure className="px-10 pt-10">
    <img
      src={groce}
      alt="Shoes"
      className="rounded-xl" />
  </figure>
  <div className="card-body items-center text-center">
    <h2 className="card-title">Groceries</h2>
  </div>
</div>
  </div>
  <div className="carousel-item">
    <div className="card bg-base-100 w-46 shadow-sm">
  <figure className="px-10 pt-10">
    <img
      src={mobile}
      alt="Shoes"
      className="rounded-xl" />
  </figure>
  <div className="card-body items-center text-center">
    <h2 className="card-title">Mobile</h2>
  </div>
</div>
  </div>
  <div className="carousel-item">
    <div className="card bg-base-100 w-46 shadow-sm">
  <figure className="px-10 pt-10">
    <img
      src={fashion}
      alt="Shoes"
      className="rounded-xl" />
  </figure>
  <div className="card-body items-center text-center">
    <h2 className="card-title">Fashion</h2>
  </div>
</div>
  </div>
  <div className="carousel-item">
    <div className="card bg-base-100 w-47 shadow-sm">
  <figure className="px-10 pt-10">
    <img
      src={tv}
      alt="Shoes"
      className="rounded-xl" />
  </figure>
  <div className="card-body items-center text-center">
    <h2 className="card-title">Electronics</h2>
  </div>
</div>
  </div>
</div>
    </>
}

export default Categories