import CostForm from "@/components/CostForm";
import PanelLayout from "@/components/PanelLayout";

export default function Home() {
  return (
    <main className="flex min-h-screen  flex-col items-center justify-center p-5 lg:p-24">
      <h1 className="my-14 text-center text-3xl font-bold uppercase tracking-widest text-cyan-800">
        Vehicle Import Cost Calculator
      </h1>
      <PanelLayout>
        <CostForm />
      </PanelLayout>
    </main>
  );
}
