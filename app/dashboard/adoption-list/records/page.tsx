"use client";

import { useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { ChevronRight, Eye, Download } from "lucide-react";

type AttachmentType = "pdf" | "doc" | "image";

interface RecordAttachment {
  id: string;
  name: string;
  type: AttachmentType;
  url: string;
  size: string;
}

interface HealthRecord {
  id: string;
  name: string;
  updatedAt: string;
  reminder: string;
  attachments: RecordAttachment[];
}

const recordData: HealthRecord[] = [
  {
    id: "1",
    name: "Rabies vaccination",
    updatedAt: "Jan 6, 2025",
    reminder: "Reminder in 1 week",
    attachments: [
      {
        id: "1-a",
        name: "rabies-certificate.pdf",
        type: "pdf",
        url: "/file.svg",
        size: "245KB",
      },
      {
        id: "1-b",
        name: "clinic-photo.jpg",
        type: "image",
        url: "/paw.svg",
        size: "1.2MB",
      },
    ],
  },
  {
    id: "2",
    name: "DHLPP dose 2",
    updatedAt: "Jan 6, 2025",
    reminder: "Reminder in 1 week",
    attachments: [
      {
        id: "2-a",
        name: "dose2-document.doc",
        type: "doc",
        url: "/file.svg",
        size: "180KB",
      },
    ],
  },
  {
    id: "3",
    name: "Leptospirosis",
    updatedAt: "Jan 6, 2025",
    reminder: "Reminder in 1 week",
    attachments: [
      {
        id: "3-a",
        name: "lepto-summary.pdf",
        type: "pdf",
        url: "/file.svg",
        size: "210KB",
      },
      {
        id: "3-b",
        name: "exam-photo.jpg",
        type: "image",
        url: "/paw.svg",
        size: "980KB",
      },
    ],
  },
  {
    id: "4",
    name: "Bordetella",
    updatedAt: "Jan 6, 2025",
    reminder: "Reminder in 1 week",
    attachments: [
      {
        id: "4-a",
        name: "bordetella.pdf",
        type: "pdf",
        url: "/file.svg",
        size: "196KB",
      },
    ],
  },
  {
    id: "5",
    name: "Parainfluenza",
    updatedAt: "Jan 6, 2025",
    reminder: "Reminder in 1 week",
    attachments: [
      {
        id: "5-a",
        name: "parainfluenza-image.jpg",
        type: "image",
        url: "/paw.svg",
        size: "1.1MB",
      },
    ],
  },
];

export default function HealthRecordsPage() {
  const searchParams = useSearchParams();
  const recordType = searchParams.get("type") ?? "Vaccination";
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [preview, setPreview] = useState<RecordAttachment | null>(null);

  const headerCopy = useMemo(
    () => ({
      title: recordType,
      subtitle: `This section will show all information related to ${recordType.toLowerCase()}.`,
    }),
    [recordType]
  );

  const toggleRow = (id: string) => {
    setExpandedId((prev) => (prev === id ? null : id));
  };

  return (
    <div className="px-6 py-5 space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-gray-900">
          {headerCopy.title}
        </h1>
        <p className="text-sm text-gray-600 mt-1">{headerCopy.subtitle}</p>
      </div>

      <div className="space-y-4">
        {recordData.map((record, index) => {
          const isOpen = expandedId === record.id;
          return (
            <div
              key={record.id}
              className="border rounded-2xl bg-white shadow-sm"
            >
              <button
                type="button"
                onClick={() => toggleRow(record.id)}
                className="w-full px-4 py-4 flex items-center justify-between"
              >
                <div className="flex items-center gap-3">
                  <span className="w-9 h-9 rounded-full bg-emerald-50 text-emerald-700 flex items-center justify-center font-semibold text-sm">
                    {index + 1}
                  </span>
                  <div className="text-left">
                    <p className="text-sm font-semibold text-gray-900">
                      {record.name}
                    </p>
                    <p className="text-xs text-gray-500">
                      Last updated {record.updatedAt}, {record.reminder}
                    </p>
                  </div>
                </div>
                <ChevronRight
                  className={`h-5 w-5 text-gray-400 transition-transform ${
                    isOpen ? "rotate-90" : ""
                  }`}
                />
              </button>

              {isOpen && (
                <div className="border-t px-5 py-4">
                  <p className="text-xs text-gray-500 font-medium mb-3">
                    Attachments
                  </p>
                  <div className="space-y-3">
                    {record.attachments.map((attachment) => (
                      <div
                        key={attachment.id}
                        className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between border rounded-xl px-4 py-3 bg-gray-50"
                      >
                        <div>
                          <p className="text-sm font-medium text-gray-900">
                            {attachment.name}
                          </p>
                          <p className="text-xs text-gray-500">
                            {attachment.type.toUpperCase()} • {attachment.size}
                          </p>
                        </div>

                        <div className="flex items-center gap-2">
                          <button
                            type="button"
                            onClick={() => setPreview(attachment)}
                            className="px-3 py-2 rounded-lg bg-white border text-xs font-medium text-gray-700 flex items-center gap-2"
                          >
                            <Eye className="h-4 w-4" />
                            Preview
                          </button>
                          <a
                            href={attachment.url}
                            download
                            className="px-3 py-2 rounded-lg bg-[#D6F2F8] text-xs font-medium text-gray-800 flex items-center gap-2"
                          >
                            <Download className="h-4 w-4" />
                            Download
                          </a>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {preview && (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center px-4">
          <div className="bg-white rounded-2xl shadow-xl max-w-3xl w-full overflow-hidden">
            <div className="flex items-center justify-between px-5 py-4 border-b">
              <div>
                <p className="text-sm font-semibold text-gray-900">
                  {preview.name}
                </p>
                <p className="text-xs text-gray-500">
                  {preview.type.toUpperCase()} • {preview.size}
                </p>
              </div>
              <button
                type="button"
                onClick={() => setPreview(null)}
                className="text-xs text-gray-500 hover:text-gray-800"
              >
                Close
              </button>
            </div>
            <div className="p-5">
              {preview.type === "image" ? (
                <img
                  src={preview.url}
                  alt={preview.name}
                  className="w-full max-h-[70vh] object-contain rounded-xl bg-gray-50"
                />
              ) : (
                <iframe
                  title={preview.name}
                  src={preview.url}
                  className="w-full h-[70vh] rounded-xl border bg-gray-50"
                />
              )}
            </div>
            <div className="px-5 pb-5 flex justify-end">
              <a
                href={preview.url}
                download
                className="px-4 py-2 rounded-lg bg-[#D6F2F8] text-xs font-medium text-gray-800 flex items-center gap-2"
              >
                <Download className="h-4 w-4" />
                Download
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
