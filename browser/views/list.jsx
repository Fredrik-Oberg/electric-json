'use babel';
import React from 'react';
import Update from 'react/lib/update'
import JsonStore from '../scripts/stores/jsonStore';
import {selectJsonNode} from "../scripts/actions/jsonActions";

class IterableItemClass extends React.Component {
  constructor(props) {
        super(props);            
         this.state = {
            children : this.props.data.childList, 
            length : this.props.data.childList.length, 
        };
        this.handleClick = this.handleClick.bind(this);
    }
    handleClick(e){
        e.stopPropagation();
        console.log(this.props.data);
        selectJsonNode(this.props.data);
    }

    shouldComponentUpdate(nextProps, nextState) {
        return this.state.results !== nextState.results
    }
}


class ObjectItem extends IterableItemClass {
    constructor(props) {
        super(props);                   
    }
    render() {
        return <div className="json-list object" onClick={this.handleClick}>
        Object items: {this.state.length} 
        <ListItem key={0} data={this.state.children} /></div>               
    }
}

class ArrayItem extends IterableItemClass {
  constructor(props) {
        super(props);                  
    }
    render() {
        return <div className="json-list array" onClick={this.handleClick}>
        Array items: {this.state.length}
        <ListItem key={0} data={this.state.children} /></div>       
    }
}

class PropertyItem extends React.Component {
    constructor(props) {
        super(props);            
        this.state = {
            type : this.props.data.type, 
            property : this.props.data.property, 
            value : this.props.data.val, 
        };
        this.handleClick = this.handleClick.bind(this);
        this.classes = "json-list-item property property-type-" + this.state.type;      
    }
    handleClick(e){
        console.log(e.target.value);
    }
    render() {
        return <div onClick={this.handleClick} className={this.classes}>
        <span>{this.state.property}</span> - <span>{this.state.value}</span> </div>
    }
}
       
class ListItem extends React.Component {
    constructor(props) {
        super(props);            
        this.state = {
            results : this.mapResults(this.props.data),             
        };
    }
    mapResults(data) {
        var result = data.map(function (result, i) {
            if(result.type === "Object"){
                return <ObjectItem key={i} data={result}/>                                
            } else if (result.type === "Array") {
                return <ArrayItem key={i} data={result}/>                            
            } else{
              return <PropertyItem key={i} data={result}/>  
            }            
        });
        return result;
    }
    render() {
        return <span className="json-list-item">{this.mapResults(this.props.data)}</span>
    }
}

export default class MainList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            results : [],
        };
        this.handleChange = this.handleChange.bind(this);         
    }
 
    handleChange(e) {
        var json = JsonStore.getParsedJson();    
        this.setState({results : json});
    }
    componentDidMount() {
        JsonStore.addChangeListener(this.handleChange);
    }
    shouldComponentUpdate(nextProps, nextState) {
        return this.state.results !== nextState.results
    }
    render() {
        return <div className="main-node"><ListItem key={0} data={this.state.results} /></div>
    }
}

    // getResults() { 
    //     return Update(this.state.results, {
    //         $push: [{value: JsonStore.getParsedJson()}]
    //     });
    // } 