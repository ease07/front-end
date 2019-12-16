```javascript
var eventUtil = {
			//绑定事件
			addHandler:function(element,type,handler){
				if(element.addEventListener){
					//chrome,firefox,safari,opera,IE9+
					element.addEventListener(type,handler);
				}else if(element.attachEvent){
					//IE8及以下
					element.attachEvent("on"+type,handler);
				}else{
					//其他
					element["on"+type] = null;
				}
			},
			//解绑事件
			removeHandler:function(element,type,handler){
				if(element.removeEventListener){
					//chrome,safari,firefox,opera,IE9+
					element.removeEventListener(type,handler);
				}else if(element.detachEvent){
					//IE8及以下
					element.detachEvent("on"+type,handler);
				}else{
				//其他
					element["on"+type] = null;
				}
			},
			//Event对象，getTarget,cancelBubble,returnValue,
			getTarget:function(event){
				return event.target || event.srcElement;
			},
			//阻止冒泡
			stopPropagation:function(event){
				if(event.stopPropagation){
					event.stopPropagation();
				}else{
					event.cancelBubble = true; 
				}
			},
    		//阻止默认属性
			preventDefault:function(event){
				if(event.preventDefault){
					event.preventDefault();
				}else{
					event.returnValue = false;
				}
			}
		};

var div = document.getElementById("div");
//同时点击与按 ctrl,shift,meta,alt键 event属性
eventUtil.addHandler(div,"click",function(event){
	var keys = new Array();
	if(event.shiftKey){
		keys.push("shift");
		}
	if(event.ctrlKey){
		keys.push("ctrl");
	}
	if(event.altKey){
		keys.push("alt");
	}
	if(event.metaKey){
		keys.push("meta");
	}
	console.log("keys: "+ keys.join(","));
});
```

