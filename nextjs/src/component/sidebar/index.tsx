"use client"

import React from "react";
import {Menu, MenuItem, Sidebar, SubMenu} from "react-pro-sidebar";
import navConfig, {NavItem} from "~/nav-config";
import slugify from "slugify";
import Link from 'next/link'
import escapeStringRegexp from "~/helpers/escapeStringRegexp";
import {useSidebar} from "~/component/sidebar/context";
import "./style.css";
import {usePathname} from "next/navigation";
import {drawerCollapsedWidth, drawerWidth} from "~/component/sidebar/const";
import {hexToRgba, menuItemStyles, sidebarStyles} from "~/component/sidebar/styling";
import {filterNavItems, flattenAllChildRoutes} from "~/component/sidebar/helpers";

interface Props {
  isAdmin: boolean
}

const NavBar: React.FC<Props> = function NavBar(props) {
  const {isOpen} = useSidebar();
  const pathname = usePathname();

  // Render an array of MenuItems, top level or submenu
  const renderSubMenu = (items: NavItem[], path: string[] = []) => {
    return items.map((item, index) => {
      return renderMenuItem(item, path, index);
    });
  };

  // Render a single MenuItem, if it has items, render a SubMenu
  const renderMenuItem = (item: NavItem, path: string[] = [], index: number) => {
    const level = path.length;
    const p = [...path, item.title, index + ""];
    const key = slugify(p.join("."), {lower: true});

    const childRoutes = flattenAllChildRoutes(item);

    let Icon: React.FC = () => null;
    if (item.icon) {
      Icon = item.icon as React.FC;
    }

    if (item.items && item.items.length) {
      const active = childRoutes.some((r) => {
        return r.test(pathname);
      });

      return (
        <SubMenu
          key={key}
          label={item.title}
          className={`submenu-level-${level}`}
          icon={item.icon ? <Icon/> : null}
          active={active}
          defaultOpen={active}
        >
          {renderSubMenu(item.items, p)}
        </SubMenu>
      );
    }

    const active = item.path
      ? new RegExp("^" + escapeStringRegexp(item.path)).test(pathname)
      : item.active;

    let component;
    if (item.path) {
      component = <Link
        data-testid={item.path + "MenuItem"}
        href={item.path}
      />
    }

    return (
      <MenuItem
        key={key}
        className={`menuitem-level-${level}`}
        icon={item.icon ? <Icon/> : null}
        component={component}
        active={active}
      >
        {item.title}
      </MenuItem>
    );
  };

  const navItems = filterNavItems(navConfig, props.isAdmin);


  return (
    <Sidebar
      collapsed={!isOpen}
      collapsedWidth={drawerCollapsedWidth + "px"}
      width={drawerWidth + "px"}
      backgroundColor={hexToRgba(sidebarStyles.sidebar.backgroundColor, 1)}
      rootStyles={{
        left: 0,
        top: "64px",
        height: "calc(100vh - 64px)",
        color: sidebarStyles.sidebar.color,
      }}
      // onMouseOver={() => {
      //   if (!isPinned) {
      //     collapseSidebar(false);
      //     handleNavCollapsed(false);
      //   }
      // }}
      // onMouseLeave={() => {
      //   if (!isPinned) {
      //     collapseSidebar(true);
      //     handleNavCollapsed(true);
      //   }
      // }}
    >
      <Menu menuItemStyles={menuItemStyles}>{renderSubMenu(navItems, ["menu"])}</Menu>
    </Sidebar>
  );
};

export default NavBar;
