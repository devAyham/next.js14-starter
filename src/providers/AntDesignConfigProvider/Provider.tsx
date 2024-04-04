import { defaultTheme } from "@/styles/theme/defaultTheme";
import { ConfigProvider } from "antd";

/**
 * @namespace AntDesignConfigProvider
 */

/**
 * @description init dirctions ,locale , theme ,and empty render component
 *   @param {any} children - wrapped components
 */
const AntDesignConfigProvider = ({ children }: any) => {
  return <ConfigProvider theme={defaultTheme}>{children}</ConfigProvider>;
};
export default AntDesignConfigProvider;
