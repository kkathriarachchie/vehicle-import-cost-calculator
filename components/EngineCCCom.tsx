import React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface EngineCCComProps {
  engineCC: number;
  setEngineCC: (value: number) => void;
}

const EngineCCCom = ({ engineCC, setEngineCC }: EngineCCComProps) => {
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value) || 0;
    setEngineCC(value);
  };
  return (
    <div>
      <Label htmlFor="engineCC">Engine Capacity</Label>
      <div className="mt-2">
        <Input
          type="number"
          id="engineCC"
          placeholder="Enter engine capacity"
          value={engineCC || ""}
          onChange={handleInputChange}
          className="w-full sm:w-[300px]"
        />
      </div>
    </div>
  );
};

export default EngineCCCom;
