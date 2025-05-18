import React from "react";
import { Card, CardContent } from "@/components/ui/card";

const PanelLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <Card className="w-full lg:border-none bg-white lg:bg-transparent lg:shadow-none">
      <CardContent className="p-4 sm:p-6 md:p-8">{children}</CardContent>
    </Card>
  );
};

export default PanelLayout;
