import React from 'react';

export default class PropertyItem extends React.Component {
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
     
     