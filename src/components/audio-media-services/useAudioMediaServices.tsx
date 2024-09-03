import { useEffect, useState } from "react";
import useMediaStreamSource from "./useMediaStreamSource";
import { IFormSelectOption } from "../form/FormSelect";
import useMediaDevices from "./useMediaDevices";
import useNavigatorPermissions from "../navigator-permissions/useNavigatorPermissions";
import useMediaRecorder from "./useMediaRecorder";

export default function useAudioMediaServices() {
  const permMicrophone = useNavigatorPermissions("microphone"); // audio-capture, speaker-selection

  const { mediaDevices } = useMediaDevices([permMicrophone.isPermitted]);
  const availableMics: IFormSelectOption[] = mediaDevices
    .filter(
      (device) =>
        device.isAudio &&
        device.isInput &&
        !device.isDefault &&
        !device.isCommsDefault
    )
    .map((device) => ({
      label: device.label,
      value: device.deviceId,
      key: device.id,
    }));
  availableMics.unshift({
    label: "- selecione -",
    value: "",
    key: "selecione",
    disabled: true,
  });
  const [selectedMic, setSelectedMic] = useState("");

  useEffect(() => {
    if (!selectedMic) {
      const audioInputDevices = mediaDevices.filter(
        (device) => device.isAudio && device.isInput
      );

      const defaultStandardGroup = audioInputDevices.find(
        (device) => device.isDefault
      )?.groupId;
      const defaultStandardId = audioInputDevices.find(
        (device) =>
          !device.isCommsDefault &&
          !device.isDefault &&
          device.groupId === defaultStandardGroup
      )?.deviceId;
      if (defaultStandardId) {
        setSelectedMic(defaultStandardId);
        return;
      }

      const defaultCommsGroup = audioInputDevices.find(
        (device) => device.isCommsDefault
      )?.groupId;
      const defaultCommsId = audioInputDevices.find(
        (device) =>
          !device.isCommsDefault &&
          !device.isDefault &&
          device.groupId === defaultCommsGroup
      )?.deviceId;
      if (defaultCommsId) {
        setSelectedMic(defaultCommsId);
        return;
      }
    }
  }, [mediaDevices]);

  const availableSpkrs: IFormSelectOption[] = mediaDevices
    .filter(
      (device) =>
        device.isAudio &&
        device.isOutput &&
        !device.isDefault &&
        !device.isCommsDefault
    )
    .map((device) => ({
      label: device.label,
      value: device.deviceId,
      key: device.id,
    }));
  availableSpkrs.unshift({
    label: "- selecione -",
    value: "",
    key: "selecione",
    disabled: true,
  });
  const [selectedSpk, setSelectedSpk] = useState("");

  useEffect(() => {
    if (!selectedSpk) {
      const audioOutputDevices = mediaDevices.filter(
        (device) => device.isAudio && device.isOutput
      );

      const defaultStandardGroup = audioOutputDevices.find(
        (device) => device.isDefault
      )?.groupId;
      const defaultStandardId = audioOutputDevices.find(
        (device) =>
          !device.isCommsDefault &&
          !device.isDefault &&
          device.groupId === defaultStandardGroup
      )?.deviceId;
      if (defaultStandardId) {
        setSelectedSpk(defaultStandardId);
        return;
      }

      const defaultCommsGroup = audioOutputDevices.find(
        (device) => device.isCommsDefault
      )?.groupId;
      const defaultCommsId = audioOutputDevices.find(
        (device) =>
          !device.isCommsDefault &&
          !device.isDefault &&
          device.groupId === defaultCommsGroup
      )?.deviceId;
      if (defaultCommsId) {
        setSelectedSpk(defaultCommsId);
        return;
      }
    }
  }, [mediaDevices]);

  const [isMicPlayback, setisMicPlayback] = useState(false);

  const mediaStreamData = useMediaStreamSource({
    inputDeviceId: selectedMic,
    outputDeviceId: selectedSpk,
    playback: isMicPlayback,
  });

  const digitalRecorder = useMediaRecorder({ mediaStream: mediaStreamData.mediaStream })

  return {
    permMicrophone,
    mediaStreamData,

    isMicPlayback,
    setisMicPlayback,
    
    mediaDevices,
    
    availableMics,
    selectedMic,
    setSelectedMic,
    
    availableSpkrs,
    selectedSpk,
    setSelectedSpk,
    
    digitalRecorder,
  };
}
