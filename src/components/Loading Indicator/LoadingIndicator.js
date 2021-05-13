import React from "react";
import { usePromiseTracker } from "react-promise-tracker";
import BounceLoader from "react-spinners/BounceLoader";

const LoadingIndicator = () => {
  const { promiseInProgress } = usePromiseTracker();

  return promiseInProgress && <BounceLoader />;
};

export default LoadingIndicator;
