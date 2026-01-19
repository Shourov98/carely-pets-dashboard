"use client";

import Image from "next/image";
import Link from "next/link";
import { Eye, ChevronDown } from "lucide-react";

export default function ViewPetPage() {
  const snaps = [
    { id: 1, name: "File name", size: "245KB" },
    { id: 2, name: "File name", size: "245KB" },
    { id: 3, name: "File name", size: "245KB" },
  ];

  const healthRecords = [
    {
      label: "Vaccination",
      count: 12,
      color: "bg-green-100",
      dot: "bg-green-500",
    },
    { label: "Check-up", count: 12, color: "bg-blue-100", dot: "bg-blue-500" },
    { label: "Medication", count: 12, color: "bg-red-100", dot: "bg-red-500" },
    {
      label: "Tick & Flea",
      count: 12,
      color: "bg-purple-100",
      dot: "bg-purple-500",
    },
    { label: "Surgery", count: 12, color: "bg-pink-100", dot: "bg-pink-500" },
    {
      label: "Dental",
      count: 12,
      color: "bg-orange-100",
      dot: "bg-orange-500",
    },
    { label: "Other", count: 12, color: "bg-gray-100", dot: "bg-gray-500" },
  ];

  return (
    <div className="px-6 py-5">
      {/* PAGE HEADER */}
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">
            View pet for adoption
          </h1>
          <p className="text-sm text-gray-600 mt-1">
            This section will display all the information that you have added.
          </p>
        </div>

        <button className="px-4 py-2 bg-[#D6F2F8] hover:bg-[#c9edf5] rounded-lg flex items-center gap-2 text-gray-800">
          <svg
            width="18"
            height="18"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path d="M12 20h9" />
            <path d="M16.5 3.5a4 4 0 0 1 5.6 5.6l-9.1 9.1L10 14l6.5-10.5Z" />
          </svg>
          Edit
        </button>
      </div>

      {/* PET TITLE */}
      <div className="flex items-center gap-2 mt-6">
        <h2 className="text-2xl font-semibold text-gray-900">Bubby</h2>
        <span className="text-gray-600 text-sm">• 2 years</span>
      </div>

      {/* PET MAIN DETAILS */}
      <div className="grid md:grid-cols-3 gap-6 bg-none border-t mt-6 pt-6">
        <Detail icon="🐶" title="TYPE" value="Dog" />
        <Detail icon="♂️" title="GENDER" value="Male" />
        <Detail icon="🐕" title="BREED" value="Husky" />

        <Detail icon="🎓" title="TRAINED" value="Yes" />
        <Detail icon="✂️" title="NEUTERED" value="Yes" />
        <Detail icon="💉" title="VACCINATED" value="Yes" />

        <Detail icon="❤️" title="HEART RATE" value="45 bpm" />
        <Detail icon="🫁" title="RESPIRATORY" value="56 rpm" />
        <Detail icon="🌡️" title="TEMPERATURE" value="36°C" />

        <Detail icon="⚖️" title="WEIGHT" value="56 lbs" />

        <div className="flex gap-3 items-start mt-4">
          <div className="w-9 h-9 rounded-full bg-blue-50 flex items-center justify-center text-xl">
            🏠
          </div>
          <div>
            <p className="text-xs text-gray-500 font-medium">
              Shelter Information
            </p>
            <p className="font-medium text-gray-800">Carely Pets</p>
            <p className="text-gray-500 text-sm">555 458 5555</p>
          </div>
        </div>

        <div className="md:col-span-3 mt-4">
          <p className="text-xs text-gray-500 font-medium">PERSONALITY</p>
          <p className="font-medium text-gray-800 mt-1">
            Friendly, Loyal, Good with kids, Intelligent, Energetic
          </p>
        </div>
      </div>

      {/* ABOUT PET */}
      <div className="mt-10">
        <h3 className="text-lg font-semibold text-gray-900">About Pet</h3>

        <p className="text-gray-700 text-sm mt-2 max-w-3xl">
          A playful, affectionate cat who spends her days exploring cozy
          corners, chasing soft toys, and curling up in warm laps. She’s
          curious, gentle, and always ready to share a quiet moment of comfort.
          <button className="text-[#00A9C8] ml-1 hover:underline">
            See more
          </button>
        </p>
      </div>

      {/* PET SNAPS */}
      <div className="mt-10">
        <h3 className="text-lg font-semibold text-gray-900">Pet Snaps</h3>

        <div className="mt-4 border rounded-xl bg-white">
          {snaps.map((file) => (
            <div
              key={file.id}
              className="flex items-center justify-between px-4 py-4 border-b last:border-0"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center text-purple-600">
                  📷
                </div>
                <div>
                  <p className="font-medium text-gray-800">{file.name}</p>
                  <p className="text-xs text-gray-500">
                    File type • {file.size}
                  </p>
                </div>
              </div>

              <Eye className="text-gray-500 w-5 h-5 cursor-pointer" />
            </div>
          ))}
        </div>
      </div>

      {/* HEALTH RECORDS */}
      <div className="mt-12">
        <h3 className="text-lg font-semibold text-gray-900">Health Records</h3>
        <p className="text-sm text-gray-600 mt-1">
          All the health records are recorded here. You can pick individual to
          view that file.
        </p>

        <div className="grid md:grid-cols-4 gap-6 mt-5">
          {healthRecords.map((rec) => (
            <div
              key={rec.label}
              className="rounded-xl bg-white border shadow-sm p-5"
            >
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-sm font-medium text-gray-800">
                    {rec.label}
                  </p>
                  <p className="text-2xl font-bold text-gray-900 mt-2">
                    {rec.count}
                  </p>
                </div>

                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center ${rec.color}`}
                >
                  <span className={`w-2 h-2 rounded-full ${rec.dot}`}></span>
                </div>
              </div>

              <Link
                href={`/dashboard/adoption-list/records?type=${encodeURIComponent(
                  rec.label
                )}`}
                className="mt-4 text-sm text-gray-700 font-medium w-full py-2 rounded-lg bg-gray-50 hover:bg-gray-100 flex items-center justify-center gap-1"
              >
                View →
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ----------- REUSABLE DETAIL ITEM ----------- */
function Detail({
  icon,
  title,
  value,
}: {
  icon: string;
  title: string;
  value: string;
}) {
  return (
    <div className="flex gap-3 items-start">
      <div className="w-10 h-10 rounded-full bg-[#D6F2F8] flex items-center justify-center text-xl">
        {icon}
      </div>
      <div>
        <p className="text-xs text-gray-500 font-medium">{title}</p>
        <p className="font-medium text-gray-800">{value}</p>
      </div>
    </div>
  );
}
