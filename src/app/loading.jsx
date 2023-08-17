"use client";
import { Spinner } from "@nextui-org/react";

export default function LoadingPage() {
  return (
    <div className="flex gap-4">
      <Spinner size="lg" />
    </div>
  );
}
