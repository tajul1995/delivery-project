import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";


// Your full data
import locationsData from "../../assets/warehouses.json"; // save your JSON as locationsData.json
import useAxiousSecure from "../Hooks/useAxiousSecure";
import useAuth from "../Hooks/useAuth";

const SendAParcel = () => {
  const axiousSecure =useAxiousSecure()
  const {user}=useAuth()
  
  const [parcelInfo, setParcelInfo] = useState({
    type: "document",
    title: "",
    weight: "",
  });

  const [senderInfo, setSenderInfo] = useState({
    name: "John Doe",
    contact: "",
    region: "",
    district: "",
    serviceCenter: "",
    address: "",
    pickupInstruction: "",
  });

  const [receiverInfo, setReceiverInfo] = useState({
    name: "",
    contact: "",
    region: "",
    district: "",
    serviceCenter: "",
    address: "",
    deliveryInstruction: "",
  });

  const [districts, setDistricts] = useState([]);
  const [serviceCenters, setServiceCenters] = useState([]);

  // Populate districts when region changes
  useEffect(() => {
    const regionDistricts = locationsData
      .filter((loc) => loc.region === senderInfo.region)
      .map((loc) => loc.district);
    setDistricts([...new Set(regionDistricts)]);
    setSenderInfo((prev) => ({ ...prev, district: "", serviceCenter: "" }));
  }, [senderInfo.region]);

  // Populate service centers when district changes
  useEffect(() => {
    const loc = locationsData.find(
      (loc) =>
        loc.region === senderInfo.region && loc.district === senderInfo.district
    );
    setServiceCenters(loc ? loc.covered_area : []);
    setSenderInfo((prev) => ({ ...prev, serviceCenter: "" }));
  }, [senderInfo.district, senderInfo.region]);

  // Receiver side dropdowns
  const [receiverDistricts, setReceiverDistricts] = useState([]);
  const [receiverServiceCenters, setReceiverServiceCenters] = useState([]);

  useEffect(() => {
    const rDistricts = locationsData
      .filter((loc) => loc.region === receiverInfo.region)
      .map((loc) => loc.district);
    setReceiverDistricts([...new Set(rDistricts)]);
    setReceiverInfo((prev) => ({ ...prev, district: "", serviceCenter: "" }));
  }, [receiverInfo.region]);

  useEffect(() => {
    const loc = locationsData.find(
      (loc) =>
        loc.region === receiverInfo.region &&
        loc.district === receiverInfo.district
    );
    setReceiverServiceCenters(loc ? loc.covered_area : []);
    setReceiverInfo((prev) => ({ ...prev, serviceCenter: "" }));
  }, [receiverInfo.district, receiverInfo.region]);

  // Calculate delivery cost
  const calculateCost = () => {
    let breakdown = "";
    let total = 0;

    const type = parcelInfo.type;
    const weight = parseFloat(parcelInfo.weight) || 0;
    const withinCity = senderInfo.region === receiverInfo.region;

    if (type === "document") {
      total = withinCity ? 60 : 80;
      breakdown = `Parcel Type: Document\nWithin City: ${withinCity ? "৳60" : "৳80"}`;
    } else {
      if (weight <= 3) {
        total = withinCity ? 110 : 150;
        breakdown = `Parcel Type: Non-Document\nWeight: ${weight}kg\nCost: ${total}`;
      } else {
        total = (withinCity ? 110 : 150) + (weight - 3) * 40;
        if (!withinCity) total += 40; // extra for outside city
        breakdown = `Parcel Type: Non-Document\nWeight: ${weight}kg\nBase Cost: ${
          withinCity ? 110 : 150
        }\nExtra: ${(weight - 3) * 40}${!withinCity ? " + 40 outside city" : ""}\nTotal: ${total}`;
      }
    }

    return { total, breakdown };
  };

  // Handle submit
  const handleSubmit = (e) => {
    e.preventDefault();
    const { total, breakdown } = calculateCost();

    Swal.fire({
      title: "Delivery Cost Breakdown",
      html: `<pre style="text-align:left">${breakdown}</pre>`,
      showCancelButton: true,
      confirmButtonText: "Confirm",
      cancelButtonText: "Edit",
      reverseButtons: true,
    }).then((result) => {
      if (result.isConfirmed) {
        const trackingId = "TRK" + Date.now();
        const dataToSend = {
          parcelInfo,
          senderInfo,
          receiverInfo,
          totalCost: total,
          trackingId,
          creation_date: new Date(),
          senderEmail:user.email
        };

        axiousSecure
          .post('/allparcels', dataToSend)
          .then((res) => {
            console.log(res.data)
            Swal.fire("Success!", `Parcel saved! Tracking ID: ${trackingId}`, "success");
          })
          .catch((err) => {
            Swal.fire("Error!", "Failed to save parcel", "error");
            console.error(err);
          });
      }
    });
  };

  // Render form
  return (
    <div className="max-w-5xl mx-auto p-5 text-black font-bold bg-amber-50">
      <h2 className="text-3xl font-bold mb-2">Send A Parcel</h2>
      <p className="mb-5 text-gray-600">Fill in parcel, sender & receiver info</p>
      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Parcel Info */}
        <div className="border p-5 rounded-md space-y-3">
          <h3 className="font-semibold">Parcel Info</h3>
          <select
            value={parcelInfo.type}
            onChange={(e) => setParcelInfo({ ...parcelInfo, type: e.target.value })}
            required
            className="border p-2 rounded w-full"
          >
            <option value="document">Document</option>
            <option value="non-document">Non-Document</option>
          </select>
          <input
            type="text"
            placeholder="Title"
            value={parcelInfo.title}
            onChange={(e) => setParcelInfo({ ...parcelInfo, title: e.target.value })}
            required
            className="border p-2 rounded w-full"
          />
          {parcelInfo.type === "non-document" && (
            <input
              type="number"
              placeholder="Weight (kg)"
              value={parcelInfo.weight}
              onChange={(e) => setParcelInfo({ ...parcelInfo, weight: e.target.value })}
              className="border p-2 rounded w-full"
            />
          )}
        </div>

        {/* Sender Info */}
        <div className="border p-5 rounded-md space-y-3">
          <h3 className="font-semibold">Sender Info</h3>
          <input
            type="text"
            placeholder="Name"
            value={senderInfo.name}
            onChange={(e) => setSenderInfo({ ...senderInfo, name: e.target.value })}
            required
            className="border p-2 rounded w-full"
          />
          <input
            type="text"
            placeholder="Contact"
            value={senderInfo.contact}
            onChange={(e) => setSenderInfo({ ...senderInfo, contact: e.target.value })}
            required
            className="border p-2 rounded w-full"
          />
          <select
            value={senderInfo.region}
            onChange={(e) => setSenderInfo({ ...senderInfo, region: e.target.value })}
            required
            className="border p-2 rounded w-full"
          >
            <option value="">Select Region</option>
            {[...new Set(locationsData.map((loc) => loc.region))].map((r) => (
              <option key={r} value={r}>
                {r}
              </option>
            ))}
          </select>
          <select
            value={senderInfo.district}
            onChange={(e) => setSenderInfo({ ...senderInfo, district: e.target.value })}
            required
            className="border p-2 rounded w-full"
          >
            <option value="">Select District</option>
            {districts.map((d) => (
              <option key={d} value={d}>
                {d}
              </option>
            ))}
          </select>
          <select
            value={senderInfo.serviceCenter}
            onChange={(e) => setSenderInfo({ ...senderInfo, serviceCenter: e.target.value })}
            required
            className="border p-2 rounded w-full"
          >
            <option value="">Select Service Center</option>
            {serviceCenters.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
          <input
            type="text"
            placeholder="Address"
            value={senderInfo.address}
            onChange={(e) => setSenderInfo({ ...senderInfo, address: e.target.value })}
            required
            className="border p-2 rounded w-full"
          />
          <input
            type="text"
            placeholder="Pickup Instruction"
            value={senderInfo.pickupInstruction}
            onChange={(e) => setSenderInfo({ ...senderInfo, pickupInstruction: e.target.value })}
            required
            className="border p-2 rounded w-full"
          />
        </div>

        {/* Receiver Info */}
        <div className="border p-5 rounded-md space-y-3">
          <h3 className="font-semibold">Receiver Info</h3>
          <input
            type="text"
            placeholder="Name"
            value={receiverInfo.name}
            onChange={(e) => setReceiverInfo({ ...receiverInfo, name: e.target.value })}
            required
            className="border p-2 rounded w-full"
          />
          <input
            type="text"
            placeholder="Contact"
            value={receiverInfo.contact}
            onChange={(e) => setReceiverInfo({ ...receiverInfo, contact: e.target.value })}
            required
            className="border p-2 rounded w-full"
          />
          <select
            value={receiverInfo.region}
            onChange={(e) => setReceiverInfo({ ...receiverInfo, region: e.target.value })}
            required
            className="border p-2 rounded w-full"
          >
            <option value="">Select Region</option>
            {[...new Set(locationsData.map((loc) => loc.region))].map((r) => (
              <option key={r} value={r}>
                {r}
              </option>
            ))}
          </select>
          <select
            value={receiverInfo.district}
            onChange={(e) => setReceiverInfo({ ...receiverInfo, district: e.target.value })}
            required
            className="border p-2 rounded w-full"
          >
            <option value="">Select District</option>
            {receiverDistricts.map((d) => (
              <option key={d} value={d}>
                {d}
              </option>
            ))}
          </select>
          <select
            value={receiverInfo.serviceCenter}
            onChange={(e) => setReceiverInfo({ ...receiverInfo, serviceCenter: e.target.value })}
            required
            className="border p-2 rounded w-full"
          >
            <option value="">Select Service Center</option>
            {receiverServiceCenters.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
          <input
            type="text"
            placeholder="Address"
            value={receiverInfo.address}
            onChange={(e) => setReceiverInfo({ ...receiverInfo, address: e.target.value })}
            required
            className="border p-2 rounded w-full"
          />
          <input
            type="text"
            placeholder="Delivery Instruction"
            value={receiverInfo.deliveryInstruction}
            onChange={(e) => setReceiverInfo({ ...receiverInfo, deliveryInstruction: e.target.value })}
            required
            className="border p-2 rounded w-full"
          />
        </div>

        <button
          type="submit"
          className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default SendAParcel;
