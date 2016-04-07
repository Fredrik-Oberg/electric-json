'use babel';
import React from 'react';
import ReactDOM from 'react-dom';
import List from '../views/treeView/list.jsx';
import RawText from '../views/editor/rawText.jsx';
import InspectJson from '../views/inspector/inspect.jsx';
ReactDOM.render(<div>
    <RawText/>
    </div>, document.getElementById('rawTextContainer'));

ReactDOM.render(<div>
    <List />
    </div>, document.getElementById('parsedJsonContainer'));
ReactDOM.render(<div>
    <InspectJson />
    </div>, document.getElementById('jsonInspectContainer'));
