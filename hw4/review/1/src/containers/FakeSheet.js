import React, { Component } from "react";
import Header from "../components/Header";
import Table from "../components/Table";
import '../containers/FakeSheet.css';

const alphabets = { 0:'Z', 1:'A', 2:'B', 3:'C', 4:'D', 5:'E', 6:'F', 7:'G', 8:'H', 9:'I', 
                    10:'J', 11:'K', 12:'L', 13:'M', 14:'N', 15:'O', 16:'P', 17:'Q', 
                    18:'R', 19:'S', 20:'T', 21:'U', 22:'V', 23:'W', 24:'X', 25:'Y'};

class FakeSheet extends Component {
    constructor(props) {
        super(props);
        let t = new Array(101);
        for (var i = 0; i < t.length; i++) {
            t[i] = new Array(27);
            for (var j = 0; j < t[i].length; j++) {
                t[i][j] = '';
            }
        }
        this.state = {
            table: t, 
            click_row: 0, 
            click_col: 0
        };
        this.handleChange = this.handleChange.bind(this);
    }
    
    setClickIdx = (row_idx, col_idx) => {
    	this.setState({click_row: row_idx, click_col: col_idx});
    	console.log(row_idx, col_idx);
    }

    handelKeydown = (row_idx, col_idx) => {
    	let new_table = this.state.table;
    	new_table[row_idx][col_idx] = '';
    	this.setState({table: new_table});
    }

    handleChange(row_idx, col_idx, value) {
    	let new_table = this.state.table;
    	new_table[row_idx][col_idx] = value;
    	this.setState({table: new_table}); 
    }

    addRow = () => {
    	let new_row = new Array(this.state.table[0].length);
    	let new_table = this.state.table.splice(this.state.click_row, new_row);
    	this.setState({table: new_table});
    }
    
    deleteRow = () => {
    	console.log(this.state.click_row, this.state.click_col);
    	let new_table = this.state.table;
    	new_table.splice(this.state.click_row, 1);
    	this.setState({table: new_table});
    	let next_cell = document.getElementById(`cell-${this.state.click_row}-${this.state.click_col}`);
    	next_cell.focus();
    }
    addColumn = () => {
    	let new_table = this.state.table;
    	for (var i = 0; i < this.state.table.length; i++) {
    		new_table[i].splice(this.state.click_col, 1, '');
    	}
    	this.setState({table: new_table});
    }

    deleteColumn = () => {
    	let new_table = this.state.table;
    	for (var i = 0; i < this.state.table.length; i++) {
    		new_table[i].splice(this.state.click_col, 1);
    	}
    	this.setState({table: new_table});
    	let next_cell = document.getElementById(`cell-${this.state.click_row}-${this.state.click_col}`);
    	next_cell.focus();
    }
    
    render() {
        return (
            <>
                <header>
	                <h1 id="title">Fake Sheet</h1>
			        <div className="btn-groups">
			            <div className="button" id="add-column" onClick={this.addColumn}>add column</div>
			            <div className="button" id="del-column" onClick={this.deleteColumn}>delete column</div>
			            <div className="button" id="add-row" onClick={this.addRow}>add row</div>
			            <div className="button" id="del-row" onClick={this.deleteRow}>delete row</div>
			        </div>
                </header>
                <Table table={this.state.table} onchange_func={this.handleChange} onkeydown_func={this.handelKeydown} onclick_func={this.setClickIdx} />
            </>
       );
    }
}

export default FakeSheet;

