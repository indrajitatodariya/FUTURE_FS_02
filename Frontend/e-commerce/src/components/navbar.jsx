import ThemeToggle from "./theme"

function Navbar(){
    return<>
    <div className="navbar bg-base-100 shadow-sm">
  <div className="flex-1">
    <a className="btn btn-ghost text-xl">E-commerce</a>
  </div>
  <div className="flex gap-3">
    <input type="text" placeholder="Search" className="input input-bordered w-24 md:w-auto" />
    <div className="flex gap-3">
      <button className="btn btn-outline">Cart</button>
     <button className="btn btn-outline btn-info">Login</button>
     <ThemeToggle />
    </div>
  </div>
</div>
    </>
}

export default Navbar