'use babel';
import React from 'react';
import Update from 'react/lib/update'
import JsonStore from '../scripts/stores/jsonStore';

export default class InspectJson extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            node : JsonStore.getJsonNode()
        };
        this.handleChange = this.handleChange.bind(this);         
    }
 
    handleChange(e) {    
        var node = JsonStore.getJsonNode();
        this.setState({node : node});       
    }
    componentDidMount() {
        JsonStore.addChangeListener(this.handleChange);
    }
    shouldComponentUpdate(nextProps, nextState) {
        return this.state.node !== nextState.node
    }
    render() {
        return <JsonNode  key={0} node={this.state.node} />
    }
}
class JsonNode extends React.Component {
    constructor(props) {
        super(props);
    }    
    render() {
        return <div>Childlist : {this.props.node.childList.length}</div>
    }
}
