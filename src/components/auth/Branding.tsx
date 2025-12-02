import Image from "next/image";

interface BrandingProps {
  labelTitle: string;
  label: string;
}

export function Branding({ labelTitle, label }: BrandingProps) {
  return (
    <div className="flex h-full flex-col">
      <div className="mb-20">
        <div className="flex flex-col gap-18 items-start justify-start leading-3">
          <span className="text-[70px] font-bold tracking-[20px] text-[#161CCA]">
            AMI
          </span>
          <span className="font-medium px-4 pt-2 text-[40px] text-[#EBA13E]">Solution</span>
        </div>
      </div>
      <div className="max-w-lg">
        <h1 className="mb-4 text-4xl font-medium text-gray-800">{labelTitle}</h1>
        <p className="text-lg leading-relaxed text-gray-600">{label}</p>
      </div>
    </div>
  );
}
