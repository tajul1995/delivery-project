import { Link, NavLink } from "react-router-dom"
import ProFast from "../../components/ProFast"
import useAuth from "../Hooks/useAuth"


const Navbar = () => {

  const {user, userSignOut,loading}=useAuth()
  if(loading){
    return <p>loading.......</p>
  }
  const handleLogOut=()=>{
     userSignOut()
     .then(()=>{
      console.log('user signout')
     })
  }
  
    const navitems=<>
    <li><NavLink>SERVICES</NavLink></li>
    <li><NavLink to='/coverage'>COVERAGE</NavLink></li>
    <li><NavLink to='/parcelSend'>SEND A PARCEL</NavLink></li>
    <li><NavLink to='/beARider'>Be A RIDER</NavLink></li>
    {
      user&& <>
      <li><NavLink to='/dashboard'>DASHBOARD</NavLink></li>
      
      </>
    } 
    
    </>
       
    
  return (
    <div className="navbar bg-white/50 drop-shadow-2xl z-30 sticky top-3 rounded-md shadow-sm text-black font-bold py-4">
  <div className="navbar-start">
    <div className="dropdown">
      <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /> </svg>
      </div>
      <ul
        tabIndex={0}
        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-3 shadow">
        {navitems}
      </ul>
    </div>
    <a className="btn btn-ghost text-xl"><ProFast></ProFast></a>
  </div>
  <div className="navbar-center hidden lg:flex">
    <ul className="menu menu-horizontal px-1">
      {navitems}
    </ul>
  </div>
  <div className="navbar-end">
    {
      user? <button onClick={handleLogOut} className="btn btn-primary">Logout</button>:<Link to='/login'><button className="btn btn-primary">login</button></Link>
    }
  </div>
</div>
  )
}

export default Navbar
