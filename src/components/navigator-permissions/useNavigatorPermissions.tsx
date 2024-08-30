import isErrorOf from "@/utils/is-error-of";
import { useState, useEffect } from "react";

export enum ENavPermState {
  /** User denied this permission. Mirror of {@link PermissionState} */
  denied = "denied",
  /** User has allowed this permission. Mirror of {@link PermissionState} */
  granted = "granted",
  /** When the service is invoked, the browser will prompt for permission. Mirror of {@link PermissionState} */
  prompt = "prompt",
  /** This hook is waiting for navigator.permissions.query() to resolve. */
  loading = "loading",
  /** Permissioins API isn't available on the browser. */
  unavailable = "unavailable",
  /** Fallback state for any unforeseen scenarios. */
  unknown = "unknown",
}

export interface useNavPermValue {
  state: ENavPermState;
  /** True if still waiting for an answer */
  isLoading: boolean;
  /** True if state = "granted" */
  isPermitted: boolean;
  /** True if state is one of ["prompt", "loading", "unknown"] */
  canBePermitted: boolean;
  /** Error */
  error: string;
  /** Permission's name sent to query() */
  name: string;
  /** Permission's name, as provided by browser */
  descriptorName: string;
}

export default function useNavigatorPermissions(
  name: string,
  configuration?: { userVisibleOnly?: boolean; sysex?: boolean }
): useNavPermValue {
  const [error, setError] = useState("");
  const [permState, setPermState] = useState(ENavPermState.loading);
  const [permName, setPermName] = useState("");

  const isAvailable = typeof window?.navigator?.permissions?.query === "function";

  const getChangeHandler = (perm: PermissionStatus) => (_event?: Event) => {
    setPermState(perm.state as ENavPermState);
    setPermName(perm.name);
  };

  useEffect(() => {
    if (!isAvailable) {
      setPermState(ENavPermState.unavailable);
      setError("Permissions API is not available in this browser");
      return;
    }

    let removePermissionListener = () => {};

    window.navigator.permissions
      .query({ name: (name as PermissionName), ...configuration })
      .then((permissionStatus) => {
        const onPermStatusChange = getChangeHandler(permissionStatus);
        onPermStatusChange();

        permissionStatus.addEventListener("change", onPermStatusChange);
        removePermissionListener = () => {
          permissionStatus.removeEventListener("change", onPermStatusChange);
        };
      })
      .catch((err) => {
        console.error({
          permissionName: name,
          error: err,
          name: err["name"],
          trace: err["trace"],
          message: err["message"],
          code: err["code"],
          constraint: err["constraint"],
        });
        setError(err.toString());
        setPermState(ENavPermState.denied);

        if (isErrorOf(err, "DOMException")) {
          //TODO: wait for ready state and try again
        }
        if (isErrorOf(err, "TypeError")) {
          setPermState(ENavPermState.unavailable);
        }
      });

    return () => {
      removePermissionListener();
    };
  }, [name, configuration, isAvailable]);

  return {
    state: permState,
    isLoading: permState === ENavPermState.loading,
    isPermitted: permState === ENavPermState.granted,
    canBePermitted: [
      ENavPermState.prompt,
      ENavPermState.loading,
      ENavPermState.unknown,
    ].includes(permState),
    error,
    name,
    descriptorName: permName,
  };
}
