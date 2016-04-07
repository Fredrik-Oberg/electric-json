'use babel';
import React from 'react';
import Update from 'react/lib/update'
import JsonStore from '../../scripts/stores/jsonStore';
import ListItem from "./listItem.jsx";

export default class MainList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            results : [],
        };
        this.handleChange = this.handleChange.bind(this);         
    }
 
    handleChange(e) {
        var json = JsonStore.getParsedJson();    
        this.setState({results : json});
    }
    componentDidMount() {
        JsonStore.addChangeListener(this.handleChange);
    }
    shouldComponentUpdate(nextProps, nextState) {
        return this.state.results !== nextState.results
    }
    render() {
        return <div className="main-node"><ListItem key={0} data={this.state.results} /></div>
    }
}
  