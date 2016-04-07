import React from 'react';
import TableRow from './TableRow.jsx';

export default class Table extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            childNodes : this.props.node.childList
        };
        
        this.nodeEdit = this.props.nodeEdit;       
        this.handleChange = this.handleChange.bind(this);       
    }
    componentWillReceiveProps(nextProps) {
        this.setState({
            childNodes : nextProps.node.childList
        })
        
    }
    handleChange(e){
        this.nodeEdit();
    }
   
    render() {
        return <table>      
        {this.state.childNodes.map((childNode, i) => <TableRow key={i} node={childNode} onChange={this.handleChange}/>)}          
        </table>
    }
}