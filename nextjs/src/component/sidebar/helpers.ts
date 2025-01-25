import escapeStringRegexp from "~/helpers/escapeStringRegexp";
import {NavItem} from "~/nav-config";

export const flattenAllChildRoutes = (item: NavItem): RegExp[] => {
  const p = item.path
    ? [new RegExp("^" + escapeStringRegexp(item.path) + ".*")]
    : [];
  if (item.items) {
    return item.items.reduce((acc: any, item: NavItem) => {
      return [...acc, ...flattenAllChildRoutes(item)];
    }, p);
  } else {
    return p;
  }
};

export function filterNavItems(items: NavItem[], isAdmin: boolean): NavItem[] {
  return items
    .filter((item) => isAdmin || !item.onlyAdmin) // Filter out items with onlyAdmin if isAdmin is false
    .map((item) => ({
      ...item,
      items: item.items ? filterNavItems(item.items, isAdmin) : undefined, // Recursively filter children
    }))
    .filter((item) => isAdmin || item.items?.length || !item.onlyAdmin); // Remove items with no visible children
}