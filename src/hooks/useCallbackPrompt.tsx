/* eslint-disable react-hooks/exhaustive-deps */
import { useCallback, useEffect, useState } from "react";
import { useNavigateBlocker } from "./useNavigateBlocker";
/**
 * a hook that used to prevent the user from leaving the current page if an action is running right know like uploading
 * uncompleted video
 * used with the help of the useConfirmLeaving and useNavigateBlocker hooks
 * @param {boolean} when
 * @returns {Function | boolean}
 */
export function useCallbackPrompt(when: boolean): (boolean | (() => void))[] {
  const navigate: any = undefined;
  // useNavigate();
  const location: any = undefined;
  //  useLocation();
  const [showPrompt, setShowPrompt] = useState(false);
  const [lastLocation, setLastLocation] = useState<any>(null);
  const [confirmedNavigation, setConfirmedNavigation] = useState(false);

  const cancelNavigation = useCallback(() => {
    setShowPrompt(false);
    setLastLocation(null);
  }, []);

  // handle blocking when user click on another route prompt will be shown
  const handleBlockedNavigation = useCallback(
    (nextLocation: any) => {
      // in if condition we are checking next location and current location are equals or not
      if (
        !confirmedNavigation &&
        nextLocation.location.pathname !== location.pathname
      ) {
        setShowPrompt(true);
        setLastLocation(nextLocation);
        return false;
      }
      return true;
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [confirmedNavigation, location]
  );

  const confirmNavigation = useCallback(() => {
    setShowPrompt(false);
    setConfirmedNavigation(true);
  }, []);

  useEffect(() => {
    if (confirmedNavigation && lastLocation) {
      navigate(lastLocation.location?.pathname);

      // Clean-up state on confirmed navigation
      setConfirmedNavigation(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [confirmedNavigation, lastLocation]);

  useNavigateBlocker(handleBlockedNavigation, when);

  return [showPrompt, confirmNavigation, cancelNavigation];
}
