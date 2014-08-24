var Types = require("simple-types");

var Packer = {};

var packers = {};
var unpackers = {};

Packer.register = function(type,packer,unpacker){
	packers[type] = packer;
	unpackers[type] = unpacker;
};

Packer.pack = function(object){
	var override = function(key,value){
		if((typeof value === "object") && (value !== null)){
			var packer = packers[Types.getType(object)];

			if(packer){return packer(value);}
		}
		return value;
	};

	return JSON.stringify(object,override);
};

Packer.packNoTags = function(object){
	var override = function(key,value){
		if(key === Types.TAG){return undefined;}

		if((typeof value === "object") && (value !== null)){
			var packer = packers[Types.getType(object)];

			if(packer){return packer(value);}
		}
		return value;
	};

	return JSON.stringify(object,override);
}

Packer.unpack = function(json){
	var override = function(key,value){
		if((typeof value === "object") && (value !== null)){
			var unpacker = unpackers[Types.getType(object)];

			if(unpacker){return unpacker(value);}
		}
		return value;
	};

	return JSON.parse(json,override);
}

module.exports = Packer;
