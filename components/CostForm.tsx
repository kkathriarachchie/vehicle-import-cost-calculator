"use client";

import React, { useState } from "react";
import FuelTypeCom from "./FuelTypeCom";
import EngineCCCom from "./EngineCCCom";
import VehiclePrice from "./VehiclePrice";
import ExchangeRate from "./ExchangeRate";

const CostForm = () => {
  const [fuelType, setFuelType] = useState<string>("");
  const [engineCC, setEngineCC] = useState(0);
  const [vehiclePrice, setVehiclePrice] = useState(0);

  return (
    <form className="mx-auto grid max-w-6xl gap-y-5 lg:grid-cols-2 lg:gap-x-8">
      <div className="flex flex-col gap-y-8 py-5 lg:px-5 lg:py-6">
        <FuelTypeCom fuelType={fuelType} setFuelType={setFuelType} />
        <EngineCCCom engineCC={engineCC} setEngineCC={setEngineCC} />
        <VehiclePrice
          vehiclePrice={vehiclePrice}
          setVehiclePrice={setVehiclePrice}
        />
        <ExchangeRate />
      </div>

      <>test data </>
    </form>
  );
};

export default CostForm;
