import React from "react";
export default function Header () {
    return (
        <>
        <h1 id="title">Fake Sheet</h1>
        <div className="btn-groups">
            <div className="button" id="add-column">add column</div>
            <div className="button" id="add-row">add row</div>
            <div className="button" id="del-column">delete column</div>
            <div className="button" id="del-row">delete row</div>
        </div>
        </>
    );
}