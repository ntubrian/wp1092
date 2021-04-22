import React, { Component, useState } from "react";
import Header from "../components/Header";
import GridR from "../components/GridR";
/* ref:https://stackoverflow.com/questions/12504042/what-is-a-method-that-can-be-used-to-increment-letters/34483399 */
import StringIdGenerator from "./Tool";
var ColLast = -1;
var RowLast = -1;
function FakeSheet(props) {
  const ids = new StringIdGenerator();
  var colId = [];
  for (var t = 0; t < 26 * 27; t++) {
    colId.push(ids.next());
  }
  const [rowNumber, setRowNumber] = useState(100);
  const [colNumber, setColNumber] = useState(26);
  const [grids, setGrids] = useState(
    Array.from(Array(101), () => new Array(27))
  );
  const handleChange = (row, column, event) => {
    let copy = [...grids];
    copy[row][column] = +event.target.value;
    setGrids(copy);
  };
  function fillBasicGrid() {
    let copy = [...grids];
    let i, j;
    copy[0][0] = { val: "", r: 0, c: 0 };
    for (i = 1; i <= rowNumber; i++) {
      copy[i][0] = { val: `${i}`, r: i, c: 0 };
    }
    for (i = 1; i <= colNumber; i++) {
      copy[0][i] = { val: colId[i - 1], r: 0, c: i };
    }

    for (i = 1; i <= rowNumber; i++) {
      for (j = 1; j <= colNumber; j++) {
        copy[i][j] = { val: "", r: i, c: j };
      }
    }
  }

  const [first, setFirst] = useState(0);
  if (first === 0) {
    fillBasicGrid();
    setFirst(1);
  }

  const [C, setC] = useState(-1);
  const [R, setR] = useState(-1);
  const handlerOnBlur = (c, r, t) => {
    setC(-1);
    setR(-1);
    let copy = [...grids];
    copy[r][c].val = t;
  };
  const handlerOnClick = (c, r) => {
    setC(c);
    ColLast = c;
    setR(r);
    RowLast = r;
  };
  function docFocus() {
    if (!document.hasFocus()) {
      ColLast = -1;
      RowLast = -1;
    }
  }
  const addCol = () => {
    console.log(`${ColLast},${RowLast}`);
    if (ColLast === -1 || RowLast === -1) return;
    setColNumber((pre) => pre + 1);
    setFirst((pre) => pre + 1);
    let copy = [...grids];
    for (var i = 0; i <= rowNumber; i++) {
      copy[i].splice(ColLast, 0, { val: "", r: i, c: ColLast });
    }

    for (i = 1; i <= colNumber + 1; i++) {
      copy[0][i] = { val: colId[i - 1], r: 0, c: i };
    }
    for (var i = 1; i <= rowNumber; i++) {
      for (var j = colNumber + 1; j > ColLast; j--) {
        copy[i][j].c = j;
        copy[i][j].r = i;
      }
    }
    ColLast = -1;
    RowLast = -1;
    setGrids(copy);
  };
  const subCol = () => {
    if (ColLast === -1 || RowLast === -1) return;
    setColNumber((pre) => pre - 1);
    setFirst((pre) => pre + 1);
    let copy = [...grids];
    for (var i = 0; i <= rowNumber; i++) {
      copy[i].splice(ColLast, 1);
    }

    for (i = 1; i <= colNumber - 1; i++) {
      copy[0][i] = { val: colId[i - 1], r: 0, c: i };
    }
    for (var i = 1; i <= rowNumber; i++) {
      for (var j = colNumber - 1; j >= ColLast; j--) {
        copy[i][j].c = j;
        copy[i][j].r = i;
      }
    }
    ColLast = -1;
    RowLast = -1;
    setGrids(copy);
  };
  const addRow = () => {
    if (ColLast === -1 || RowLast === -1) return;
    setRowNumber((pre) => pre + 1);
    setFirst((pre) => pre + 1);
    let copy = [...grids];

    copy.splice(RowLast, 0, new Array(colNumber + 1));
    for (var i = 0; i <= colNumber; i++) {
      copy[RowLast][i] = { val: "", r: RowLast, c: i };
    }

    for (i = 1; i <= rowNumber + 1; i++) {
      copy[i][0] = { val: i, r: i, c: 0 };
    }
    for (var i = 1; i <= colNumber; i++) {
      for (var j = rowNumber + 1; j > RowLast; j--) {
        copy[j][i].c = i;
        copy[j][i].r = j;
      }
    }
    ColLast = -1;
    RowLast = -1;
    setGrids(copy);
  };
  const subRow = () => {
    if (ColLast === -1 || RowLast === -1) return;
    setRowNumber((pre) => pre - 1);
    setFirst((pre) => pre + 1);
    let copy = [...grids];
    copy.splice(RowLast, 1);

    for (i = 1; i <= rowNumber - 1; i++) {
      copy[i][0] = { val: i, r: i, c: 0 };
    }
    for (var i = 1; i <= colNumber; i++) {
      for (var j = rowNumber - 1; j >= RowLast; j--) {
        copy[j][i].c = i;
        copy[j][i].r = j;
      }
    }
    ColLast = -1;
    RowLast = -1;
    setGrids(copy);
  };
  //console.log(grids);
  return (
    <>
      <Header text="MySheet" />
      <div className="container">
        <div id="top">
          <button className="button" onClick={addCol}>
            +
          </button>
          <button className="button" onClick={subCol}>
            -
          </button>
        </div>
        <div id="sidebar_left">
          <button className="button" onClick={addRow}>
            +
          </button>
          <button className="button" onClick={subRow}>
            -
          </button>
        </div>
        <div id="content">
          <table className="table">
            <tbody>
              {grids.map((grid) => (
                <GridR
                  rowNumber={rowNumber + 1}
                  colNumber={colNumber + 1}
                  grid={grid}
                  handlerOnClick={handlerOnClick}
                  handlerOnBlur={handlerOnBlur}
                  C={C}
                  R={R}
                  count={first}
                />
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

export default FakeSheet;
