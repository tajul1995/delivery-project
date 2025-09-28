
import React, { useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { FaSearch } from "react-icons/fa";
import coverageData from "../../../assets/warehouses.json"; // dataset with 64 districts

// Fix leaflet marker issue
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
});

// FlyTo effect for region
const FlyToLocation = ({ coords }) => {
  const map = useMap();
  if (coords) {
    map.flyTo(coords, 9, { duration: 2 });
  }
  return null;
};

const Coverage = () => {
  const [search, setSearch] = useState("");
  const [selectedRegion, setSelectedRegion] = useState(null);

  // Get unique region names
  const uniqueRegions = [...new Set(coverageData.map((d) => d.region))];

  // Filter case-insensitive
  const filteredRegions = uniqueRegions.filter((region) =>
    region.toLowerCase().includes(search.toLowerCase())
  );

  // Districts inside selected region
  const regionDistricts = selectedRegion
    ? coverageData.filter((d) => d.region === selectedRegion)
    : [];

  // Default map center
  const defaultPosition = [23.685, 90.3563]; // Bangladesh

  return (
    <div className="w-full bg-base-100 py-10 px-4">
      {/* Title */}
      <h2 className="text-3xl font-bold text-center mb-6">
        We are available in 64 districts.
      </h2>

      {/* Search Box */}
      <div className="max-w-xl mx-auto mb-6 relative">
        <div className="flex items-center gap-2">
          <input
            type="text"
            placeholder="Search region..."
            className="input input-bordered w-full"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <button
            onClick={() => {
              if (filteredRegions.length > 0) {
                setSelectedRegion(filteredRegions[0]);
                setSearch(filteredRegions[0]);
              }
            }}
            className="btn btn-primary"
          >
            <FaSearch />
          </button>
        </div>

        {/* Dropdown with all regions */}
        <ul className="absolute left-0 right-0 bg-base-100 border rounded-lg shadow-md mt-1  max-h-56 overflow-y-auto z-10 mb-12">
          {filteredRegions.map((region, idx) => (
            <li
              key={idx}
              className="px-4 py-2 cursor-pointer hover:bg-base-200"
              onClick={() => {
                setSelectedRegion(region);
                setSearch(region);
              }}
            >
              {region}
            </li>
          ))}
          {filteredRegions.length === 0 && (
            <li className="px-4 py-2 text-gray-500">No region found</li>
          )}
        </ul>
      </div>

      {/* Map */}
      <div className="w-full h-[500px] rounded-xl overflow-hidden my-32 shadow-lg ">
        <MapContainer
          center={defaultPosition}
          zoom={7}
          style={{ height: "100%", width: "100%" }}
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution="&copy; OpenStreetMap contributors"
          />

          {/* Fly to region */}
          {selectedRegion && regionDistricts.length > 0 && (
            <FlyToLocation
              coords={[
                regionDistricts[0].latitude,
                regionDistricts[0].longitude,
              ]}
            />
          )}

          {/* Show only districts of selected region */}
          {regionDistricts.map((district, idx) => (
            <Marker
              key={idx}
              position={[district.latitude, district.longitude]}
            >
              <Popup>
                <h3 className="font-bold">{district.district}</h3>
                <p>
                  Region: {district.region} <br />
                  City: {district.city}
                </p>
                <p className="mt-1 text-sm">
                  Covered areas:{" "}
                  <span className="font-semibold">
                    {district.covered_area.join(", ")}
                  </span>
                </p>
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>
    </div>
  );
};

export default Coverage;

