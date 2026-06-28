/* @ds-bundle: {"format":3,"namespace":"DexwinPayDesignSystem_848e17","components":[{"name":"Button","sourcePath":"components/buttons/Button.jsx"},{"name":"IconButton","sourcePath":"components/buttons/IconButton.jsx"},{"name":"Card","sourcePath":"components/data/Card.jsx"},{"name":"Metric","sourcePath":"components/data/Metric.jsx"},{"name":"Table","sourcePath":"components/data/Table.jsx"},{"name":"Tabs","sourcePath":"components/data/Tabs.jsx"},{"name":"Avatar","sourcePath":"components/display/Avatar.jsx"},{"name":"Badge","sourcePath":"components/display/Badge.jsx"},{"name":"FeaturedIcon","sourcePath":"components/display/FeaturedIcon.jsx"},{"name":"Tag","sourcePath":"components/display/Tag.jsx"},{"name":"Alert","sourcePath":"components/feedback/Alert.jsx"},{"name":"Modal","sourcePath":"components/feedback/Modal.jsx"},{"name":"ProgressBar","sourcePath":"components/feedback/ProgressBar.jsx"},{"name":"Tooltip","sourcePath":"components/feedback/Tooltip.jsx"},{"name":"Checkbox","sourcePath":"components/forms/Checkbox.jsx"},{"name":"Input","sourcePath":"components/forms/Input.jsx"},{"name":"Radio","sourcePath":"components/forms/Radio.jsx"},{"name":"Select","sourcePath":"components/forms/Select.jsx"},{"name":"Textarea","sourcePath":"components/forms/Textarea.jsx"},{"name":"Toggle","sourcePath":"components/forms/Toggle.jsx"}],"sourceHashes":{"components/buttons/Button.jsx":"f46b363a3091","components/buttons/IconButton.jsx":"3debe2793ff6","components/data/Card.jsx":"722205f2ebdf","components/data/Metric.jsx":"fe7b21083a34","components/data/Table.jsx":"83b5225f0b53","components/data/Tabs.jsx":"73926454b461","components/display/Avatar.jsx":"4730779ee7d8","components/display/Badge.jsx":"9e41f878625e","components/display/FeaturedIcon.jsx":"1fc72f9ecf32","components/display/Tag.jsx":"1dd9d9073790","components/feedback/Alert.jsx":"dac8d8e3ef75","components/feedback/Modal.jsx":"e9b81faa40cc","components/feedback/ProgressBar.jsx":"602e4fcf585e","components/feedback/Tooltip.jsx":"2d94ab290030","components/forms/Checkbox.jsx":"f81cb6255597","components/forms/Input.jsx":"221bb022c0c7","components/forms/Radio.jsx":"26d884f79a5d","components/forms/Select.jsx":"27e8b06df137","components/forms/Textarea.jsx":"6cb78980747d","components/forms/Toggle.jsx":"9a532405a667","ui_kits/app/parts.jsx":"b3d7d03e8c0d","ui_kits/app/screens.jsx":"aa1c182dcaba"},"inlinedExternals":[],"unexposedExports":[]} */

(() => {

const __ds_ns = (window.DexwinPayDesignSystem_848e17 = window.DexwinPayDesignSystem_848e17 || {});

const __ds_scope = {};

(__ds_ns.__errors = __ds_ns.__errors || []);

// components/buttons/Button.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Button — DexwinPay's primary action control.
 * Pill-shaped (radius-full), Maven Pro semibold. Five hierarchies, four sizes.
 */
function Button({
  children,
  hierarchy = "primary",
  size = "md",
  destructive = false,
  disabled = false,
  iconLeading = null,
  iconTrailing = null,
  iconOnly = false,
  fullWidth = false,
  href = null,
  type = "button",
  style = {},
  ...rest
}) {
  const sizes = {
    sm: {
      padding: iconOnly ? "8px" : "8px 14px",
      fontSize: 14,
      lineHeight: "20px",
      gap: 6,
      icon: 18
    },
    md: {
      padding: iconOnly ? "10px" : "10px 16px",
      fontSize: 14,
      lineHeight: "20px",
      gap: 6,
      icon: 18
    },
    lg: {
      padding: iconOnly ? "12px" : "12px 20px",
      fontSize: 16,
      lineHeight: "24px",
      gap: 8,
      icon: 20
    },
    xl: {
      padding: iconOnly ? "14px" : "14px 24px",
      fontSize: 16,
      lineHeight: "24px",
      gap: 8,
      icon: 20
    }
  };
  const s = sizes[size] || sizes.md;
  const brandSolid = destructive ? "var(--error-600)" : "var(--bg-brand-solid)";
  const brandSolidHover = destructive ? "var(--error-700)" : "var(--bg-brand-solid-hover)";
  const palettes = {
    primary: {
      background: brandSolid,
      color: "#fff",
      border: "1px solid transparent",
      boxShadow: "var(--shadow-btn-primary)",
      "--hover-bg": brandSolidHover
    },
    secondary: {
      background: "#fff",
      color: destructive ? "var(--error-700)" : "var(--fg-secondary)",
      border: `1px solid ${destructive ? "var(--error-300)" : "var(--border-primary)"}`,
      boxShadow: "var(--shadow-xs)",
      "--hover-bg": destructive ? "var(--error-50)" : "var(--bg-secondary)"
    },
    tertiary: {
      background: "transparent",
      color: destructive ? "var(--error-700)" : "var(--fg-secondary)",
      border: "1px solid transparent",
      boxShadow: "none",
      "--hover-bg": destructive ? "var(--error-50)" : "var(--bg-secondary)"
    },
    "link-gray": {
      background: "transparent",
      color: "var(--fg-secondary)",
      border: "1px solid transparent",
      boxShadow: "none",
      padding: 0,
      "--hover-bg": "transparent",
      "--hover-color": "var(--fg-primary)"
    },
    "link-color": {
      background: "transparent",
      color: destructive ? "var(--error-700)" : "var(--fg-brand)",
      border: "1px solid transparent",
      boxShadow: "none",
      padding: 0,
      "--hover-bg": "transparent",
      "--hover-color": destructive ? "var(--error-800)" : "var(--brand-800)"
    }
  };
  const p = palettes[hierarchy] || palettes.primary;
  const isLink = hierarchy === "link-gray" || hierarchy === "link-color";
  const base = {
    display: fullWidth ? "flex" : "inline-flex",
    width: fullWidth ? "100%" : undefined,
    alignItems: "center",
    justifyContent: "center",
    gap: s.gap,
    fontFamily: "var(--font-body)",
    fontWeight: 600,
    fontSize: s.fontSize,
    lineHeight: s.lineHeight,
    padding: isLink ? 0 : s.padding,
    borderRadius: isLink ? 0 : "var(--radius-full)",
    cursor: disabled ? "not-allowed" : "pointer",
    whiteSpace: "nowrap",
    transition: "background 120ms ease, color 120ms ease, box-shadow 120ms ease, transform 60ms ease",
    opacity: disabled ? 0.55 : 1,
    pointerEvents: disabled ? "none" : undefined,
    ...p,
    ...style
  };
  const iconStyle = {
    width: s.icon,
    height: s.icon,
    flexShrink: 0,
    display: "inline-flex"
  };
  const onEnter = e => {
    if (disabled) return;
    if (p["--hover-bg"] && p["--hover-bg"] !== "transparent") e.currentTarget.style.background = p["--hover-bg"];
    if (p["--hover-color"]) e.currentTarget.style.color = p["--hover-color"];
  };
  const onLeave = e => {
    if (disabled) return;
    e.currentTarget.style.background = p.background;
    e.currentTarget.style.color = p.color;
  };
  const onDown = e => {
    if (!disabled && !isLink) e.currentTarget.style.transform = "translateY(1px)";
  };
  const onUp = e => {
    if (!disabled) e.currentTarget.style.transform = "translateY(0)";
  };
  const content = /*#__PURE__*/React.createElement(React.Fragment, null, iconLeading && /*#__PURE__*/React.createElement("span", {
    style: iconStyle
  }, iconLeading), !iconOnly && children, iconOnly && children, iconTrailing && /*#__PURE__*/React.createElement("span", {
    style: iconStyle
  }, iconTrailing));
  const handlers = {
    onMouseEnter: onEnter,
    onMouseLeave: onLeave,
    onMouseDown: onDown,
    onMouseUp: onUp
  };
  if (href) return /*#__PURE__*/React.createElement("a", _extends({
    href: href,
    style: base
  }, handlers, rest), content);
  return /*#__PURE__*/React.createElement("button", _extends({
    type: type,
    disabled: disabled,
    style: base
  }, handlers, rest), content);
}
Object.assign(__ds_scope, { Button });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/buttons/Button.jsx", error: String((e && e.message) || e) }); }

// components/buttons/IconButton.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * IconButton — square, icon-only utility button. Used for toolbar actions,
 * close buttons, table-row actions, and the notification bell.
 */
function IconButton({
  children,
  hierarchy = "secondary",
  size = "md",
  disabled = false,
  ariaLabel = "button",
  style = {},
  ...rest
}) {
  const sizes = {
    sm: 34,
    md: 40,
    lg: 46
  };
  const icon = {
    sm: 16,
    md: 20,
    lg: 22
  };
  const dim = sizes[size] || sizes.md;
  const palettes = {
    primary: {
      background: "var(--bg-brand-solid)",
      color: "#fff",
      border: "1px solid transparent",
      boxShadow: "var(--shadow-btn-primary)",
      "--hover": "var(--bg-brand-solid-hover)"
    },
    secondary: {
      background: "#fff",
      color: "var(--fg-secondary)",
      border: "1px solid var(--border-primary)",
      boxShadow: "var(--shadow-xs)",
      "--hover": "var(--bg-secondary)"
    },
    tertiary: {
      background: "transparent",
      color: "var(--fg-tertiary)",
      border: "1px solid transparent",
      boxShadow: "none",
      "--hover": "var(--bg-secondary)"
    },
    soft: {
      background: "var(--gray-100)",
      color: "var(--fg-secondary)",
      border: "1px solid transparent",
      boxShadow: "none",
      "--hover": "var(--gray-200)"
    }
  };
  const p = palettes[hierarchy] || palettes.secondary;
  return /*#__PURE__*/React.createElement("button", _extends({
    type: "button",
    "aria-label": ariaLabel,
    disabled: disabled,
    onMouseEnter: e => {
      if (!disabled) e.currentTarget.style.background = p["--hover"];
    },
    onMouseLeave: e => {
      if (!disabled) e.currentTarget.style.background = p.background;
    },
    style: {
      width: dim,
      height: dim,
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      borderRadius: "var(--radius-lg)",
      cursor: disabled ? "not-allowed" : "pointer",
      transition: "background 120ms ease, color 120ms ease",
      opacity: disabled ? 0.5 : 1,
      ...p,
      ...style
    }
  }, rest), /*#__PURE__*/React.createElement("span", {
    style: {
      width: icon[size] || 20,
      height: icon[size] || 20,
      display: "inline-flex"
    }
  }, children));
}
Object.assign(__ds_scope, { IconButton });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/buttons/IconButton.jsx", error: String((e && e.message) || e) }); }

// components/data/Card.jsx
try { (() => {
/**
 * Card — the base surface. White, 1px secondary border, radius-xl, shadow-xs.
 * Optional header (title + description + actions) and hover elevation.
 */
function Card({
  children,
  title = null,
  description = null,
  actions = null,
  footer = null,
  padding = 24,
  hoverable = false,
  style = {}
}) {
  const [hover, setHover] = React.useState(false);
  return /*#__PURE__*/React.createElement("div", {
    onMouseEnter: () => hoverable && setHover(true),
    onMouseLeave: () => hoverable && setHover(false),
    style: {
      background: "var(--surface-card)",
      border: "1px solid var(--border-secondary)",
      borderRadius: "var(--radius-2xl)",
      boxShadow: hover ? "var(--shadow-md)" : "var(--shadow-xs)",
      transition: "box-shadow 180ms ease",
      fontFamily: "var(--font-body)",
      overflow: "hidden",
      ...style
    }
  }, (title || actions) && /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "flex-start",
      justifyContent: "space-between",
      gap: 16,
      padding: `20px ${padding}px ${description ? 20 : 16}px`,
      borderBottom: "1px solid var(--border-secondary)"
    }
  }, /*#__PURE__*/React.createElement("div", null, title && /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: "var(--font-display)",
      fontSize: 18,
      fontWeight: 700,
      color: "var(--fg-primary)",
      letterSpacing: "-0.01em"
    }
  }, title), description && /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 14,
      color: "var(--fg-tertiary)",
      marginTop: 4,
      lineHeight: "20px"
    }
  }, description)), actions && /*#__PURE__*/React.createElement("div", {
    style: {
      flexShrink: 0,
      display: "flex",
      gap: 8
    }
  }, actions)), /*#__PURE__*/React.createElement("div", {
    style: {
      padding
    }
  }, children), footer && /*#__PURE__*/React.createElement("div", {
    style: {
      padding: `16px ${padding}px`,
      borderTop: "1px solid var(--border-secondary)",
      background: "var(--bg-secondary)"
    }
  }, footer));
}
Object.assign(__ds_scope, { Card });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/data/Card.jsx", error: String((e && e.message) || e) }); }

