import React, { Component, useState } from "react";
import Header from "../components/Header";
import New from "../components/New";
import Cell2 from '../features/Cell2.js'

const FakeSheet = () => {
    const emitUnselectAllEvent = () => {
        const unselectAllEvent = new Event('unselectAll')
        window.document.dispatchEvent(unselectAllEvent)
        storeWhichSelected()
        
    }

    const [whichIsSelected, storeWhichSelected] = useState()
    return (
        <div className="sheet__root" onClick={emitUnselectAllEvent} >
            {/* <Header /> */}
            <New storeWhichSelected={storeWhichSelected} whichIsSelected={whichIsSelected} />
        </div>
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

