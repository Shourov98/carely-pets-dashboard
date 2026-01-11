"use client";

import { useEffect, useRef, useState } from "react";
import { MoreHorizontal } from "lucide-react";
import ConfirmModal from "../report/ConfirmModal";
import { useRouter } from "next/navigation";

export default function AdoptRequestsPage() {
  const [statusFilter, setStatusFilter] = useState("All");
  const [menuOpen, setMenuOpen] = useState<number | null>(null);
  const [deleteModal, setDeleteModal] = useState(false);
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const menuRef = useRef<HTMLDivElement | null>(null);

  const router = useRouter();

  const data = [
    {
      id: 1,
      name: "Courtney Henry",
      pet: "Dog",
      breed: "Husky",
      age: "1 year",
      status: "Pending",
    },
    {
      id: 2,
      name: "Guy Hawkins",
      pet: "Cat",
      breed: "Persian Cat",
      age: "1 year",
      status: "Delivered",
    },
    {
      id: 3,
      name: "Wade Warren",
      pet: "Dog",
      breed: "Labrador Retriever",
      age: "1 year",
      status: "Pending",
    },
    {
      id: 4,
      name: "Theresa Webb",
      pet: "Bird",
      breed: "Parrot",
      age: "1 year",
      status: "Pending",
    },
    {
      id: 5,
      name: "Savannah Nguyen",
      pet: "Exotic Pet",
      breed: "Hermann's tortoise",
      age: "1 year",
      status: "Delivered",
    },
  ];

  const filtered =
    statusFilter === "All"
      ? data
      : data.filter((i) => i.status === statusFilter);

  const handleDelete = () => {
    console.log("Deleting ID:", selectedId);
    setDeleteModal(false);
  };

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setMenuOpen(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="p-6">
      {/* HEADER */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">
            Adoption Request
          </h1>
          <p className="text-gray-600 text-sm mt-1">
            This section will show which customers request for adoption.
          </p>
        </div>

        {/* STATUS FILTER */}
        <div className="relative">
          <button
            className="px-4 py-2 border-0 rounded-xl text-gray-800 bg-[#00a7c7]/30 flex items-center gap-2"
            onClick={() => setMenuOpen(menuOpen === -1 ? null : -1)}
          >
            Status ▾
          </button>

          {menuOpen === -1 && (
            <div
              ref={menuRef}
              className="absolute right-0 mt-2 w-40 bg-white shadow-lg rounded-xl border z-20"
            >
              <button
                onClick={() => {
                  setStatusFilter("Pending");
                  setMenuOpen(null);
                }}
                className="w-full text-left px-4 py-2 hover:bg-gray-50 text-gray-800"
              >
                Pending
              </button>
              <button
                onClick={() => {
                  setStatusFilter("Delivered");
                  setMenuOpen(null);
                }}
                className="w-full text-left px-4 py-2 hover:bg-gray-50 text-gray-800"
              >
                Delivered
              </button>

              <button
                onClick={() => {
                  setStatusFilter("All");
                  setMenuOpen(null);
                }}
                className="w-full text-left px-4 py-2 hover:bg-gray-50 text-gray-800 border-t"
              >
                Show All
              </button>
            </div>
          )}
        </div>
      </div>

      {/* TABLE */}
      <div className="mt-6 bg-white border rounded-xl overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50 text-gray-700 text-left text-sm font-medium">
            <tr>
              <th className="py-3 px-6">NO.</th>
              <th className="py-3 px-6">Customer name</th>
              <th className="py-3 px-6">Pet Type</th>
              <th className="py-3 px-6">Pet Breed</th>
              <th className="py-3 px-6">Pet Age</th>
              <th className="py-3 px-6">Status</th>
              <th className="py-3 px-6">Action</th>
            </tr>
          </thead>

          <tbody>
            {filtered.map((item, idx) => (
              <tr
                key={item.id}
                className="border-t border-gray-300 text-gray-800"
              >
                <td className="py-4 px-6">{idx + 1}</td>
                <td className="py-4 px-6">{item.name}</td>
                <td className="py-4 px-6">{item.pet}</td>
                <td className="py-4 px-6">{item.breed}</td>
                <td className="py-4 px-6">{item.age}</td>

                {/* STATUS */}
                <td className="py-4 px-6">
                  {item.status === "Pending" ? (
                    <span className="px-3 py-1 bg-yellow-100 text-yellow-700 text-xs rounded-full flex items-center gap-1 w-fit">
                      Pending{" "}
                      <span className="h-2 w-2 bg-yellow-500 rounded-full"></span>
                    </span>
                  ) : (
                    <span className="px-3 py-1 bg-green-100 text-green-700 text-xs rounded-full flex items-center gap-1 w-fit">
                      Delivered{" "}
                      <span className="h-2 w-2 bg-green-500 rounded-full"></span>
                    </span>
                  )}
                </td>

                {/* ACTION MENU */}
                <td className="py-4 px-6 relative">
                  <button
                    onClick={() =>
                      setMenuOpen(menuOpen === item.id ? null : item.id)
                    }
                    className="p-2 rounded-lg hover:bg-gray-100"
                  >
                    <MoreHorizontal className="h-5 w-5 text-gray-700" />
                  </button>

                  {menuOpen === item.id && (
                    <div
                      ref={menuRef}
                      className="absolute right-6 mt-2 w-40 bg-white shadow-lg rounded-xl border-0 z-20"
                    >
                      <button
                        onClick={() =>
                          router.push(`/dashboard/adoption-requests/${item.id}`)
                        }
                        className="w-full px-4 py-2 text-left hover:bg-gray-50 text-gray-800"
                      >
                        View
                      </button>

                      <button
                        className="w-full px-4 py-2 text-left hover:bg-gray-50 text-red-600"
                        onClick={() => {
                          setSelectedId(item.id);
                          setDeleteModal(true);
                          setMenuOpen(null);
                        }}
                      >
                        Delete
                      </button>

                      <div className="border-t px-4 py-2 text-xs text-gray-500">
                        ACTION
                      </div>

                      <button className="w-full px-4 py-2 text-left hover:bg-gray-50 text-gray-800">
                        Delivered
                      </button>
                      <button className="w-full px-4 py-2 text-left hover:bg-gray-50 text-gray-800">
                        Not Delivered
                      </button>
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* FOOTER */}
      <p className="text-gray-600 text-sm mt-4">
        No of Results {filtered.length} out of {data.length}
      </p>

      {/* DELETE MODAL */}
      <ConfirmModal
        open={deleteModal}
        onClose={() => setDeleteModal(false)}
        onConfirm={handleDelete}
      />
    </div>
  );
}
