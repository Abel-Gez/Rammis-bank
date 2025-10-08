"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import ProtectedRoute from "@/components/ProtectedRoute";
import { apiFetch } from "@/lib/api";
import { JOB_CATEGORIES } from "@/lib/constants";

export default function EditVacancyPage() {
  const router = useRouter();
  const params = useParams();
  const vacancyId = params.id;

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const [category, setCategory] = useState(JOB_CATEGORIES[0]);
  const [employmentType, setEmploymentType] = useState("full-time");
  const [status, setStatus] = useState("active"); // ✅ added
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const fetchVacancy = async () => {
    setLoading(true);
    try {
      const res = await apiFetch(`/vacancies/${vacancyId}/`);
      if (!res.ok) throw new Error("Failed to fetch vacancy");
      const data = await res.json();

      setTitle(data.title);
      setDescription(data.description);
      setLocation(data.location);
      setCategory(data.category);
      setEmploymentType(data.employment_type);
      setStatus(data.status || "active"); // ✅ set fetched status
    } catch (err) {
      console.error(err);
      alert("Error fetching vacancy");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      const res = await apiFetch(`/vacancies/${vacancyId}/`, {
        method: "PUT",
        body: JSON.stringify({
          title,
          description,
          location,
          category,
          employment_type: employmentType,
          status, // ✅ include status in update
        }),
      });
      if (!res.ok) throw new Error("Failed to update vacancy");
      router.push("/dashboard/vacancies");
    } catch (err) {
      console.error(err);
      alert("Error updating vacancy");
    } finally {
      setSaving(false);
    }
  };

  useEffect(() => {
    fetchVacancy();
  }, [vacancyId]);

  if (loading) return <p className="p-10 text-center">Loading vacancy...</p>;

  return (
    <ProtectedRoute requiredRoles={["HR", "SUPERADMIN"]}>
      <div className="max-w-3xl mx-auto py-10 px-4 space-y-6">
        <h1 className="text-3xl font-bold text-rammisBlue">Edit Vacancy</h1>
        <form
          onSubmit={handleSubmit}
          className="space-y-4 bg-white p-6 rounded-lg shadow-sm border border-gray-200"
        >
          <div>
            <label className="block mb-1 font-medium">Job Title</label>
            <Input value={title} onChange={(e) => setTitle(e.target.value)} required />
          </div>

          <div>
            <label className="block mb-1 font-medium">Job Description</label>
            <Textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block mb-1 font-medium">Location</label>
            <Input value={location} onChange={(e) => setLocation(e.target.value)} required />
          </div>

          <div>
            <label className="block mb-1 font-medium">Job Category</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full border border-gray-300 rounded px-3 py-2"
            >
              {JOB_CATEGORIES.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block mb-1 font-medium">Employment Type</label>
            <select
              value={employmentType}
              onChange={(e) => setEmploymentType(e.target.value)}
              className="w-full border border-gray-300 rounded px-3 py-2"
            >
              <option value="full-time">Full-time</option>
              <option value="part-time">Part-time</option>
              <option value="contract">Contract</option>
            </select>
          </div>

          {/* ✅ Added Status Dropdown */}
          <div>
            <label className="block mb-1 font-medium">Status</label>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="w-full border border-gray-300 rounded px-3 py-2"
            >
              <option value="active">Active</option>
              <option value="closed">Closed</option>
              <option value="draft">Draft</option>
            </select>
          </div>

          <Button type="submit" className="bg-rammisBlue text-white" disabled={saving}>
            {saving ? "Updating..." : "Update Vacancy"}
          </Button>
        </form>
      </div>
    </ProtectedRoute>
  );
}
