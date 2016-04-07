import React from 'react';
import IterableItemBase from './IterableItemBase.jsx';
import ListItem from './listItem.jsx';
import ToggleSection from './toggleSection.jsx';


export default class ArrayItem extends IterableItemBase {
  constructor(props) {
        super(props);                  
    } 
    render() {
        return <div className={this.getClassNames("array")} onClick={this.handleClick} onMouseOver={this.handleMouseOver} onMouseOut={this.handleMouseOut}>
        <ToggleSection objectName="Array" childLength={this.state.length} />
        <ListItem key={0} data={this.state.children} /></div>       
    }
}