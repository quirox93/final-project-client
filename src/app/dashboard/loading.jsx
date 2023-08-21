"use client";
import { Spinner } from "@nextui-org/react";

export default function LoadingPage() {
  return (
    <div className="h-screen grid justify-items-center">
      <Spinner size="lg" />
    </div>
  );
}
