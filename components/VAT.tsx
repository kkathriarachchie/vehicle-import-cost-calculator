import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "./ui/label";
import React, { useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { ProTip } from "./ProTip";

interface VATProps {
  cifLKRValue: number;
  cidSurValue: number;
  palValue: number;
  exciseDutyValue: number;
  luxuryTaxValue: number;
  setVatValue: (value: number) => void;
}

const VAT = ({
  cifLKRValue,
  cidSurValue,
  palValue,
  exciseDutyValue,
  luxuryTaxValue,
  setVatValue,
}: VATProps) => {
  const [selectedItems, setSelectedItems] = React.useState({
    cif: true,
    cidSur: true,
    pal: true,
    exciseDuty: true,
    luxuryTax: true,
  });

  useEffect(() => {
    // Calculate VAT based on selected items
    const calculateVAT = () => {
      let baseAmount = 0;

      if (selectedItems.cif) baseAmount += cifLKRValue;
      if (selectedItems.cidSur) baseAmount += cidSurValue;
      if (selectedItems.pal) baseAmount += palValue;
      if (selectedItems.exciseDuty) baseAmount += exciseDutyValue;
      if (selectedItems.luxuryTax) baseAmount += luxuryTaxValue;

      const vatAmount = baseAmount * 0.18; // 18% VAT
      setVatValue(vatAmount);
    };

    calculateVAT();
  }, [
    selectedItems,
    cifLKRValue,
    cidSurValue,
    palValue,
    exciseDutyValue,
    luxuryTaxValue,
  ]);

  const handleCheckboxChange = (id: keyof typeof selectedItems) => {
    setSelectedItems((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  return (
    <div className="space-y-2 w-full">
      <Label className="text-sm sm:text-base font-medium">
        VAT Calculation Components{" "}
        <ProTip text="Included Relevant for VAT calculation" />
      </Label>
      <Card className="w-full">
        <CardContent className="p-4 sm:p-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="flex items-center space-x-2">
              <Checkbox
                id="cif"
                checked={selectedItems.cif}
                onCheckedChange={() => handleCheckboxChange("cif")}
                className="h-4 w-4 sm:h-5 sm:w-5"
              />
              <Label htmlFor="cif" className="text-sm sm:text-base">
                CIF Value
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="cidSur"
                checked={selectedItems.cidSur}
                onCheckedChange={() => handleCheckboxChange("cidSur")}
                className="h-4 w-4 sm:h-5 sm:w-5"
              />
              <Label htmlFor="cidSur" className="text-sm sm:text-base">
                CID/SUR
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="pal"
                checked={selectedItems.pal}
                onCheckedChange={() => handleCheckboxChange("pal")}
                className="h-4 w-4 sm:h-5 sm:w-5"
              />
              <Label htmlFor="pal" className="text-sm sm:text-base">
                PAL
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="exciseDuty"
                checked={selectedItems.exciseDuty}
                onCheckedChange={() => handleCheckboxChange("exciseDuty")}
                className="h-4 w-4 sm:h-5 sm:w-5"
              />
              <Label htmlFor="exciseDuty" className="text-sm sm:text-base">
                Excise Duty
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="luxuryTax"
                checked={selectedItems.luxuryTax}
                onCheckedChange={() => handleCheckboxChange("luxuryTax")}
                className="h-4 w-4 sm:h-5 sm:w-5"
              />
              <Label htmlFor="luxuryTax" className="text-sm sm:text-base">
                Luxury Tax
              </Label>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default VAT;
