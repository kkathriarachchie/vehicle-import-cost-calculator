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
    <div className="space-y-2 w-full">
      <Label htmlFor="adminCharge" className="text-sm sm:text-base font-medium">
        Admin Charge
      </Label>
      <div className="relative w-full  md:max-w-full">
        <Input
          type="number"
          id="adminCharge"
          placeholder="Enter Admin Charge"
          value={adminCharge || ""}
          onChange={handleInputChange}
          step="any" // Allows any decimal value
          className="w-full h-10 px-3 py-2 pr-12 text-sm sm:text-base placeholder:text-sm sm:placeholder:text-base placeholder:text-gray-400"
        />
        <div className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground">
          LKR
        </div>
      </div>
    </div>
  );
};

export default AdminCharge;
