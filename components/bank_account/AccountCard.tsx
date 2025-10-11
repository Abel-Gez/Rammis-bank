"use client";

import { useState } from "react";
import { apiFetch } from "@/lib/api";
import { AccountApplication } from "@/app/dashboard/branchAdmin/page";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Loader2 } from "lucide-react";

interface Props {
  application: AccountApplication;
  onRefresh: () => void;
}

export function AccountCard({ application, onRefresh }: Props) {
  const [updating, setUpdating] = useState(false);

  const handleStatusUpdate = async (status: string) => {
    try {
      setUpdating(true);
      await apiFetch(`/bank_account/accounts/${application.id}/`, {
        method: "PATCH",
        body: JSON.stringify({ status }),
      });
      onRefresh();
    } catch (err) {
      console.error("Update failed", err);
    } finally {
      setUpdating(false);
    }
  };

  return (
    <Card className="border border-rammisBlue/10 shadow-sm transition hover:-translate-y-1 hover:shadow-md">
      <CardHeader className="space-y-3">
        <div className="flex items-center justify-between gap-2">
          <CardTitle className="text-lg font-semibold text-rammisBlue">
            {application.full_name}
          </CardTitle>
          <Badge
            className={
              application.status === "approved"
                ? "bg-emerald-100 text-emerald-700"
                : application.status === "rejected"
                  ? "bg-rose-100 text-rose-600"
                  : "bg-amber-100 text-amber-700"
            }
          >
            {application.status.toUpperCase()}
          </Badge>
        </div>
        {application.branch?.name && (
          <div className="flex items-center gap-2 text-sm text-slate-600">
            <Badge variant="outline" className="border-rammisBlue/20 text-rammisBlue">
              {application.branch.name}
            </Badge>
            <span className="text-slate-400">•</span>
            <span>{new Date(application.created_at).toLocaleDateString()}</span>
          </div>
        )}
      </CardHeader>

      <CardContent className="space-y-4">
        <dl className="grid gap-3 text-sm text-slate-600">
          <div className="flex justify-between">
            <dt className="text-slate-500">Mother’s Name</dt>
            <dd className="font-medium text-slate-800">{application.mother_name}</dd>
          </div>
          <div className="flex justify-between">
            <dt className="text-slate-500">Phone</dt>
            <dd className="font-medium text-slate-800">{application.phone}</dd>
          </div>
          <div className="flex justify-between">
            <dt className="text-slate-500">Account Type</dt>
            <dd className="font-medium text-slate-800">{application.account_type}</dd>
          </div>
          <div className="flex justify-between">
            <dt className="text-slate-500">Monthly Income</dt>
            <dd className="font-medium text-slate-800">{application.monthly_income}</dd>
          </div>
          <div className="flex justify-between">
            <dt className="text-slate-500">Fayda Number</dt>
            <dd className="font-medium text-slate-800">{application.fayda_number}</dd>
          </div>
        </dl>

        {application.national_id_file && (
          <a
            href={application.national_id_file}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center text-sm font-semibold text-rammisBlue hover:text-rammisLightBlue"
          >
            View National ID
          </a>
        )}
      </CardContent>

      <CardFooter className="flex items-center justify-between gap-3">
        <div className="text-xs text-slate-400">
          Last updated {new Date(application.updated_at).toLocaleString()}
        </div>
        <div className="flex gap-2">
          <Button
            onClick={() => handleStatusUpdate("approved")}
            disabled={updating || application.status === "approved"}
            className="bg-rammisBlue text-white hover:bg-rammisBlue/90"
          >
            {updating && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}Approve
          </Button>
          <Button
            onClick={() => handleStatusUpdate("rejected")}
            variant="destructive"
            disabled={updating || application.status === "rejected"}
          >
            Reject
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
}