import React, {useState, useEffect} from 'react'
import PropTypes from 'prop-types'

/**
 * Cell represents the atomic element of a table
 */
// function Cell(props) {
//   const [isEditing, setIsEditing] = useState(false)
//   const [value, setValue] = useState(props.value)
//   const [selected, setIsSelected] = useState(false)

//   const [editingContent, setEditingContent] = useState('');
//   const [isHovered, setIsHovered] = useState('');
//   const [hoveredElement, setHoveredElement] = useState('');
//   const [isSingleClick, setSingleClick] = useState(false);
//   let timer = 0
//   let delay = 200
//   let prevent = false

//   const handleUnselectAll = () => {
//     if (selected || isEditing) {
//       setIsSelected(false)
//       setIsEditing(false)

//     }
//   }
//   // useEffect(() => {
//   //   window.addEventListener('mousedown', handleUnselectAll)

//   //   return () => {
//   //     window.removeEventListener('mousedown', handleUnselectAll)
//   //   }
//   // })

  
//   const onChange = (e) => {
//     setValue(e.target.value)
//   }

//   const onKeyPressOnInput = (e) => {
//     if (e.key === 'Enter') {
//       hasNewValue(e.target.value)
//     }
//   }

//   const onKeyPressOnSpan = () => {
//     if (!isEditing) {
//       setIsEditing(true)
//     }
//   }

//   const onBlur = (e) => {
//     hasNewValue(e.target.value)
//   }

//   const hasNewValue = (value) => {
//     props.onChangedValue(
//       {
//         x: props.x,
//         y: props.y,
//       },
//       value,
//     )
//     setIsEditing(false)
//   }

  

//   const clicked = () => {
//     timer = setTimeout(() => {
//       if (!prevent) {
//         props.emitUnselectAllEvent()
//         setIsEditing(true)
//       }
//       prevent = false
//     }, delay)
//   }

//   const doubleClicked = () => {
//     clearTimeout(timer)
//     prevent = true
//     props.emitUnselectAllEvent()
//     setIsEditing(true)
//     setIsSelected(true)
//   }

   
//   const doClickAction = (e) =>　{
//       setIsHovered(true)
//       setHoveredElement(e)
//   }
//   const doDoubleClickAction = (e) => {
//       console.log(e.target.innerText)
//       setEditingContent(e.target.innerText)
//       setIsEditing(true)
//   }
//   const handleEdit = (e) => {
//       setSingleClick(true)
//       console.log(e)
//       timer = setTimeout(function() {
//       if (!prevent) {
//           doClickAction(e);
//       }
//       prevent = false;
//       }, delay);
//   }
//   const handleDoubleClick = (e) => {
//       clearTimeout(timer);
//       prevent = true;
//       doDoubleClickAction(e);
//   }

//   const calcaulateCss = () => {
//     const css = {
//       width: '80px',
//       padding: '4px',
//       margin: '0',
//       height: '25px',
//       boxSizing: 'border-box',
//       position: 'relative',
//       display: 'inline-block',
//       color: 'black',
//       border: '1px solid #cacaca',
//       textAlign: 'left',
//       verticalAlign: 'top',
//       fontSize: '14px',
//       lineHeight: '15px',
//       overflow: 'hidden', 
//     }
    
//     if (props.x === 0 || props.y === 0){
//       css.textAlign = 'center'
//       css.backgroundColor = '#f0f0f0'
//       css.fontWeight = 'bold'
//     }
//     return css
//   }
  
//   const css = calcaulateCss()
//   if (props.x === 0) {
//     return (
//       <span style={css}>
//         {props.y}
//       </span>
//     )
//   }

//   if (props.y === 0) {
//     const alpha = ' abcdefghijklmnopqrstuvwxyz'.split('')
//     return (
//       <span
//         onKeyPress={onKeyPressOnSpan}
//         style={css}
//         role="presentation">
//         {alpha[props.x]}
//       </span>
//     )
//   }

//   if (selected) {
//     css.outlineColor = 'lightblue'
//     css.outlineStyle = 'dotted'
//   }

//   // if (isEditing) {
//   //   return (
//   //     <input
//   //       style={css}
//   //       type="text"
//   //       onBlur={onBlur}
//   //       onKeyPress={onKeyPressOnInput}
//   //       value={value}
//   //       onChange={onChange}
//   //       autoFocus
//   //     />
//   //   )
//   // }
//   if (isEditing) {
//     // if (isSingleClick){
//     //     setEditingContent('')
//     // }
//     return (
//       <input
//           defaultValue={editingContent}
//           value={editingContent}
//           onChange={onChange}
//           autoFocus
//           onBlur={()=>{setIsEditing(false);setSingleClick(false)}}
//       />
      
//     )
//   }

//   if (isSingleClick) {
        
//     return (
//       <input
//         defaultValue={editingContent}
//         value={editingContent}
//         onKeyDown={(e)=>{setIsEditing(true)}}
//         onDoubleClick={handleDoubleClick}
//         autoFocus
//         style={css}
//         onBlur={()=>setSingleClick(false)}
//       /> 
//     )
//   }

//   return (
//     <span
//       onClick={handleEdit}
//       onDoubleClick={handleDoubleClick}
//       style={css}
//       role="presentation"
//     >
//       {editingContent}
//     </span>
//   )
  
// }

// export default Cell;

