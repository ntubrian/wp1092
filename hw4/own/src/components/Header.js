import React, { useState, useEffect, usePrevious, useRef } from "react";

import Cell from '../features/Cell.js'
import Cell3 from '../features/Cell3.js'

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

const Header = () => {
    const [cellContent, setCellContent] = useState({});
    const [allCellInfo, setAllcellInfo] = useState([]);
    const [isEditing, setIsEditing] = useState(false);
    const [editingContent, setEditingContent] = useState('');
    const [isHovered, setIsHovered] = useState('');
    const [hoveredElement, setHoveredElement] = useState('');
    const [isSingleClick, setSingleClick] = useState(false);



    const myStyle = {
        // gridTemplateColumns: 'repeat(3, 138px)',
        color: 'transparent',
        textShadow: '0 0 0 #2196f3'
    }
    // const handleEdit = () =>{
    //     setCellContent((prev) => ({...prev, id:Date.now(), pos:}))
    // }
    const preventNewLine = (e) => {
        if(e.key === "Enter"){
            e.preventDefault();
        }
        // e.target.focus();
    }

    // const handleEdit = (e) => {
    //     e.preventDefault();
    // }

    let timer = 0
    let delay = 200
    let prevent = false
    const doClickAction = (e) =>　{
        setIsHovered(true)
        setHoveredElement(e)
    }
    const doDoubleClickAction = (e) => {
        console.log(e.target.innerText)
        setEditingContent(e.target.innerText)
        setIsEditing(true)
    }
    const handleEdit = (e) => {
        setSingleClick(true)
        console.log(e)
        timer = setTimeout(function() {
        if (!prevent) {
            doClickAction(e);
        }
        prevent = false;
        }, delay);
    }
    const handleDoubleClick = (e) => {
        clearTimeout(timer);
        prevent = true;
        doDoubleClickAction(e);
    }
    
    const removeEdit = (e) => {
        e.target.contentEditable = false;
    }
    var myClass = ''
    
    const handleOnchange = () => {
        myClass = 'cool';
        console.log(myClass);
    }
    const handleOnBlur = () => {
        myClass = 'dsv';
        console.log(myClass);
    }
    const handleCellChange = (e) => {
        setEditingContent(e.target.value)
    }

    useEffect(()=> {
        if (isSingleClick){
            setEditingContent('')
        }
    }, [isSingleClick])
    // useEffectAllDepsChange(isSingleClick, document.onkeydown);
    if (isEditing) {
        // if (isSingleClick){
        //     setEditingContent('')
        // }
        return (
            <div className="workarea" id="ex" >
                <input
                    className="hi"
                    defaultValue={editingContent}
                    value={editingContent}
                    onChange={handleCellChange}
                    autoFocus
                    onBlur={()=>{setIsEditing(false);setSingleClick(false)}}
                />
                <h1>{editingContent}</h1>
            </div>
        )
    }

    if (isSingleClick) {
        
        return (
            <div className="workarea" id="ex" >
                <input
                    className="hihi"
                    defaultValue={editingContent}
                    value={editingContent}
                    onKeyDown={(e)=>{setIsEditing(true)}}
                    onDoubleClick={handleDoubleClick}
                    autoFocus
                    style={myStyle}
                    onBlur={()=>setSingleClick(false)}
                />
                <h1>{editingContent}</h1>
            </div>
        )
    }

    return (
        <div className="workarea" id="ex" >
            <div
                // className={myClass ? myClass : ''}
                // role="textbox" 
                onClick={handleEdit}
                onDoubleClick={handleDoubleClick}
                onKeyDown={preventNewLine}
                tabIndex={0}
                defaultValue="99"
                // onInput={handleOnchange}
                // onBlur={handleOnBlur}
                className="celloutline"
            >
            {editingContent}
            </div>
            {/* <table>
                <tr>
                    <td onClick={handleEdit} onKeyDown={preventNewLine} >國家</td>
                    <td>首都</td>
                    <td>人口</td>
                    <td>語言</td>
                    <td>國家</td>
                    <td>首都</td>
                    <td>人口</td>
                    <td>語言</td>
                    <td>國家</td>
                    <td>首都</td>
                    <td>人口</td>
                    <td>語言</td>
                    <td>國家</td>
                    <td>首都</td>
                    <td>人口</td>
                    <td>語言</td>
                    <td>國家</td>
                    <td>首都</td>
                    <td>人口</td>
                    <td>語言</td>
                    <td>國家</td>
                    <td>首都</td>
                    <td>人口</td>
                    <td>語言</td>
                </tr>
                <tr>
                    <td>USA</td>
                    <td>Washington D.C.</td>
                    <td>309 million</td>
                    <td>English</td>
                    <td>USA</td>
                    <td>Washington D.C.</td>
                    <td>309 million</td>
                    <td>English</td>
                    <td>USA</td>
                    <td>Washington D.C.</td>
                    <td>309 million</td>
                    <td>English</td>
                    <td>USA</td>
                    <td>Washington D.C.</td>
                    <td>309 million</td>
                    <td>English</td>
                    <td>USA</td>
                    <td>Washington D.C.</td>
                    <td>309 million</td>
                    <td>English</td>
                    <td>USA</td>
                    <td>Washington D.C.</td>
                    <td>309 million</td>
                    <td>English</td>
                </tr>
                <tr>
                    <td>Sweden</td>
                    <td>Stockholm</td>
                    <td>9 million</td>
                    <td>Swedish</td>
                    <td>Sweden</td>
                    <td>Stockholm</td>
                    <td>9 million</td>
                    <td>Swedish</td>
                    <td>Sweden</td>
                    <td>Stockholm</td>
                    <td>9 million</td>
                    <td>Swedish</td>
                    <td>Sweden</td>
                    <td>Stockholm</td>
                    <td>9 million</td>
                    <td>Swedish</td>
                    <td>Sweden</td>
                    <td>Stockholm</td>
                    <td>9 million</td>
                    <td>Swedish</td>
                    <td>Sweden</td>
                    <td>Stockholm</td>
                    <td>9 million</td>
                    <td>Swedish</td>
                </tr>
                <tr>
                    <td contenteditable="true">
                        I'm editable
                    </td>
                    <td><div contenteditable>I'm also editable</div>
                    </td>
                </tr>
                
            </table> */}
            {/* <Cell />
            <Cell3 /> */}
            

            
            
        </div>
        
    )
};
export default Header
