import { useEffect, useState } from "react";

export interface MediaDeviceInfoExt extends MediaDeviceInfo {
  id: string;
  kindText: string;
  groupNumber: number;
  isDefault: boolean;
  isInput: boolean;
  isOutput: boolean;
  isAudio: boolean;
  isVideo: boolean;
}

export interface useNavPermValue {
  mediaDevices: MediaDeviceInfoExt[];
  error: string;
}

const getDisplayKindStr = (kind: MediaDeviceKind) => {
  if (kind === "audioinput") {
    return "Audio Input";
  }
  if (kind === "audiooutput") {
    return "Audio Output";
  }
  if (kind === "videoinput") {
    return "Video Input";
  }
  return "Unknown Kind";
};

export default function useMediaDevices(deps: any[]) {
  const [error, setError] = useState("");
  const [mediaDevices, setMediaDevices] = useState<MediaDeviceInfoExt[]>([]);

  const mediaDevicesService = window?.navigator?.mediaDevices;
  const isAvailable =
    typeof mediaDevicesService?.enumerateDevices === "function";

  function updateDeviceList() {
    mediaDevicesService
      .enumerateDevices()
      .then((devices) => {
        const groups = new Map();
        const devicesWithGIndex = devices.map((device) => {
          if (!device.deviceId || !device.groupId) {
            return;
          }
            
          if (!groups.has(device.groupId)) {
            groups.set(device.groupId, groups.size + 1);
          }

          return {
            deviceId: device.deviceId,
            kind: device.kind,
            label: device.label,
            groupId: device.groupId,

            id: device.groupId + "-" + device.deviceId,
            kindText: getDisplayKindStr(device.kind),
            groupNumber: groups.get(device.groupId),
            isDefault: device.deviceId === "default",

            isInput: device.kind.includes("input"),
            isOutput: device.kind.includes("output"),
            isAudio: device.kind.includes("audio"),
            isVideo: device.kind.includes("video"),
          } as MediaDeviceInfoExt;
        }).filter(Boolean);

        setMediaDevices(devicesWithGIndex);
        setError("");
        console.log({ devices, devicesWithGIndex })
      })
      .catch((err) => {
        setMediaDevices([]);
        setError(`${err.name}: ${err.message}`);
        console.error(`${err.name}: ${err.message}`);
      });
  }

  useEffect(() => {
    if (!isAvailable) {
      setMediaDevices([]);
      setError("Media Devices API is not available in this browser");
      return;
    }

    updateDeviceList();
    mediaDevicesService.addEventListener("devicechange", updateDeviceList);

    return () => {
      mediaDevicesService.removeEventListener("devicechange", updateDeviceList);
    };
  }, [isAvailable, ...(deps || [])]);

  return {
    mediaDevices,
    error,
  };
}
