'use babel';
import React from 'react';
import Update from 'react/lib/update'
import JsonStore from '../scripts/stores/jsonStore';
import {mutateJsonNode} from "../scripts/actions/jsonActions";

export default class InspectJson extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            node : JsonStore.getJsonNode()
        };
        this.handleChange = this.handleChange.bind(this);         
        this.nodeEdit = this.nodeEdit.bind(this);         
    }
 
    handleChange(e) {    
        var node = JsonStore.getJsonNode();
        this.setState({node : node});
    }
    nodeEdit(e){
        var node = mutateJsonNode(this.state.node);
    }
    componentDidMount() {
        JsonStore.addChangeListener(this.handleChange);
    }

    shouldComponentUpdate(nextProps, nextState) {
        return this.state.node !== nextState.node
    }
    render() {
        return <Table key={0} node={this.state.node} nodeEdit={this.nodeEdit} />
    }
}
class Table extends React.Component {
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
            <thead>
                <tr>
                    <td>Type</td>
                    <td>Property</td>
                    <td>Value</td>
                </tr>
            </thead>           
        {this.state.childNodes.map((childNode, i) => <TableRow key={i} node={childNode} onChange={this.handleChange}/>)}          
        </table>
    }
}

class TableRow extends React.Component {
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
            tableRow =<tr><td><table>{table}</table></td></tr>;     
        }
        else{       
            tableRow = <tr>
                <TableData node={this.state.node.type} />
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

class TableData extends React.Component {
    constructor(props) {
        super(props);
    }    
    render() {
        return <td>{this.props.node}</td>
    }
}

class TableDataInput extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value : this.props.node,
        };
        this.onClick = this.props.onChange;   
        this.handleChange = this.handleChange.bind(this);
        this.handleClick = this.handleClick.bind(this);      
    }    
    componentWillReceiveProps(nextProps){
        this.setState({
            value : nextProps.node
        })
    }
    handleChange(e){
          var val = e.target.value;
          this.setState({
              value : val
          })
    }
    handleClick(){
      this.onClick(this.state.value);   
    }
       shouldComponentUpdate(nextProps, nextState) {
        return this.state.value !== nextState.value
    }
    render() {
        return <td><input type="text" value={this.state.value} onChange={this.handleChange}/><input type="button" value="save" onClick={this.handleClick}/></td>
    }
}