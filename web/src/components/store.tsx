import { create } from "zustand";
import { isEnvBrowser } from "../utils/misc";


export type CaptureSystemProps = {
  open: boolean;

  capture: boolean;
  captureCategory: string;
  captureProgress: string;

  takeScreenshot: (props: ScreenshotProps) => string | undefined;
}

export type ScreenshotProps = {
  encoding: 'png' | 'jpeg' | 'webp';
  quality?: number;
}

const useCapture = create<CaptureSystemProps> (() => ({
  open: true,
  capture: true,
  captureCategory: "Clothing",
  captureProgress: "5/10",
  takeScreenshot: () => undefined,
}));

export default useCapture;