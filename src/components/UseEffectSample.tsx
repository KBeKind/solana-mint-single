"use client";
import { useEffect, useState } from "react";

const UseEffectSample = () => {
  const [resourceType, setResourceType] = useState("type1");

  useEffect(() => {
    //everything inside this useEffect function will be executed every time the application renders
    // in order to limit this we can send in an array that is of the resource type we want to check
    // when that resource is updated this will run
  }, [resourceType]);

  useEffect(() => {
    // you can leave an empty array as the second argument
    // this will make it only run on mount
  }, []);

  return <div>UseEffectSample</div>;
};

export default UseEffectSample;
