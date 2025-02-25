import React, {forwardRef} from "react";
import Collapse from "@mui/material/Collapse";
import Fade from "@mui/material/Fade";
import Box from "@mui/material/Box";
import Grow from "@mui/material/Grow";
import Slide from "@mui/material/Slide";
import Zoom from "@mui/material/Zoom";

type TransitionType = "grow" | "fade" | "collapse" | "slide" | "zoom";
type PositionType =
  | "top-left"
  | "top-right"
  | "top"
  | "bottom-left"
  | "bottom-right"
  | "bottom";
type DirectionType = "up" | "down" | "left" | "right";

interface Props extends React.PropsWithChildren {
  type?: TransitionType;
  position?: PositionType;
  direction?: DirectionType;
}

// ==============================|| TRANSITIONS ||============================== //

const Transitions = forwardRef<HTMLDivElement, Props>(
  ({children, position = "top-left", type = "grow", direction = "up", ...others}, ref) => {
    let positionSX = {
      transformOrigin: "0 0 0",
    };

    switch (position) {
      case "top-right":
        positionSX = {
          transformOrigin: "top right",
        };
        break;
      case "top":
        positionSX = {
          transformOrigin: "top",
        };
        break;
      case "bottom-left":
        positionSX = {
          transformOrigin: "bottom left",
        };
        break;
      case "bottom-right":
        positionSX = {
          transformOrigin: "bottom right",
        };
        break;
      case "bottom":
        positionSX = {
          transformOrigin: "bottom",
        };
        break;
      case "top-left":
      default:
        positionSX = {
          transformOrigin: "0 0 0",
        };
        break;
    }

    return (
      <Box ref={ref}>
        {type === "grow" && (
          <Grow {...others}>
            <Box sx={positionSX}>{children}</Box>
          </Grow>
        )}
        {type === "collapse" && (
          <Collapse {...others} sx={positionSX}>
            {children}
          </Collapse>
        )}
        {type === "fade" && (
          <Fade
            {...others}
            timeout={{
              appear: 500,
              enter: 600,
              exit: 400,
            }}
          >
            <Box sx={positionSX}>{children}</Box>
          </Fade>
        )}
        {type === "slide" && (
          <Slide
            {...others}
            timeout={{
              appear: 0,
              enter: 400,
              exit: 200,
            }}
            direction={direction}
          >
            <Box sx={positionSX}>{children}</Box>
          </Slide>
        )}
        {type === "zoom" && (
          <Zoom {...others}>
            <Box sx={positionSX}>{children}</Box>
          </Zoom>
        )}
      </Box>
    );
  }
);

Transitions.displayName = "Transitions";

export default Transitions;
