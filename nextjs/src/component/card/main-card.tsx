import React, {forwardRef, ReactNode} from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";
import {SxProps, Theme} from "@mui/material/styles";

// Define props type
interface Props {
  border?: boolean;
  boxShadow?: boolean;
  children?: ReactNode;
  content?: boolean;
  contentClass?: string;
  contentSX?: SxProps<Theme>;
  darkTitle?: boolean;
  secondary?: ReactNode;
  shadow?: string | number;
  sx?: SxProps<Theme>;
  title?: ReactNode;
  elevation?: number;
}

// Constant styles
const headerSX: SxProps<Theme> = {
  "& .MuiCardHeader-action": {mr: 0},
};

// ==============================|| CUSTOM MAIN CARD ||============================== //

const MainCard = forwardRef<HTMLDivElement, Props>(
  (props, ref) => {
    const {
      border = false,
      boxShadow,
      children,
      content = true,
      contentClass = "",
      contentSX = {},
      darkTitle,
      secondary,
      shadow,
      sx = {},
      title,
      ...others
    } = props;

    return (
      <Card
        ref={ref}
        {...others}
        sx={{
          border: border ? "1px solid" : "none",
          borderColor: "divider",
          ":hover": {
            boxShadow: boxShadow ? shadow || "0 2px 14px 0 rgb(32 40 45 / 8%)" : "inherit",
          },
          ...sx,
        }}
      >
        {/* card header and action */}
        {!darkTitle && title && <CardHeader sx={headerSX} title={title} action={secondary}/>}
        {darkTitle && title && (
          <CardHeader sx={headerSX} title={<Typography variant="h3">{title}</Typography>} action={secondary}/>
        )}

        {/* content & header divider */}
        {title && <Divider/>}

        {/* card content */}
        {content ? (
          <CardContent sx={contentSX} className={contentClass}>
            {children}
          </CardContent>
        ) : (
          children
        )}
      </Card>
    );
  }
);

MainCard.displayName = "MainCard"

export default MainCard;
