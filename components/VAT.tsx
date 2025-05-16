import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "./ui/label";
import React, { useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";

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
    <div>
      <Label>VAT Calculation Components</Label>
      <Card className="mt-2">
        <CardContent>
          <div className="grid grid-cols-2 gap-4 mt-2">
            <div className="flex items-center space-x-2">
              <Checkbox
                id="cif"
                checked={selectedItems.cif}
                onCheckedChange={() => handleCheckboxChange("cif")}
              />
              <Label htmlFor="cif">CIF Value</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="cidSur"
                checked={selectedItems.cidSur}
                onCheckedChange={() => handleCheckboxChange("cidSur")}
              />
              <Label htmlFor="cidSur">CID/SUR</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="pal"
                checked={selectedItems.pal}
                onCheckedChange={() => handleCheckboxChange("pal")}
              />
              <Label htmlFor="pal">PAL</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="exciseDuty"
                checked={selectedItems.exciseDuty}
                onCheckedChange={() => handleCheckboxChange("exciseDuty")}
              />
              <Label htmlFor="exciseDuty">Excise Duty</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="luxuryTax"
                checked={selectedItems.luxuryTax}
                onCheckedChange={() => handleCheckboxChange("luxuryTax")}
              />
              <Label htmlFor="luxuryTax">Luxury Tax</Label>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default VAT;
