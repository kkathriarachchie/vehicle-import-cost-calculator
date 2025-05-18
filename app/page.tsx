import CostForm from "@/components/CostForm";
import PanelLayout from "@/components/PanelLayout";

export default function Home() {
  return (
    <main className="min-h-screen px-4 py-6 sm:px-6 md:px-8 lg:px-24">
      <h1 className="text-2xl sm:text-3xl font-bold text-center text-black uppercase tracking-widest m-6 sm:m-10 lg:m-14">
        Sri Lanka Vehicle Import Cost Calculator
      </h1>

      <div className="max-w-7xl mx-auto">
        <PanelLayout>
          <CostForm />
        </PanelLayout>
      </div>
    </main>
  );
}
