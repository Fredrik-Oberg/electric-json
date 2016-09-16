'use babel';
import React from 'react';
import JsonStore from '../../scripts/stores/jsonStore';
import {addRawText} from '../../scripts/actions/jsonActions';

export default class TextEditor extends React.Component {
    constructor(props) {
        super(props);
        this.state = {rawText: JsonStore.getRawText()};
        this.handleChange = this.handleChange.bind(this);
        this.handleMouseOver = this.handleMouseOver.bind(this);
        this.handleMouseOut = this.handleMouseOut.bind(this);
    }
    handleMouseOver(e){
        e.stopPropagation();     
        this.setState({hover : true});
    }
     handleMouseOut(e){
        e.stopPropagation();        
        this.setState({hover : false});
    }
    handleChange(e) {
        addRawText(e.target.value);   
        //TODO Get the parsedJson    
    }
    getClassNames(){
        let classNames = "";
        if(this.state.hover){
            classNames += "hover";
        }
        return classNames; 
    }
    shouldComponentUpdate(nextProps, nextState) {
        let textChange = this.state.rawText !== nextState.rawText
        let hoverChange = this.state.hover !== nextState.hover;
        return textChange || hoverChange;
    }
    render() {
        return <textarea className={this.getClassNames()} 
        onChange={this.handleChange} onMouseOver={this.handleMouseOver} onMouseOut={this.handleMouseOut}
            defaultValue={this.state.rawText}></textarea>   
    }
}