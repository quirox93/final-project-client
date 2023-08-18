"use client";
import { Card, Skeleton } from "@nextui-org/react";

export default function DashSkeletonProd() {
  return (
    <Card className=" w-full space-y-3 p-4" radius="2xl">
      <Skeleton className="rounded-lg">
        <div className=" h-unit-8xl rounded-lg bg-default-300"></div>
      </Skeleton>
    </Card>
  );
}
