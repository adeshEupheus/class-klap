import React from "react";
import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import Loader from "../components/Material/Loader";

const VerfiyToken = () => {
  const [queryParameters] = useSearchParams();

  useEffect(() => {
    console.log(queryParameters.get("auth"));
  }, []);
  return (
    <div>
      <Loader loading={true} />
    </div>
  );
};

export default VerfiyToken;
