import watch from '../assets/watch.webp';
import watch2 from '../assets/watch2.webp';
import earphone from '../assets/earphones.jpeg';
import monitor from '../assets/monitor.webp';
import monitor2 from '../assets/monitor2.webp';
import speaker from '../assets/speaker.webp';
import trimmer from '../assets/trimmer.webp';

function Contentr1(){
    return <>
    <div className="flex flex-col mt-5">
      <div className="ml-5"><h1>Electronics Items</h1></div>
         <div className="carousel carousel-center  rounded-box max-w-screen space-x-4 p-2">
        <div className="carousel-item">
      <div className="card bg-base-100 w-96 shadow-sm">
        <figure>
      <img
        src={watch}
        alt="watch" />
        </figure>
        <div className="card-body">
      <h2 className="card-title">
        Smart-Watch
        <div className="badge badge-secondary">NEW</div>
      </h2>
      <p>Rs.1550</p>
      <div className="card-actions justify-end">
        <div className="badge badge-outline">Electronics</div>
        <div className="badge badge-outline">Products</div>
      </div>
        </div>
      </div>
        </div>
        <div className="carousel-item">
      <div className="card bg-base-100 w-96 shadow-sm">
        <figure>
      <img
        src={earphone}
        alt="earphones" />
        </figure>
        <div className="card-body">
      <h2 className="card-title">
        Earbuds
        <div className="badge badge-secondary">NEW</div>
      </h2>
      <p>Rs.3000</p>
      <div className="card-actions justify-end">
        <div className="badge badge-outline">Electronics</div>
        <div className="badge badge-outline">Products</div>
      </div>
        </div>
      </div>
        </div>
        <div className="carousel-item">
         <div className="card bg-base-100 w-96 shadow-sm">
        <figure>
      <img
        src={monitor}
        alt="monitor" />
        </figure>
        <div className="card-body">
      <h2 className="card-title">
        Monitor 
        <div className="badge badge-secondary">NEW</div>
      </h2>
      <p>Rs.15000</p>
      <div className="card-actions justify-end">
        <div className="badge badge-outline">Electronics</div>
        <div className="badge badge-outline">Products</div>
      </div>
        </div>
      </div>
        </div>
        <div className="carousel-item">
      <div className="card bg-base-100 w-96 shadow-sm">
        <figure>
      <img
        src={watch2}
        alt="Smart-watch" />
        </figure>
        <div className="card-body">
      <h2 className="card-title">
        Smart-watch
        <div className="badge badge-secondary">NEW</div>
      </h2>
      <p>Rs.1400</p>
      <div className="card-actions justify-end">
        <div className="badge badge-outline">Smart-watch</div>
        <div className="badge badge-outline">Products</div>
      </div>
        </div>
      </div>
        </div>
        <div className="carousel-item">
      <div className="card bg-base-100 w-96 shadow-sm">
        <figure>
      <img
        src={speaker}
        alt="Speaker" />
        </figure>
        <div className="card-body">
      <h2 className="card-title">
        Speaker
        <div className="badge badge-secondary">NEW</div>
      </h2>
      <p>Rs.2000</p>
      <div className="card-actions justify-end">
        <div className="badge badge-outline">Electronics</div>
        <div className="badge badge-outline">Products</div>
      </div>
        </div>
      </div>
        </div>
        <div className="carousel-item">
      <div className="card bg-base-100 w-96 shadow-sm">
        <figure>
      <img
        src={trimmer}
        alt="Trimmer" />
        </figure>
        <div className="card-body">
      <h2 className="card-title">
        Trimmer
        <div className="badge badge-secondary">NEW</div>
      </h2>
      <p>Rs.1600</p>
      <div className="card-actions justify-end">
        <div className="badge badge-outline">Electronics</div>
        <div className="badge badge-outline">Products</div>
      </div>
        </div>
      </div>
        </div>
        <div className="carousel-item">
      <div className="card bg-base-100 w-96 shadow-sm">
        <figure>
      <img
        src={monitor2}
        alt="asus monitor" />
        </figure>
        <div className="card-body">
      <h2 className="card-title">
        Asus Monitor
        <div className="badge badge-secondary">NEW</div>
      </h2>
      <p>Rs.25000</p>
      <div className="card-actions justify-end">
        <div className="badge badge-outline">Fashion</div>
        <div className="badge badge-outline">Products</div>
      </div>
        </div>
      </div>
        </div>
      </div>
    </div>
    </>
}

export default Contentr1;