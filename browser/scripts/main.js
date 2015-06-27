var jsonLint = require('jsonLint');
(function () {
	var vm = {
	    rawJson : ko.observable(""),
		formattedJson : ko.observable(""),
	};

    vm.rawJson.subscribe(function (val) {
    	var json = jsonLint.parse(val);
		for(j in json){
			console.log(json[j]);
		}
		vm.formattedJson(val);
  		
  	})
  	ko.applyBindings(vm);
})();