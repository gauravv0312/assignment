import { useState } from "react";

export default function useFormValidate(value, min, max) {
  const [error, setError] = useState("");

  if (isNaN(value)) {
    setError("Please enter a valid number");
  } else if (value < min || value > max) {
    setError(`Please enter a number between ${min} and ${max}`);
  } else {
    setError("");
  }

  return error;
};
