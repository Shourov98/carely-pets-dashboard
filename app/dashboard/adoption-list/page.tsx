"use client";

import { useEffect, useRef, useState } from "react";
import { MoreHorizontal, ChevronLeft, ChevronRight, Plus } from "lucide-react";
import ConfirmModal from "../report/ConfirmModal";
import { useRouter } from "next/navigation";

export default function AdoptionManagementPage() {
  const [menuOpenId, setMenuOpenId] = useState<number | null>(null);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [selectedId, setSelectedId] = useState<number | null>(null);

  const menuRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setMenuOpenId(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const router = useRouter();

  const data = [
    { id: 1, type: "Dog", breed: "Husky", age: "1 year", status: "Available" },
    {
      id: 2,
      type: "Cat",
      breed: "Persian Cat",
      age: "1 year",
      status: "Adopted",
    },
    {
      id: 3,
      type: "Dog",
      breed: "Labrador Retriever",
      age: "1 year",
      status: "Available",
    },
    {
      id: 4,
      type: "Bird",
      breed: "Parrot",
      age: "1 year",
      status: "Available",
    },
    {
      id: 5,
      type: "Exotic Pet",
      breed: "Hermann's tortoise",
      age: "1 year",
      status: "Adopted",
    },
  ];

  const openDeleteModal = (id: number) => {
    setSelectedId(id);
    setDeleteOpen(true);
    setMenuOpenId(null);
  };

  const confirmDelete = () => {
    console.log("Deleting pet with ID:", selectedId);
    setDeleteOpen(false);
  };

  return (
    <div className="w-full space-y-8">
      {/* HEADER */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">
            Adoption List
          </h1>
          <p className="text-gray-500 text-sm">
            This section will show those pets you want to put on auction on your
            app.
          </p>
        </div>

        {/* ADD BUTTON */}
        <button
          onClick={() => router.push("/dashboard/adoption-list/add")}
          className="flex items-center gap-2 bg-[#D6F2F8] hover:bg-[#c8eef4] px-5 py-2 rounded-xl font-medium text-gray-800"
        >
          <Plus className="h-5 w-5" />
          Add Pet for Adoption
        </button>
      </div>

      {/* TABLE */}
      <div className="bg-white border rounded-2xl shadow-sm overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-gray-50">
            <tr>
              {[
                "NO.",
                "Pet Type",
                "Pet Breed",
                "Pet Age",
                "Status",
                "Action",
              ].map((title) => (
                <th
                  key={title}
                  className="py-3 px-5 text-sm font-medium text-gray-600"
                >
                  {title}
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {data.map((item, index) => (
              <tr key={item.id} className="border-t">
                <td className="py-4 px-5 text-gray-700">{index + 1}</td>
                <td className="py-4 px-5 text-gray-900">{item.type}</td>
                <td className="py-4 px-5 text-gray-700">{item.breed}</td>
                <td className="py-4 px-5 text-gray-700">{item.age}</td>

                {/* STATUS BADGE */}
                <td className="py-4 px-5">
                  {item.status === "Available" ? (
                    <span className="px-3 py-1 bg-yellow-100 text-yellow-700 text-xs rounded-full flex items-center gap-1 w-fit">
                      Available
                      <span className="h-2 w-2 bg-yellow-500 rounded-full" />
                    </span>
                  ) : (
                    <span className="px-3 py-1 bg-green-100 text-green-700 text-xs rounded-full flex items-center gap-1 w-fit">
                      Adopted
                      <span className="h-2 w-2 bg-green-500 rounded-full" />
                    </span>
                  )}
                </td>

                {/* ACTION MENU */}
                <td className="py-4 px-5 relative">
                  <button
                    onClick={() =>
                      setMenuOpenId(menuOpenId === item.id ? null : item.id)
                    }
                    className="p-2 hover:bg-gray-100 rounded-xl"
                  >
                    <MoreHorizontal className="h-5 w-5 text-gray-700" />
                  </button>

                  {menuOpenId === item.id && (
                    <div
                      ref={menuRef}
                      className="absolute right-5 mt-2 w-32 bg-white border rounded-xl shadow-md z-20"
                    >
                      <button
                        className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-50"
                        onClick={() =>
                          router.push("/dashboard/adoption-list/view")
                        }
                      >
                        View
                      </button>
                      <button
                        className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-50"
                        onClick={() =>
                          router.push("/dashboard/adoption-list/edit")
                        }
                      >
                        Edit
                      </button>
                      <button
                        className="w-full text-left px-4 py-2 text-red-600 hover:bg-gray-50"
                        onClick={() => openDeleteModal(item.id)}
                      >
                        Delete
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
      <p className="text-sm text-gray-600">No of Results 8 out of 100</p>

      {/* PAGINATION */}
      <div className="flex items-center gap-2">
        <button className="p-2 border rounded-lg hover:bg-gray-50">
          <ChevronLeft className="h-4 w-4 text-gray-700" />
        </button>

        <button className="px-4 py-2 border rounded-lg bg-black text-white">
          1
        </button>
        <button className="px-4 py-2 border rounded-lg text-gray-700 hover:bg-gray-50">
          2
        </button>

        <button className="p-2 border rounded-lg hover:bg-gray-50">
          <ChevronRight className="h-4 w-4 text-gray-700" />
        </button>
      </div>

      {/* DELETE MODAL */}
      {deleteOpen && (
        <ConfirmModal
          open={deleteOpen}
          onClose={() => setDeleteOpen(false)}
          onConfirm={confirmDelete}
          title="Delete Adoption Record?"
          description="Deleting this pet will remove it from adoption list permanently."
        />
      )}
    </div>
  );
}
