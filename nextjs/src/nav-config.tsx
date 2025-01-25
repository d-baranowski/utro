import React from "react";
import HomeIcon from '@mui/icons-material/Home';

export interface IconRendererProps {
  title?: string;
  active?: boolean;
  disabled?: boolean;
}

export interface NavItem {
  title: string;
  icon?: any;
  iconRenderer?: (item: IconRendererProps) => React.ReactNode;
  active?: boolean;
  items?: NavItem[];
  path?: string;
  disabled?: boolean;
  onlyAdmin?: boolean;
}

const navConfiguration: NavItem[] = [
  {
    title: "Dashboard",
    icon: HomeIcon,
    path: "/",
  },
  // {
  //   title: "Accounts",
  //   icon: CorporateFareIcon,
  //   path: accountListRoute(),
  //   onlyAdmin: true,
  // },
  // {
  //   title: "Smpp Connection",
  //   icon: SettingsInputAntennaIcon,
  //   path: smppConnectionListRoute(),
  //   onlyAdmin: true,
  // },
  // {
  //   title: "Blocked Domains",
  //   icon: BlockIcon,
  //   path: blockedDomainListRoute(),
  // },
  // {
  //   title: "Accounts",
  //   icon: PersonIcon,
  //   items: [
  //     {
  //       title: "Example 1",
  //       path: ExampleOnePath,
  //       icon: PersonIcon,
  //     },
  //     {
  //       title: "Example 2",
  //       path: ExampleTwoPath,
  //       icon: PersonIcon,
  //     },
  //     {
  //       title: "Example 3",
  //       items: [
  //         {
  //           title: "Sub Example",
  //           path: ExampleThreePathSubOne,
  //           icon: PersonIcon,
  //         },
  //         {
  //           title: "Sub Example",
  //           path: ExampleThreePathSubTwo,
  //           icon: PersonIcon,
  //         },
  //       ],
  //     },
  //   ],
  // },
];

export default navConfiguration;
