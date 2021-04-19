import React, { useState, useEffect, usePrevious, useRef } from "react";

import Table from '../features/Table.js'

// const columns = [
//     { key: 'id', name: 'ID' },
//     { key: 'title', name: 'Title' },
//     { key: 'count', name: 'Count' } ];

// const rows = [{id: 0, title: 'row1', count: 20}, {id: 1, title: 'row1', count: 40}, {id: 2, title: 'row1', count: 60}];
// function useEffectAllDepsChange(fn, deps) {
//     const prevDeps = usePrevious(deps);
//     const changeTarget = useRef();
  
//     useEffect(() => {
//       // nothing to compare to yet
//       if (changeTarget.current === undefined) {
//         changeTarget.current = prevDeps;
//       }
  
//       // we're mounting, so call the callback
//       if (changeTarget.current === undefined) {
//         return fn();
//       }
  
//       // make sure every dependency has changed
//       if (changeTarget.current.every((dep, i) => dep !== deps[i])) {
//         changeTarget.current = deps;
  
//         return fn();
//       }
//     }, [fn, prevDeps, deps]);
// }

const New = (props) => {
    
    const [columnNum, setColumnNum] = useState(0)
    const [rowNum, setRowNum] = useState(0)
    

    const handleColumnAdd = () => {
        setColumnNum((prev)=> prev + 1)
    }
    const handleColumnRemove = () => {
        setColumnNum((prev)=> prev - 1)
    }
    const handleRowAdd = () => {
        setRowNum((prev) => prev + 1)
    }
    const handleRowRemove = () => {
        setRowNum((prev) => prev - 1)
    }

    // const handleUnselectAll = () => {
    //     if (this.state.selected || this.state.editing) {
    //       setState({ selected: false, editing: false })
    //     }
    //   }
    
    return (
        <>
            <div className="column-control">
                <button className="column-add" onClick={handleColumnAdd}>+</button>
                <button className="column-remove" onClick={handleColumnRemove}>-</button>
            </div>
            <div className="workarea" id="ex" on >
                <Table x={columnNum} y={rowNum} storeWhichSelected={props.storeWhichSelected} whichIsSelected={props.whichIsSelected}/>
            </div>
            <div className="row-control">
                <button className="row-add" onClick={handleRowAdd}>+</button>
                <button className="row-remove" onClick={handleRowRemove}>-</button>
            </div>
        </>
        
    )
};
export default New
