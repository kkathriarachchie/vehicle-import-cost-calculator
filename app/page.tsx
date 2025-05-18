import CostForm from "@/components/CostForm";
import PanelLayout from "@/components/PanelLayout";

export default function Home() {
  return (
    <main className="min-h-screen px-4 py-6 sm:px-6 md:px-8 lg:px-24">
      <div className="max-w-7xl mx-auto">
        <PanelLayout>
          <CostForm />
        </PanelLayout>
      </div>
    </main>
  );
}
