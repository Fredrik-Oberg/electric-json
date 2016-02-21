'use babel';
import React from 'react';
import ReactDOM from 'react-dom';
import List from '../views/list.jsx';
import RawText from '../views/rawText.jsx';
import InspectJson from '../views/inspect.jsx';
ReactDOM.render(<div>
    <RawText/>
    </div>, document.getElementById('rawTextContainer'));

ReactDOM.render(<div>
    <List />
    </div>, document.getElementById('parsedJsonContainer'));
ReactDOM.render(<div>
    <InspectJson />
    </div>, document.getElementById('jsonInspectContainer'));
