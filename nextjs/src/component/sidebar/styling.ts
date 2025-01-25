import {MenuItemStyles} from "react-pro-sidebar";

export const sidebarStyles = {
  sidebar: {
    backgroundColor: "#111926",
    color: "#8ba1b7",
  },
  menu: {
    menuContent: "#111926",
    icon: "#59d0ff",
    hover: {
      backgroundColor: "#00458b",
      color: "#b6c8d9",
    },
    disabled: {
      color: "#3e5e7e",
    },
    button: {
      height: "30px",
    },
  },
  title: {
    fontSize: "14px",
    marginLeft: "10px",
    marginTop: "5px",
    fontWeight: 600,
  },
  logo: {
    display: "flex",
    margin: "9px 0 9px 9px",
  },
};
export const hexToRgba = (hex: string, alpha: number) => {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
};

export const menuItemStyles: MenuItemStyles = {
  root: {
    fontSize: "12px",
    fontWeight: 400,
    padding: "0px 0px",
    margin: "0px 0px",
  },
  SubMenuExpandIcon: {},
  subMenuContent: ({level}) => ({
    zIndex: 9000,
    backgroundColor: level === 0 ? hexToRgba(sidebarStyles.menu.menuContent, 1) : "transparent",
  }),
  button: ({active, level}) => ({
    paddingLeft: `${level * 20 + 10}px`,
    height: sidebarStyles.menu.button.height,
    "&:hover": {
      backgroundColor: hexToRgba(sidebarStyles.menu.hover.backgroundColor, 1),
      color: sidebarStyles.menu.hover.color,
    },
    color: active ? "white" : undefined,
  }),
  label: ({active}) => ({
    fontWeight: active ? 800 : undefined,
    color: active ? "white" : undefined,
  }),
  icon: ({active}) => ({
    color: active ? "white" : undefined,
  }),
};