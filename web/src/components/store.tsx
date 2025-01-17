import { create } from "zustand";
import { isEnvBrowser } from "../utils/misc";


export type CaptureSystemProps = {
  open: boolean;

  capture: boolean;
  captureCategory: string;
  captureProgress: string;
}



const useCapture = create<CaptureSystemProps> (() => ({
  open: true,
  capture: true,
  captureCategory: "Clothing",
  captureProgress: "5/10",
}));

export default useCapture;