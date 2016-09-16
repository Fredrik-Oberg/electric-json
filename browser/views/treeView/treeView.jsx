'use babel';
import React from 'react';
import Update from 'react/lib/update'
import JsonStore from '../../scripts/stores/jsonStore';
import ListItem from "./listItem.jsx";

export default class MainList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            results : [],
        };
        this.handleChange = this.handleChange.bind(this);  
        this.handleMouseOver = this.handleMouseOver.bind(this);
        this.handleMouseOut = this.handleMouseOut.bind(this);
    }
    handleChange(e) {
        var json = JsonStore.getParsedJson();    
        this.setState({results : json});
    }
    componentDidMount() {
        JsonStore.addChangeListener(this.handleChange);
    }
    handleMouseOver(e){
        e.stopPropagation();     
        this.setState({hover : true});
    }
    handleMouseOut(e){
        e.stopPropagation();        
        this.setState({hover : false});
    }
    getClassNames(){
        let classNames = "main-node ";
        if(this.state.hover){
            classNames += "hover";
        }
        return classNames; 
    }
    shouldComponentUpdate(nextProps, nextState) {
        let resultChange = this.state.results !== nextState.results
        let hoverChange = this.state.hover !== nextState.hover;
        return resultChange || hoverChange;
    }
    render() {
        return <div className={this.getClassNames()}
        onMouseOver={this.handleMouseOver} 
        onMouseOut={this.handleMouseOut}>
        <ListItem key={0} data={this.state.results} /></div>
    }
}
  