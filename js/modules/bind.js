define([], function BindModule(){

	function Binding(srcObj, srcProp, destObj, destProp){
		var binding = this;
		var hiddenProp = "_"+srcProp;
		srcObj[hiddenProp] = srcObj[srcProp];
		Object.defineProperty(srcObj, srcProp, {
			get : function(){
				return srcObj[hiddenProp];
			},
			set : function(val){
				binding.update(val);
				srcObj[hiddenProp] = val;
			}
		});
		this.srcObj = srcObj;
		this.srcProp = srcProp;
		this.destObj = destObj;
		this.destProp = destProp;
	}

	Binding.prototype.update = function(val){
		this.destObj[this.destProp] = this.transform(val);
	}

	Binding.prototype.transform = function(val){
		return val;
	}

	Binding.prototype.using = function(func){
		this.transform = func;
	}

	function bind(srcObj, srcProp){
		return {
			to : function(destObj, destProp){
				return new Binding(srcObj, srcProp, destObj, destProp);
			}
		}
	}

	return bind;

});