import React from 'react';
import ArrayItem from './arrayItem.jsx';
import ObjectItem from './objectItem.jsx';
import PropertyItem from './propertyItem.jsx';

export default class TreeView extends React.Component {
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
