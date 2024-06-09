import { SUPPORTED_DEPLOYMENTS } from "./";

declare global {
  type Deployment = (typeof SUPPORTED_DEPLOYMENTS)[number];
}
