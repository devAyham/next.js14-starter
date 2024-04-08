import { DisplayTypes } from "@/types/display.types";
import { LanguageTypes } from "@/types/language.types";
/** */
export interface InitialStateUiInterface {
  /** */
  theme: "purple" | "green";
  /** */
  language: LanguageTypes;
  /** */
  disaplay: DisplayTypes;
  /** */
  direction: "ltr" | "rtl";
  /** */
  loading: boolean;
  /** */
  FCMtoken: string | null | false;
}
