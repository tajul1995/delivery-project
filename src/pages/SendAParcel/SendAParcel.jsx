import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import regionsData from '../../assets/warehouses.json'
// const regionsData = [/* your JSON data here */];

const SendAParcel = () => {
  const [parcelInfo, setParcelInfo] = useState({
    type: "document",
    title: "",
    weight: "",
  });

  const [senderInfo, setSenderInfo] = useState({
    name: "",
    contact: "",
    region: "",
    serviceCenter: "",
    address: "",
    pickupInstruction: "",
  });

  const [receiverInfo, setReceiverInfo] = useState({
    name: "",
    contact: "",
    region: "",
    serviceCenter: "",
    address: "",
    deliveryInstruction: "",
  });

  const [serviceCenters, setServiceCenters] = useState([]);

  // Update service centers when region changes
  useEffect(() => {
    const regionObj = regionsData.find(
      (r) => r.region === senderInfo.region
    );
    setServiceCenters(regionObj ? regionObj.covered_area : []);
  }, [senderInfo.region]);

  useEffect(() => {
    const regionObj = regionsData.find(
      (r) => r.region === receiverInfo.region
    );
    setServiceCenters(regionObj ? regionObj.covered_area : []);
  }, [receiverInfo.region]);

  // Cost calculation (dummy logic)
  const calculateCostBreakdown = () => {
  const { type, weight } = parcelInfo;
  const senderCity = senderInfo.region; // Simplified, can use city/district
  const receiverCity = receiverInfo.region;

  const withinCity = senderCity === receiverCity;

  let baseCost = 0;
//   let extraCost = 0;
  let breakdown = "";

  if (type === "document") {
    baseCost = withinCity ? 60 : 80;
    breakdown = `Parcel Type: Document\nBase Cost: ৳${baseCost}\nWithin City: ${withinCity ? "Yes" : "No"}`;
  } else {
    const w = Number(weight || 0);
    if (w <= 3) {
      baseCost = withinCity ? 110 : 150;
      breakdown = `Parcel Type: Non-Document\nWeight: ${w}kg\nBase Cost: ৳${baseCost}`;
    } else {
      const extraKg = w - 3;
      if (withinCity) {
        baseCost = 110 + extraKg * 40;
        breakdown = `Parcel Type: Non-Document\nWeight: ${w}kg (3kg included in base)\nBase Cost: ৳110 + Extra for ${extraKg}kg: ৳${extraKg * 40}\nTotal: ৳${baseCost}`;
      } else {
        baseCost = 150 + extraKg * 40 + 40; // extra 40
        breakdown = `Parcel Type: Non-Document\nWeight: ${w}kg (3kg included in base)\nBase Cost: ৳150 + Extra for ${extraKg}kg: ৳${extraKg * 40} + Extra Outside City: ৳40\nTotal: ৳${baseCost}`;
      }
    }
  }

  return { cost: baseCost, breakdown };
};


  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate required fields
    const requiredFields = [
      parcelInfo.title,
      senderInfo.name,
      senderInfo.contact,
      senderInfo.region,
      senderInfo.serviceCenter,
      senderInfo.address,
      receiverInfo.name,
      receiverInfo.contact,
      receiverInfo.region,
      receiverInfo.serviceCenter,
      receiverInfo.address,
    ];

    if (requiredFields.some((f) => f === "")) {
      Swal.fire("Error", "Please fill all required fields!", "error");
      return;
    }

    const { cost, breakdown } = calculateCostBreakdown();
        Swal.fire({
  title: "Delivery Cost Breakdown",
  html: `<pre class="text-left">${breakdown}</pre>`,
  icon: "info",
  showCancelButton: true,
  confirmButtonText: "Confirm",
}).then((result) => {
  if (result.isConfirmed) {
    // Save parcel to backend
    fetch("http://localhost:5000/parcels", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        parcelInfo,
        senderInfo,
        receiverInfo,
        creation_date: new Date(),
        cost,
        trackingData: { status: "Created" },
      }),
    })
      .then((res) => res.json())
      .then(() => {
        Swal.fire("Success", "Parcel created successfully!", "success");
      });
  }
});
      };

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h2 className="text-2xl font-bold mb-2">Send A Parcel</h2>
      <p className="mb-6 ">
        Parcel needs both pickup and delivery location
      </p>
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Parcel Info */}
        <div className="p-4 border rounded-lg ">
          <h3 className="font-semibold mb-2">Parcel Info</h3>
          <div className="flex gap-4">
            <select
              required
              value={parcelInfo.type}
              onChange={(e) =>
                setParcelInfo({ ...parcelInfo, type: e.target.value })
              }
              className="input input-bordered w-1/3"
            >
              <option value="document">Document</option>
              <option value="non-document">Non-Document</option>
            </select>
            <input
              type="text"
              placeholder="Parcel Title"
              required
              value={parcelInfo.title}
              onChange={(e) =>
                setParcelInfo({ ...parcelInfo, title: e.target.value })
              }
              className="input input-bordered w-1/3"
            />
            {parcelInfo.type === "non-document" && (
              <input
                type="number"
                placeholder="Weight (kg)"
                value={parcelInfo.weight}
                onChange={(e) =>
                  setParcelInfo({ ...parcelInfo, weight: e.target.value })
                }
                className="input input-bordered w-1/3"
              />
            )}
          </div>
        </div>

        {/* Sender & Receiver Info Side by Side */}
        <div className="flex gap-6">
          {/* Sender Info */}
          <div className="flex-1 p-4 border rounded-lg ">
            <h3 className="font-semibold mb-2">Sender Info</h3>
            <input
              type="text"
              placeholder="Sender Name"
              required
              value={senderInfo.name}
              onChange={(e) =>
                setSenderInfo({ ...senderInfo, name: e.target.value })
              }
              className="input input-bordered w-full mb-2"
            />
            <input
              type="text"
              placeholder="Sender Contact"
              required
              value={senderInfo.contact}
              onChange={(e) =>
                setSenderInfo({ ...senderInfo, contact: e.target.value })
              }
              className="input input-bordered w-full mb-2"
            />
            <select
              required
              value={senderInfo.region}
              onChange={(e) =>
                setSenderInfo({ ...senderInfo, region: e.target.value, serviceCenter: "" })
              }
              className="input input-bordered w-full mb-2"
            >
              <option value="">Select Region</option>
              {[...new Set(regionsData.map((r) => r.region))].map((region) => (
                <option key={region} value={region}>{region}</option>
              ))}
            </select>
            <select
              required
              value={senderInfo.serviceCenter}
              onChange={(e) =>
                setSenderInfo({ ...senderInfo, serviceCenter: e.target.value })
              }
              className="input input-bordered w-full mb-2"
            >
              <option value="">Select Service Center</option>
              {serviceCenters.map((area) => (
                <option key={area} value={area}>{area}</option>
              ))}
            </select>
            <input
              type="text"
              placeholder="Address"
              required
              value={senderInfo.address}
              onChange={(e) =>
                setSenderInfo({ ...senderInfo, address: e.target.value })
              }
              className="input input-bordered w-full mb-2"
            />
            <input
              type="text"
              placeholder="Pick up Instruction"
              value={senderInfo.pickupInstruction}
              onChange={(e) =>
                setSenderInfo({ ...senderInfo, pickupInstruction: e.target.value })
              }
              className="input input-bordered w-full mb-2"
            />
          </div>

          {/* Receiver Info */}
          <div className="flex-1 p-4 border rounded-lg ">
            <h3 className="font-semibold mb-2">Receiver Info</h3>
            <input
              type="text"
              placeholder="Receiver Name"
              required
              value={receiverInfo.name}
              onChange={(e) =>
                setReceiverInfo({ ...receiverInfo, name: e.target.value })
              }
              className="input input-bordered w-full mb-2"
            />
            <input
              type="text"
              placeholder="Receiver Contact"
              required
              value={receiverInfo.contact}
              onChange={(e) =>
                setReceiverInfo({ ...receiverInfo, contact: e.target.value })
              }
              className="input input-bordered w-full mb-2"
            />
            <select
              required
              value={receiverInfo.region}
              onChange={(e) =>
                setReceiverInfo({ ...receiverInfo, region: e.target.value, serviceCenter: "" })
              }
              className="input input-bordered w-full mb-2"
            >
              <option value="">Select Region</option>
              {[...new Set(regionsData.map((r) => r.region))].map((region) => (
                <option key={region} value={region}>{region}</option>
              ))}
            </select>
            <select
              required
              value={receiverInfo.serviceCenter}
              onChange={(e) =>
                setReceiverInfo({ ...receiverInfo, serviceCenter: e.target.value })
              }
              className="input input-bordered w-full mb-2"
            >
              <option value="">Select Service Center</option>
              {serviceCenters.map((area) => (
                <option key={area} value={area}>{area}</option>
              ))}
            </select>
            <input
              type="text"
              placeholder="Address"
              required
              value={receiverInfo.address}
              onChange={(e) =>
                setReceiverInfo({ ...receiverInfo, address: e.target.value })
              }
              className="input input-bordered w-full mb-2"
            />
            <input
              type="text"
              placeholder="Delivery Instruction"
              value={receiverInfo.deliveryInstruction}
              onChange={(e) =>
                setReceiverInfo({ ...receiverInfo, deliveryInstruction: e.target.value })
              }
              className="input input-bordered w-full mb-2"
            />
          </div>
        </div>

        <button type="submit" className="btn btn-primary w-full">
          Submit
        </button>
      </form>
    </div>
  );
};

export default SendAParcel;
