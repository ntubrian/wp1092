import React, { Component, useEffect, useState, forceUpdate } from "react";
import Header from "../components/Header";
import New from "../components/New";
import Cell2 from '../features/Cell2.js'

function FakeSheet() {
    const [whichIsSelected, storeWhichSelected] = useState({})
    var now =[]
    // if(whichIsSelected){
    //     now = [whichIsSelected.x, whichIsSelected.y]
    // }
    // else{
        
    // }
    
    const [data, setData] = useState({})
    const handleChangedCell = ({ x, y }, value) => {
        const modifiedData = Object.assign({}, data)
        if (!modifiedData[y]) modifiedData[y] = {}
        modifiedData[y][x] = value
        // console.log(y)
        // console.log(`modifiedData${JSON.stringify(modifiedData)}`)
        setData(modifiedData)
        // const modifiedData = []
        // data.forEach(i => {
        //     modifiedData.push(i)
        // })
        // if (!modifiedData[y]) modifiedData[y] = []
        // modifiedData[y][x] = value
        // setData(modifiedData)
        console.log('Current data', data)
    }

    const emitUnselectAllEvent = () => {
        const unselectAllEvent = new Event('unselectAll')
        window.document.dispatchEvent(unselectAllEvent)
        storeWhichSelected()
    }

    const [columnNum, setColumnNum] = useState(26)
    const [rowNum, setRowNum] = useState(100)
    
    const tableHandler = {
        columnAdd: () => {
            setColumnNum((prev)=> prev + 1)
        },
        columnRemove: () => {
            setColumnNum((prev)=> prev - 1)
        },
        rowAdd: () => {
            // var temp = {}
            // if (whichIsSelected.length !== 0){
            //     for(let i = 1; i < rowNum + 2; i++){
            //         if()
            //         temp[i] = data[i]
            //     }
            // }
            setRowNum((prev)=>prev+1)
            // setRowNum((prev) => prev + 1)
            if (whichIsSelected && whichIsSelected.length > 0) {
                var temp = {}
                for(let i = 1; i < rowNum+2; i++){
                    if (i < whichIsSelected.y){
                        temp[i] = data[i]
                    }
                    if (i === whichIsSelected.y){
                        temp[i] = {}
                    }
                    if (i > whichIsSelected.y){
                        temp[i] = data[i-1]
                    }
                }
                setData(temp)
            //    const originData = Object.assign({}, data)
            //    const temp = originData[whichIsSelected.y]
            //    const newData = {...data}
            //    newData[whichIsSelected.y - 1] = {}
            //    newData[whichIsSelected.y] = (temp || {})
            //    for (let i = whichIsSelected.y; originData.length + 1 < i;) {
            //        console.log(newData[i])
            //         newData[i] = newData[i++]
            //         console.log(newData[i])
            //         return newData
            //    }
                // const newData = Array.from(data)
                // newData.splice(whichIsSelected.y, 0, [])
                // setData(newData)
            }
            
            // handleChangedCell({ x: whichIsSelected.x, y: whichIsSelected.y }, 0)
            

        },
        rowRemove: () => {
            setRowNum((prev) => prev - 1)
        }
    }

    
    const updateCells = () => {
        forceUpdate()
    }
    useEffect(()=>{
        // console.log(whichIsSelected)
    })

    return (
        <>
            <div className="column-control">
                <button className="column-add" onClick={tableHandler.columnAdd}>+</button>
                <button className="column-remove" onClick={tableHandler.columnRemove}>-</button>
            </div>
            <div className="row-control">
                <button className="row-add" onClick={tableHandler.rowAdd}>+</button>
                <button className="row-remove" onClick={tableHandler.rowRemove}>-</button>
            </div>
            <div className="sheet__root" onClick={emitUnselectAllEvent} >
                {/* <Header /> */}
                <New 
                    storeWhichSelected={storeWhichSelected} 
                    whichIsSelected={whichIsSelected} 
                    columnNum={columnNum}
                    rowNum={rowNum} 
                    now={now}
                    handleChangedCell={handleChangedCell}
                    data={data}
                    setData={setData}
                    updateCells={updateCells}
                    emitUnselectAllEvent={emitUnselectAllEvent}
                />
                
            </div>
        </>
    );
}
// class FakeSheet extends Component {
//     emitUnselectAllEvent = () => {
//         const unselectAllEvent = new Event('unselectAll')
//         window.document.dispatchEvent(unselectAllEvent)
//     }
    
//     render() {
//         return (
//             <div className="sheet__root" onClick={this.emitUnselectAllEvent} >
//                 {/* <Header /> */}
//                 <New />
//             </div>
//         );
//     }
// }

export default FakeSheet;

