"use client";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

const HeaderDash = () => {
  const path = usePathname().replace("/dashboard/", "");

  return (
    <div className="items-center bg-background p-2">
      <div className="text-foreground first-letter:uppercase text-3xl font-bold">{path}</div>
    </div>
  );
};

export default HeaderDash;
