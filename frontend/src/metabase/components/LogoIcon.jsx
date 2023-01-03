import React, { Component } from "react";
import PropTypes from "prop-types";
import cx from "classnames";

import { PLUGIN_LOGO_ICON_COMPONENTS } from "metabase/plugins";

class DefaultLogoIcon extends Component {
  static defaultProps = {
    height: 32,
  };
  static propTypes = {
    width: PropTypes.number,
    height: PropTypes.number,
    dark: PropTypes.bool,
  };

  render() {
    const { dark, height, width } = this.props;
    return (
      <svg
        version="1.0"
        xmlns="http://www.w3.org/2000/svg"
        width="66.000000pt"
        height="85.000000pt"
        viewBox="0 0 400.000000 400.000000"
        preserveAspectRatio="xMidYMid meet"
      >
        <g
          transform="translate(0.000000,400.000000) scale(0.100000,-0.100000)"
          fill="#000000"
          stroke="none"
        >
          className=
          {cx("Icon", { "text-brand": !dark }, { "text-white": dark })}
          <path
            d="M1477 3103 c-4 -3 -7 -129 -7 -279 l0 -274 -192 -2 -193 -3 0 -680 0
-680 43 -3 c37 -3 43 0 52 23 6 16 10 255 10 618 0 325 0 598 0 605 0 9 35 12
140 12 l140 0 0 -520 0 -520 23 -5 c12 -3 83 -4 157 -3 l135 3 3 569 c2 449 0
571 -10 578 -7 4 -55 8 -105 8 l-93 0 0 169 c0 94 3 172 8 174 4 3 132 -88
285 -201 l277 -207 0 -265 -1 -265 -94 -64 -95 -65 2 -320 3 -321 134 -3 c90
-2 138 1 147 9 11 9 14 73 14 349 l0 338 109 76 110 76 178 -121 c98 -66 183
-126 190 -132 9 -9 12 -87 14 -282 1 -148 5 -280 10 -293 6 -16 16 -22 38 -22
65 0 61 -19 61 330 l0 318 -217 148 c-120 81 -230 156 -245 167 l-27 20 -105
-72 c-57 -39 -107 -71 -110 -71 -3 0 -6 117 -6 259 l0 259 -292 219 c-346 259
-474 353 -480 353 -3 0 -8 -3 -11 -7z m203 -1133 l0 -470 -50 0 -50 0 0 470 0
470 50 0 50 0 0 -470z m468 -412 l-3 -263 -37 -3 c-34 -3 -38 -1 -38 20 0 13
-1 119 -2 237 l-1 214 34 28 c19 16 37 29 42 29 4 0 6 -118 5 -262z"
          />
        </g>
      </svg>
    );
  }
}

export default function LogoIcon(props) {
  const [Component = DefaultLogoIcon] = PLUGIN_LOGO_ICON_COMPONENTS;
  return <Component {...props} />;
}
