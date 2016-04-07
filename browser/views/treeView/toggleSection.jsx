import React from 'react';

export default class ToggleSection extends React.Component{
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