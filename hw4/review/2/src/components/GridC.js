import React, { useState, useEffect, useRef } from "react";

function GridC(props) {
  const [localCount, setLocalCount] = useState(props.count);
  const Ref = useRef(null);
  const [content, setContent] = useState(props.content.val);
  const [inputStatus, setInputStatus] = useState("hidden");
  const keyDown = (e) => {
    console.log("key", e.key);
    if (e.key === "Enter" && props.content.r + 1 < props.rowNumber) {
      console.log("get enter");
      let id = props.colNumber * (props.content.r + 1) + props.content.c;
      var dom = document.getElementById(-id);
      Ref.current.blur();
      dom.focus();
      return;
    }
    if (
      e.key === "ArrowRight" ||
      e.key === "ArrowDown" ||
      e.key === "ArrowLeft" ||
      e.key === "ArrowUp" ||
      e.key === "Meta" ||
      e.key === "Escape"
    )
      return;
    /*
    if (
      (e.key === "Enter" || e.key === "ArrowDown") &&
      props.content.r + 1 < props.rowNumber
    ) {
      console.log("get enter");
      let id = props.colNumber * (props.content.r + 1) + props.content.c;
      var dom = document.getElementById(-id);
      Ref.current.blur();
      dom.focus();
      return;
    }
    if (e.key === "ArrowRight") {
      if (props.content.c + 1 > props.colNumber) return;
      let id = props.colNumber * props.content.r + props.content.c + 1;
      var dom = document.getElementById(-id);
      Ref.current.blur();
      dom.focus();
      return;
    }
    if (e.key === "ArrowLeft") {
      if (props.content.c - 1 < 0) return;
      let id = props.colNumber * props.content.r + props.content.c - 1;
      var dom = document.getElementById(-id);
      Ref.current.blur();
      dom.focus();
      return;
    }
    if (e.key === "ArrowUp") {
      if (props.content.r - 1 < 0) return;
      let id = props.colNumber * (props.content.r - 1) + props.content.c;
      var dom = document.getElementById(-id);
      Ref.current.blur();
      dom.focus();
      return;
    }
    */
    //Ref.current.focus();
    if (
      !(document.activeElement === Ref.current) &&
      firstIn == 0 &&
      (e.key === "Delet" || e.key === "Backspace")
    ) {
      setContent("");
    } else {
      Ref.current.focus();
    }
  };
  const [content1, setContent1] = useState(props.content.val);
  const handlerOnBlur = () => {
    props.handlerOnBlur(props.content.c, props.content.r, content);
    setContent1(content);
    setInputStatus("hidden");
    console.log("tableOnBlurs", content, "1", content1);
  };

  const hOnFocus = () => {
    console.log(`${content},${content1}`);
    props.handlerOnClick(props.content.c, props.content.r);
    setInputStatus("");
    if (content1 != "") {
      if (refMode) {
      } else {
        setContent(content1);
      }
    }
    setContent1("");
    console.log("tableOnFocus", content, "1", content1);
  };
  const tdDouble = () => {
    console.log("tdDOUBLE");
    setFirstIn(1);
    Ref.current.focus();
  };

  const [firstIn, setFirstIn] = useState(0);
  const update = (e) => {
    console.log(`update, ${e.target.value}, ${firstIn}`);
    console.log("update", content, ",", content1);
    //console.log(typeof e.target.value);

    if (firstIn == 0) {
      setContent(e.target.value[0]);
      setFirstIn(1);
    } else {
      setContent((value) => e.target.value);
    }
  };
  const inputKeyDown = (e) => {};
  const oB = () => {
    props.handlerOnBlur(props.content.c, props.content.r);
    setInputStatus("hidden");
    setFirstIn(0);
    console.log("oB", content, "1", content1);
  };
  const inputFocus = () => {
    console.log("input focus");
  };
  function isRowCol() {
    return props.content.c === 0 || props.content.r === 0;
  }
  const [refMode, setRefMode] = useState(false);
  function reload() {
    if (props.count !== localCount) {
      setLocalCount(props.count);
      console.log(`rerender:, ${props.content.val},${content1}`);
      setContent1(props.content.val);
      setContent(props.content.val);
      return;
    }
    // refer cell
    if (content1.length > 0 && content1[0] === "=") {
      //console.log("ref mode");
      var re = /^[a-zA-Z]+[0-9]+$/;
      var ALPHA = /[a-zA-Z]+/;
      var cell = content1.slice(1).match(re);
      //onsole.log(`${cell}`);
      if (cell === undefined || cell === null) return;
      var cellString = cell[0];
      //console.log(cellString.match(ALPHA));
      //console.log(`${content} ,${content1}`);

      var parseAlpha = cellString.match(ALPHA)[0].toUpperCase().toString();
      //console.log(props.colID);
      if (parseAlpha === undefined) {
        return;
      }
      var alpha = 0;
      for (var i = 0; i < parseAlpha.length; i++) {
        alpha *= 26;
        alpha += parseAlpha[i].charCodeAt(0) - "A".charCodeAt(0);
      }
      alpha++;
      var num = parseInt(cellString.match(/[0-9]+/));
      //console.log(`${alpha} ,${num}`);

      let id = props.colNumber * num + alpha;
      var dom = document.getElementById(-id);
      setContent1(dom.textContent);
      setRefMode(true);
    }
  }

  reload();
  return (
    <>
      <td
        tabindex="0"
        id={-(props.colNumber * props.content.r + props.content.c)}
        className={
          props.content.r === 0 || props.content.c === 0
            ? "td_gray"
            : (props.C !== -1 && props.content.c === props.C) ||
              (props.R !== -1 && props.content.r === props.R)
            ? "td_cfocus"
            : "td"
        }
        onFocus={isRowCol() ? () => {} : hOnFocus}
        onKeyDown={keyDown}
        onBlur={isRowCol() ? () => {} : handlerOnBlur}
        onDoubleClick={isRowCol() ? () => {} : tdDouble}
      >
        <input
          ref={Ref}
          id={props.colNumber * props.content.r + props.content.c}
          className={
            props.content.r === 0 || props.content.c === 0
              ? "in_gray"
              : (props.C !== -1 && props.content.c === props.C) ||
                (props.R !== -1 && props.content.r === props.R)
              ? "in_cfocus"
              : "in"
          }
          type={inputStatus}
          value={content}
          onChange={isRowCol() ? () => {} : update}
          onBlur={isRowCol() ? () => {} : oB}
          onFocus={isRowCol() ? () => {} : inputFocus}
          onKeyDown={isRowCol() ? () => {} : inputKeyDown}
          //onDoubleClick={() => console.log("DOUBLE")}
        />
        {content1}
      </td>
    </>
  );
}

export default GridC;
