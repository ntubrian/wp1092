import React, { useState } from 'react'
import PropTypes from 'prop-types'
import Cell from './Cell'

function Row(props) {
  const cells = []
  const y = props.y

  for (let x = 0; x < props.x; x += 1) {
    // console.log(`rowdata${props.rowData[x]}`)
    cells.push(
      <Cell
        key={`${x}-${y}`}
        y={y}
        x={x}
        onChangedValue={props.handleChangedCell}
        updateCells={props.updateCells}
        value={props.rowData[x]}
        storeWhichSelected={props.storeWhichSelected}
        setData={props.setData}
        emitUnselectAllEvent={props.emitUnselectAllEvent}
      />,
    )
  }
  return (
    <div>
      {cells}
    </div>
  )
}

Row.propTypes = {
  handleChangedCell: PropTypes.func.isRequired,
  updateCells: PropTypes.func.isRequired,
  x: PropTypes.number.isRequired,
  y: PropTypes.number.isRequired,
  rowData: PropTypes.shape({
    string: PropTypes.string,
  }).isRequired,
}

export default Row;