"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { apiFetch } from "@/lib/api";

export default function JobApplicationPage() {
  const router = useRouter();
  const params = useParams();
  const vacancyId = params.vacancyId;

  const [vacancyTitle, setVacancyTitle] = useState("");
  const [fullName, setFullName] = useState("");
  const [gender, setGender] = useState("male");
  const [age, setAge] = useState("");
  const [residence, setResidence] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  const fetchVacancy = async () => {
    try {
      const res = await apiFetch(`/vacancies/${vacancyId}/`);
      if (!res.ok) throw new Error("Failed to fetch vacancy");
      const data = await res.json();
      setVacancyTitle(data.title);
    } catch (err) {
      console.error(err);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) return alert("Please attach your file");

    setLoading(true);

    try {
      const formData = new FormData();
      formData.append("full_name", fullName);
      formData.append("gender", gender);
      formData.append("age", age);
      formData.append("residence", residence);
      formData.append("mobile_number", mobileNumber);
      formData.append("position_applied", vacancyTitle);
      formData.append("location_applied", ""); // optional
      formData.append("file_attachment", file);

      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/vacancy-applications/`, {
        method: "POST",
        body: formData,
      });

      if (!res.ok) throw new Error("Failed to submit application");

      alert("Application submitted successfully");
      router.push("/jobs");
    } catch (err) {
      console.error(err);
      alert("Error submitting application");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchVacancy();
  }, [vacancyId]);

  return (
    <div className="max-w-3xl mx-auto py-10 px-4">
      <h1 className="text-2xl font-bold text-rammisBlue mb-6">Apply for {vacancyTitle}</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <Input placeholder="Full Name" value={fullName} onChange={(e) => setFullName(e.target.value)} required />
        <div>
          <label className="block mb-1 font-medium">Gender</label>
          <select value={gender} onChange={(e) => setGender(e.target.value)} className="w-full border border-gray-300 rounded px-3 py-2">
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
        </div>
        <Input type="number" placeholder="Age" value={age} onChange={(e) => setAge(e.target.value)} required />
        <Input placeholder="Residence" value={residence} onChange={(e) => setResidence(e.target.value)} required />
        <Input placeholder="Mobile Number" value={mobileNumber} onChange={(e) => setMobileNumber(e.target.value)} required />
        <div>
          <label className="block mb-1 font-medium">Attachment</label>
          <input type="file" onChange={(e) => setFile(e.target.files?.[0] || null)} required />
        </div>
        <Button type="submit" disabled={loading}>
          {loading ? "Submitting..." : "Submit Application"}
        </Button>
      </form>
    </div>
  );
}
