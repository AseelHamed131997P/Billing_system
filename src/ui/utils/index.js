import facepaint from "facepaint";
import { breakpoints, breakpointsWithSmallDevice } from "../styles/theme";

export { css, withTheme, keyframes, Global } from "@emotion/react";
export { default as styled } from "@emotion/styled";

export const isUrlExternal = (url) => url[0] !== "/";

export const mq = facepaint(
  breakpoints.map((bp) => `@media (min-width: ${bp})`)
);

export const mqWithSmallDevice = facepaint(
  breakpointsWithSmallDevice.map((bp) => `@media (min-width: ${bp})`)
);

export { default as api } from "./api";
export { default as i18n } from "./i18n";
export { default as i18nInvoice } from "./i18nInvoice";
