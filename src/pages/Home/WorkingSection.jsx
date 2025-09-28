import React from "react";
import { FaShippingFast, FaGlobe, FaWarehouse, FaMoneyBillWave } from "react-icons/fa"; // example icons

const data = [
  {
    title: "Express & Standard Delivery",
    description:
      "We deliver parcels within 24–72 hours in Dhaka, Chittagong, Sylhet, Khulna, and Rajshahi. Express delivery available in Dhaka within 4–6 hours from pick-up to drop-off.",
    icon: <FaShippingFast size={32} className="text-amber-600" />,
  },
  {
    title: "Nationwide Delivery",
    description:
      "We deliver parcels nationwide with home delivery in every district, ensuring your products reach customers within 48–72 hours.",
    icon: <FaGlobe size={32} className="text-amber-600" />,
  },
  {
    title: "Fulfillment Solution",
    description:
      "We also offer customized service with inventory management support, online order processing, packaging, and after sales support.",
    icon: <FaWarehouse size={32} className="text-amber-600" />,
  },
  {
    title: "Cash on Home Delivery",
    description:
      "100% cash on delivery anywhere in Bangladesh with guaranteed safety of your product.",
    icon: <FaMoneyBillWave size={32} className="text-amber-600" />,
  },
];

const WorkingSection = () => {
  return (
    <section className="py-12 bg-base-100">
      <div className="container mx-auto px-2">
        <h2 className="text-3xl font-bold text-center mb-10">How We Work</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {data.map((item, index) => (
            <div
              key={index}
              className="card bg-base-100 shadow-lg  hover:bg-primary hover:text-white transition-colors duration-300 "
            >
              <div className="card-body">
                <div className="mb-1 ">{item.icon}</div>
                <h3 className="card-title text-2xl text-green-200">{item.title}</h3>
                <p className="text-sm">{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WorkingSection;
