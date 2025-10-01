import React, { useState } from "react";

import locations from "../assets/warehouses.json"; // keep your big dataset in a json file
import useAuth from "../pages/Hooks/useAuth";
import Swal from "sweetalert2";
import useAxiousSecure from "../pages/Hooks/useAxiousSecure";

const BeARider = () => {
  const { user } = useAuth();
  const axiousSecure=useAxiousSecure()
  const [formData, setFormData] = useState({
    name: user?.displayName || "",
    email: user?.email || "",
    age: "",
    nid: "",
    contact: "",
    region: "",
    district: "",
    bikeNumber: "",
    bikeRegNo: "",
    status:'pending'
  });

  // extract unique regions
  const regions = [...new Set(locations.map((loc) => loc.region))];
  // filter districts by region
  const districts = locations
    .filter((loc) => loc.region === formData.region)
    .map((loc) => loc.district);

  // handle change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // console.log("Rider form submitted:", formData);
    Swal.fire({
  title: "Are you sure?",
  text: "You want to apply for this job!",
  icon: "warning",
  showCancelButton: true,
  confirmButtonColor: "#3085d6",
  cancelButtonColor: "#d33",
  confirmButtonText: "Yes, apply it!"
}).then(async(result) => {
  if (result.isConfirmed) {
    const result =await axiousSecure.post('/riders',formData)
    if(result.data){
        Swal.fire({
      title: "succed!",
      text: "your application recived succefully and now its pending for approval",
      icon: "success"
    });
    }
    
  }
});

    setFormData({
      name: user?.displayName || "",
      email: user?.email || "",
      age: "",
      nid: "",
      contact: "",
      region: "",
      district: "",
      bikeNumber: "",
      bikeRegNumber: "",
    });
  };

  return (
    <div className="max-w-2xl mx-auto bg-base-100 p-8 rounded-xl shadow-lg">
      <h2 className="text-2xl font-bold text-center mb-6">🚴 Become a Rider</h2>
      <form onSubmit={handleSubmit} className="space-y-4">

        {/* Name */}
        <div>
          <label className="label">Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            readOnly
            className="input input-bordered w-full"
          />
        </div>

        {/* Email */}
        <div>
          <label className="label">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            readOnly
            className="input input-bordered w-full"
          />
        </div>

        {/* Age */}
        <div>
          <label className="label">Age</label>
          <input
            type="number"
            name="age"
            value={formData.age}
            onChange={handleChange}
            className="input input-bordered w-full"
            required
          />
        </div>

        {/* NID */}
        <div>
          <label className="label">NID Number</label>
          <input
            type="text"
            name="nid"
            value={formData.nid}
            onChange={handleChange}
            className="input input-bordered w-full"
            required
          />
        </div>

        {/* Contact */}
        <div>
          <label className="label">Contact</label>
          <input
            type="text"
            name="contact"
            value={formData.contact}
            onChange={handleChange}
            className="input input-bordered w-full"
            required
          />
        </div>

        {/* Region */}
        <div>
          <label className="label">Region</label>
          <select
            name="region"
            value={formData.region}
            onChange={handleChange}
            className="select select-bordered w-full"
            required
          >
            <option value="">Select Region</option>
            {regions.map((region, idx) => (
              <option key={idx} value={region}>
                {region}
              </option>
            ))}
          </select>
        </div>

        {/* District */}
        <div>
          <label className="label">District</label>
          <select
            name="district"
            value={formData.district}
            onChange={handleChange}
            className="select select-bordered w-full"
            required
            disabled={!formData.region}
          >
            <option value="">Select District</option>
            {districts.map((district, idx) => (
              <option key={idx} value={district}>
                {district}
              </option>
            ))}
          </select>
        </div>

        {/* Bike Number */}
        <div>
          <label className="label">Bike Number</label>
          <input
            type="text"
            name="bikeNumber"
            value={formData.bikeNumber}
            onChange={handleChange}
            className="input input-bordered w-full"
            required
          />
        </div>

        {/* Bike Reg No */}
        <div>
          <label className="label">Bike Registration No</label>
          <input
            type="text"
            name="bikeRegNo"
            value={formData.bikeRegNo}
            onChange={handleChange}
            className="input input-bordered w-full"
            required
          />
        </div>

        {/* Submit */}
        <button type="submit" className="btn btn-primary w-full">
          Submit Application
        </button>
      </form>
    </div>
  );
};

export default BeARider;
