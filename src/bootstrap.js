import Vue from "vue";

import upperFirst from "lodash/upperFirst";
import camelCase from "lodash/camelCase";

const registerCmps = (fnRequire, prefix) =>
  fnRequire.keys().map(filename => {
    const config = fnRequire(filename);
    const name = upperFirst(
      camelCase(
        filename
          .split("/")
          .pop()
          .replace(/\.\w+$/, "")
      )
    );
    Vue.component(`${prefix}${name}`, config.default || config);
  });

registerCmps(
  require.context("./pages", false, /[a-zA-Z]\w+\.(vue|js)$/),
  "Page"
);
registerCmps(
  require.context("./components", false, /[a-zA-Z]\w+\.(vue|js)$/),
  "Cmp"
);
registerCmps(
  require.context("./components/charts", false, /[a-zA-Z]\w+\.(vue|js)$/),
  "Chart"
);
registerCmps(
  require.context("./components/layout", false, /[a-zA-Z]\w+\.(vue|js)$/),
  "Layout"
);
