"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import ProtectedRoute from "@/components/ProtectedRoute";
import { apiFetch } from "@/lib/api";
import { JOB_CATEGORIES } from "@/lib/constants";
import { ca } from "date-fns/locale";

export default function CreateVacancyPage() {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const [category, setCategory] = useState(JOB_CATEGORIES[0]);
  const [employmentType, setEmploymentType] = useState("full-time");
  const [status, setStatus] = useState("active"); // ✅ added
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await apiFetch("/vacancies/", {
        method: "POST",
        body: JSON.stringify({
          title,
          description,
          location,
          category,
          employment_type: employmentType,
          status, // ✅ include status
        }),
      });

      if (!res.ok) throw new Error("Failed to create vacancy");

      router.push("/dashboard/vacancies");
    } catch (err) {
      console.error(err);
      alert("Error creating vacancy");
    } finally {
      setLoading(false);
    }
  };

  return (
    <ProtectedRoute requiredRoles={["HR", "ADMIN"]}>
      <div className="bg-white shadow rounded-lg p-8 max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-rammisBlue mb-6">Create New Vacancy</h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block mb-1 font-medium text-gray-700">Job Title</label>
            <Input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter job title"
              required
            />
          </div>

          <div>
            <label className="block mb-1 font-medium text-gray-700">Job Description</label>
            <Textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Enter job description"
              required
            />
          </div>

          <div>
            <label className="block mb-1 font-medium text-gray-700">Location</label>
            <Input
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="Enter job location"
              required
            />
          </div>

          <div>
            <label className="block mb-1 font-medium text-gray-700">Job Category</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-rammisBlue"
            >
              {JOB_CATEGORIES.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block mb-1 font-medium text-gray-700">Employment Type</label>
            <select
              value={employmentType}
              onChange={(e) => setEmploymentType(e.target.value)}
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-rammisBlue"
            >
              <option value="full-time">Full-time</option>
              <option value="part-time">Part-time</option>
              <option value="contract">Contract</option>
            </select>
          </div>

          {/* ✅ Added Status Field */}
          <div>
            <label className="block mb-1 font-medium text-gray-700">Status</label>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-rammisBlue"
            >
              <option value="active">Active</option>
              <option value="closed">Closed</option>
              <option value="draft">Draft</option>
            </select>
          </div>

          <Button
            type="submit"
            className="bg-rammisBlue hover:bg-rammisBlue/90 text-white"
            disabled={loading}
          >
            {loading ? "Creating..." : "Create Vacancy"}
          </Button>
        </form>
      </div>
    </ProtectedRoute>
  );
}
