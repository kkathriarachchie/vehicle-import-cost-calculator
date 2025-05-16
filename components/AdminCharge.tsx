import React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface AdminChargeProps {
  adminCharge: number;
  setAdminCharge: (value: number) => void;
}

const AdminCharge = ({ adminCharge, setAdminCharge }: AdminChargeProps) => {
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(e.target.value) || 0;
    setAdminCharge(value);
  };
  return (
    <div>
      <Label htmlFor="adminCharge">Admin Charge</Label>
      <div className="mt-2">
        <Input
          type="number"
          id="adminCharge"
          placeholder="Enter Admin Charge"
          value={adminCharge || ""}
          onChange={handleInputChange}
          step="any" // Allows any decimal value
          className="w-full sm:w-[300px]"
        />
      </div>
    </div>
  );
};

export default AdminCharge;