// components/data/Metric.jsx
try { (() => {
/**
 * Metric — a KPI tile: label, big tabular value, and a trend delta. Used on
 * dashboards and the payroll summary strip.
 */
function Metric({
  label,
  value,
  sub = null,
  trend = null,
  trendDir = "up",
  icon = null,
  style = {}
}) {
  const up = trendDir === "up";
  const trendColor = up ? "var(--success-700)" : "var(--error-700)";
  const trendBg = up ? "var(--success-50)" : "var(--error-50)";
  return /*#__PURE__*/React.createElement("div", {
    style: {
      background: "var(--surface-card)",
      border: "1px solid var(--border-secondary)",
      borderRadius: "var(--radius-xl)",
      padding: 20,
      fontFamily: "var(--font-body)",
      boxShadow: "var(--shadow-xs)",
      ...style
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 13,
      fontWeight: 600,
      color: "var(--fg-tertiary)"
    }
  }, label), icon && /*#__PURE__*/React.createElement("span", {
    style: {
      width: 20,
      height: 20,
      color: "var(--fg-quaternary)"
    }
  }, icon)), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: "var(--font-display)",
      fontSize: 30,
      lineHeight: "38px",
      fontWeight: 700,
      letterSpacing: "-0.02em",
      color: "var(--fg-primary)",
      marginTop: 8,
      fontVariantNumeric: "tabular-nums"
    }
  }, value), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 8,
      marginTop: 8
    }
  }, trend != null && /*#__PURE__*/React.createElement("span", {
    style: {
      display: "inline-flex",
      alignItems: "center",
      gap: 3,
      fontSize: 12,
      fontWeight: 700,
      color: trendColor,
      background: trendBg,
      padding: "2px 7px",
      borderRadius: "var(--radius-full)"
    }
  }, /*#__PURE__*/React.createElement("svg", {
    viewBox: "0 0 24 24",
    width: "13",
    height: "13",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2.5",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }, up ? /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("line", {
    x1: "12",
    y1: "19",
    x2: "12",
    y2: "5"
  }), /*#__PURE__*/React.createElement("polyline", {
    points: "5 12 12 5 19 12"
  })) : /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("line", {
    x1: "12",
    y1: "5",
    x2: "12",
    y2: "19"
  }), /*#__PURE__*/React.createElement("polyline", {
    points: "19 12 12 19 5 12"
  }))), trend), sub && /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 13,
      color: "var(--fg-tertiary)"
    }
  }, sub)));
}
Object.assign(__ds_scope, { Metric });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/data/Metric.jsx", error: String((e && e.message) || e) }); }

// components/data/Table.jsx
try { (() => {
/**
 * Table — Untitled UI data table. Pass `columns` ([{key,header,align,render,width}])
 * and `rows`. Header is a tinted uppercase strip; rows have 1px dividers and a
 * subtle hover. Render functions receive the full row for cells like avatars,
 * badges, or formatted currency.
 */
function Table({
  columns = [],
  rows = [],
  getRowKey = (_, i) => i,
  style = {}
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      border: "1px solid var(--border-secondary)",
      borderRadius: "var(--radius-xl)",
      overflow: "hidden",
      background: "#fff",
      fontFamily: "var(--font-body)",
      ...style
    }
  }, /*#__PURE__*/React.createElement("table", {
    style: {
      width: "100%",
      borderCollapse: "collapse"
    }
  }, /*#__PURE__*/React.createElement("thead", null, /*#__PURE__*/React.createElement("tr", {
    style: {
      background: "var(--gray-50)"
    }
  }, columns.map(c => /*#__PURE__*/React.createElement("th", {
    key: c.key,
    style: {
      textAlign: c.align || "left",
      padding: "12px 20px",
      fontSize: 12,
      fontWeight: 600,
      color: "var(--fg-quaternary)",
      whiteSpace: "nowrap",
      width: c.width,
      borderBottom: "1px solid var(--border-secondary)"
    }
  }, c.header)))), /*#__PURE__*/React.createElement("tbody", null, rows.map((row, i) => /*#__PURE__*/React.createElement("tr", {
    key: getRowKey(row, i),
    onMouseEnter: e => e.currentTarget.style.background = "var(--gray-25)",
    onMouseLeave: e => e.currentTarget.style.background = "transparent",
    style: {
      borderTop: i === 0 ? "none" : "1px solid var(--border-secondary)",
      transition: "background 100ms"
    }
  }, columns.map(c => /*#__PURE__*/React.createElement("td", {
    key: c.key,
    style: {
      textAlign: c.align || "left",
      padding: "14px 20px",
      fontSize: 14,
      color: "var(--fg-secondary)",
      verticalAlign: "middle",
      fontVariantNumeric: c.numeric ? "tabular-nums" : undefined
    }
  }, c.render ? c.render(row) : row[c.key])))))));
}
Object.assign(__ds_scope, { Table });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/data/Table.jsx", error: String((e && e.message) || e) }); }

// components/data/Tabs.jsx
try { (() => {
/**
 * Tabs — horizontal tab bar. Two styles: "underline" (default, brand
 * underline) and "pill" (brand-50 active pill). Controlled via value/onChange.
 */
function Tabs({
  tabs = [],
  value,
  onChange,
  variant = "underline",
  size = "md",
  style = {}
}) {
  const fs = size === "sm" ? 14 : 15;
  if (variant === "pill") {
    return /*#__PURE__*/React.createElement("div", {
      style: {
        display: "inline-flex",
        gap: 4,
        padding: 4,
        background: "var(--gray-50)",
        border: "1px solid var(--border-secondary)",
        borderRadius: "var(--radius-lg)",
        fontFamily: "var(--font-body)",
        ...style
      }
    }, tabs.map(t => {
      const active = t.value === value;
      return /*#__PURE__*/React.createElement("button", {
        key: t.value,
        onClick: () => onChange && onChange(t.value),
        style: {
          display: "inline-flex",
          alignItems: "center",
          gap: 7,
          padding: "7px 14px",
          border: 0,
          borderRadius: "var(--radius-md)",
          cursor: "pointer",
          background: active ? "#fff" : "transparent",
          color: active ? "var(--fg-primary)" : "var(--fg-tertiary)",
          fontWeight: 600,
          fontSize: fs,
          fontFamily: "inherit",
          boxShadow: active ? "var(--shadow-xs)" : "none",
          transition: "background 120ms, color 120ms"
        }
      }, t.label, t.count != null && /*#__PURE__*/React.createElement("span", {
        style: {
          fontSize: 12,
          fontWeight: 700,
          color: active ? "var(--brand-700)" : "var(--fg-quaternary)",
          background: active ? "var(--brand-50)" : "var(--gray-100)",
          padding: "1px 7px",
          borderRadius: 999
        }
      }, t.count));
    }));
  }
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 4,
      borderBottom: "1px solid var(--border-secondary)",
      fontFamily: "var(--font-body)",
      ...style
    }
  }, tabs.map(t => {
    const active = t.value === value;
    return /*#__PURE__*/React.createElement("button", {
      key: t.value,
      onClick: () => onChange && onChange(t.value),
      style: {
        display: "inline-flex",
        alignItems: "center",
        gap: 7,
        padding: "10px 4px",
        marginBottom: -1,
        border: 0,
        borderBottom: `2px solid ${active ? "var(--brand-600)" : "transparent"}`,
        background: "transparent",
        cursor: "pointer",
        margin: "0 12px 0 0",
        color: active ? "var(--brand-700)" : "var(--fg-tertiary)",
        fontWeight: 600,
        fontSize: fs,
        fontFamily: "inherit",
        transition: "color 120ms, border-color 120ms"
      }
    }, t.label, t.count != null && /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 12,
        fontWeight: 700,
        color: active ? "var(--brand-700)" : "var(--fg-quaternary)",
        background: active ? "var(--brand-50)" : "var(--gray-100)",
        padding: "1px 7px",
        borderRadius: 999
      }
    }, t.count));
  }));
}
Object.assign(__ds_scope, { Tabs });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/data/Tabs.jsx", error: String((e && e.message) || e) }); }

