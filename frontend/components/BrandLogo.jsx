import { Store } from "lucide-react";

export default function BrandLogo({ className = "", iconClassName = "", textClassName = "" }) {
  return (
    <div className={`inline-flex items-center gap-3 ${className}`}>
      <span
        className={`flex items-center justify-center rounded-xl bg-[#0f756b] text-white ${iconClassName || "h-10 w-10"}`}
      >
        <Store className="h-5 w-5" />
      </span>
      <span className={`font-extrabold tracking-[-0.04em] text-[#0f6f66] ${textClassName || "text-xl"}`}>
        ShopGenie
      </span>
    </div>
  );
}
