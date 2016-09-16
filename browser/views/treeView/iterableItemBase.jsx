import React from 'react';
import JsonStore from '../../scripts/stores/jsonStore';
import {selectJsonNode} from "../../scripts/actions/jsonActions";

export default class IterableItemBase extends React.Component {
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
