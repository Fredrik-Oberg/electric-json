'use babel';
import React from 'react';
import Update from 'react/lib/update'
import JsonStore from '../../scripts/stores/jsonStore';
import {mutateJsonNode} from "../../scripts/actions/jsonActions";
import Table from "./Table.jsx";

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