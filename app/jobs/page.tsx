"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { apiFetch } from "@/lib/api";
import { Button } from "@/components/ui/button";

type Vacancy = {
  id: number;
  title: string;
  location: string;
  department: string;
  employment_type: string;
  posted_at: string;
  is_active: boolean;
};

export default function JobsPage() {
  const [vacancies, setVacancies] = useState<Vacancy[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchVacancies = async () => {
    try {
      const res = await apiFetch("/vacancies/");
      if (!res.ok) throw new Error("Failed to fetch vacancies");
      const data = await res.json();
      // Only show active vacancies
      setVacancies(data.filter((v: Vacancy) => v.is_active));
    } catch (err) {
      console.error(err);
      alert("Error fetching vacancies");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchVacancies();
  }, []);

  if (loading) return <p className="p-10 text-center">Loading vacancies...</p>;

  if (vacancies.length === 0)
    return <p className="p-10 text-center">No job openings at the moment. Please check back later.</p>;

  return (
    <div className="max-w-5xl mx-auto py-10 px-4">
      <h1 className="text-3xl font-bold text-rammisBlue mb-8">Current Job Openings</h1>
      <div className="space-y-4">
        {vacancies.map((vacancy) => (
          <div
            key={vacancy.id}
            className="p-4 border rounded flex justify-between items-center hover:shadow-md transition-shadow"
          >
            <div>
              <h2 className="text-xl font-medium">{vacancy.title}</h2>
              <p className="text-sm text-gray-500">
                {vacancy.department} | {vacancy.location} | {vacancy.employment_type}
              </p>
              <p className="text-xs text-gray-400 mt-1">
                Posted on {new Date(vacancy.posted_at).toLocaleDateString()}
              </p>
            </div>
            <Link href={`/jobs/apply/${vacancy.id}`}>
              <Button className="bg-rammisBlue text-white hover:bg-rammisBlue/90">
                Apply Now
              </Button>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
