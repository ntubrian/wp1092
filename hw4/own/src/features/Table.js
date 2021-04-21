import React, {useState, useEffect ,forceUpdate} from 'react'
import PropTypes from 'prop-types'
import Row from './Row'

function Table(props) {
  // const [data, setData] = useState({})
  

  // const handleChangedCell = ({ x, y }, value) => {
    
  //   const modifiedData = Object.assign({}, data)
  //   if (!modifiedData[y]) modifiedData[y] = {}
  //   modifiedData[y][x] = value
  //   console.log(y)
  //   console.log(`modifiedData${JSON.stringify(modifiedData)}`)
  //   setData(modifiedData)
    
  // }


  // const updateCells = () => {
  //   forceUpdate()
  // }

  // useEffect(()=>{
  //   console.log(props.whichIsSelected)
  // },[props.whichIsSelected, props.x, props.y])
  const rows = []
  // useEffect(()=>{
  //   const rowData = {}
  //   rows.splice(
  //     (whichIsSelected.y-1), 
  //     0,
  //     <Row
  //         handleChangedCell={handleChangedCell}
  //         updateCells={updateCells}
  //         key={y}
  //         y={y}
  //         x={props.x + 1}
  //         rowData={rowData}
  //         storeWhichSelected={storeWhichSelected}
  //     /> 
  //   )
  // },[whichIsSelected])
  // if (props.now.length !== 0){
  //   for (let y = 0; y < props.now[1]; y+=1){
  //     const rowData = data[y] || {}
  //     rows.push(
  //       <Row
  //         handleChangedCell={handleChangedCell}
  //         updateCells={updateCells}
  //         key={y}
  //         y={y}
  //         x={props.x + 1}
  //         rowData={rowData}
  //         storeWhichSelected={props.storeWhichSelected}
  //       />,
  //     )
  //   }
  //   const rowData = {}
  //   rows.push(
  //     <Row
  //         handleChangedCell={handleChangedCell}
  //         updateCells={updateCells}
  //         key={props.now[1]}
  //         y={props.now[1]}
  //         x={props.x + 1}
  //         rowData={rowData}
  //         storeWhichSelected={props.storeWhichSelected}
  //       />,
  //   )
  //   for (let y = props.now[1]; y < props.y; y+=1){
  //     const rowData = data[y] || {}
  //     rows.push(
  //       <Row
  //         handleChangedCell={handleChangedCell}
  //         updateCells={updateCells}
  //         key={y}
  //         y={y}
  //         x={props.x + 1}
  //         rowData={rowData}
  //         storeWhichSelected={props.storeWhichSelected}
  //       />,
  //     )
  //   }
  // }
  
  // else{
  // console.log('goodShit', props.data)
  for (let y = 0; y < props.y + 1; y += 1) {
    
    const rowData = props.data[y] || {}
    
    // console.log(rowData)
    // console.log(`render${y}${JSON.stringify(rowData)}`)
    // console.log('outside', rowData)
    rows.push(
      <Row
        handleChangedCell={props.handleChangedCell}
        updateCells={props.updateCells}
        key={y}
        y={y}
        x={props.x + 1}
        rowData={rowData}
        setData={props.setData}
        storeWhichSelected={props.storeWhichSelected}
        emitUnselectAllEvent={props.emitUnselectAllEvent}
      />
    )
  }
  
  return (
    <div>
      {rows}
    </div>
  )

}
// export default class Table extends React.Component {
//   constructor(props) {
//     super(props)

//     this.state = {
//       data: {},
//       seletedCell:{}
//     }
//   }

//   handleChangedCell = ({ x, y }, value) => {
//     const modifiedData = Object.assign({}, this.state.data)
//     if (!modifiedData[y]) modifiedData[y] = {}
//     modifiedData[y][x] = value
//     this.setState({ data: modifiedData })
//   }

//   updateCells = () => {
//     this.forceUpdate()
//   }

//   render() {
//     const rows = []

//     for (let y = 0; y < this.props.y + 1; y += 1) {
//       const rowData = this.state.data[y] || {}
//       rows.push(
//         <Row
//           handleChangedCell={this.handleChangedCell}
//           updateCells={this.updateCells}
//           key={y}
//           y={y}
//           x={this.props.x + 1}
//           rowData={rowData}
//         />,
//       )
//     }
//     return (
//       <div>
//         {rows}
//       </div>
//     )
//   }
// }

Table.propTypes = {
  x: PropTypes.number.isRequired,
  y: PropTypes.number.isRequired,
}

export default Table