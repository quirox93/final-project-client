"use client";
import DateTime from "./DateTime";
import { usePathname } from "next/navigation";

const HeaderDash = () => {
  const path = usePathname().replace("/dashboard/", "");

  return (
    <div className="items-center bg-background p-2">
      <div className="text-foreground first-letter:uppercase text-3xl font-bold">{path}</div>
      <div className="text-lime-500 text-xs font-normal">
        <DateTime suppressHydrationWarning={true} />
      </div>
    </div>
  );
};

export default HeaderDash;
