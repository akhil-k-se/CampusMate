import React, { useState, useEffect } from "react";
import Lottie from "react-lottie";
import CampusLoader from "./CampusLoader.json";

const Loading = ({ loadingTime = 2000 }) => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, loadingTime);

    return () => clearTimeout(timer); // Cleanup timer on component unmount
  }, [loadingTime]);

  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: CampusLoader,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  if (!isLoading) {
    return null; // Render nothing after 2 seconds
  }

  return (
    <div className="flex w-full h-screen items-center justify-center">
      <Lottie options={defaultOptions} height={400} width={400} />
    </div>
  );
};

export default Loading;
