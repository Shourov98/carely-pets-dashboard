"use client";

import { useState } from "react";
import { Upload, Eye, X, ChevronDown, Plus } from "lucide-react";
import { GenderRow } from "./GenderRow";
import { TrainingRow } from "./TrainingRow";
import { VaccinationRow } from "./VaccinationRow";
import { NeuteredRow } from "./NeuteredRow";
import HealthRecordsSection from "./HealthRecordsSection";

export default function AddPetForAdoption() {
  const [petInfoOpen, setPetInfoOpen] = useState(false);
  const [shelterInfoOpen, setShelterInfoOpen] = useState(false);

  const [snaps, setSnaps] = useState([1, 2, 3]);

  const removeSnap = (index: number) => {
    setSnaps(snaps.filter((_, i) => i !== index));
  };

  return (
    <div className="space-y-10">
      {/* HEADER */}
      <div>
        <h1 className="text-2xl font-semibold text-gray-900">
          Add pet for adoption
        </h1>
        <p className="text-gray-600">
          This section will help admin to add information of the pet.
        </p>
      </div>

      {/* ------------------- PET SNAPS ------------------- */}
      <div className="bg-white border rounded-2xl p-5 shadow-sm">
        <div className="flex justify-between items-center">
          <div>
            <p className="font-semibold text-gray-900">Pet Snaps</p>
            <p className="text-xs text-gray-500">
              (You can upload maximum 3 snaps)
            </p>
          </div>

          <button className="flex items-center gap-2 px-4 py-2 bg-[#D6F2F8] rounded-xl hover:bg-[#c9edf5]">
            <Upload className="h-4 w-4 text-gray-700" />
            <span className="text-gray-800 text-sm font-medium">
              Upload snaps
            </span>
          </button>
        </div>

        <div className="mt-4 space-y-3">
          {snaps.map((_, index) => (
            <div
              key={index}
              className="border rounded-xl px-4 py-3 flex justify-between items-center bg-gray-50"
            >
              <div>
                <p className="text-gray-800 font-medium">File name</p>
                <p className="text-xs text-gray-500">File type • 245KB</p>
              </div>

              <div className="flex items-center gap-4">
                <Eye className="text-gray-500 h-5 w-5 cursor-pointer" />
                <X
                  className="text-gray-500 h-5 w-5 cursor-pointer"
                  onClick={() => removeSnap(index)}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ------------------- PET INFORMATION ------------------- */}
      <div
        className="bg-white border rounded-2xl p-5 shadow-sm cursor-pointer"
        onClick={() => setPetInfoOpen(!petInfoOpen)}
      >
        <div className="flex justify-between items-center">
          <p className="font-semibold text-gray-900">Pet Information</p>
          <ChevronDown
            className={`h-5 w-5 transition-transform ${
              petInfoOpen ? "rotate-180" : ""
            }`}
          />
        </div>

        {petInfoOpen && (
          <div className="mt-6 space-y-6 animate-fadeIn">
            <InputField label="NAME" placeholder="Pet name" />
            <InputField label="TYPE" placeholder="Pet type" dropdown />
            <InputField label="BREED" placeholder="Choose breed" dropdown />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <InputField label="YEAR" placeholder="Pet age" />
              <InputField label="WEIGHT (lbs)" placeholder="Pet weight" />
            </div>

            <GenderRow />
            <TrainingRow />
            <VaccinationRow />
            <NeuteredRow />

            {/* Personality */}
            <div>
              <label className="text-xs text-gray-500 font-medium">
                PERSONALITY (max 5)
              </label>
              <div className="flex gap-3 mt-2">
                <input
                  className="flex-1 bg-gray-50 border px-4 py-2 rounded-xl"
                  placeholder="Type trait and press add"
                />
                <button className="p-3 rounded-xl bg-[#D6F2F8]">
                  <Plus className="h-4 w-4 text-gray-700" />
                </button>
              </div>

              <div className="flex gap-2 mt-3 flex-wrap">
                {["Trait 1", "Trait 2", "Trait 3", "Trait 4", "Trait 5"].map(
                  (t) => (
                    <span
                      key={t}
                      className="px-3 py-1 bg-gray-200 rounded-full text-gray-700 text-sm flex items-center gap-2"
                    >
                      {t}
                      <X className="h-4 w-4 cursor-pointer text-gray-600" />
                    </span>
                  ),
                )}
              </div>
            </div>

            <textarea
              placeholder="Write about your pet"
              className="w-full bg-gray-50 border px-4 py-3 rounded-xl h-28 text-gray-800"
            />
          </div>
        )}
      </div>

      {/* ------------------- SHELTER INFORMATION ------------------- */}
      <div
        className="bg-white border rounded-2xl p-5 shadow-sm cursor-pointer"
        onClick={() => setShelterInfoOpen(!shelterInfoOpen)}
      >
        <div className="flex justify-between items-center">
          <p className="font-semibold text-gray-900">Shelter Information</p>
          <ChevronDown
            className={`h-5 w-5 transition-transform ${
              shelterInfoOpen ? "rotate-180" : ""
            }`}
          />
        </div>

        {shelterInfoOpen && (
          <div className="mt-6 space-y-6 animate-fadeIn">
            <InputField label="NAME" placeholder="Carely Pets" />
            <InputField label="PHONE" placeholder="555 235 9845" />
          </div>
        )}
      </div>

      {/* ------------------- HEALTH RECORDS ------------------- */}
      <HealthRecordsSection />

      {/* ACTION BUTTONS */}
      <div className="flex justify-end gap-4">
        <button className="px-6 py-2 rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium">
          Cancel
        </button>
        <button className="px-6 py-2 rounded-xl bg-[#D6F2F8] hover:bg-[#c9edf5] text-gray-800 font-medium">
          Save
        </button>
      </div>
    </div>
  );
}

/* ------------------- REUSABLE COMPONENTS ------------------- */

interface InputFieldProps {
  label: string;
  placeholder?: string;
  dropdown?: boolean;
}

export function InputField({
  label,
  placeholder = "",
  dropdown = false,
}: InputFieldProps) {
  return (
    <div>
      <label className="text-xs text-gray-500 font-medium">{label}</label>

      <div className="relative">
        <input
          placeholder={placeholder}
          className="w-full bg-gray-50 border px-4 py-3 rounded-xl text-gray-800 mt-1"
        />

        {dropdown && (
          <ChevronDown className="absolute right-3 top-4 text-gray-500 h-4 w-4" />
        )}
      </div>
    </div>
  );
}
