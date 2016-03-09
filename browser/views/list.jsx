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
            toggleState : true         
        };
        this.handleClick = this.handleClick.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleSectionToggle = this.handleSectionToggle.bind(this);
    }
    handleClick(e){
        e.stopPropagation();
        JsonStore.addEditListener(this.handleChange);                
        selectJsonNode(this.props.data);
    }
    handleChange(e) {
        var node = JsonStore.getJsonNode();
        this.setState({data : node});
    }
    handleSectionToggle(e){
        e.stopPropagation();
        this.setState({ toggleState: !this.state.toggleState });
    }

    shouldComponentUpdate(nextProps, nextState) {
        return this.state !== nextState
    }
    toggleState(){
        return this.state.toggleState ? "up" : "down"
    }
}

class ToggleSectionItem extends React.Component{
     constructor(props) {
        super(props);            
        this.state = {  
            toggleState : true,
            text : this.props.objectName + " "+ this.props.childLength,
            toggler : "+"
        };
        this.handleClick = this.handleClick.bind(this);
        
    }
    handleClick(e){
        e.stopPropagation();
        this.setState({ toggleState: !this.state.toggleState });
    }

     shouldComponentUpdate(nextProps, nextState) {
        return this.state.toggleState !== nextState.toggleState
    }

    toggleState(){
        //TODO Fix classnames
        return this.state.toggleState ? "toggle-section up" : "toggle-section down";
    }
    toggler(){
        return this.state.toggleState ? "-" : "+";
    }
    render(){
        return <span className={this.toggleState()}>
            <i className="toggler" onClick={this.handleClick}>{this.toggler()}</i>
               {this.state.text}
        </span> 
        
           
    }
}

class ObjectItem extends IterableItemClass {
    constructor(props) {
        super(props);                   
    }
    render() {
        return <div className="json-list object" onClick={this.handleClick}>
        <ToggleSectionItem objectName="Object" childLength={this.state.length} />
        <ListItem key={0} data={this.state.children} /></div>               
    }
}

class ArrayItem extends IterableItemClass {
  constructor(props) {
        super(props);                  
    }
    render() {
        return <div className="json-list array" onClick={this.handleClick}>
        <ToggleSectionItem objectName="Array" childLength={this.state.length} />
        <ListItem key={0} data={this.state.children} /></div>       
    }
}

class PropertyItem extends React.Component {
    constructor(props) {
        super(props);
        this.classes = "json-list-item property property-type-" + this.props.data.type;      
    }

    render() {
        return <div className={this.classes}>
        <span>{this.props.data.property}</span> - <span>{this.props.data.val}</span> </div>
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