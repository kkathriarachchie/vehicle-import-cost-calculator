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
    <form className="mx-auto grid max-w-6xl gap-y-5 lg:grid-cols-2 lg:gap-x-8">
      <div className="flex flex-col gap-y-8 py-5 lg:px-5 lg:py-6">
        <FuelTypeCom fuelType={fuelType} setFuelType={setFuelType} />
        <EngineCCCom engineCC={engineCC} setEngineCC={setEngineCC} />
        <VehiclePrice
          vehiclePrice={vehiclePrice}
          setVehiclePrice={setVehiclePrice}
        />
        <ExchangeRate
          exchangeRate={exchangeRate}
          setExchangeRate={setExchangeRate}
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
      />
    </form>
  );
};

export default CostForm;
