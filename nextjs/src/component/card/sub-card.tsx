import React, {forwardRef, ReactNode} from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";
import {SxProps, Theme} from "@mui/material/styles";

interface Props {
  children?: ReactNode;
  content?: boolean;
  contentClass?: string;
  darkTitle?: boolean;
  secondary?: ReactNode;
  sx?: SxProps<Theme>;
  contentSX?: SxProps<Theme>;
  title?: ReactNode;
}

const SubCard = forwardRef<HTMLDivElement, Props>(
  (props, ref) => {
    const {
      children,
      content = true,
      contentClass,
      darkTitle,
      secondary,
      sx = {},
      contentSX = {},
      title,
      ...others
    } = props;

    const defaultShadow = "0 2px 14px 0 rgb(32 40 45 / 8%)";

    return (
      <Card
        ref={ref}
        sx={{
          border: "1px solid",
          borderColor: "divider",
          ":hover": {boxShadow: defaultShadow},
          ...sx,
        }}
        {...others}
      >
        {/* card header and action */}
        {!darkTitle && title && (
          <CardHeader
            sx={{p: 2.5}}
            title={<Typography variant="h5">{title}</Typography>}
            action={secondary}
          />
        )}
        {darkTitle && title && (
          <CardHeader
            sx={{p: 2.5}}
            title={<Typography variant="h4">{title}</Typography>}
            action={secondary}
          />
        )}

        {/* content & header divider */}
        {title && <Divider/>}

        {/* card content */}
        {content ? (
          <CardContent
            sx={{p: 2.5, ...contentSX}}
            className={contentClass || ""}
          >
            {children}
          </CardContent>
        ) : (
          children
        )}
      </Card>
    );
  }
);

SubCard.displayName = "SubCard"

export default SubCard;
