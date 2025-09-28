import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";

import { FaShippingFast, FaGlobe, FaWarehouse, FaMoneyBillWave, FaBuilding, FaUndo } from "react-icons/fa";

import "aos/dist/aos.css";


const services = [
  {
    title: "Express & Standard Delivery",
    description:
      "We deliver parcels within 24–72 hours in Dhaka, Chittagong, Sylhet, Khulna, and Rajshahi. Express delivery available in Dhaka within 4–6 hours from pick-up to drop-off.",
    icon: <FaShippingFast size={50} className="text-amber-600 mx-auto" />,
  },
  {
    title: "Nationwide Delivery",
    description:
      "We deliver parcels nationwide with home delivery in every district, ensuring your products reach customers within 48–72 hours.",
    icon: <FaGlobe size={50} className="text-amber-600 mx-auto" />,
  },
  {
    title: "Fulfillment Solution",
    description:
      "We also offer customized service with inventory management support, online order processing, packaging, and after sales support.",
    icon: <FaWarehouse size={50} className="text-amber-600 mx-auto" />,
  },
  {
    title: "Cash on Home Delivery",
    description:
      "100% cash on delivery anywhere in Bangladesh with guaranteed safety of your product.",
    icon: <FaMoneyBillWave size={50} className="text-amber-600 mx-auto" />,
  },
  {
    title: "Corporate Service / Contract In Logistics",
    description:
      "Customized corporate services which includes warehouse and inventory management support.",
    icon: <FaBuilding size={50} className="text-amber-600 mx-auto" />,
  },
  {
    title: "Parcel Return",
    description:
      "Through our reverse logistics facility we allow end customers to return or exchange their products with online business merchants.",
    icon: <FaUndo size={50} className="text-amber-600 mx-auto" />,
  },
];

const ServicesSection = () => {
  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
  }, []);

  return (
    <section className="py-16 bg-base-100">
      <div className="container mx-auto px-4">
        <h2
          className="text-4xl font-bold text-center mb-12"
          data-aos="fade-up"
        >
          Our Services
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div
              key={index}
              className="card bg-base-100 shadow-xl border hover:bg-primary hover:text-white transition-all duration-500 transform hover:-translate-y-2"
              data-aos="zoom-in"
              data-aos-delay={index * 100}
            >
              <div className="card-body items-center text-center">
                {service.icon}
                <h3 className="card-title mt-4 text-green-200 text-xl">{service.title}</h3>
                <p className="text-sm mt-2">{service.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
