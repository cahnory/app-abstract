/* eslint-disable import/prefer-default-export */
import { css } from 'emotion';

export const StyleSheet = {
  create: (styles) =>
    Object.entries(styles).reduce((res, [name, style]) => {
      res[name] = css(style);
      return res;
    }, {}),
};
