import React from "react";
import { Box, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import styled from "styled-components";

type location = {
  name: string;
  to?: string;
};

const BredCrumbLink = styled(Link)`
text-decoration: none;
`;

/**
 * Takes in a location variable
 * Location is an array of {name: string, to: string},
 * 
 *  ### Name represents the name to be give to the breadCrum
 *  ### To represents the location to be redirected at when click on the breadCrum item
 * 
 * that represents a directory stucture
 * where the parent is at 0 and followed by sub directories.
 * And Returns a BreadCrum ui.
 *
 * Note(IMPORTANT): For the last directory in location you don't need to provie a to property
 *
 * @param {[{name, to}]} location
 * @returns JSXElement
 */

const BreadCrum = ({ location }: { location : location[]}) => {
  return (
    <Box sx={{display: "flex", gap: "10px", alignItems: "center"}}>
      {location.map((item, index) => {
        if (index + 1 === location.length) {
          return (
            <React.Fragment key={index}>
              <Typography sx={{fontSize: "20px"}}>
                {item.name}
              </Typography>
            </React.Fragment>
          );
        }
        return (
          <React.Fragment key={index}>
            <BredCrumbLink
              key={index}
              to={item.to? item.to: ""}
            >
              <Typography sx={{fontSize: "20px", color: "#828282"}}>
                {" "}
                {index === location.length - 1
                  ? `${item.name} `
                  : `${item.name} / `}
              </Typography>
            </BredCrumbLink>
          </React.Fragment>
        );
      })}
    </Box>
  );
};


export default BreadCrum;