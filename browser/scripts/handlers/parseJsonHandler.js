import JsonLint from "jsonLint";
import { JsonConstants as Constants} from '../../scripts/constants/constants';
import TestJson from '../../scripts/tests/testJson';

const getObjectType = function (val) {
    var rawType = Object.prototype.toString.call(val);
    if(rawType === "[object Number]"){
        return Constants.Number
    }else if(rawType === "[object String]"){
        return Constants.String 
    }else if(rawType === "[object Object]"){
        return Constants.Object
    }else if(rawType === "[object Array]"){
        return Constants.Array
    }else if(rawType === "[object Boolean]"){
        return Constants.Bool
    }else if(rawType === "[object Null]"){
        return Constants.Null
    }
}
const createListObject = function (prop,val){
    return {
        property : prop, 
        val : val,
        type : getObjectType(val)
    }
}

const parse = json => {
    let jsonList = [];
    let iterateObject = (obj,list) =>{
        var parentObject = createListObject(obj,obj); 
            parentObject.childList = [];
        for(prop in obj){          
            var listObject = createListObject(prop,obj[prop]);
            if(listObject.type === Constants.Object || listObject.type === Constants.Array){
                iterateObject(obj[prop],parentObject.childList)
            }
            else{
                if(parentObject.childList){
                    parentObject.childList.push(listObject);                
                }
            }
        }
        list.push(parentObject);            
    }
    for (var prop in json) {
        iterateObject(json[prop],jsonList)
    }
    
    return jsonList;
};

export function parseJson (rawText){
    // var lintedJson = JsonLint.parse(rawText);
    var testJsonString = TestJson.testJson;
    var lintedJson = JsonLint.parse(testJsonString);
    var parsedJson = parse(lintedJson)
    console.log(parsedJson);
    return parsedJson;
}

