import { FileDown } from "lucide-react";

interface DocumentCardProps {
  title: string;
  fileName: string;
}

export function DocumentCard({ title, fileName }: DocumentCardProps) {
  return (
    <div className="flex flex-col p-4 border rounded-lg bg-card hover:shadow-md transition-shadow">
      <div className="flex items-center justify-between">
        <h3 className="font-medium text-sm md:text-base">{title}</h3>
        <a
          href={`/Documents/${fileName}`}
          download
          className="flex items-center gap-2 text-primary hover:text-primary/80 text-sm"
        >
          <FileDown size={20} />
          <span className="hidden md:inline">Download</span>
        </a>
      </div>
    </div>
  );
}
