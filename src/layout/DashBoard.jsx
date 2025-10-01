import {  NavLink, Outlet } from "react-router-dom"
import ProFast from "../components/ProFast"
import { FaHome, FaBox, FaMoneyBillWave, FaSearchLocation, FaUserEdit, FaUserCheck, FaHourglassHalf } from "react-icons/fa";


const DashBoard = () => {
  return (
    <div className="drawer lg:drawer-open ">
  <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
  <div className="drawer-content ">
    {/* Page content here */}
     <div className="navbar bg-base-300 w-full  lg:hidden">
      <div className="flex-none lg:hidden">
        <label htmlFor="my-drawer-2" aria-label="open sidebar" className="btn btn-square btn-ghost">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            className="inline-block h-6 w-6 stroke-current"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16M4 18h16"
            ></path>
          </svg>
        </label>
      </div>
      <div className="mx-2 flex-1 px-2">Navbar Title</div>
      
    </div>
    {/* Page content here */}
    <Outlet></Outlet>
  </div>
  <div className="drawer-side">
    <label htmlFor="my-drawer-2" aria-label="close sidebar" className="drawer-overlay"></label>
    <ul className="menu bg-base-200 text-base-content min-h-full w-80 p-4">
      {/* Sidebar content here */}
      <ProFast></ProFast>
       <ul className="flex flex-col gap-4 p-4 w-60 bg-base-200 min-h-screen">
      <li>
        <NavLink
          to="/"
          className={({ isActive }) =>
            `flex items-center gap-2 p-2 rounded-md hover:bg-amber-200 hover:text-black ${
              isActive ? "bg-primary text-white" : ""
            }`
          }
        >
          <FaHome /> HOME
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/dashboard/myparcels"
          className={({ isActive }) =>
            `flex items-center gap-2 p-2 rounded-md hover:bg-amber-200 hover:text-black ${
              isActive ? "bg-primary text-white" : ""
            }`
          }
        >
          <FaBox /> My Parcels
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/dashboard/payments"
          className={({ isActive }) =>
            `flex items-center gap-2 p-2 rounded-md hover:bg-amber-200 hover:text-black ${
              isActive ? "bg-primary text-white" : ""
            }`
          }
        >
          <FaMoneyBillWave /> Payment History
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/dashboard/track"
          className={({ isActive }) =>
            `flex items-center gap-2 p-2 rounded-md hover:bg-amber-200 hover:text-black${
              isActive ? "bg-primary text-white" : ""
            }`
          }
        >
          <FaSearchLocation /> Track a Parcel
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/dashboard/update"
          className={({ isActive }) =>
            `flex items-center gap-2 p-2 rounded-md hover:bg-amber-200 hover:text-black ${
              isActive ? "bg-primary text-white" : ""
            }`
          }
        >
          <FaUserEdit /> Update Profile
        </NavLink>
      </li>
      <li>
  <NavLink
    to="/dashboard/activeRider"
    className={({ isActive }) =>
      `flex items-center gap-2 p-2 rounded-md hover:bg-amber-200 hover:text-black ${
        isActive ? "bg-primary text-white" : ""
      }`
    }
  >
    <FaUserCheck /> Active Rider
  </NavLink>
</li>

{/* ✅ New Pending Rider link */}
<li>
  <NavLink
    to="/dashboard/pendingRider"
    className={({ isActive }) =>
      `flex items-center gap-2 p-2 rounded-md hover:bg-amber-200 hover:text-black ${
        isActive ? "bg-primary text-white" : ""
      }`
    }
  >
    <FaHourglassHalf /> Pending Rider
  </NavLink>
</li>
    </ul>

      
    </ul>
  </div>
</div>
  )
}

export default DashBoard
