import React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useValidation } from "@/hooks/useValidation";
import { validationSchema } from "@/lib/validationSchema";

interface VehiclePriceProps {
  vehiclePrice: number;
  setVehiclePrice: (value: number) => void;
  selectedCurrency: string;
}

const VehiclePrice = ({
  vehiclePrice,
  setVehiclePrice,
  selectedCurrency,
}: VehiclePriceProps) => {
  const { validate, errors } = useValidation();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(e.target.value) || 0;
    const { isValid } = validate(
      "vehiclePrice",
      value,
      validationSchema.vehiclePrice
    );
    if (isValid) {
      setVehiclePrice(value);
    }
  };

  return (
    <div className="space-y-2 w-full">
      <Label
        htmlFor="vehiclePrice"
        className="text-sm sm:text-base font-medium"
      >
        Vehicle Price
      </Label>
      <div className="relative w-full md:max-w-full">
        <Input
          type="number"
          id="vehiclePrice"
          placeholder="Enter vehicle price"
          value={vehiclePrice || ""}
          onChange={handleInputChange}
          step="any"
          className={`w-full h-10 px-3 py-2 pr-12 text-sm sm:text-base 
          placeholder:text-sm sm:placeholder:text-base placeholder:text-gray-400
          ${errors.vehiclePrice ? "border-red-500" : ""}`}
        />
        <div className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground">
          {selectedCurrency}
        </div>
      </div>
      {errors.vehiclePrice && (
        <p className="text-sm text-red-500">{errors.vehiclePrice}</p>
      )}
    </div>
  );
};

export default VehiclePrice;