// components/display/Avatar.jsx
try { (() => {
/**
 * Avatar — circular user/company avatar. Renders an image, initials, or a
 * placeholder glyph, with an optional online/status indicator. Brand-600
 * fill with white initials is the Dexwin default.
 */
function Avatar({
  src = null,
  initials = null,
  size = "md",
  status = null,
  // "online" | "offline" | null
  square = false,
  style = {}
}) {
  const sizes = {
    xs: 24,
    sm: 32,
    md: 40,
    lg: 48,
    xl: 56,
    "2xl": 64
  };
  const fonts = {
    xs: 11,
    sm: 13,
    md: 15,
    lg: 18,
    xl: 20,
    "2xl": 24
  };
  const dim = sizes[size] || sizes.md;
  const ring = {
    online: "var(--success-500)",
    offline: "var(--gray-300)"
  };
  return /*#__PURE__*/React.createElement("span", {
    style: {
      position: "relative",
      display: "inline-flex",
      flexShrink: 0,
      ...style
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: dim,
      height: dim,
      borderRadius: square ? "var(--radius-md)" : "var(--radius-full)",
      background: src ? "var(--gray-100)" : "var(--brand-600)",
      color: "#fff",
      overflow: "hidden",
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      fontFamily: "var(--font-display)",
      fontWeight: 700,
      fontSize: fonts[size] || 15,
      letterSpacing: "0.01em",
      boxShadow: "inset 0 0 0 1px rgba(10,13,18,0.08)"
    }
  }, src ? /*#__PURE__*/React.createElement("img", {
    src: src,
    alt: "",
    style: {
      width: "100%",
      height: "100%",
      objectFit: "cover"
    }
  }) : initials || /*#__PURE__*/React.createElement("svg", {
    viewBox: "0 0 24 24",
    width: dim * 0.55,
    height: dim * 0.55,
    fill: "none",
    stroke: "rgba(255,255,255,0.9)",
    strokeWidth: "1.8",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }, /*#__PURE__*/React.createElement("circle", {
    cx: "12",
    cy: "8",
    r: "4"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M4 20c0-4 4-6 8-6s8 2 8 6"
  }))), status && /*#__PURE__*/React.createElement("span", {
    style: {
      position: "absolute",
      right: -1,
      bottom: -1,
      width: Math.max(8, dim * 0.26),
      height: Math.max(8, dim * 0.26),
      borderRadius: 999,
      background: ring[status] || ring.offline,
      border: "2px solid #fff"
    }
  }));
}
Object.assign(__ds_scope, { Avatar });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/display/Avatar.jsx", error: String((e && e.message) || e) }); }

// components/display/Badge.jsx
try { (() => {
const COLORS = {
  gray: {
    bg: "var(--gray-50)",
    fg: "var(--gray-700)",
    bd: "var(--gray-200)",
    dot: "var(--gray-500)"
  },
  brand: {
    bg: "var(--brand-50)",
    fg: "var(--brand-700)",
    bd: "var(--brand-200)",
    dot: "var(--brand-500)"
  },
  success: {
    bg: "var(--success-50)",
    fg: "var(--success-700)",
    bd: "var(--success-200)",
    dot: "var(--success-500)"
  },
  warning: {
    bg: "var(--warning-50)",
    fg: "var(--warning-700)",
    bd: "var(--warning-200)",
    dot: "var(--warning-500)"
  },
  error: {
    bg: "var(--error-50)",
    fg: "var(--error-700)",
    bd: "var(--error-200)",
    dot: "var(--error-500)"
  },
  info: {
    bg: "var(--info-50)",
    fg: "var(--info-700)",
    bd: "var(--info-200)",
    dot: "var(--info-500)"
  },
  orange: {
    bg: "var(--orange-100)",
    fg: "var(--orange-700)",
    bd: "var(--orange-100)",
    dot: "var(--orange-500)"
  },
  pink: {
    bg: "var(--pink-100)",
    fg: "var(--pink-700)",
    bd: "var(--pink-100)",
    dot: "var(--pink-500)"
  },
  indigo: {
    bg: "var(--indigo-100)",
    fg: "var(--indigo-700)",
    bd: "var(--indigo-100)",
    dot: "var(--indigo-500)"
  },
  teal: {
    bg: "var(--teal-100)",
    fg: "var(--teal-700)",
    bd: "var(--teal-100)",
    dot: "var(--teal-500)"
  },
  purple: {
    bg: "var(--purple-100)",
    fg: "var(--purple-700)",
    bd: "var(--purple-100)",
    dot: "var(--purple-500)"
  }
};

/**
 * Badge — compact status / category label. Pill by default, with an optional
 * leading dot or icon. The dot variant is Dexwin's standard for row status
 * (Ready / On leave / Overdue).
 */
function Badge({
  children,
  color = "gray",
  size = "md",
  dot = false,
  icon = null,
  square = false,
  style = {}
}) {
  const c = COLORS[color] || COLORS.gray;
  const sizes = {
    sm: {
      fontSize: 12,
      padding: dot || icon ? "2px 8px 2px 7px" : "2px 8px",
      gap: 5,
      dot: 6
    },
    md: {
      fontSize: 12,
      padding: dot || icon ? "3px 10px 3px 9px" : "3px 10px",
      gap: 6,
      dot: 6
    },
    lg: {
      fontSize: 14,
      padding: dot || icon ? "5px 12px 5px 10px" : "4px 12px",
      gap: 6,
      dot: 8
    }
  };
  const s = sizes[size] || sizes.md;
  return /*#__PURE__*/React.createElement("span", {
    style: {
      display: "inline-flex",
      alignItems: "center",
      gap: s.gap,
      fontFamily: "var(--font-body)",
      fontWeight: 600,
      fontSize: s.fontSize,
      lineHeight: "18px",
      padding: s.padding,
      color: c.fg,
      background: c.bg,
      border: `1px solid ${c.bd}`,
      borderRadius: square ? "var(--radius-sm)" : "var(--radius-full)",
      whiteSpace: "nowrap",
      ...style
    }
  }, dot && /*#__PURE__*/React.createElement("span", {
    style: {
      width: s.dot,
      height: s.dot,
      borderRadius: 999,
      background: c.dot,
      flexShrink: 0
    }
  }), icon && /*#__PURE__*/React.createElement("span", {
    style: {
      width: s.dot + 6,
      height: s.dot + 6,
      display: "inline-flex",
      color: c.dot
    }
  }, icon), children);
}
Object.assign(__ds_scope, { Badge });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/display/Badge.jsx", error: String((e && e.message) || e) }); }

// components/display/FeaturedIcon.jsx
try { (() => {
const COLORS = {
  brand: {
    soft: "var(--brand-50)",
    softFg: "var(--brand-700)",
    solid: "var(--brand-600)"
  },
  gray: {
    soft: "var(--gray-100)",
    softFg: "var(--gray-700)",
    solid: "var(--gray-700)"
  },
  success: {
    soft: "var(--success-50)",
    softFg: "var(--success-700)",
    solid: "var(--success-600)"
  },
  warning: {
    soft: "var(--warning-50)",
    softFg: "var(--warning-700)",
    solid: "var(--warning-600)"
  },
  error: {
    soft: "var(--error-50)",
    softFg: "var(--error-700)",
    solid: "var(--error-600)"
  },
  info: {
    soft: "var(--info-50)",
    softFg: "var(--info-700)",
    solid: "var(--info-600)"
  }
};

/**
 * FeaturedIcon — an icon inside a coloured container. Used on feature cards,
 * empty states, modal headers and stat tiles. `light` (soft tint) is the
 * Dexwin default; `solid` and `outline` are also available.
 */
function FeaturedIcon({
  children,
  color = "brand",
  theme = "light",
  // "light" | "solid" | "outline"
  size = "md",
  style = {}
}) {
  const c = COLORS[color] || COLORS.brand;
  const sizes = {
    sm: 32,
    md: 40,
    lg: 48,
    xl: 56
  };
  const icons = {
    sm: 16,
    md: 20,
    lg: 24,
    xl: 28
  };
  const radii = {
    sm: "var(--radius-md)",
    md: "var(--radius-lg)",
    lg: "var(--radius-xl)",
    xl: "var(--radius-2xl)"
  };
  const dim = sizes[size] || sizes.md;
  let box;
  if (theme === "solid") box = {
    background: c.solid,
    color: "#fff",
    boxShadow: "var(--shadow-xs)"
  };else if (theme === "outline") box = {
    background: "#fff",
    color: c.softFg,
    boxShadow: `0 0 0 1px ${c.soft}, var(--shadow-xs)`,
    outline: `6px solid ${c.soft}`,
    outlineOffset: -3
  };else box = {
    background: c.soft,
    color: c.softFg
  };
  return /*#__PURE__*/React.createElement("span", {
    style: {
      width: dim,
      height: dim,
      flexShrink: 0,
      borderRadius: radii[size] || "var(--radius-lg)",
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      ...box,
      ...style
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: icons[size] || 20,
      height: icons[size] || 20,
      display: "inline-flex"
    }
  }, children));
}
Object.assign(__ds_scope, { FeaturedIcon });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/display/FeaturedIcon.jsx", error: String((e && e.message) || e) }); }

// components/display/Tag.jsx
try { (() => {
/**
 * Tag — an interactive, removable chip (filters, selected items, multi-select
 * inputs). Squarer than a Badge (radius-sm), with an optional dismiss "×" and
 * leading dot/avatar slot.
 */
function Tag({
  children,
  size = "md",
  leading = null,
  onRemove = null,
  count = null,
  style = {}
}) {
  const sizes = {
    sm: {
      fontSize: 12,
      padding: "2px 6px",
      gap: 5,
      h: 22,
      x: 12
    },
    md: {
      fontSize: 14,
      padding: "3px 8px",
      gap: 6,
      h: 26,
      x: 14
    },
    lg: {
      fontSize: 14,
      padding: "5px 10px",
      gap: 7,
      h: 30,
      x: 16
    }
  };
  const s = sizes[size] || sizes.md;
  return /*#__PURE__*/React.createElement("span", {
    style: {
      display: "inline-flex",
      alignItems: "center",
      gap: s.gap,
      fontFamily: "var(--font-body)",
      fontWeight: 500,
      fontSize: s.fontSize,
      color: "var(--fg-secondary)",
      background: "#fff",
      border: "1px solid var(--border-primary)",
      borderRadius: "var(--radius-sm)",
      padding: s.padding,
      boxShadow: "var(--shadow-xs)",
      whiteSpace: "nowrap",
      ...style
    }
  }, leading, children, count != null && /*#__PURE__*/React.createElement("span", {
    style: {
      fontVariantNumeric: "tabular-nums",
      color: "var(--fg-quaternary)",
      fontWeight: 600
    }
  }, count), onRemove && /*#__PURE__*/React.createElement("button", {
    onClick: onRemove,
    "aria-label": "Remove",
    style: {
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      width: s.x,
      height: s.x,
      marginLeft: 1,
      padding: 0,
      border: 0,
      background: "transparent",
      cursor: "pointer",
      color: "var(--fg-quaternary)",
      borderRadius: "var(--radius-xs)"
    },
    onMouseEnter: e => {
      e.currentTarget.style.background = "var(--gray-100)";
      e.currentTarget.style.color = "var(--fg-secondary)";
    },
    onMouseLeave: e => {
      e.currentTarget.style.background = "transparent";
      e.currentTarget.style.color = "var(--fg-quaternary)";
    }
  }, /*#__PURE__*/React.createElement("svg", {
    viewBox: "0 0 24 24",
    width: s.x - 4,
    height: s.x - 4,
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2.2",
    strokeLinecap: "round"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M18 6 6 18M6 6l12 12"
  }))));
}
Object.assign(__ds_scope, { Tag });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/display/Tag.jsx", error: String((e && e.message) || e) }); }

// components/feedback/Alert.jsx
try { (() => {
const COLORS = {
  brand: {
    bg: "var(--brand-50)",
    bd: "var(--brand-200)",
    fg: "var(--brand-700)",
    title: "var(--brand-800)"
  },
  gray: {
    bg: "var(--gray-50)",
    bd: "var(--gray-200)",
    fg: "var(--gray-600)",
    title: "var(--gray-800)"
  },
  success: {
    bg: "var(--success-50)",
    bd: "var(--success-200)",
    fg: "var(--success-700)",
    title: "var(--success-800)"
  },
  warning: {
    bg: "var(--warning-50)",
    bd: "var(--warning-200)",
    fg: "var(--warning-700)",
    title: "var(--warning-800)"
  },
  error: {
    bg: "var(--error-50)",
    bd: "var(--error-200)",
    fg: "var(--error-700)",
    title: "var(--error-800)"
  },
  info: {
    bg: "var(--info-50)",
    bd: "var(--info-200)",
    fg: "var(--info-700)",
    title: "var(--info-800)"
  }
};
const DEFAULT_ICONS = {
  success: /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("circle", {
    cx: "12",
    cy: "12",
    r: "9"
  }), /*#__PURE__*/React.createElement("polyline", {
    points: "9 12 11.5 14.5 16 9.5"
  })),
  warning: /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("path", {
    d: "M12 3 2 20h20L12 3z"
  }), /*#__PURE__*/React.createElement("line", {
    x1: "12",
    y1: "10",
    x2: "12",
    y2: "14"
  }), /*#__PURE__*/React.createElement("line", {
    x1: "12",
    y1: "17.5",
    x2: "12",
    y2: "17.5"
  })),
  error: /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("circle", {
    cx: "12",
    cy: "12",
    r: "9"
  }), /*#__PURE__*/React.createElement("line", {
    x1: "12",
    y1: "8",
    x2: "12",
    y2: "13"
  }), /*#__PURE__*/React.createElement("line", {
    x1: "12",
    y1: "16.5",
    x2: "12",
    y2: "16.5"
  })),
  info: /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("circle", {
    cx: "12",
    cy: "12",
    r: "9"
  }), /*#__PURE__*/React.createElement("line", {
    x1: "12",
    y1: "11",
    x2: "12",
    y2: "16"
  }), /*#__PURE__*/React.createElement("line", {
    x1: "12",
    y1: "8",
    x2: "12",
    y2: "8"
  }))
};

/**
 * Alert — inline message banner with leading icon, title, body and optional
 * actions / dismiss. Soft-tinted by colour, 1px border.
 */
function Alert({
  color = "info",
  title = null,
  children,
  icon = undefined,
  actions = null,
  onDismiss = null,
  style = {}
}) {
  const c = COLORS[color] || COLORS.info;
  const glyph = icon !== undefined ? icon : /*#__PURE__*/React.createElement("svg", {
    viewBox: "0 0 24 24",
    width: "20",
    height: "20",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "1.8",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }, DEFAULT_ICONS[color] || DEFAULT_ICONS.info);
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 12,
      padding: 16,
      background: c.bg,
      border: `1px solid ${c.bd}`,
      borderRadius: "var(--radius-xl)",
      fontFamily: "var(--font-body)",
      ...style
    }
  }, glyph && /*#__PURE__*/React.createElement("span", {
    style: {
      color: c.fg,
      flexShrink: 0,
      marginTop: 1
    }
  }, glyph), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      minWidth: 0
    }
  }, title && /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 14,
      fontWeight: 700,
      color: c.title
    }
  }, title), children && /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 14,
      color: c.fg,
      marginTop: title ? 3 : 0,
      lineHeight: "20px"
    }
  }, children), actions && /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 12,
      marginTop: 12
    }
  }, actions)), onDismiss && /*#__PURE__*/React.createElement("button", {
    onClick: onDismiss,
    "aria-label": "Dismiss",
    style: {
      border: 0,
      background: "transparent",
      cursor: "pointer",
      color: c.fg,
      padding: 2,
      height: 22
    }
  }, /*#__PURE__*/React.createElement("svg", {
    viewBox: "0 0 24 24",
    width: "18",
    height: "18",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2",
    strokeLinecap: "round"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M18 6 6 18M6 6l12 12"
  }))));
}
Object.assign(__ds_scope, { Alert });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/feedback/Alert.jsx", error: String((e && e.message) || e) }); }

