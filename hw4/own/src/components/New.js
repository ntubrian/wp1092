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

function New(props) {
    
    

    // const handleUnselectAll = () => {
    //     if (this.state.selected || this.state.editing) {
    //       setState({ selected: false, editing: false })
    //     }
    //   }
    
    return (
        <>
            
            <div className="workarea" id="ex">
                <Table 
                    x={props.columnNum} 
                    y={props.rowNum} 
                    storeWhichSelected={props.storeWhichSelected} 
                    whchIsSelected={props.whichIsSelected}
                    now={props.now}
                    handleChangedCell={props.handleChangedCell}
                    data={props.data}
                    setData={props.setData}
                    updateCells={props.updateCells}
                    emitUnselectAllEvent={props.emitUnselectAllEvent}
                />
                
            </div>
            
        </>
        
    )
};
export default New
