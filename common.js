/*
Meob  Copyright (C) 2006-2010  Sunil G Vanmullem
http://www.das-kuechen-studio.co.uk/solutions
Online JavaScript/CSS Compression Using YUI Compressor http://refresh-sf.com/yui/
for source see commented/common-src.js
*/
var DEBUG__DEPTH=0;var DEBUG__PADDING="    ";var DEBUG_LEVEL=0;var SOME_DEBUG=1;var MORE_DEBUG=2;var FULL_DEBUG=3;var SDBG=SOME_DEBUG,MDBG=MORE_DEBUG,FDBG=FULL_DEBUG;
var XMLREMOTE=new function(){var b=null;var a="";var d=null;var e=false;var g="";var f=false;var c=null;this.get=function(j,i,l,h){var m;
GOIN("get");m=this.getXMLHttpRequestobj();if(m){this.ObjContext=l;this.CallBackName=h;this.ObjRequest=m;this.Url=j;this.ISXML=i;if(m.url){m.url=j
}m.onreadystatechange=pxml_callback;m.open("GET",j,true);if(i&&m.overrideMimeType){m.overrideMimeType("text/xml")}try{if(this.XML__IS_IE){m.send()
}else{m.send(null)}}catch(k){alert(" :-( something went horribly wrong: getting "+j+"\n\n"+k);m=null}return m}else{return null}GOIN("get")
};this.getXMLHttpRequestobj=function(){var l;var k=["Microsoft.XMLHTTP","Msxml2.XMLHTTP.7.0","Msxml2.XMLHTTP.6.0","Msxml2.XMLHTTP.5.0","Msxml2.XMLHTTP.4.0","MSXML2.XMLHTTP.3.0","MSXML2.XMLHTTP"];
if(window.XMLHttpRequest){try{l=new XMLHttpRequest()}catch(m){l=null}}else{if(window.ActiveXObject){this.XML__IS_IE=true;for(var h=0;
h<k.length;h++){try{l=new ActiveXObject(k[h]);if(l!=null){break}}catch(j){}}}}return l};this.xml_callback=function(){var h;var l=this.ObjRequest;
var j,i;if(l.readyState==4){if((l.status==200)||(l.status==304)||((document.location.protocol=="file:")&&(l.status==0))){if(this.ISXML){oXML=l.responseXML;
if(!oXML){alert("no XML returned in "+this.Url);return}i=oXML.firstChild;if(!i){if(l.responseStream){try{oXML.loadXML(l.responseStream)
}catch(k){oXML.load(l.responseStream)}}else{if(l.responseText){try{oXML.loadXML(l.responseText)}catch(k){oXML.load(l.responseText)}}}i=oXML.firstChild;
if(!i){alert("couldnt get any XML - "+this.Url);return}}}this.ObjContext[this.CallBackName](l);return}else{alert("unable to read remote data XML: "+this.Url+"\n reason was - "+l.status);
return}}else{return}}};function pxml_callback(){XMLREMOTE.xml_callback()}function findObj(b,a){var e,c,d;if(!a){a=document}if((e=b.indexOf("?"))>0&&parent.frames.length){a=parent.frames[b.substring(e+1)].document;
b=b.substring(0,e)}if(!(d=a[b])&&a.all){d=a.all[b]}for(c=0;!d&&c<a.forms.length;c++){d=a.forms[c][b]}for(c=0;!d&&a.layers&&c<a.layers.length;
c++){d=findObj(b,a.layers[c].document)}if(!d&&document.getElementById){d=document.getElementById(b)}return d}function repeat_string(d,c){var b,a;
b="";for(a=0;a<c;a++){b=b+d}return b}function trim(a){return a.replace(/^\s*|\s*$/g,"")}function strExtract(e,g,f){var d,b,c,i;var h,a;
h=e.toUpperCase();d="";b=0;while(true){c=h.indexOf(g,b);if(c==-1){break}else{i=h.indexOf(f,c);i+=f.length;a=e.substring(c,i);d+=a;b=i
}}return d}function strRemove(e,g,f){var d,b,c,i;var h,a;h=e.toUpperCase();d="";b=0;while(true){c=h.indexOf(g,b);if(c==-1){if(c<h.length){a=e.substring(c,h.length);
d+=a}break}else{a=e.substring(b,c-1);d+=a;i=h.indexOf(f,c);i+=f.length;b=i}}return d}function get_base_url(){var g,h,f,c,b,a;var d,e;
h=document.location.protocol;b=document.location.pathname;a=document.location.hostname;f=document.location.port;if(f==80){f=""}else{f=":"+f
}d=b.lastIndexOf("/");e=b.lastIndexOf("\\");if(e>d){d=e}c=b.substring(0,d+1);if(h=="file:"){g=h+"//"+c}else{g=h+"//"+a+f+c}return g
}function dump(a,g){var f="";if(!g){g=0}var e="";for(var b=0;b<g+1;b++){e+="    "}if(typeof(a)=="object"){for(var c in a){var d=a[c];
if(typeof(d)=="object"){f+=e+"'"+c+"' ...\n";f+=dump(d,g+1)}else{f+=e+"'"+c+"' => \""+d+'"\n'}}}else{f="===>"+a+"<===("+typeof(a)+")"
}return f}function getNodeText(e){var d,f,c,a,b;c=e.nodeName;d=e.nodeType;switch(d){case 1:f="";if(e.hasChildNodes){b=e.childNodes;
for(var a=0;a<b.length;a++){f+=getNodeText(b[a])}}break;case 3:case 4:f=e.nodeValue;break;default:f="unknown node type: "+d}return f
}function DEBUG_ALERT(c,d){var a,b;if(d){alert(c)}a=repeat_string(DEBUG__PADDING,DEBUG__DEPTH);b=a+c+"\n";try{if(console.debug){console.debug(b)
}else{if(console.log){console.log(b)}else{if(console.info){console.info(b)}else{if(console.warn){console.warn(b)}else{if(console.error){console.error(b)
}else{if(console.assert){console.assert(false,b)}}}}}}}catch(e){}}function DEBUG_EXPLODE(d,c,j){var f,g,i,b;var a;a=typeof(d);switch(a){case"object":if(c>j){f="<i>Object</i>"
}else{try{f="<UL>";for(g in d){try{i=d[g];b=DEBUG_EXPLODE(i,c+1,j)}catch(h){b="<font color='red'>"+i+"</font>"}f+="<li>"+g+" = "+b}f+="</UL>"
}catch(h){f="Unable to inspect "+h}}break;case"array":f="<b>array</b>";break;default:f="<b>"+d+"("+a+")</b>";break}return f}function DEBUG_ENTER(a){DEBUG_ALERT_LEVEL(">>--ENTER-->> "+a,FULL_DEBUG);
DEBUG__DEPTH=DEBUG__DEPTH+1}function DEBUG_EXIT(a){if(DEBUG__DEPTH>0){DEBUG__DEPTH=DEBUG__DEPTH-1;DEBUG_ALERT_LEVEL("<<--EXIT--<< "+a,FULL_DEBUG)
}}function DEBUG_ALERT_LEVEL(a,b){if(DEBUG_LEVEL>=b){DEBUG_ALERT("### "+a,false)}}function DBG_STR(a){if(a){return a}else{return"Error -"
}}function FATAL(a){DBG_AL("FATAL ALERT::"+a,SDBG);DBG_A(gConst.ProjectID+"::"+a,true);document.write("FATAL ALERT::"+a)}function DBG_AL(a,b){DEBUG_ALERT_LEVEL(a,b)
}function DBG_A(a){DEBUG_ALERT(a)}function GOIN(a){DEBUG_ENTER(a)}function GOUT(a){DEBUG_EXIT(a)};