import React, {useState, useEffect ,forceUpdate} from 'react'
import PropTypes from 'prop-types'
import Row from './Row'

const Table = (props) => {
  const [data, setData] = useState({})
  

  const handleChangedCell = ({ x, y }, value) => {
    const modifiedData = Object.assign({}, data)
    if (!modifiedData[y]) modifiedData[y] = {}
    modifiedData[y][x] = value
    console.log(modifiedData)
    setData(modifiedData)
    console.log(data)
  }


  const updateCells = () => {
    forceUpdate()
  }

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
  
  const rows = []
  // if(!whichIsSelected){
    for (let y = 0; y < props.y + 1; y += 1) {
      const rowData = data[y] || {}
      // if(props.whichIsSelected){
      //   rows.splice(
      //     (props.whichIsSelected.y-1),
      //     0,
      //     <Row
      //     handleChangedCell={handleChangedCell}
      //     updateCells={updateCells}
      //     key={y}
      //     y={y}
      //     x={props.x + 1}
      //     rowData={{}}
      //     storeWhichSelected={props.storeWhichSelected}
      //   />,
      //   )
      //   continue
      // }
      rows.push(
        <Row
          handleChangedCell={handleChangedCell}
          updateCells={updateCells}
          key={y}
          y={y}
          x={props.x + 1}
          rowData={rowData}
          storeWhichSelected={props.storeWhichSelected}
        />,
      )
    }
    
  // }
  // else{
  //   for (let y = 0; y < whichIsSelected.y + 1; y += 1) {
  //     const rowData = data[y] || {}
  //     rows.splice(whichIsSelected.y, 0,
  //       (<Row
  //         handleChangedCell={handleChangedCell}
  //         updateCells={updateCells}
  //         key={whichIsSelected.y}
  //         y={whichIsSelected.y}
  //         x={whichIsSelected.x + 1}
  //         rowData={rowData}
  //         storeWhichSelected={props.storeWhichSelected}
  //       />)
  //     )
  //   }
  //   for (let y = whichIsSelected.y + 1; y < props.y + 1; y += 1) {
  //     const rowData = data[y] || {}
  //     rows.splice(whichIsSelected.y, 0,
  //       (<Row
  //         handleChangedCell={handleChangedCell}
  //         updateCells={updateCells}
  //         key={whichIsSelected.y}
  //         y={whichIsSelected.y}
  //         x={whichIsSelected.x + 1}
  //         rowData={rowData}
  //         storeWhichSelected={props.storeWhichSelected}
  //       />)
  //     )
  //   }
  // }
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