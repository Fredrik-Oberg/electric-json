import keyMirror from 'key-mirror';

export const ActionConstants = keyMirror({
    VIEW_ACTION: null,
    SERVER_ACTION: null,
    NEW_JSON:null,
    INSPECT_JSON:null,
    CHANGE_JSON:null,
    EDIT_EVENT:null,
    CHANGE_EVENT:null
});
export const JsonConstants = keyMirror({
    Number: null,
    String: null,
    Object: null,
    Array: null,
    Bool: null,
    Null: null,
})