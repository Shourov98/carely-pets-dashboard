"use client";

import { useState } from "react";
import { User, Trash2, ChevronDown } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";

// ---- TAB LIST ----
const tabs = ["Profile", "Pets", "Service"];

export default function PetOwnerDetails() {
  const { id } = useParams();
  const [activeTab, setActiveTab] = useState("Profile");
  const [openAccordion, setOpenAccordion] = useState<number | null>(null);

  // Dummy Data (replace with real API later)
  const owner = {
    name: "Steve Hard",
    username: "@username",
    email: "john@gmail.com",
    phone: "985 659 5955",
    address: "43, John hopkins road, NYC",
    country: "USA",
    joinDate: "Jan 25, 2024",
    deletionLeft: "20 days left",
    avatar:
      "https://images.unsplash.com/photo-1502685104226-ee32379fefbe?q=80&w=800",
    status: "Active",
    reportCount: 15658,
    reportOnPost: 4,
  };

  const pets = [
    {
      id: 1,
      name: "Buddy",
      gender: "Female",
      type: "Persian Cat",
      age: "2 years old",
      img: "https://images.unsplash.com/photo-1592194996308-7b43878e84a6?w=800",
    },
    {
      id: 2,
      name: "Buddy",
      gender: "Male",
      type: "Persian Cat",
      age: "2 years old",
      img: "https://images.unsplash.com/photo-1568572933382-74d440642117?w=800",
    },
    {
      id: 3,
      name: "Buddy",
      gender: "Female",
      type: "Persian Cat",
      age: "2 years old",
      img: "https://images.unsplash.com/photo-1517849845537-4d257902454a?w=800",
    },
  ];

  const services = [
    {
      id: 1,
      service: "Grooming",
      date: "Tuesday, Oct 25, 2026",
      price: "$250.00",
      status: "Processing",
    },
    {
      id: 2,
      service: "Grooming",
      date: "Tuesday, Oct 25, 2026",
      price: "$250.00",
      status: "Completed",
    },
  ];

  return (
    <div className="w-full space-y-10">
      {/* ---- HEADER ---- */}
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">
            Detail of Pet Owner {id}
          </h1>
          <p className="text-sm text-gray-500">
            This section will show every details of a particular user.
          </p>
        </div>
      </div>

      {/* ---- TABS ---- */}
      <div className="border-b">
        <div className="flex items-center gap-8">
          {tabs.map((t) => (
            <button
              key={t}
              onClick={() => setActiveTab(t)}
              className={`pb-3 text-lg font-medium transition ${
                activeTab === t
                  ? "text-[#00A7C7] border-b-2 border-[#00A7C7]"
                  : "text-gray-600 hover:text-gray-800"
              }`}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      {/* ---- PROFILE TAB ---- */}
      {activeTab === "Profile" && (
        <div className="space-y-10">
          {/* USER HEADER */}
          <div className="flex items-center gap-6">
            <Image
              src={owner.avatar}
              width={90}
              height={90}
              className="rounded-full object-cover"
              alt="avatar"
            />

            <div>
              <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm flex items-center w-fit gap-2">
                {owner.status}
                <span className="h-2 w-2 bg-green-600 rounded-full" />
              </span>

              <h2 className="text-xl text-gray-800 mt-2">{owner.name}</h2>
              <p className="text-gray-600">{owner.username}</p>
            </div>
          </div>

          {/* REPORT SUMMARY GRID */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* REPORT COUNT */}
            <div className="p-6 rounded-xl bg-gray-50 border flex justify-between items-center">
              <div>
                <p className="text-xs text-gray-500 font-semibold">
                  REPORT COUNT
                </p>
                <p className="text-2xl text-gray-800 font-bold mt-1">
                  {owner.reportCount}
                </p>
              </div>
              <div className="w-12 h-12 bg-purple-100 text-purple-600 rounded-xl flex items-center justify-center">
                №
              </div>
            </div>

            {/* REPORT ON POST */}
            <div className="p-6 rounded-xl bg-gray-50 border flex justify-between items-center">
              <div>
                <p className="text-xs text-gray-500 font-semibold">
                  REPORT ON POST
                </p>
                <p className="text-2xl text-gray-800 font-bold mt-1">
                  {owner.reportOnPost}
                </p>
              </div>
              <div className="w-12 h-12 bg-orange-100 text-orange-600 rounded-xl flex items-center justify-center">
                !
              </div>
            </div>
          </div>

          {/* INFO GRID */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            <div>
              <p className="text-xs text-gray-500">EMAIL</p>
              <p className="text-gray-800 font-medium border-b pb-2 mt-1">
                {owner.email}
              </p>
            </div>

            <div>
              <p className="text-xs text-gray-500">PHONE</p>
              <p className="text-gray-800 font-medium border-b pb-2 mt-1">
                {owner.phone}
              </p>
            </div>

            <div>
              <p className="text-xs text-gray-500">ADDRESS</p>
              <p className="text-gray-800 font-medium border-b pb-2 mt-1">
                {owner.address}
              </p>
            </div>

            <div>
              <p className="text-xs text-gray-500">COUNTRY</p>
              <p className="text-gray-800 font-medium border-b pb-2 mt-1">
                {owner.country}
              </p>
            </div>

            <div>
              <p className="text-xs text-gray-500">JOINING DATE</p>
              <p className="text-gray-800 font-medium border-b pb-2 mt-1">
                {owner.joinDate}
              </p>
            </div>

            <div>
              <p className="text-xs text-gray-500">
                DELETION (30 days timeline)
              </p>
              <p className="text-red-500 font-medium border-b pb-2 mt-1">
                {owner.deletionLeft}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* ---- PETS TAB ---- */}
      {activeTab === "Pets" && (
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-8">
          {pets.map((p) => (
            <div
              key={p.id}
              className="rounded-xl bg-white border shadow-sm overflow-hidden"
            >
              <img src={p.img} className="w-full h-52 object-cover" alt="" />

              <div className="p-4 space-y-2">
                <div className="flex justify-between items-start">
                  <p className="font-semibold text-gray-800">
                    {p.name} {p.id}
                  </p>

                  <span
                    className={`px-3 py-1 rounded-full text-xs ${
                      p.gender === "Female"
                        ? "bg-pink-100 text-pink-600"
                        : "bg-blue-100 text-blue-600"
                    }`}
                  >
                    {p.gender}
                  </span>
                </div>

                <p className="text-sm text-gray-800">
                  {p.type} • {p.age}
                </p>

                <Link
                  href={`/dashboard/pal-management/${id}/pet/${p.id}`}
                  className="block w-full text-center mt-3 py-2 rounded-lg bg-[#D6F2F8] hover:bg-[#c9edf5] text-gray-800 font-medium"
                >
                  Pet Facts
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* ---- SERVICE TAB ---- */}
      {activeTab === "Service" && (
        <div className="space-y-4">
          {services.map((s) => {
            const isOpen = openAccordion === s.id;

            return (
              <div
                key={s.id}
                className="bg-white border rounded-xl shadow-sm overflow-hidden"
              >
                {/* Accordion Header */}
                <button
                  onClick={() => setOpenAccordion(isOpen ? null : s.id)}
                  className="w-full flex justify-between items-center px-5 py-4 text-left"
                >
                  <div>
                    <p className="text-sm text-gray-500 font-medium">
                      {s.service}
                    </p>
                    <p className="text-lg text-gray-800 font-semibold">
                      {s.price}
                    </p>
                  </div>

                  <div className="flex items-center gap-3">
                    <span
                      className={`px-3 py-1 rounded-full text-xs flex items-center gap-2 ${
                        s.status === "Processing"
                          ? "bg-yellow-100 text-yellow-700"
                          : "bg-green-100 text-green-700"
                      }`}
                    >
                      {s.status}
                      <span
                        className={`h-2 w-2 rounded-full ${
                          s.status === "Processing"
                            ? "bg-yellow-500"
                            : "bg-green-500"
                        }`}
                      />
                    </span>

                    <ChevronDown
                      className={`h-5 w-5 text-gray-600 transition-transform ${
                        isOpen ? "rotate-180" : ""
                      }`}
                    />
                  </div>
                </button>

                {/* Accordion Content */}
                <div
                  className={`transition-all duration-300 ${
                    isOpen ? "max-h-[2000px] py-6" : "max-h-0"
                  } overflow-hidden px-5`}
                >
                  {/* SERVICE ID */}
                  <div className="mb-5">
                    <p className="text-xs text-gray-500 font-semibold">
                      SERVICE ID
                    </p>
                    <p className="text-gray-800 font-medium">{s.id}</p>
                  </div>

                  {/* CUSTOMER INFO */}
                  <div className="p-5 border rounded-xl mb-6">
                    <div className="flex justify-between items-center mb-4">
                      <p className="text-gray-800 font-semibold">
                        Customer Information
                      </p>

                      <span
                        className={`px-3 py-1 rounded-full text-xs flex items-center gap-2 ${
                          s.status === "Processing"
                            ? "bg-yellow-100 text-yellow-700"
                            : "bg-green-100 text-green-700"
                        }`}
                      >
                        {s.status}
                        <span
                          className={`h-2 w-2 rounded-full ${
                            s.status === "Processing"
                              ? "bg-yellow-500"
                              : "bg-green-500"
                          }`}
                        />
                      </span>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <p className="text-xs text-gray-500 font-medium">
                          NAME
                        </p>
                        <p className="text-gray-800 font-medium">John Doe</p>
                      </div>

                      <div>
                        <p className="text-xs text-gray-500 font-medium">
                          PHONE
                        </p>
                        <p className="text-gray-800 font-medium">
                          555 666 8898
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* SERVICE DETAILS */}
                  <div className="p-5 border rounded-xl mb-6 space-y-5">
                    <DetailRow
                      label="SERVICE"
                      value={s.service}
                      icon="/icons/service.svg"
                    />
                    <DetailRow
                      label="DATE & TIME"
                      value={s.date}
                      icon="/icons/calendar.svg"
                    />
                    <DetailRow
                      label="WITH"
                      value="Carely Pets"
                      icon="/icons/location.svg"
                    />
                    <DetailRow
                      label="FOR"
                      value="Bubby"
                      icon="/icons/paw.svg"
                    />
                  </div>

                  {/* ORDER SUMMARY */}
                  <div className="p-5 border rounded-xl">
                    <p className="text-gray-800 font-semibold mb-4">
                      Order Summary
                    </p>

                    <div className="space-y-2 text-gray-700">
                      <div className="flex justify-between">
                        <span>Grooming</span>
                        <span>{s.price}</span>
                      </div>

                      <div className="flex justify-between">
                        <span>Subtotal</span>
                        <span>{s.price}</span>
                      </div>

                      <div className="flex justify-between">
                        <span>Tax (5%)</span>
                        <span>$12.50</span>
                      </div>

                      <hr className="my-3" />

                      <div className="flex justify-between font-semibold text-gray-800">
                        <span>Total</span>
                        <span>$237.50</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

function DetailRow({
  label,
  value,
  icon,
}: {
  label: string;
  value: string | number;
  icon: string;
}) {
  return (
    <div className="flex items-center gap-4">
      <div className="w-10 h-10 rounded-full bg-[#D6F2F8] flex items-center justify-center">
        <img src={icon} className="w-5 h-5 opacity-70" alt="" />
      </div>

      <div>
        <p className="text-[11px] text-gray-500 font-medium tracking-wide">
          {label}
        </p>
        <p className="text-gray-800 font-medium">{value}</p>
      </div>
    </div>
  );
}

function ServiceDetailRow({
  service,
}: {
  service: {
    id: number;
    service: string;
    date: string;
    price: string;
    status: string;
  };
}) {
  return (
    <div className="flex items-start justify-between bg-white border rounded-xl p-6 shadow-sm">
      {/* LEFT — ICON + TEXT */}
      <div className="flex items-start gap-4">
        {/* Icon */}
        <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center">
          <Image
            src="/icons/service-grooming.svg" // update icon if needed
            width={24}
            height={24}
            alt="service-icon"
            className="opacity-80"
          />
        </div>

        {/* Text Info */}
        <div>
          <p className="text-xs font-semibold text-gray-500">SERVICE</p>
          <p className="text-gray-800 font-medium">{service.service}</p>

          <p className="text-xs text-gray-500 mt-3">DATA & TIME</p>
          <p className="text-gray-800 font-medium">{service.date}</p>

          <p className="text-xl text-gray-800 font-bold mt-3">
            {service.price}
          </p>
        </div>
      </div>

      {/* RIGHT — STATUS */}
      <span
        className={`px-3 py-1 rounded-full text-xs flex items-center gap-1 h-fit
        ${
          service.status === "Processing"
            ? "bg-yellow-100 text-yellow-700"
            : "bg-green-100 text-green-700"
        }`}
      >
        {service.status}
        <span
          className={`h-2 w-2 rounded-full ${
            service.status === "Processing" ? "bg-yellow-500" : "bg-green-500"
          }`}
        />
      </span>
    </div>
  );
}
