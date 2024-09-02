import { MakeWritable } from "@/utils/utility-types";
import { useEffect, useState } from "react";

export interface MediaDeviceInfoExt extends MakeWritable<MediaDeviceInfo> {
  id: string;
  kindText: string;
  groupNumber: number;
  isDefault: boolean;
  isCommsDefault: boolean;
  isInput: boolean;
  isOutput: boolean;
  isAudio: boolean;
  isVideo: boolean;
  labelSecondary: string;
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

  function updateDeviceList(e?: any) {
    mediaDevicesService
      .enumerateDevices()
      .then((devices) => {
        const groups = new Map();
        const devicesInfoExt = devices
          .map((device) => {
            console.log(device.toJSON());
            if (!device.deviceId || !device.groupId) {
              return;
            }

            if (!groups.has(device.groupId)) {
              groups.set(device.groupId, groups.size + 1);
            }

            const deviceInfoExt: MediaDeviceInfoExt = {
              deviceId: device.deviceId,
              kind: device.kind,
              label: device.label,
              groupId: device.groupId,

              id: device.groupId + "-" + device.deviceId,
              kindText: getDisplayKindStr(device.kind),
              groupNumber: groups.get(device.groupId),
              isDefault: device.deviceId === "default",
              isCommsDefault: device.deviceId === "communications",

              isInput: device.kind.includes("input"),
              isOutput: device.kind.includes("output"),
              isAudio: device.kind.includes("audio"),
              isVideo: device.kind.includes("video"),
            } as MediaDeviceInfoExt;

            try {
              const labelParts =
                /^(?:(?<prefix>Padrão|Comunicações) - )?(?<primary>.+?)(?<secondaries> \(.+?\))$/i.exec(
                  device.label
                )?.groups;
              if (labelParts?.primary && labelParts?.secondaries) {
                // Comunicações - Microfone (2- WebCam) (hash:0e03)
                // -> { primary: "Microfone", secondaries: "(2- WebCam) (hash:0e03)", prefix: "Comunicações" }
                // -> { primary: "Microfone", secondaries: ["(WebCam)", "(2)", "(hash:0e03)"] }
                // -> { label: "Microfone - WebCam", labelSecondary: "(2) (hash:0e03)"}

                const secondaryLabels = labelParts.secondaries
                  .trim()
                  .replace(/\(([0-9]+)- /i, "($1) (~###")
                  .split(/(?<=\)) (?=\()/i);

                const [primaryContent, secondaryContent] =
                  secondaryLabels.reduce(
                    (prev, curr) => {
                      if (curr.includes("~###")) {
                        prev[0].push(
                          curr.replace("(~###", "").replace(/\)$/i, "")
                        );
                      } else {
                        prev[1].push(curr);
                      }
                      return prev;
                    },
                    [[labelParts.primary], []]
                  );

                deviceInfoExt.label = primaryContent.join(" - ");
                deviceInfoExt.labelSecondary = secondaryContent.join(" ");
              }
            } catch (e) {
              String(e);
            }

            return deviceInfoExt;
          })
          .filter(Boolean);

        setMediaDevices(devicesInfoExt);
        setError("");
        console.log({ devices, devicesInfoExt });
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
