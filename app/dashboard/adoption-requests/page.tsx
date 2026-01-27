"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { MoreHorizontal } from "lucide-react";
import ConfirmModal from "../report/ConfirmModal";
import { useRouter } from "next/navigation";
import { useAppSelector } from "../../store/hooks";

export default function AdoptRequestsPage() {
  const [statusFilter, setStatusFilter] = useState("All");
  const [menuOpen, setMenuOpen] = useState<string | "filter" | null>(null);
  const [deleteModal, setDeleteModal] = useState(false);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const menuRef = useRef<HTMLDivElement | null>(null);

  const router = useRouter();
  const accessToken = useAppSelector((state) => state.auth.tokens?.accessToken);
  const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
  const normalizedBaseUrl = baseUrl ? baseUrl.replace(/\/+$/, "") : "";
  const [requests, setRequests] = useState<AdoptionRequest[]>([]);
  const [fetchStatus, setFetchStatus] = useState<
    "idle" | "loading" | "failed"
  >("idle");
  const [fetchError, setFetchError] = useState<string | null>(null);

  interface AdoptionRequest {
    id: string;
    listingId: string;
    customerId?: string | null;
    customerName?: string | null;
    petType: string;
    petBreed: string;
    petAge: number;
    status: string;
  }

  const filtered = useMemo(() => {
    if (statusFilter === "All") return requests;
    const target = statusFilter.toLowerCase();
    return requests.filter(
      (request) => request.status?.toLowerCase() === target,
    );
  }, [requests, statusFilter]);

  const handleDelete = () => {
    console.log("Deleting ID:", selectedId);
    setDeleteModal(false);
  };

  useEffect(() => {
    if (!normalizedBaseUrl) {
      setFetchStatus("failed");
      setFetchError("NEXT_PUBLIC_API_BASE_URL is not set.");
      return;
    }
    if (!accessToken) {
      setFetchStatus("failed");
      setFetchError("Missing access token.");
      return;
    }

    const controller = new AbortController();
    const fetchRequests = async () => {
      setFetchStatus("loading");
      setFetchError(null);
      try {
        const response = await fetch(
          `${normalizedBaseUrl}/admin/adoptions/requests?status=all`,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
            signal: controller.signal,
          },
        );

        if (!response.ok) {
          let message = "Failed to load adoption requests.";
          try {
            const errorBody = await response.json();
            message = errorBody?.message ?? message;
          } catch {
            try {
              const errorText = await response.text();
              if (errorText) message = errorText;
            } catch {
              // Keep fallback message.
            }
          }
          throw new Error(message);
        }

        const body = await response.json();
        const records = Array.isArray(body?.data) ? body.data : [];
        setRequests(records);
        setFetchStatus("idle");
      } catch (err) {
        if (err instanceof DOMException && err.name === "AbortError") return;
        setFetchStatus("failed");
        setFetchError(
          err instanceof Error
            ? err.message
            : "Failed to load adoption requests.",
        );
      }
    };

    fetchRequests();
    return () => controller.abort();
  }, [accessToken, normalizedBaseUrl]);

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
            onClick={() => setMenuOpen(menuOpen === "filter" ? null : "filter")}
          >
            Status ▾
          </button>

          {menuOpen === "filter" && (
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
            {fetchStatus === "loading" ? (
              <tr className="border-t">
                <td
                  colSpan={7}
                  className="py-6 px-5 text-center text-gray-600"
                >
                  Loading adoption requests...
                </td>
              </tr>
            ) : fetchStatus === "failed" ? (
              <tr className="border-t">
                <td
                  colSpan={7}
                  className="py-6 px-5 text-center text-red-600"
                >
                  {fetchError ?? "Failed to load adoption requests."}
                </td>
              </tr>
            ) : filtered.length === 0 ? (
              <tr className="border-t">
                <td
                  colSpan={7}
                  className="py-6 px-5 text-center text-gray-600"
                >
                  No adoption requests found.
                </td>
              </tr>
            ) : (
              filtered.map((item, idx) => (
              <tr
                key={item.id}
                className="border-t border-gray-300 text-gray-800"
              >
                <td className="py-4 px-6">{idx + 1}</td>
                <td className="py-4 px-6">
                  {item.customerName?.trim() ? item.customerName : "N/A"}
                </td>
                <td className="py-4 px-6">{item.petType}</td>
                <td className="py-4 px-6">{item.petBreed}</td>
                <td className="py-4 px-6">
                  {item.petAge} year{item.petAge === 1 ? "" : "s"}
                </td>

                {/* STATUS */}
                <td className="py-4 px-6">
                  {item.status?.toLowerCase() === "pending" ? (
                    <span className="px-3 py-1 bg-yellow-100 text-yellow-700 text-xs rounded-full flex items-center gap-1 w-fit">
                      Pending
                      <span className="h-2 w-2 bg-yellow-500 rounded-full" />
                    </span>
                  ) : (
                    <span className="px-3 py-1 bg-green-100 text-green-700 text-xs rounded-full flex items-center gap-1 w-fit">
                      Delivered
                      <span className="h-2 w-2 bg-green-500 rounded-full" />
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
            ))
            )}
          </tbody>
        </table>
      </div>

      {/* FOOTER */}
      <p className="text-gray-600 text-sm mt-4">
        No of Results {filtered.length} out of {requests.length}
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
