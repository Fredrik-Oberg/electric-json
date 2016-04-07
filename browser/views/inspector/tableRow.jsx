import React from 'react';
import {TableData, TableDataInput} from "./TableData.jsx";

export default class TableRow extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            node : this.props.node,
        };
        this.onChange = this.props.onChange;
        this.handleValueChange = this.handleValueChange.bind(this);    
    
    }    
    handleValueChange(value) {    
        var newNode = this.state.node;
        newNode.val = value;
        this.setState({
            node : newNode
        })
        this.onChange();

    }
    componentWillReceiveProps(nextProps){
        this.setState({
            node : nextProps.node
        })
    }
    shouldComponentUpdate(nextProps, nextState) {         
        return this.state.node !== nextState.node
    }
    renderType(){
        let tableRow = null;
        if(Array.isArray(this.props.node.childList)){
            let table = this.props.node.childList.map((childNode, i) => <TableRow key={i} node={childNode} onChange={this.handleValueChange}/>)
            let childCount = `{ ${this.props.node.childList.length} }`;
            tableRow = <tr><td className="asd"><span>{childCount}</span><table>{table}</table></td></tr>;     
        }
        else{       
            tableRow = <tr>
                <TableData node={this.state.node.property} />
                <TableDataInput node={this.state.node.val} onChange={this.handleValueChange}/>
            </tr>
        }
        return tableRow;
    }
    render() {
        return <tbody>{this.renderType()}</tbody>     
    }
}
