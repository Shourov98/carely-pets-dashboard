"use client";

import { ChangeEvent, FormEvent, useRef, useState } from "react";
import { Upload, Eye, X, ChevronDown, Plus } from "lucide-react";
import { GenderRow } from "./GenderRow";
import { TrainingRow } from "./TrainingRow";
import { VaccinationRow } from "./VaccinationRow";
import { NeuteredRow } from "./NeuteredRow";
import HealthRecordsSection from "./HealthRecordsSection";
import { HealthRecordFormValues } from "./HealthRecordFormModal";
import { useAppSelector } from "../../../store/hooks";

export default function AddPetForAdoption() {
  const [petInfoOpen, setPetInfoOpen] = useState(false);
  const [shelterInfoOpen, setShelterInfoOpen] = useState(false);
  const [snaps, setSnaps] = useState<File[]>([]);
  const [snapError, setSnapError] = useState<string | null>(null);
  const [traits, setTraits] = useState<string[]>([]);
  const [traitInput, setTraitInput] = useState("");
  const [healthRecords, setHealthRecords] = useState<HealthRecordFormValues[]>(
    []
  );
  const [submitStatus, setSubmitStatus] = useState<
    "idle" | "loading" | "succeeded" | "failed"
  >("idle");
  const [submitError, setSubmitError] = useState<string | null>(null);
  const snapInputRef = useRef<HTMLInputElement>(null);
  const accessToken = useAppSelector((state) => state.auth.tokens?.accessToken);
  const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
  const normalizedBaseUrl = baseUrl ? baseUrl.replace(/\/+$/, "") : "";
  const maxFileSizeBytes = 15 * 1024 * 1024;

  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return `${bytes}B`;
    const kb = bytes / 1024;
    if (kb < 1024) return `${kb.toFixed(1)}KB`;
    return `${(kb / 1024).toFixed(1)}MB`;
  };

  const handleSnapSelect = (event: ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files ?? []);
    if (!files.length) return;

    const oversizeFiles = files.filter((file) => file.size > maxFileSizeBytes);
    const allowedFiles = files.filter((file) => file.size <= maxFileSizeBytes);
    const next = [...snaps, ...allowedFiles].slice(0, 3);
    const errors: string[] = [];

    if (oversizeFiles.length) {
      errors.push("Each snap must be 15MB or less.");
    }
    if (snaps.length + allowedFiles.length > 3) {
      errors.push("You can upload up to 3 snaps.");
    }

    setSnapError(errors.length ? errors.join(" ") : null);
    setSnaps(next);
    event.target.value = "";
  };

  const removeSnap = (index: number) => {
    setSnaps(snaps.filter((_, i) => i !== index));
  };

  const addTrait = () => {
    const trimmed = traitInput.trim();
    if (!trimmed) return;
    if (traits.includes(trimmed)) return;
    if (traits.length >= 5) return;
    setTraits([...traits, trimmed]);
    setTraitInput("");
  };

  const removeTrait = (trait: string) => {
    setTraits(traits.filter((t) => t !== trait));
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitError(null);

    if (snaps.length < 1 || snaps.length > 3) {
      setSubmitError("Pet snaps must be between 1 and 3 files.");
      return;
    }
    if (snaps.some((file) => file.size > maxFileSizeBytes)) {
      setSubmitError("Each snap must be 15MB or less.");
      return;
    }

    const invalidRecord = healthRecords.find(
      (record) =>
        record.attachments.length < 1 || record.attachments.length > 3
    );
    if (invalidRecord) {
      setSubmitError(
        `Health record "${invalidRecord.type}" must include 1-3 attachments.`
      );
      return;
    }
    const oversizeRecord = healthRecords.find((record) =>
      record.attachments.some((file) => file.size > maxFileSizeBytes)
    );
    if (oversizeRecord) {
      setSubmitError(
        `Health record "${oversizeRecord.type}" has files over 15MB.`
      );
      return;
    }

    if (!normalizedBaseUrl) {
      setSubmitError("NEXT_PUBLIC_API_BASE_URL is not set.");
      return;
    }

    if (!accessToken) {
      setSubmitError("Missing access token.");
      return;
    }

    const formData = new FormData(event.currentTarget);
    const getValue = (name: string) => (formData.get(name) ?? "").toString();

    const payload = new FormData();
    payload.append("petName", getValue("petName"));
    payload.append("petType", getValue("petType"));
    payload.append("breed", getValue("breed"));
    payload.append("petAge", getValue("petAge"));
    payload.append("weightLbs", getValue("weightLbs"));
    payload.append("gender", getValue("gender"));
    payload.append("trained", getValue("trained"));
    payload.append("vaccinated", getValue("vaccinated"));
    payload.append("neutered", getValue("neutered"));
    payload.append("personality", JSON.stringify(traits));
    payload.append("aboutPet", getValue("aboutPet"));
    payload.append("shelterName", getValue("shelterName"));
    payload.append("shelterPhone", getValue("shelterPhone"));
    payload.append("avatarIndex", "1");

    snaps.forEach((file) => payload.append("photos", file));
    healthRecords.forEach((record) => {
      record.attachments.forEach((file) => {
        payload.append("healthRecords", file);
      });
    });
    if (healthRecords.length) {
      const healthFiles = healthRecords.map(({ attachments, ...rest }) => rest);
      payload.append("healthFiles", JSON.stringify(healthFiles));
    }

    setSubmitStatus("loading");
    setSubmitError(null);

    try {
      const response = await fetch(`${normalizedBaseUrl}/admin/adoptions`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        body: payload,
      });

      if (!response.ok) {
        let message = "Failed to add pet for adoption.";
        try {
          const errorBody = await response.json();
          message = errorBody?.message ?? message;
        } catch {
          // Keep fallback message.
        }
        throw new Error(message);
      }

      setSubmitStatus("succeeded");
      setSnaps([]);
      setTraits([]);
      setTraitInput("");
      setHealthRecords([]);
      event.currentTarget.reset();
    } catch (err) {
      setSubmitStatus("failed");
      setSubmitError(
        err instanceof Error ? err.message : "Failed to add pet for adoption."
      );
    }
  };

  return (
    <form className="space-y-10" onSubmit={handleSubmit}>
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

          <button
            type="button"
            onClick={() => snapInputRef.current?.click()}
            className="flex items-center gap-2 px-4 py-2 bg-[#D6F2F8] rounded-xl hover:bg-[#c9edf5]"
          >
            <Upload className="h-4 w-4 text-gray-700" />
            <span className="text-gray-800 text-sm font-medium">
              Upload snaps
            </span>
          </button>
        </div>

        <input
          ref={snapInputRef}
          type="file"
          multiple
          accept="image/*"
          className="hidden"
          onChange={handleSnapSelect}
        />

        {snapError && <p className="text-xs text-red-500 mt-2">{snapError}</p>}

        <div className="mt-4 space-y-3">
          {snaps.map((file, index) => (
            <div
              key={index}
              className="border rounded-xl px-4 py-3 flex justify-between items-center bg-gray-50"
            >
              <div>
                <p className="text-gray-800 font-medium">{file.name}</p>
                <p className="text-xs text-gray-500">
                  {file.type || "File"} • {formatFileSize(file.size)}
                </p>
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
      <div className="bg-white border rounded-2xl p-5 shadow-sm">
        <button
          type="button"
          onClick={() => setPetInfoOpen(!petInfoOpen)}
          className="flex w-full justify-between items-center cursor-pointer"
        >
          <p className="font-semibold text-gray-900">Pet Information</p>
          <ChevronDown
            className={`h-5 w-5 transition-transform ${
              petInfoOpen ? "rotate-180" : ""
            }`}
          />
        </button>

        {petInfoOpen && (
          <div className="mt-6 space-y-6 animate-fadeIn">
            <InputField
              label="NAME"
              name="petName"
              placeholder="Pet name"
            />
            <InputField
              label="TYPE"
              name="petType"
              placeholder="Pet type"
              dropdown
            />
            <InputField
              label="BREED"
              name="breed"
              placeholder="Choose breed"
              dropdown
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <InputField label="YEAR" name="petAge" placeholder="Pet age" />
              <InputField
                label="WEIGHT (lbs)"
                name="weightLbs"
                placeholder="Pet weight"
              />
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
                  value={traitInput}
                  onChange={(event) => setTraitInput(event.target.value)}
                  className="flex-1 bg-gray-50 border px-4 py-2 rounded-xl"
                  placeholder="Type trait and press add"
                />
                <button
                  type="button"
                  onClick={addTrait}
                  className="p-3 rounded-xl bg-[#D6F2F8]"
                >
                  <Plus className="h-4 w-4 text-gray-700" />
                </button>
              </div>

              <div className="flex gap-2 mt-3 flex-wrap">
                {traits.map((trait) => (
                  <span
                    key={trait}
                    className="px-3 py-1 bg-gray-200 rounded-full text-gray-700 text-sm flex items-center gap-2"
                  >
                    {trait}
                    <X
                      className="h-4 w-4 cursor-pointer text-gray-600"
                      onClick={() => removeTrait(trait)}
                    />
                  </span>
                ))}
              </div>
            </div>

            <textarea
              placeholder="Write about your pet"
              className="w-full bg-gray-50 border px-4 py-3 rounded-xl h-28 text-gray-800"
              name="aboutPet"
            />
          </div>
        )}
      </div>

      {/* ------------------- SHELTER INFORMATION ------------------- */}
      <div className="bg-white border rounded-2xl p-5 shadow-sm">
        <button
          type="button"
          onClick={() => setShelterInfoOpen(!shelterInfoOpen)}
          className="flex w-full justify-between items-center cursor-pointer"
        >
          <p className="font-semibold text-gray-900">Shelter Information</p>
          <ChevronDown
            className={`h-5 w-5 transition-transform ${
              shelterInfoOpen ? "rotate-180" : ""
            }`}
          />
        </button>

        {shelterInfoOpen && (
          <div className="mt-6 space-y-6 animate-fadeIn">
            <InputField
              label="NAME"
              name="shelterName"
              placeholder="Carely Pets"
            />
            <InputField
              label="PHONE"
              name="shelterPhone"
              placeholder="555 235 9845"
            />
          </div>
        )}
      </div>

      {/* ------------------- HEALTH RECORDS ------------------- */}
      <HealthRecordsSection
        records={healthRecords}
        onAddRecord={(record) =>
          setHealthRecords((prev) => [...prev, record])
        }
      />

      {/* ACTION BUTTONS */}
      <div className="flex justify-end gap-4">
        <button
          type="button"
          className="px-6 py-2 rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={submitStatus === "loading"}
          className="px-6 py-2 rounded-xl bg-[#D6F2F8] hover:bg-[#c9edf5] text-gray-800 font-medium disabled:cursor-not-allowed disabled:opacity-70"
        >
          {submitStatus === "loading" ? "Saving..." : "Save"}
        </button>
      </div>
      {submitError ? (
        <p className="text-xs text-red-500" role="alert">
          {submitError}
        </p>
      ) : null}
    </form>
  );
}

/* ------------------- REUSABLE COMPONENTS ------------------- */

interface InputFieldProps {
  label: string;
  name: string;
  placeholder?: string;
  dropdown?: boolean;
}

export function InputField({
  label,
  name,
  placeholder = "",
  dropdown = false,
}: InputFieldProps) {
  return (
    <div>
      <label className="text-xs text-gray-500 font-medium">{label}</label>

      <div className="relative">
        <input
          name={name}
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
