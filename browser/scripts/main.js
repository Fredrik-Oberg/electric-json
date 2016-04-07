'use babel';
import React from 'react';
import ReactDOM from 'react-dom';
import TreeView from '../views/treeView/treeView.jsx';
import TextEditor from '../views/textEditor/textEditor.jsx';
import InspectJson from '../views/inspector/inspector.jsx';
ReactDOM.render(<div>
    <TextEditor/>
    </div>, document.getElementById('rawTextContainer'));

ReactDOM.render(<div>
    <TreeView />
    </div>, document.getElementById('parsedJsonContainer'));
ReactDOM.render(<div>
    <InspectJson />
    </div>, document.getElementById('jsonInspectContainer'));
