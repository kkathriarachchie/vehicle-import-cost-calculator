import { DocumentCard } from "@/components/DocumentCard";
import React from "react";

const page = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">About Vehicle Tax Calculator</h1>
      <div className="prose dark:prose-invert mb-8">
        <p className="mb-4">
          Welcome to the Vehicle Tax Calculator 2025, your trusted tool for
          estimating import taxes and duties for vehicles in Sri Lanka.
        </p>
        <p className="mb-4">This calculator helps you estimate:</p>
        <ul className="list-disc pl-6 mb-4">
          <li>Import duties</li>
          <li>Luxury tax</li>
          <li>VAT and other applicable taxes</li>
          <li>Total cost of vehicle importation</li>
        </ul>
        <p className="mb-4">
          Please note that all calculations are estimates and may vary based on
          current government regulations and exchange rates.
        </p>
      </div>

      <section className="mt-8">
        <h2 className="text-2xl font-semibold mb-4">Reference Documents</h2>
        <div className="grid gap-4 md:grid-cols-2">
          <DocumentCard
            title="Luxury Tax Gazette - January 31, 2024"
            fileName="2421-41 Jan 31, 2024 - LUXURY TAX GAZZET.pdf"
          />
          <DocumentCard
            title="Excise Duty - January 10, 2025"
            fileName="G.N 2418-43 dated 10.01.2025 EXCISE DUTY.pdf"
          />
        </div>
      </section>
    </div>
  );
};

export default page;
