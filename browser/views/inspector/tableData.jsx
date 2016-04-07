import React from 'react';

export class TableData extends React.Component {
    constructor(props) {
        super(props);
    }    
    render() {
        return <td>{this.props.node}</td>
    }
}

export class TableDataInput extends React.Component {
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
        });
    }
    handleClick(){
        this.onClick(this.state.value);   
    }
    shouldComponentUpdate(nextProps, nextState) {
        return this.state.value !== nextState.value
    }
    render() {
        return <td>
            <span className="editable-field hidden">
                <input type="text" value={this.state.value} onChange={this.handleChange}/>
                <input type="button" value="save" onClick={this.handleClick}/>
            </span>
            <span className="readable-field">{this.state.value}</span>
        </td>
    }
}