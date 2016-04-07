import React from 'react';
import IterableItemBase from './IterableItemBase.jsx';
import ToggleSection from './toggleSection.jsx';
import ListItem from './listItem.jsx';

export default class ObjectItem extends IterableItemBase {
    constructor(props) {
        super(props);                   
    }
    render() {
        return <div className={this.getClassNames("object")} onClick={this.handleClick} onMouseOver={this.handleMouseOver} onMouseOut={this.handleMouseOut}>
        <ToggleSection objectName="Object" childLength={this.state.length} />
        <ListItem key={0} data={this.state.children} /></div>               
    }
}