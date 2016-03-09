
class TestJsonClass {
    constructor(){
        this.testObject = {
                anObject: { numericProperty: -122
                            ,stringProperty: "An offensive is problematic"
                            ,nullProperty: null
                            ,booleanProperty: true
                            ,dateProperty: "2011-09-23"
                            }
                ,arrayOfObjects: [{"item": [1.1, 1.2]}
                                ,{"item": 2}
                                ,{"item": 3}
                                ]
                ,arrayOfIntegers: [1,2,3,4,5]
                ,bigArrayOfMixed: [{"item": [1.1, 1.2, [{"item": [1.1, 1.2]}
                                ,{"item": 2}
                                ,{"item": 3}
                                ,2,3,4]]},
                                ,{"item": 2}
                                ,{"item": 3}
                                ,2,3,4]
            };
    }
    get testJson() {
        return this.stringifyObject();
    }
    stringifyObject() {
        return JSON.stringify(this.testObject);
    }
}

const TestJson = new TestJsonClass();

export default TestJson;