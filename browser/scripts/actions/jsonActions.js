import AppDispatcher from '../../scripts/dispatcher/appDispatcher';
import { ActionConstants as Constants} from '../../scripts/constants/constants';
import { parseJson } from '../../scripts/handlers/parseJsonHandler';

export function addRawText (text) {
    AppDispatcher.handleViewAction({
        actionType: Constants.NEW_JSON,
        parseRawText: () => { 
            return parseJson(text)
        },
        rawText: () => { return text }
    })
}
export function selectJsonNode (node) {
    AppDispatcher.handleViewAction({
        actionType: Constants.INSPECT_JSON,
        jsonNode: () => { return node }
    })
}
export function mutateJsonNode (node) {
    AppDispatcher.handleViewAction({
        actionType: Constants.CHANGE_JSON,
        jsonNode: () => { return node }
    })
}