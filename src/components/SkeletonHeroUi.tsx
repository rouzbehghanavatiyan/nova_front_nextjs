import React from "react";
import { Card, Skeleton } from "@heroui/react";

const SkeletonHeroUi: React.FC = () => {
  return (
    <Card className="w-full space-y-4 p-4" radius="lg">
      <Skeleton className="rounded-lg">
        <div className="h-48 rounded-lg bg-default-300" />
      </Skeleton>
      <div className="space-y-3">
        <Skeleton className="w-3/5 rounded-lg">
          <div className="h-4 w-3/5 rounded-lg bg-default-200" />
        </Skeleton>
        <Skeleton className="w-4/5 rounded-lg">
          <div className="h-3 w-4/5 rounded-lg bg-default-200" />
        </Skeleton>
        <Skeleton className="w-2/5 rounded-lg">
          <div className="h-3 w-2/5 rounded-lg bg-default-300" />
        </Skeleton>
      </div>
    </Card>
  );
};

export default SkeletonHeroUi;