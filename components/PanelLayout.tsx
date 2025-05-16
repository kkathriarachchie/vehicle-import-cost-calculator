import React from "react";
import { Card, CardContent } from "@/components/ui/card";

const PanelLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <Card className="w-full max-w-3xl">
      <CardContent className="sm:p-6">{children}</CardContent>
    </Card>
  );
};

export default PanelLayout;
