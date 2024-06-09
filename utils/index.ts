import { SUPPORTED_DEPLOYMENTS } from "types";

export const getDeployment = () => {
  const deployment = process.env.NEXT_PUBLIC_DEPLOYMENT;

  if (!deployment) {
    throw new Error("NEXT_PUBLIC_DEPLOYMENT is not set");
  }

  if (!SUPPORTED_DEPLOYMENTS.includes(deployment as Deployment)) {
    throw new Error(
      "NEXT_PUBLIC_DEPLOYMENT must be a value in SUPPORTED_DEPLOYMENTS"
    );
  }

  return deployment as Deployment;
};