// components/feedback/Modal.jsx
try { (() => {
/**
 * Modal — centred dialog with overlay. Optional FeaturedIcon header, title,
 * description, body and a footer action row. Renders nothing when !open.
 */
function Modal({
  open = true,
  onClose = null,
  icon = null,
  title = null,
  description = null,
  children,
  actions = null,
  width = 440,
  style = {}
}) {
  if (!open) return null;
  return /*#__PURE__*/React.createElement("div", {
    onClick: onClose || undefined,
    style: {
      position: "fixed",
      inset: 0,
      zIndex: 100,
      background: "var(--bg-overlay)",
      backdropFilter: "blur(2px)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      padding: 24,
      fontFamily: "var(--font-body)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    onClick: e => e.stopPropagation(),
    style: {
      width: "100%",
      maxWidth: width,
      background: "#fff",
      borderRadius: "var(--radius-2xl)",
      boxShadow: "var(--shadow-2xl)",
      overflow: "hidden",
      ...style
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      padding: "24px 24px 0",
      display: "flex",
      alignItems: "flex-start",
      gap: 16
    }
  }, icon, /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1
    }
  }, title && /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: "var(--font-display)",
      fontSize: 18,
      fontWeight: 700,
      color: "var(--fg-primary)",
      letterSpacing: "-0.01em"
    }
  }, title), description && /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 14,
      color: "var(--fg-tertiary)",
      marginTop: 4,
      lineHeight: "20px"
    }
  }, description)), onClose && /*#__PURE__*/React.createElement("button", {
    onClick: onClose,
    "aria-label": "Close",
    style: {
      border: 0,
      background: "transparent",
      cursor: "pointer",
      color: "var(--fg-quaternary)",
      padding: 2
    }
  }, /*#__PURE__*/React.createElement("svg", {
    viewBox: "0 0 24 24",
    width: "20",
    height: "20",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2",
    strokeLinecap: "round"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M18 6 6 18M6 6l12 12"
  })))), children && /*#__PURE__*/React.createElement("div", {
    style: {
      padding: "20px 24px 0"
    }
  }, children), actions && /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 12,
      justifyContent: "flex-end",
      padding: 24,
      marginTop: 8
    }
  }, actions)));
}
Object.assign(__ds_scope, { Modal });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/feedback/Modal.jsx", error: String((e && e.message) || e) }); }

