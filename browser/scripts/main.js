'use babel';
import React from 'react';
import ReactDOM from 'react-dom';
import TreeView from '../views/treeView/treeView.jsx';
import TextEditor from '../views/textEditor/textEditor.jsx';
import Inspector from '../views/inspector/inspector.jsx';

ReactDOM.render(<div>
    <TextEditor/>
    </div>, document.getElementById('textEditor'));
ReactDOM.render(<div>
    <TreeView/>
    </div>, document.getElementById('treeView'));
ReactDOM.render(<div>
    <Inspector/>
    </div>, document.getElementById('inspectorContainer'));
