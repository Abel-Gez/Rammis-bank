"use client";

import { useState } from "react";
import { apiFetch } from "@/lib/api";
import { AccountApplication } from "@/app/dashboard/branchAdmin/page";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

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
    <Card className="shadow-sm border">
      <CardHeader className="flex flex-col gap-2">
        <CardTitle>{application.full_name}</CardTitle>
        <Badge>{application.status}</Badge>
      </CardHeader>

      <CardContent className="text-sm space-y-1">
        <p><strong>Mother’s Name:</strong> {application.mother_name}</p>
        <p><strong>Phone:</strong> {application.phone}</p>
        <p><strong>Branch:</strong> {application.branch?.name}</p>
        <p><strong>Account Type:</strong> {application.account_type}</p>
        <p><strong>Monthly Income:</strong> {application.monthly_income}</p>
        {application.national_id_file && (
          <a
            href={application.national_id_file}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 underline text-sm"
          >
            View National ID
          </a>
        )}
      </CardContent>

      <CardFooter className="flex gap-2">
        <Button
          onClick={() => handleStatusUpdate("approved")}
          disabled={updating || application.status === "approved"}
        >
          Approve
        </Button>
        <Button
          onClick={() => handleStatusUpdate("rejected")}
          variant="destructive"
          disabled={updating || application.status === "rejected"}
        >
          Reject
        </Button>
      </CardFooter>
    </Card>
  );
}
