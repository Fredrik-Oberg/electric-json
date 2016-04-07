'use babel';
import React from 'react';
import JsonStore from '../../scripts/stores/jsonStore';
import {addRawText} from '../../scripts/actions/jsonActions';

export default class RawText extends React.Component {
    constructor(props) {
        super(props);
        this.state = {rawText: JsonStore.getRawText()};
        this.handleChange = this.handleChange.bind(this);
    }
    handleChange(e) {
        addRawText(e.target.value);   
        //TODO Get the parsedJson    
    }
    
    shouldComponentUpdate(nextProps, nextState) {
        return this.state.rawText !== nextState.rawText
    }
    render() {
        return <textarea onChange={this.handleChange}
            defaultValue={this.state.rawText}></textarea>   
    }
}