import React, { Component } from "react";
import GridC from "./GridC";
function GridR(props) {
  return (
    <>
      <tr tabindex="1">
        {props.grid.map((grid) => (
          <GridC
            content={grid}
            rowNumber={props.rowNumber}
            colNumber={props.colNumber}
            handlerOnClick={props.handlerOnClick}
            handlerOnBlur={props.handlerOnBlur}
            C={props.C}
            R={props.R}
            count={props.count}
          />
        ))}
      </tr>
    </>
  );
}

export default GridR;
