import { Link, Outlet } from "react-router-dom"
import img from '../assets/authImage.png'
import ProFast from '../components/ProFast'

const AuthLayout = () => {
  return (
   <div className="  max-w-7xl mx-auto p-6 bg-[light-dark(var(--color-white),var(--color-gray-950))]
   ">
   <Link to="/">
    <p>
      <ProFast></ProFast>
    </p>
   </Link>
  <div className="hero-content flex-col lg:flex-row-reverse ">
    <div className="flex-1">
        <img
      src={img}
      className="max-w-sm rounded-lg shadow-2xl"
    />
    </div>
    <div className="flex-1">
      <Outlet></Outlet>
    </div>
  </div>
</div>
  )
}

export default AuthLayout