// components/feedback/ProgressBar.jsx
try { (() => {
/**
 * ProgressBar — horizontal progress track. Brand fill, rounded. Optional label
 * and right-aligned percentage.
 */
function ProgressBar({
  value = 0,
  label = null,
  showValue = false,
  size = "md",
  color = "brand",
  style = {}
}) {
  const pct = Math.max(0, Math.min(100, value));
  const h = size === "sm" ? 6 : size === "lg" ? 12 : 8;
  const fill = {
    brand: "var(--brand-500)",
    success: "var(--success-500)",
    warning: "var(--warning-500)",
    error: "var(--error-500)"
  }[color] || "var(--brand-500)";
  return /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: "var(--font-body)",
      ...style
    }
  }, (label || showValue) && /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      justifyContent: "space-between",
      marginBottom: 8,
      fontSize: 14
    }
  }, label && /*#__PURE__*/React.createElement("span", {
    style: {
      fontWeight: 600,
      color: "var(--fg-secondary)"
    }
  }, label), showValue && /*#__PURE__*/React.createElement("span", {
    style: {
      fontWeight: 600,
      color: "var(--fg-secondary)",
      fontVariantNumeric: "tabular-nums"
    }
  }, pct, "%")), /*#__PURE__*/React.createElement("div", {
    style: {
      height: h,
      background: "var(--gray-200)",
      borderRadius: 999,
      overflow: "hidden"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      height: "100%",
      width: `${pct}%`,
      background: fill,
      borderRadius: 999,
      transition: "width 300ms ease"
    }
  })));
}
Object.assign(__ds_scope, { ProgressBar });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/feedback/ProgressBar.jsx", error: String((e && e.message) || e) }); }

// components/feedback/Tooltip.jsx
try { (() => {
/**
 * Tooltip — dark hover tooltip. Wraps any trigger; shows on hover/focus.
 * `placement` positions the bubble; optional supporting text + arrow.
 */
function Tooltip({
  children,
  label,
  supporting = null,
  placement = "top",
  style = {}
}) {
  const [show, setShow] = React.useState(false);
  const pos = {
    top: {
      bottom: "calc(100% + 8px)",
      left: "50%",
      transform: "translateX(-50%)"
    },
    bottom: {
      top: "calc(100% + 8px)",
      left: "50%",
      transform: "translateX(-50%)"
    },
    left: {
      right: "calc(100% + 8px)",
      top: "50%",
      transform: "translateY(-50%)"
    },
    right: {
      left: "calc(100% + 8px)",
      top: "50%",
      transform: "translateY(-50%)"
    }
  };
  return /*#__PURE__*/React.createElement("span", {
    style: {
      position: "relative",
      display: "inline-flex",
      ...style
    },
    onMouseEnter: () => setShow(true),
    onMouseLeave: () => setShow(false),
    onFocus: () => setShow(true),
    onBlur: () => setShow(false)
  }, children, show && /*#__PURE__*/React.createElement("span", {
    role: "tooltip",
    style: {
      position: "absolute",
      zIndex: 60,
      ...pos[placement],
      background: "var(--gray-900)",
      color: "#fff",
      padding: supporting ? "8px 12px" : "6px 10px",
      borderRadius: "var(--radius-md)",
      boxShadow: "var(--shadow-lg)",
      fontFamily: "var(--font-body)",
      fontSize: 12,
      fontWeight: 600,
      lineHeight: "18px",
      whiteSpace: supporting ? "normal" : "nowrap",
      maxWidth: 240,
      width: supporting ? "max-content" : undefined,
      pointerEvents: "none"
    }
  }, label, supporting && /*#__PURE__*/React.createElement("span", {
    style: {
      display: "block",
      fontWeight: 400,
      color: "var(--gray-300)",
      marginTop: 2
    }
  }, supporting)));
}
Object.assign(__ds_scope, { Tooltip });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/feedback/Tooltip.jsx", error: String((e && e.message) || e) }); }

// components/forms/Checkbox.jsx
try { (() => {
/**
 * Checkbox — controlled checkbox with optional label + supporting text.
 * Brand-600 when checked. Supports indeterminate.
 */
function Checkbox({
  checked = false,
  indeterminate = false,
  onChange,
  label = null,
  hint = null,
  size = "md",
  disabled = false,
  style = {}
}) {
  const dim = size === "sm" ? 16 : 20;
  const on = checked || indeterminate;
  return /*#__PURE__*/React.createElement("label", {
    style: {
      display: "inline-flex",
      alignItems: hint ? "flex-start" : "center",
      gap: 10,
      cursor: disabled ? "not-allowed" : "pointer",
      fontFamily: "var(--font-body)",
      opacity: disabled ? 0.55 : 1,
      ...style
    }
  }, /*#__PURE__*/React.createElement("span", {
    onClick: () => !disabled && onChange && onChange(!checked),
    style: {
      width: dim,
      height: dim,
      flexShrink: 0,
      marginTop: hint ? 2 : 0,
      borderRadius: size === "sm" ? "var(--radius-xs)" : "var(--radius-sm)",
      border: `1px solid ${on ? "var(--brand-600)" : "var(--border-primary)"}`,
      background: on ? "var(--brand-600)" : "#fff",
      boxShadow: "var(--shadow-xs)",
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      color: "#fff",
      transition: "background 120ms, border-color 120ms"
    }
  }, indeterminate ? /*#__PURE__*/React.createElement("svg", {
    viewBox: "0 0 24 24",
    width: dim - 6,
    height: dim - 6,
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "3",
    strokeLinecap: "round"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M6 12h12"
  })) : checked && /*#__PURE__*/React.createElement("svg", {
    viewBox: "0 0 24 24",
    width: dim - 5,
    height: dim - 5,
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "3",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }, /*#__PURE__*/React.createElement("polyline", {
    points: "20 6 9 17 4 12"
  }))), (label || hint) && /*#__PURE__*/React.createElement("span", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 2
    }
  }, label && /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: size === "sm" ? 14 : 15,
      fontWeight: 600,
      color: "var(--fg-secondary)",
      lineHeight: "20px"
    }
  }, label), hint && /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 14,
      color: "var(--fg-tertiary)",
      lineHeight: "20px"
    }
  }, hint)));
}
Object.assign(__ds_scope, { Checkbox });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Checkbox.jsx", error: String((e && e.message) || e) }); }

// components/forms/Input.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Input — labelled text field. Untitled UI style: rounded-md, 1px border,
 * brand focus ring. Supports label, hint, error, leading/trailing icons and
 * a leading add-on (e.g. "GH₵").
 */
function Input({
  label = null,
  hint = null,
  error = null,
  placeholder = "",
  value,
  defaultValue,
  onChange,
  type = "text",
  size = "md",
  disabled = false,
  iconLeading = null,
  iconTrailing = null,
  addon = null,
  required = false,
  style = {},
  ...rest
}) {
  const [focus, setFocus] = React.useState(false);
  const sizes = {
    sm: {
      pad: "8px 12px",
      fs: 14
    },
    md: {
      pad: "10px 14px",
      fs: 16
    },
    lg: {
      pad: "12px 14px",
      fs: 16
    }
  };
  const s = sizes[size] || sizes.md;
  const invalid = !!error;
  const borderColor = invalid ? "var(--border-error)" : focus ? "var(--border-brand)" : "var(--border-primary)";
  const ring = invalid ? "var(--ring-error)" : "var(--ring-brand)";
  return /*#__PURE__*/React.createElement("label", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 6,
      fontFamily: "var(--font-body)",
      ...style
    }
  }, label && /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 14,
      fontWeight: 600,
      color: "var(--fg-secondary)"
    }
  }, label, required && /*#__PURE__*/React.createElement("span", {
    style: {
      color: "var(--brand-600)"
    }
  }, " *")), /*#__PURE__*/React.createElement("span", {
    style: {
      display: "flex",
      alignItems: "stretch",
      background: disabled ? "var(--bg-disabled)" : "#fff",
      border: `1px solid ${borderColor}`,
      borderRadius: "var(--radius-md)",
      boxShadow: focus ? `var(--shadow-xs), ${ring}` : "var(--shadow-xs)",
      transition: "box-shadow 120ms ease, border-color 120ms ease",
      overflow: "hidden"
    }
  }, addon && /*#__PURE__*/React.createElement("span", {
    style: {
      display: "inline-flex",
      alignItems: "center",
      padding: `0 12px`,
      background: "var(--gray-50)",
      borderRight: "1px solid var(--border-primary)",
      color: "var(--fg-tertiary)",
      fontSize: s.fs,
      fontWeight: 500
    }
  }, addon), iconLeading && /*#__PURE__*/React.createElement("span", {
    style: {
      display: "inline-flex",
      alignItems: "center",
      paddingLeft: 12,
      color: "var(--fg-quaternary)",
      width: 20
    }
  }, iconLeading), /*#__PURE__*/React.createElement("input", _extends({
    type: type,
    placeholder: placeholder,
    value: value,
    defaultValue: defaultValue,
    onChange: onChange,
    disabled: disabled,
    onFocus: () => setFocus(true),
    onBlur: () => setFocus(false),
    style: {
      flex: 1,
      minWidth: 0,
      border: 0,
      outline: "none",
      background: "transparent",
      padding: s.pad,
      fontSize: s.fs,
      fontFamily: "inherit",
      color: "var(--fg-primary)",
      lineHeight: "24px"
    }
  }, rest)), iconTrailing && /*#__PURE__*/React.createElement("span", {
    style: {
      display: "inline-flex",
      alignItems: "center",
      paddingRight: 12,
      color: "var(--fg-quaternary)",
      width: 20
    }
  }, iconTrailing)), (hint || error) && /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 13,
      color: invalid ? "var(--fg-error)" : "var(--fg-tertiary)"
    }
  }, error || hint));
}
Object.assign(__ds_scope, { Input });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Input.jsx", error: String((e && e.message) || e) }); }

