import React from "react";
import ReactDOM from "react-dom";
import TodoApp from "./containers/TodoApp";

class Test extends React.Component{
    constructor(props){
        super(props);
        this.state = {item :[], isNothing : false, styleArr:[],unfinishedNum:0, all:1, active:0, completed:0, output:[]};
        this.ShowItem = this.ShowItem.bind(this);
        this.Check = this.Check.bind(this);
        this.Delete = this.Delete.bind(this);
        this.All = this.All.bind(this);
        this.Active = this.Active.bind(this);
        this.Completed = this.Completed.bind(this);
        this.ClearCompleted=this.ClearCompleted.bind(this);
    }
    ShowItem(event){
        if (event.key === 'Enter'){
            if (event.target.value !=[]){
                console.log("ENTER", event.target.value);
                //let checkedDetail = "text-decoration: line-through; opacity: 0.5";
                let newstyle = this.state.styleArr.concat(0);
                let newitem = this.state.item.concat(event.target.value);
                this.setState({item: newitem, isNothing: true, styleArr:newstyle});
                this.state.unfinishedNum++;
                event.target.value = null;
            }
        }
    }
    Check(event){
        console.log(event.target.checked);
        console.log(event.target.id);
        let tmpArr= this.state.styleArr;
        if (event.target.checked){
            //let tmpArr= this.state.styleArr;
            tmpArr[event.target.id] = 1;
            this.setState({styleArr: tmpArr,unfinishedNum:this.state.unfinishedNum-1});
            //event.target.parentNode.nextSibling.style="text-decoration: line-through; opacity: 0.5";
        }
        else{
            tmpArr[event.target.id] = 0;
            this.setState({styleArr: tmpArr,unfinishedNum:this.state.unfinishedNum+1});
            event.target.parentNode.nextSibling.style.removeProperty("text-decoration");
            //event.target.parentNode.nextSibling.style.removeProperty("opacity");
        }
    }
    Delete(event){
        let removeItem=event.target.parentNode.getElementsByTagName("input")[0];
        //console.log(removeIndex);
        let tmpItem = this.state.item;
        let tmpStAr = this.state.styleArr;
        tmpItem.splice(removeItem.id,1);
        tmpStAr.splice(removeItem.id,1);
        this.setState({item: tmpItem,styleArr: tmpStAr});
        if (!removeItem.checked){
            this.setState({unfinishedNum:this.state.unfinishedNum-1});            
        }
        if (this.state.item.length ==0){
            this.setState({isNothing:false});
        }

    }
    All(event){
        this.setState({all:1,active:0, completed:0});
    }
    Active(event){
        this.setState({all:0,active:1, completed:0});
    }
    Completed(event){
        this.setState({all:0,active:0, completed:1});
    }
    ClearCompleted(event){
        let tmpArr = [];
        let tmpNewSty = [];
        let tmpsty = this.state.styleArr;
        const todo = this;
        tmpsty.forEach(function(item,index){
            if (item==0){
                tmpArr=tmpArr.concat(todo.state.item[index])
                tmpNewSty = tmpNewSty.concat(0)
            }
        });
        this.setState({item: tmpArr, styleArr:tmpNewSty});
    }
    render(){
        const {item,isNothing,styleArr,unfinishedNum,all,active,completed} = this.state;
        let node;
        let foot;
        let clearComBtn;
        let displayArr=[];
        if (all ==1){
            styleArr.forEach(function(item, index){
                displayArr=displayArr.concat("");
            })
        }
        else if (active ==1){
            styleArr.forEach(function(item, index){
                if (item ==0){
                    displayArr=displayArr.concat("");
                }
                else{
                    displayArr=displayArr.concat("none");;
                }
            })
        }
        else{
            styleArr.forEach(function(item, index){
                if (item ==0){
                    displayArr=displayArr.concat("none");
                }
                else{
                    displayArr=displayArr.concat("");;
                }
            })
        }
        if (unfinishedNum ==0){
            clearComBtn = "hidden";
        }
        else{
            clearComBtn = ""
        }

        if (!isNothing){
            node = null;
            foot = null;
        }  
        else{
            node= 
            <ul className="todo-app__list" id="todo-list">
                {item.map((it,ind)=>
                <li className="todo-app__item"  style={{display:displayArr[ind]}}>
                    <div className="todo-app__checkbox" style={{display:displayArr[ind]}}>
                        <input id={ind} type='checkbox' checked= {styleArr[ind]?1:0} onClick={this.Check}/>
                        <label for={ind}></label>
                    </div>
                    <h1 className="todo-app__item-detail" style={{textDecoration:styleArr[ind]? "line-through":"", opacity: styleArr[ind]? 0.5:1}}>{it}</h1>
                    <img src="./img/x.png" className="todo-app__item-x" onClick={this.Delete}/>
                </li>
                )}
            </ul>;
            foot = 
            <footer className="todo-app__footer" id="todo-footer">
                <div className="todo-app__total">{this.state.unfinishedNum} left</div>
                <ul className="todo-app__view-buttons">
                    <button onClick={this.All}>All</button>
                    <button onClick={this.Active}>Active</button>
                    <button onClick={this.Completed}>Completed</button>
                </ul>
                <div className="todo-app__clean" style={{visibility:clearComBtn}}>
                    <button onClick={this.ClearCompleted}>Clear completed</button>
                </div>
            </footer>
        }
        return(
            <div>
                <TodoApp className="todo-app__root" />
                <section className ="todo-app__main">
                    <input className="todo-app__input" onKeyDown={this.ShowItem} placeHolder="What needs to be done?"/>
                    {node}
                    {foot}
                </section>
            </div>
        )
    }
}
/*<TodoApp className="todo-app__root" />*/
ReactDOM.render(
    <Test / >,
    document.getElementById("root")
);

