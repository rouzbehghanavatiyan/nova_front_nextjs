import React, { useState, useEffect } from "react";

interface PropsType {
  visibleWidth?: number;
  hiddenWidth?: number;
  children: React.ReactNode;
}

const ResponsiveMaker: React.FC<PropsType> = ({
  visibleWidth = 0,
  hiddenWidth = Infinity,
  children,
}) => {
  const [isVisible, setIsVisible] = useState<boolean>(false);

  useEffect(() => {
    const checkVisibility = () => {
      setIsVisible(
        window.innerWidth >= visibleWidth &&
        window.innerWidth < hiddenWidth
      );
    };

    checkVisibility();
    window.addEventListener("resize", checkVisibility);

    return () => {
      window.removeEventListener("resize", checkVisibility);
    };
  }, [visibleWidth, hiddenWidth]);

  return isVisible ? <>{children}</> : null;
};

export default ResponsiveMaker;
