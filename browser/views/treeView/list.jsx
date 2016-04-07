'use babel';
import React from 'react';
import Update from 'react/lib/update'
import JsonStore from '../../scripts/stores/jsonStore';
import {selectJsonNode} from "../../scripts/actions/jsonActions";

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

class IterableItemClass extends React.Component {
  constructor(props) {
        super(props);            
         this.state = {
            children : this.props.data.childList, 
            length : this.props.data.childList.length,         
            toggleState : true,
            hover : false
        };
        this.handleClick = this.handleClick.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleSectionToggle = this.handleSectionToggle.bind(this);
        this.handleMouseOver = this.handleMouseOver.bind(this);
        this.handleMouseOut = this.handleMouseOut.bind(this);
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
    handleMouseOver(e){
        e.stopPropagation();     
        this.setState({hover : true});
    }
     handleMouseOut(e){
        e.stopPropagation();        
        this.setState({hover : false});
        
    }
    getClassNames(type){
        let classNames =  type + " json-list ";
        if(this.state.hover){
            classNames += "hover";
        }
        return classNames; 
    }

}


class ObjectItem extends IterableItemClass {
    constructor(props) {
        super(props);                   
    }
    render() {
        return <div className={this.getClassNames("object")} onClick={this.handleClick} onMouseOver={this.handleMouseOver} onMouseOut={this.handleMouseOut}>
        <ToggleSectionItem objectName="Object" childLength={this.state.length} />
        <ListItem key={0} data={this.state.children} /></div>               
    }
}

class ArrayItem extends IterableItemClass {
  constructor(props) {
        super(props);                  
    }
    
    render() {
        return <div className={this.getClassNames("array")} onClick={this.handleClick} onMouseOver={this.handleMouseOver} onMouseOut={this.handleMouseOut}>
        <ToggleSectionItem objectName="Array" childLength={this.state.length} />
        <ListItem key={0} data={this.state.children} /></div>       
    }
}
 
class ToggleSectionItem extends React.Component{
     constructor(props) {
        super(props);            
        this.state = {  
            toggleState : true,
            text : this.getText(this.props.objectName, this.props.childLength),
        };
        this.handleClick = this.handleClick.bind(this);
        
    }
    getText(type, count) {
        if(type === "Object"){
            return `{ ${count} }`
        } else {
            return `[ ${count} ]`
        }     
    }
    handleClick(e){
        e.stopPropagation();
        this.setState({ toggleState: !this.state.toggleState });
    }

     shouldComponentUpdate(nextProps, nextState) {
        return this.state.toggleState !== nextState.toggleState
    }

    toggleState(){
        //TODO Fix classnames https://github.com/JedWatson/classnames
        return this.state.toggleState ? "toggle-section up" : "toggle-section down";
    }
    toggler(){
        return this.state.toggleState ? "fa fa-minus-square-o" : "fa fa-plus-square-o";
    }
    render(){
        return <span className={this.toggleState()}>
            <i className={this.toggler()} onClick={this.handleClick}></i>
               {this.state.text}
        </span>      
    }
}

class PropertyItem extends React.Component {
    constructor(props) {
        super(props);
        this.classes = "json-list-item property property-type-" + this.props.data.type;      
    }

    render() {
        return <div className={this.classes}>
            <span>{this.props.data.property}</span> - <span>{this.props.data.val}</span> 
        </div>
    }
}
     
     