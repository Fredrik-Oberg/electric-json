import AppDispatcher from '../../scripts/dispatcher/appDispatcher';
import { ActionConstants as Constants } from '../../scripts/constants/constants';
import { EventEmitter } from 'events';

// Define the store as an empty array
let _store = {
    rawText : "Paste JSON here",
    parsedJson : {},
    jsonNode : {childList : []},
};

class JsonStoreClass extends EventEmitter{

    addChangeListener(cb) {
        this.on(Constants.CHANGE_EVENT, cb);
    }
  
    removeChangeListener(cb) {
        this.removeListener(Constants.CHANGE_EVENT, cb);
    }

    getRawText() {
        return _store.rawText;
    }
    getParsedJson() {
        return _store.parsedJson;
    }
    getJsonNode() {
        return _store.jsonNode;
    }
}

const JsonStore = new JsonStoreClass();
// Register each of the actions with the dispatcher
// by changing the store's data and emitting a
// change
AppDispatcher.register(function(payload) {

    var action = payload.action;

    switch(action.actionType) {

        case Constants.NEW_JSON:
            // Add the data defined in the TodoActions
            // which the View will pass as a payload
            _store.rawText = payload.action.rawText();
            _store.parsedJson = payload.action.parseRawText();
            JsonStore.emit(Constants.CHANGE_EVENT);
            break;
            
       case Constants.INSPECT_JSON:
            // Add the data defined in the TodoActions
            // which the View will pass as a payload
            _store.jsonNode = payload.action.jsonNode();
            JsonStore.emit(Constants.CHANGE_EVENT);
            break;

        default:
            return true;
    }
});

export default JsonStore;