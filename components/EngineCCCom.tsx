import React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useValidation } from "@/hooks/useValidation";
import { validationSchema } from "@/lib/validationSchema";

interface EngineCCComProps {
  engineCC: number;
  setEngineCC: (value: number) => void;
}

const EngineCCCom = ({ engineCC, setEngineCC }: EngineCCComProps) => {
  const { validate, errors } = useValidation();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value) || 0;
    const { isValid } = validate("engineCC", value, validationSchema.engineCC);
    if (isValid) {
      setEngineCC(value);
    }
  };
  return (
    <div className="space-y-2 w-full">
      <Label htmlFor="engineCC" className="text-sm sm:text-base font-medium">
        Engine Capacity
      </Label>
      <div className="relative w-full md:max-w-full">
        <Input
          type="number"
          id="engineCC"
          placeholder="Enter engine capacity"
          value={engineCC || ""}
          onChange={handleInputChange}
          className={`w-full h-10 px-3 py-2 pr-12 text-sm sm:text-base 
            placeholder:text-sm sm:placeholder:text-base placeholder:text-gray-400
            ${errors.engineCC ? "border-red-500" : ""}`}
        />
        <div className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground">
          CC
        </div>
      </div>
      {errors.engineCC && (
        <p className="text-sm text-red-500">{errors.engineCC}</p>
      )}
    </div>
  );
};

export default EngineCCCom;
