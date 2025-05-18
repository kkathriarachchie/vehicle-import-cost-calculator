"use client";

import React, { useState, useEffect, use } from "react";
import FuelTypeCom from "./FuelTypeCom";
import EngineCCCom from "./EngineCCCom";
import VehiclePrice from "./VehiclePrice";
import ExchangeRate from "./ExchangeRate";
import CIFPercentage from "./CIFPercentage";
import DisplayCard from "./DisplayCard";
import { calculateExciseDuty } from "../lib/excise";
import { calculateLuxuryTax } from "../lib/luxury";
import VAT from "./VAT";
import AdminCharge from "./AdminCharge";

const CostForm = () => {
  const [fuelType, setFuelType] = useState<string>("");
  const [engineCC, setEngineCC] = useState(0);
  const [vehiclePrice, setVehiclePrice] = useState(0);
  const [exchangeRate, setExchangeRate] = useState(0);
  const [cifPercentage, setCifPercentage] = useState(20);
  const [cifValue, setCifValue] = useState(0);
  const [cifLKRValue, setCifLKRValue] = useState(0);
  const [cidSurValue, setCidSurValue] = useState(0);
  const [palValue, setPalValue] = useState(0);
  const [exciseDutyValue, setExciseDutyValue] = useState(0);
  const [luxuryTaxValue, setLuxuryTaxValue] = useState(0);
  const [adminCharge, setAdminCharge] = useState(0);
  const [vatValue, setVatValue] = useState(0);
  const [selectedCurrency, setSelectedCurrency] = useState<string>("");

  useEffect(() => {
    // Calculate CIF value when vehicle price or CIF percentage changes
    const calculateCIF = () => {
      const cif = vehiclePrice * (1 + cifPercentage / 100);
      const ciftLKR = exchangeRate * cif;
      const cidSur = ciftLKR * 0.3;
      const pal = ciftLKR * 0.1;

      setCifValue(cif);
      setCifLKRValue(ciftLKR);
      setCidSurValue(cidSur);
      setPalValue(pal);
    };
    calculateCIF();
  }, [
    vehiclePrice,
    cifPercentage,
    exchangeRate,
    setCifValue,
    setCifLKRValue,
    setCidSurValue,
    setPalValue,
  ]);

  useEffect(() => {
    const duty = calculateExciseDuty(fuelType, engineCC);
    setExciseDutyValue(duty);
  }, [fuelType, engineCC]); // Remove setExciseDutyValue from dependencies

  useEffect(() => {
    const tax = calculateLuxuryTax(fuelType, cifLKRValue);
    setLuxuryTaxValue(tax);
  }, [fuelType, cifLKRValue]); // Remove setLuxuryTaxValue from dependencies

  return (
    <form className="grid gap-6 md:gap-8">
      <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:gap-8">
        <div className="space-y-6">
          <FuelTypeCom fuelType={fuelType} setFuelType={setFuelType} />
          <EngineCCCom engineCC={engineCC} setEngineCC={setEngineCC} />
          <ExchangeRate
            exchangeRate={exchangeRate}
            setExchangeRate={setExchangeRate}
            setSelectedCurrency={setSelectedCurrency}
          />
        </div>
        <div className="space-y-6">
          <VehiclePrice
            vehiclePrice={vehiclePrice}
            setVehiclePrice={setVehiclePrice}
            selectedCurrency={selectedCurrency}
          />
          <CIFPercentage
            cifPercentage={cifPercentage}
            setCifPercentage={setCifPercentage}
          />
          <AdminCharge
            adminCharge={adminCharge}
            setAdminCharge={setAdminCharge}
          />

          <VAT
            cifLKRValue={cifLKRValue}
            cidSurValue={cidSurValue}
            palValue={palValue}
            exciseDutyValue={exciseDutyValue}
            luxuryTaxValue={luxuryTaxValue}
            setVatValue={setVatValue}
          />
        </div>
      </div>

      <div className="mt-6">
        <DisplayCard
          cifValue={cifValue}
          cifLKRValue={cifLKRValue}
          cidSur={cidSurValue}
          pal={palValue}
          exDuty={exciseDutyValue}
          luxuryTax={luxuryTaxValue}
          vat={vatValue}
          adminCharge={adminCharge}
          totalCost={
            cifLKRValue +
            cidSurValue +
            palValue +
            exciseDutyValue +
            luxuryTaxValue +
            vatValue +
            adminCharge
          }
          selectedCurrency={selectedCurrency}
        />
      </div>
    </form>
  );
};

export default CostForm;
