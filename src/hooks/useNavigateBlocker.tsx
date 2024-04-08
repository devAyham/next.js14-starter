

import { useRouter } from "next/router";
import { useEffect } from "react";
import type { History, Blocker, Transition } from "history";

export function useNavigateBlocker(blocker: Blocker, when = true): void {
  const router = useRouter();

  useEffect(() => {
    if (!when) return;

    const handleBeforePopState = (state: any): boolean => {
      const autoUnblockingTx: Transition = {
        ...state,
        retry() {
          router.beforePopState(() => true);
          state.retry();
        },
      };

      blocker(autoUnblockingTx);

      return false; // Return an empty string to allow navigation
    };

    router.beforePopState(handleBeforePopState);

    return () => {
      router.beforePopState(() => true); // Reset the beforePopState callback
    };
  }, [router, blocker, when]);
}