export default class Cell extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      editing: false,
      value: this.props.value
      
    }
    console.log(this.state.value)
    // console.log(`y:${props.y}-x:${props.x}-${props.value}`)
    // console.log(this.props)
    this.display = this.determineDisplay(
      { x: this.props.x, y: this.props.y },
      this.props.value
    )
    this.timer = 0
    this.delay = 200
    this.prevent = false
  }

  /**
   * Add listener to the `unselectAll` event used to broadcast the
   * unselect all event
   */
  componentDidMount() {
    window.document.addEventListener('unselectAll',
      this.handleUnselectAll)
  }

  /**
   * Before updating, execute the formula on the Cell value to
   * calculate the `display` value. Especially useful when a
   * redraw is pushed upon this cell when editing another cell
   * that this might depend upon
   */
  componentWillUpdate() {
    this.display = this.determineDisplay(
      { x: this.props.x, y: this.props.y }, this.state.value)
      
  }

  /**
   * Remove the `unselectAll` event listener added in
   * `componentDidMount()`
   */
  componentWillUnmount() {
    window.document.removeEventListener('unselectAll',
      this.handleUnselectAll)
  }

  
  /**
   * When a Cell value changes, re-determine the display value
   * by calling the formula calculation
   */
  onChange = (e) => {
    this.setState({ value: e.target.value })
    this.display = this.determineDisplay(
      { x: this.props.x, y: this.props.y }, e.target.value)
    // console.log(`x:${this.props.x}-y:${this.props.y}, value-${e.target.value}`)
  }

  /**
   * Handle pressing a key when the Cell is an input element
   */
  onKeyPressOnInput = (e) => {
    if (e.key === 'Enter') {
      this.hasNewValue(e.target.value)
      console.log(this.display)
      console.log(this.state.value)
      
    }
  }

  /**
   * Handle pressing a key when the Cell is a span element,
   * not yet in editing mode
   */
  onKeyPressOnSpan = () => {
    if (!this.state.editing) {
      this.setState({ editing: true })
    }
  }

  /**
   * Handle moving away from a cell, stores the new value
   */
  onBlur = (e) => {
    this.hasNewValue(e.target.value)
    // console.log(this.state.value)
    // console.log(this.display)
  }

  /**
   * Used by `componentDid(Un)Mount`, handles the `unselectAll`
   * event response
   */
  handleUnselectAll = () => {
    if (this.state.selected || this.state.editing) {
      this.setState({ selected: false, editing: false })
    }
  }

  /**
   * Called by the `onBlur` or `onKeyPressOnInput` event handlers,
   * it escalates the value changed event, and restore the editing
   * state to `false`.
   */
  hasNewValue = (value) => {
    this.props.onChangedValue(
      {
        x: this.props.x,
        y: this.props.y,
      },
      value,
    )
    this.setState({ editing: false })
    this.props.storeWhichSelected({x:this.props.x, y:this.props.y})
  }

  /**
   * Emits the `unselectAll` event, used to tell all the other
   * cells to unselect
   */
  emitUnselectAllEvent = () => {
    const unselectAllEvent = new Event('unselectAll')
    window.document.dispatchEvent(unselectAllEvent)
    
  }

  /**
   * Handle clicking a Cell.
   */
  clicked = (e) => {
    // Prevent click and double click to conflict
    this.timer = setTimeout(() => {
      if (!this.prevent) {
        // Unselect all the other cells and set the current
        // Cell state to `selected`
        this.emitUnselectAllEvent()
        this.setState({ selected: true })
        this.props.storeWhichSelected({x:this.props.x, y:this.props.y})
      }
      this.prevent = false
    }, this.delay)
  }

  /**
   * Handle doubleclicking a Cell.
   */
  doubleClicked = () => {
    // Prevent click and double click to conflict
    clearTimeout(this.timer)
    this.prevent = true

    // Unselect all the other cells and set the current
    // Cell state to `selected` & `editing`
    this.emitUnselectAllEvent()
    this.setState({ editing: true, selected: true })
    this.props.storeWhichSelected({x:this.props.x, y:this.props.y})
  }

  determineDisplay = ({ x, y }, value) => {
    
    return value
  }

  /**
   * Calculates a cell's CSS values
   */
  calculateCss = () => {
    const css = {
      width: '80px',
      padding: '4px',
      margin: '0',
      height: '25px',
      boxSizing: 'border-box',
      position: 'relative',
      display: 'inline-block',
      color: 'black',
      border: '1px solid #cacaca',
      textAlign: 'left',
      verticalAlign: 'top',
      fontSize: '14px',
      lineHeight: '15px',
      overflow: 'hidden',

    }

    if (this.props.x === 0 || this.props.y === 0) {
      css.textAlign = 'center'
      css.backgroundColor = '#f0f0f0'
      css.fontWeight = 'bold'
    }

    return css
  }

  render() {
    const css = this.calculateCss()

    // column 0
    if (this.props.x === 0) {
      return (
        <span style={css}>
          {this.props.y}
        </span>
      )
    }

    // row 0
    if (this.props.y === 0) {
      const alpha = ' abcdefghijklmnopqrstuvwxyz'.split('')
      return (
        <span
          onKeyPress={this.onKeyPressOnSpan}
          style={css}
          role="presentation">
          {alpha[this.props.x]}
        </span>
      )
    }

    if (this.state.selected) {
      css.outlineColor = 'lightblue'
      css.outlineStyle = 'dashed'
    }

    if (this.state.editing) {
      return (
        <input
          style={css}
          type="text"
          onBlur={this.onBlur}
          onKeyPress={this.onKeyPressOnInput}
          value={this.state.value}
          onChange={this.onChange}
          autoFocus
        />
      )
    }
    return (
      <span
        onClick={e => this.clicked(e)}
        onDoubleClick={e => this.doubleClicked(e)}
        style={css}
        role="presentation"
      >
        {this.display}
      </span>
    )
  }
}

Cell.propTypes = {
  onChangedValue: PropTypes.func.isRequired,
  x: PropTypes.number.isRequired,
  y: PropTypes.number.isRequired,
  // value: PropTypes.string.isRequired,
}