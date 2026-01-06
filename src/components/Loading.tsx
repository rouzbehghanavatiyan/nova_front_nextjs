import React, { useEffect } from "react";

interface LoadingProps {
  active: boolean;
}

const Loading: React.FC<LoadingProps> = ({ active }) => {
  useEffect(() => {
    if (active) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [active]);

  if (!active) return null;

  return (
    <div className="fixed inset-0 bg-white/85 z-[9999] flex items-center justify-center">
      <div className="animate-spin h-20 w-20 border-2 border-gray-200 rounded-full border-t-blue-500 relative">
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
        </div>
      </div>
    </div>
  );
};

export default Loading;