// components/forms/Radio.jsx
try { (() => {
/** Radio — controlled radio with optional label + supporting text. */
function Radio({
  checked = false,
  onChange,
  label = null,
  hint = null,
  size = "md",
  disabled = false,
  name,
  style = {}
}) {
  const dim = size === "sm" ? 16 : 20;
  return /*#__PURE__*/React.createElement("label", {
    style: {
      display: "inline-flex",
      alignItems: hint ? "flex-start" : "center",
      gap: 10,
      cursor: disabled ? "not-allowed" : "pointer",
      fontFamily: "var(--font-body)",
      opacity: disabled ? 0.55 : 1,
      ...style
    }
  }, /*#__PURE__*/React.createElement("span", {
    onClick: () => !disabled && onChange && onChange(true),
    style: {
      width: dim,
      height: dim,
      flexShrink: 0,
      marginTop: hint ? 2 : 0,
      borderRadius: 999,
      border: `${checked ? 5 : 1}px solid ${checked ? "var(--brand-600)" : "var(--border-primary)"}`,
      background: "#fff",
      boxShadow: "var(--shadow-xs)",
      transition: "border-width 120ms, border-color 120ms"
    }
  }), (label || hint) && /*#__PURE__*/React.createElement("span", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 2
    }
  }, label && /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: size === "sm" ? 14 : 15,
      fontWeight: 600,
      color: "var(--fg-secondary)",
      lineHeight: "20px"
    }
  }, label), hint && /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 14,
      color: "var(--fg-tertiary)",
      lineHeight: "20px"
    }
  }, hint)));
}
Object.assign(__ds_scope, { Radio });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Radio.jsx", error: String((e && e.message) || e) }); }

// components/forms/Select.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Select — labelled dropdown. Styled native select for reliability, with the
 * Dexwin chevron and brand focus ring. Pass options as [{value,label}] or
 * children <option>s.
 */
function Select({
  label = null,
  hint = null,
  error = null,
  options = null,
  value,
  defaultValue,
  onChange,
  size = "md",
  disabled = false,
  placeholder = null,
  required = false,
  children,
  style = {},
  ...rest
}) {
  const [focus, setFocus] = React.useState(false);
  const sizes = {
    sm: {
      pad: "8px 38px 8px 12px",
      fs: 14
    },
    md: {
      pad: "10px 40px 10px 14px",
      fs: 16
    },
    lg: {
      pad: "12px 40px 12px 14px",
      fs: 16
    }
  };
  const s = sizes[size] || sizes.md;
  const invalid = !!error;
  const borderColor = invalid ? "var(--border-error)" : focus ? "var(--border-brand)" : "var(--border-primary)";
  const ring = invalid ? "var(--ring-error)" : "var(--ring-brand)";
  const chevron = "data:image/svg+xml;utf8," + encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="%23717680" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"/></svg>');
  return /*#__PURE__*/React.createElement("label", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 6,
      fontFamily: "var(--font-body)",
      ...style
    }
  }, label && /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 14,
      fontWeight: 600,
      color: "var(--fg-secondary)"
    }
  }, label, required && /*#__PURE__*/React.createElement("span", {
    style: {
      color: "var(--brand-600)"
    }
  }, " *")), /*#__PURE__*/React.createElement("select", _extends({
    value: value,
    defaultValue: defaultValue,
    onChange: onChange,
    disabled: disabled,
    onFocus: () => setFocus(true),
    onBlur: () => setFocus(false),
    style: {
      appearance: "none",
      WebkitAppearance: "none",
      border: `1px solid ${borderColor}`,
      borderRadius: "var(--radius-md)",
      background: `${disabled ? "var(--bg-disabled)" : "#fff"} url("${chevron}") no-repeat right 12px center`,
      boxShadow: focus ? `var(--shadow-xs), ${ring}` : "var(--shadow-xs)",
      padding: s.pad,
      fontSize: s.fs,
      fontFamily: "inherit",
      color: value || defaultValue ? "var(--fg-primary)" : "var(--fg-placeholder)",
      lineHeight: "24px",
      outline: "none",
      cursor: disabled ? "not-allowed" : "pointer",
      transition: "box-shadow 120ms ease, border-color 120ms ease"
    }
  }, rest), placeholder && /*#__PURE__*/React.createElement("option", {
    value: "",
    disabled: true
  }, placeholder), options ? options.map(o => /*#__PURE__*/React.createElement("option", {
    key: o.value,
    value: o.value
  }, o.label)) : children), (hint || error) && /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 13,
      color: invalid ? "var(--fg-error)" : "var(--fg-tertiary)"
    }
  }, error || hint));
}
Object.assign(__ds_scope, { Select });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Select.jsx", error: String((e && e.message) || e) }); }

// components/forms/Textarea.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/** Textarea — multi-line labelled input. Matches Input styling. */
function Textarea({
  label = null,
  hint = null,
  error = null,
  placeholder = "",
  value,
  defaultValue,
  onChange,
  rows = 4,
  disabled = false,
  required = false,
  style = {},
  ...rest
}) {
  const [focus, setFocus] = React.useState(false);
  const invalid = !!error;
  const borderColor = invalid ? "var(--border-error)" : focus ? "var(--border-brand)" : "var(--border-primary)";
  const ring = invalid ? "var(--ring-error)" : "var(--ring-brand)";
  return /*#__PURE__*/React.createElement("label", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 6,
      fontFamily: "var(--font-body)",
      ...style
    }
  }, label && /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 14,
      fontWeight: 600,
      color: "var(--fg-secondary)"
    }
  }, label, required && /*#__PURE__*/React.createElement("span", {
    style: {
      color: "var(--brand-600)"
    }
  }, " *")), /*#__PURE__*/React.createElement("textarea", _extends({
    rows: rows,
    placeholder: placeholder,
    value: value,
    defaultValue: defaultValue,
    onChange: onChange,
    disabled: disabled,
    onFocus: () => setFocus(true),
    onBlur: () => setFocus(false),
    style: {
      border: `1px solid ${borderColor}`,
      borderRadius: "var(--radius-md)",
      background: disabled ? "var(--bg-disabled)" : "#fff",
      boxShadow: focus ? `var(--shadow-xs), ${ring}` : "var(--shadow-xs)",
      padding: "10px 14px",
      fontSize: 16,
      fontFamily: "inherit",
      color: "var(--fg-primary)",
      lineHeight: "24px",
      outline: "none",
      resize: "vertical",
      transition: "box-shadow 120ms ease, border-color 120ms ease"
    }
  }, rest)), (hint || error) && /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 13,
      color: invalid ? "var(--fg-error)" : "var(--fg-tertiary)"
    }
  }, error || hint));
}
Object.assign(__ds_scope, { Textarea });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Textarea.jsx", error: String((e && e.message) || e) }); }

// components/forms/Toggle.jsx
try { (() => {
/** Toggle — controlled switch. Brand-600 track when on. */
function Toggle({
  checked = false,
  onChange,
  label = null,
  hint = null,
  size = "md",
  disabled = false,
  style = {}
}) {
  const w = size === "sm" ? 36 : 44;
  const h = size === "sm" ? 20 : 24;
  const knob = h - 4;
  return /*#__PURE__*/React.createElement("label", {
    style: {
      display: "inline-flex",
      alignItems: hint ? "flex-start" : "center",
      gap: 12,
      cursor: disabled ? "not-allowed" : "pointer",
      fontFamily: "var(--font-body)",
      opacity: disabled ? 0.55 : 1,
      ...style
    }
  }, /*#__PURE__*/React.createElement("span", {
    onClick: () => !disabled && onChange && onChange(!checked),
    style: {
      width: w,
      height: h,
      flexShrink: 0,
      borderRadius: 999,
      marginTop: hint ? 1 : 0,
      background: checked ? "var(--brand-600)" : "var(--gray-200)",
      boxShadow: "inset 0 0 0 1px rgba(10,13,18,0.05)",
      transition: "background 160ms ease",
      position: "relative"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      position: "absolute",
      top: 2,
      left: checked ? w - knob - 2 : 2,
      width: knob,
      height: knob,
      borderRadius: 999,
      background: "#fff",
      boxShadow: "var(--shadow-sm)",
      transition: "left 160ms ease"
    }
  })), (label || hint) && /*#__PURE__*/React.createElement("span", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 2
    }
  }, label && /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: size === "sm" ? 14 : 15,
      fontWeight: 600,
      color: "var(--fg-secondary)",
      lineHeight: "20px"
    }
  }, label), hint && /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 14,
      color: "var(--fg-tertiary)",
      lineHeight: "20px"
    }
  }, hint)));
}
Object.assign(__ds_scope, { Toggle });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Toggle.jsx", error: String((e && e.message) || e) }); }

// ui_kits/app/parts.jsx
try { (() => {
/* global React */
// DexwinPay app shell parts: icon helper, Sidebar, Topbar.
const DS = window.DexwinPayDesignSystem_848e17;
function Ic({
  n,
  s = 20,
  sw = 2,
  style
}) {
  const ref = React.useRef(null);
  React.useEffect(() => {
    const el = ref.current;
    if (!el || !window.lucide) return;
    el.innerHTML = '<i data-lucide="' + n + '"></i>';
    window.lucide.createIcons({
      root: el
    });
    const svg = el.querySelector("svg");
    if (svg) {
      svg.setAttribute("width", s);
      svg.setAttribute("height", s);
      svg.setAttribute("stroke-width", sw);
    }
  }, [n, s, sw]);
  return /*#__PURE__*/React.createElement("span", {
    ref: ref,
    style: {
      display: "inline-flex",
      ...style
    }
  });
}
const NAV = [{
  section: "Workspace"
}, {
  id: "dashboard",
  label: "Dashboard",
  icon: "layout-grid"
}, {
  id: "payroll",
  label: "Payroll",
  icon: "wallet",
  pill: "Mar"
}, {
  id: "employees",
  label: "Employees",
  icon: "users",
  count: 42
}, {
  id: "leave",
  label: "Leave",
  icon: "calendar-days",
  badge: 3
}, {
  id: "statutory",
  label: "Statutory",
  icon: "shield-check"
}, {
  section: "Account"
}, {
  id: "reports",
  label: "Reports",
  icon: "bar-chart-3"
}, {
  id: "settings",
  label: "Settings",
  icon: "settings"
}];
function Sidebar({
  active,
  onNavigate
}) {
  return /*#__PURE__*/React.createElement("aside", {
    style: {
      width: 280,
      flexShrink: 0,
      background: "#fff",
      borderRight: "1px solid var(--border-secondary)",
      display: "flex",
      flexDirection: "column",
      height: "100vh",
      position: "sticky",
      top: 0
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      height: 72,
      flexShrink: 0,
      padding: "0 24px",
      display: "flex",
      alignItems: "center",
      borderBottom: "1px solid var(--border-secondary)"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      display: "inline-flex",
      alignItems: "flex-start",
      gap: 4
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: "../../assets/dexwin-logo.svg",
    alt: "Dexwin",
    style: {
      height: 26
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--font-display)",
      fontWeight: 900,
      fontSize: 11,
      color: "var(--fg-primary)",
      letterSpacing: "0.04em",
      marginTop: 2
    }
  }, "PAY"))), /*#__PURE__*/React.createElement("nav", {
    style: {
      flex: 1,
      overflowY: "auto",
      padding: "14px 16px",
      display: "flex",
      flexDirection: "column"
    }
  }, NAV.map((item, i) => {
    if (item.section) return /*#__PURE__*/React.createElement("div", {
      key: i,
      style: {
        fontSize: 11,
        fontWeight: 700,
        letterSpacing: "0.08em",
        textTransform: "uppercase",
        color: "var(--fg-quaternary)",
        padding: i === 0 ? "4px 12px 8px" : "18px 12px 8px"
      }
    }, item.section);
    const on = active === item.id;
    return /*#__PURE__*/React.createElement("button", {
      key: item.id,
      onClick: () => onNavigate(item.id),
      style: {
        display: "flex",
        alignItems: "center",
        gap: 12,
        padding: "10px 12px",
        borderRadius: "var(--radius-md)",
        border: 0,
        background: on ? "var(--brand-50)" : "transparent",
        width: "100%",
        textAlign: "left",
        cursor: "pointer",
        color: on ? "var(--brand-700)" : "var(--fg-secondary)",
        fontFamily: "var(--font-body)",
        fontSize: 15,
        fontWeight: 600,
        marginBottom: 2,
        transition: "background 120ms, color 120ms"
      },
      onMouseEnter: e => {
        if (!on) e.currentTarget.style.background = "var(--bg-secondary)";
      },
      onMouseLeave: e => {
        if (!on) e.currentTarget.style.background = "transparent";
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        color: on ? "var(--brand-600)" : "var(--gray-500)",
        display: "inline-flex"
      }
    }, /*#__PURE__*/React.createElement(Ic, {
      n: item.icon,
      s: 19,
      sw: 1.9
    })), /*#__PURE__*/React.createElement("span", {
      style: {
        flex: 1
      }
    }, item.label), item.pill && /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 12,
        fontWeight: 700,
        color: on ? "var(--brand-700)" : "var(--fg-tertiary)",
        padding: "3px 9px",
        borderRadius: 999,
        border: `1px solid ${on ? "var(--brand-200)" : "var(--border-secondary)"}`
      }
    }, item.pill), item.count != null && /*#__PURE__*/React.createElement("span", {
      style: {
        minWidth: 22,
        height: 20,
        padding: "0 7px",
        borderRadius: 999,
        background: on ? "var(--brand-100)" : "var(--gray-100)",
        color: on ? "var(--brand-700)" : "var(--fg-tertiary)",
        fontSize: 11.5,
        fontWeight: 700,
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center"
      }
    }, item.count), item.badge != null && /*#__PURE__*/React.createElement("span", {
      style: {
        minWidth: 20,
        height: 20,
        padding: "0 6px",
        borderRadius: 999,
        background: "var(--error-500)",
        color: "#fff",
        fontSize: 11.5,
        fontWeight: 700,
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center"
      }
    }, item.badge));
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: "10px 16px 18px",
      flexShrink: 0
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 12,
      padding: 10,
      border: "1px solid var(--border-secondary)",
      borderRadius: "var(--radius-xl)",
      cursor: "pointer"
    }
  }, /*#__PURE__*/React.createElement(DS.Avatar, {
    initials: "AS",
    size: "md"
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      minWidth: 0
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 14,
      fontWeight: 700,
      color: "var(--fg-primary)",
      lineHeight: "18px"
    }
  }, "Ama Serwah"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 13,
      color: "var(--fg-tertiary)",
      whiteSpace: "nowrap",
      overflow: "hidden",
      textOverflow: "ellipsis"
    }
  }, "HR Lead \xB7 Kola Foods")), /*#__PURE__*/React.createElement("span", {
    style: {
      color: "var(--gray-400)"
    }
  }, /*#__PURE__*/React.createElement(Ic, {
    n: "chevrons-up-down",
    s: 18
  })))));
}
function Topbar({
  title,
  subtitle,
  actions
}) {
  return /*#__PURE__*/React.createElement("header", {
    style: {
      height: 72,
      flexShrink: 0,
      padding: "0 36px",
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      borderBottom: "1px solid var(--border-secondary)",
      background: "#fff"
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h1", {
    style: {
      fontFamily: "var(--font-display)",
      fontWeight: 700,
      fontSize: 24,
      lineHeight: "30px",
      letterSpacing: "-0.01em",
      color: "var(--fg-primary)",
      margin: 0
    }
  }, title), subtitle && /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 13,
      color: "var(--fg-tertiary)",
      marginTop: 1
    }
  }, subtitle)), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 14
    }
  }, /*#__PURE__*/React.createElement(DS.IconButton, {
    hierarchy: "soft",
    ariaLabel: "Search"
  }, /*#__PURE__*/React.createElement(Ic, {
    n: "search",
    s: 20
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative"
    }
  }, /*#__PURE__*/React.createElement(DS.IconButton, {
    hierarchy: "soft",
    ariaLabel: "Notifications"
  }, /*#__PURE__*/React.createElement(Ic, {
    n: "bell",
    s: 20
  })), /*#__PURE__*/React.createElement("span", {
    style: {
      position: "absolute",
      top: 8,
      right: 9,
      width: 8,
      height: 8,
      borderRadius: 999,
      background: "var(--error-500)",
      border: "2px solid #fff"
    }
  })), actions));
}
Object.assign(window, {
  Ic,
  Sidebar,
  Topbar
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/app/parts.jsx", error: String((e && e.message) || e) }); }

// ui_kits/app/screens.jsx
try { (() => {
/* global React */
// DexwinPay app screens: Dashboard, Payroll, Employees.
const DSS = window.DexwinPayDesignSystem_848e17;
const {
  Card,
  Metric,
  Table,
  Tabs,
  Badge,
  Avatar,
  Button,
  FeaturedIcon,
  Alert,
  ProgressBar
} = DSS;
const EMPLOYEES = [{
  in: "AM",
  name: "Akua Mensah",
  role: "Senior Engineer",
  dept: "Engineering",
  gross: "6,250.00",
  net: "4,012.50",
  st: ["success", "Ready"]
}, {
  in: "KO",
  name: "Kwame Owusu",
  role: "Account Executive",
  dept: "Sales",
  gross: "3,100.00",
  net: "2,142.40",
  st: ["success", "Ready"]
}, {
  in: "YA",
  name: "Yaa Asantewaa",
  role: "Finance Manager",
  dept: "Finance",
  gross: "8,800.00",
  net: "5,498.20",
  st: ["warning", "On leave"]
}, {
  in: "KT",
  name: "Kojo Tetteh",
  role: "Backend Engineer",
  dept: "Engineering",
  gross: "5,400.00",
  net: "3,612.80",
  st: ["success", "Ready"]
}, {
  in: "AB",
  name: "Abena Boateng",
  role: "Product Designer",
  dept: "Product",
  gross: "5,900.00",
  net: "3,901.10",
  st: ["success", "Ready"]
}, {
  in: "EN",
  name: "Esi Nyarko",
  role: "Operations Lead",
  dept: "Operations",
  gross: "4,700.00",
  net: "3,180.60",
  st: ["error", "Missing bank"]
}];
function DashboardView() {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 24
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      overflow: "hidden",
      background: "var(--brand-900)",
      borderRadius: "var(--radius-2xl)",
      padding: "36px 40px",
      color: "#fff"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      inset: 0,
      backgroundImage: "url(../../assets/welcome-bg.png)",
      backgroundrepeat: "no-repeat",
      backgroundPosition: "right center",
      backgroundSize: "cover",
      opacity: 0.5
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative"
    }
  }, /*#__PURE__*/React.createElement("h2", {
    style: {
      fontFamily: "var(--font-display)",
      fontWeight: 800,
      fontSize: 28,
      lineHeight: "36px",
      letterSpacing: "-0.01em",
      margin: "0 0 8px"
    }
  }, "Good morning, Ama \uD83D\uDC4B"), /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: 15,
      lineHeight: "23px",
      margin: 0,
      color: "rgba(255,255,255,0.78)",
      maxWidth: "52ch"
    }
  }, "March payroll is ready for your review. SSNIT and PAYE are calculated \u2014 approve before the 28th to pay your team on time."))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "repeat(4, 1fr)",
      gap: 16
    }
  }, /*#__PURE__*/React.createElement(Metric, {
    label: "Gross payroll",
    value: "GH\u20B5 248,900",
    trend: "4.2%",
    trendDir: "up",
    sub: "vs Feb"
  }), /*#__PURE__*/React.createElement(Metric, {
    label: "Headcount",
    value: "42",
    trend: "2",
    trendDir: "up",
    sub: "new this month"
  }), /*#__PURE__*/React.createElement(Metric, {
    label: "On leave",
    value: "3",
    sub: "this week"
  }), /*#__PURE__*/React.createElement(Metric, {
    label: "Next filing",
    value: "14 Apr",
    sub: "SSNIT Tier 1"
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "1.6fr 1fr",
      gap: 24,
      alignItems: "start"
    }
  }, /*#__PURE__*/React.createElement(Card, {
    title: "Setup checklist",
    description: "Finish onboarding to unlock automated filing",
    padding: 24
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      marginBottom: 20
    }
  }, /*#__PURE__*/React.createElement(ProgressBar, {
    value: 84,
    showValue: true,
    label: "Company setup"
  })), [["Company details verified", true], ["Bank account connected", true], ["SSNIT & GRA credentials added", true], ["Import remaining 6 employees", false]].map(([t, done], i) => /*#__PURE__*/React.createElement("div", {
    key: i,
    style: {
      display: "flex",
      alignItems: "center",
      gap: 12,
      padding: "11px 0",
      borderTop: i ? "1px solid var(--border-tertiary)" : "none"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 22,
      height: 22,
      borderRadius: 999,
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      background: done ? "var(--brand-500)" : "#fff",
      border: done ? "none" : "1.5px solid var(--gray-300)",
      color: "#fff"
    }
  }, done && /*#__PURE__*/React.createElement(Ic, {
    n: "check",
    s: 14,
    sw: 3
  })), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 14,
      fontWeight: 500,
      color: done ? "var(--fg-tertiary)" : "var(--fg-primary)",
      textDecoration: done ? "line-through" : "none"
    }
  }, t)))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 16
    }
  }, /*#__PURE__*/React.createElement(Alert, {
    color: "warning",
    title: "SSNIT due 14 Apr"
  }, "Tier 1 contributions for March will be filed automatically."), /*#__PURE__*/React.createElement(Card, {
    title: "Statutory snapshot",
    padding: 20
  }, [["PAYE", "GH₵ 48,902", "info"], ["SSNIT Tier 1", "GH₵ 32,357", "brand"], ["Tier 2 pension", "GH₵ 12,455", "purple"]].map(([k, v, c], i) => /*#__PURE__*/React.createElement("div", {
    key: i,
    style: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      padding: "10px 0",
      borderTop: i ? "1px solid var(--border-tertiary)" : "none"
    }
  }, /*#__PURE__*/React.createElement(Badge, {
    color: c,
    dot: true
  }, k), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 14,
      fontWeight: 700,
      color: "var(--fg-primary)",
      fontVariantNumeric: "tabular-nums"
    }
  }, v)))))));
}
function PayrollView({
  onApprove,
  approved
}) {
  const [tab, setTab] = React.useState("all");
  const rows = tab === "leave" ? EMPLOYEES.filter(e => e.st[1] === "On leave") : EMPLOYEES;
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 20
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "repeat(4, 1fr)",
      gap: 16
    }
  }, /*#__PURE__*/React.createElement(Metric, {
    label: "Gross payroll",
    value: "GH\u20B5 248,900",
    trend: "4.2%",
    trendDir: "up",
    sub: "vs Feb"
  }), /*#__PURE__*/React.createElement(Metric, {
    label: "PAYE",
    value: "GH\u20B5 48,902",
    sub: "19.6% of gross"
  }), /*#__PURE__*/React.createElement(Metric, {
    label: "SSNIT Tier 1",
    value: "GH\u20B5 32,357",
    sub: "Due 14 Apr"
  }), /*#__PURE__*/React.createElement(Metric, {
    label: "Net to pay",
    value: "GH\u20B5 159,184",
    sub: "42 transfers ready"
  })), approved && /*#__PURE__*/React.createElement(Alert, {
    color: "success",
    title: "Payroll approved"
  }, "42 transfers are queued to send tonight. Filing receipts will appear here once submitted."), /*#__PURE__*/React.createElement(Card, {
    padding: 0,
    style: {
      overflow: "hidden"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      padding: "16px 20px 0",
      flexWrap: "wrap",
      gap: 12
    }
  }, /*#__PURE__*/React.createElement(Tabs, {
    value: tab,
    onChange: setTab,
    tabs: [{
      value: "all",
      label: "All employees",
      count: 42
    }, {
      value: "leave",
      label: "On leave",
      count: 3
    }]
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 8,
      paddingBottom: 12
    }
  }, /*#__PURE__*/React.createElement(Button, {
    hierarchy: "secondary",
    size: "sm",
    iconLeading: /*#__PURE__*/React.createElement(Ic, {
      n: "download",
      s: 16
    })
  }, "Export"))), /*#__PURE__*/React.createElement(Table, {
    rows: rows,
    getRowKey: r => r.in,
    columns: [{
      key: "name",
      header: "Employee",
      render: r => /*#__PURE__*/React.createElement("span", {
        style: {
          display: "flex",
          alignItems: "center",
          gap: 12
        }
      }, /*#__PURE__*/React.createElement(Avatar, {
        initials: r.in,
        size: "md"
      }), /*#__PURE__*/React.createElement("span", null, /*#__PURE__*/React.createElement("span", {
        style: {
          display: "block",
          fontWeight: 600,
          color: "var(--fg-primary)"
        }
      }, r.name), /*#__PURE__*/React.createElement("span", {
        style: {
          fontSize: 13,
          color: "var(--fg-tertiary)"
        }
      }, r.role)))
    }, {
      key: "dept",
      header: "Department"
    }, {
      key: "gross",
      header: "Gross",
      align: "right",
      numeric: true,
      render: r => "GH₵ " + r.gross
    }, {
      key: "net",
      header: "Net pay",
      align: "right",
      numeric: true,
      render: r => "GH₵ " + r.net
    }, {
      key: "st",
      header: "Status",
      render: r => /*#__PURE__*/React.createElement(Badge, {
        color: r.st[0],
        dot: true
      }, r.st[1])
    }]
  })));
}
function EmployeesView() {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 20
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "repeat(3, 1fr)",
      gap: 16
    }
  }, [["Engineering", 14, "brand"], ["Sales & Ops", 16, "indigo"], ["Finance & Admin", 12, "teal"]].map(([d, n, c], i) => /*#__PURE__*/React.createElement(Card, {
    key: i,
    padding: 20
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 12
    }
  }, /*#__PURE__*/React.createElement(FeaturedIcon, {
    color: c,
    theme: "light"
  }, /*#__PURE__*/React.createElement(Ic, {
    n: "users"
  })), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: "var(--font-display)",
      fontSize: 24,
      fontWeight: 700,
      color: "var(--fg-primary)"
    }
  }, n), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 13,
      color: "var(--fg-tertiary)"
    }
  }, d)))))), /*#__PURE__*/React.createElement(Card, {
    title: "All employees",
    description: "42 active \xB7 6 shown",
    padding: 0,
    actions: /*#__PURE__*/React.createElement(Button, {
      size: "sm",
      iconLeading: /*#__PURE__*/React.createElement(Ic, {
        n: "plus",
        s: 16
      })
    }, "Add employee")
  }, /*#__PURE__*/React.createElement(Table, {
    rows: EMPLOYEES,
    getRowKey: r => r.in,
    columns: [{
      key: "name",
      header: "Name",
      render: r => /*#__PURE__*/React.createElement("span", {
        style: {
          display: "flex",
          alignItems: "center",
          gap: 12
        }
      }, /*#__PURE__*/React.createElement(Avatar, {
        initials: r.in,
        size: "md",
        status: "online"
      }), /*#__PURE__*/React.createElement("span", null, /*#__PURE__*/React.createElement("span", {
        style: {
          display: "block",
          fontWeight: 600,
          color: "var(--fg-primary)"
        }
      }, r.name), /*#__PURE__*/React.createElement("span", {
        style: {
          fontSize: 13,
          color: "var(--fg-tertiary)"
        }
      }, r.role)))
    }, {
      key: "dept",
      header: "Department",
      render: r => /*#__PURE__*/React.createElement(Badge, {
        color: "gray"
      }, r.dept)
    }, {
      key: "gross",
      header: "Monthly gross",
      align: "right",
      numeric: true,
      render: r => "GH₵ " + r.gross
    }, {
      key: "st",
      header: "Status",
      render: r => /*#__PURE__*/React.createElement(Badge, {
        color: r.st[0],
        dot: true
      }, r.st[1])
    }]
  })));
}
Object.assign(window, {
  DashboardView,
  PayrollView,
  EmployeesView
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/app/screens.jsx", error: String((e && e.message) || e) }); }

__ds_ns.Button = __ds_scope.Button;

__ds_ns.IconButton = __ds_scope.IconButton;

__ds_ns.Card = __ds_scope.Card;

__ds_ns.Metric = __ds_scope.Metric;

__ds_ns.Table = __ds_scope.Table;

__ds_ns.Tabs = __ds_scope.Tabs;

__ds_ns.Avatar = __ds_scope.Avatar;

__ds_ns.Badge = __ds_scope.Badge;

__ds_ns.FeaturedIcon = __ds_scope.FeaturedIcon;

__ds_ns.Tag = __ds_scope.Tag;

__ds_ns.Alert = __ds_scope.Alert;

__ds_ns.Modal = __ds_scope.Modal;

__ds_ns.ProgressBar = __ds_scope.ProgressBar;

__ds_ns.Tooltip = __ds_scope.Tooltip;

__ds_ns.Checkbox = __ds_scope.Checkbox;

__ds_ns.Input = __ds_scope.Input;

__ds_ns.Radio = __ds_scope.Radio;

__ds_ns.Select = __ds_scope.Select;

__ds_ns.Textarea = __ds_scope.Textarea;

__ds_ns.Toggle = __ds_scope.Toggle;

})();
