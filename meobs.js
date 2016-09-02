/*
Meob  Copyright (C) 2006-2010  Sunil G Vanmullem
http://www.das-kuechen-studio.co.uk/solutions
Online JavaScript/CSS Compression Using YUI Compressor http://refresh-sf.com/yui/
for source see commented/meobs-v11-src.js
*/
var E__NODATA="couldnt find MEOB data in DIV with ID ";var E__NOFILXML="no XML in file: ";var E__NOXMLDIV="no XML section in file: ";
var E__NOLENDIV="found the MEOB TAG, but not the divs, check the case in file: ";var E__NOFINDXML="couldnt find XML data: ";var I__VALIDXML="found valid XML";
var E__NOMEOB="unable to find MeOB element in file: ";var I__GOTMEOB="found the MEOB element";var I__GOTDATA="found this much data in XML:";
var I__TXTTOK="text token: ";var E__CRPTFIND="corrupt template - couldnt find ";var E__CRPTDLM="corrupt template -- missing end delimeter!";
var I__SRCH="Search: ";var E__NOFIND="##couldnt find ";var I__FND="Found: ";var I__NODELIM="No more delimiters";var I__RPTINC="already got this include";
var I__INCTOK="include token";var I__RSSTOK="RSS include token";var I__RPTTOK="repeat token";var I__IFTOK="if token";var I__VARTOK="variable token";
var I__IFNETOK="if not exist token";var I__BRKAT="break at = ";var E__INOTOK="include has no tokens! ";var E__NONSTRP="nested repeats not handled";
var E__NONSTIF="nested ifs not handled";var E__NOKEY="missing key ";var I__DGBLVL="debug level is ";var I__ABSRB="absorbed data from document";
var E__WRTDIV="DIV to write to not defined.";var E__NOTMPL="TEMPLATE NOT DEFINED";var I__GOTTMP="fetched template";var I__RSTATDT="reading remote static data";
var I__STFILE="static filename: ";var I__RDTMPL="reading template";var I__GSTATDT="fetched remote static data";var I__PSTATDT="parsed remote data";
var I__PTMPL="parsed template";var I__I2PRC="includes to process: ";var I__NOINC="no includes found";var I__FTCHI="fetching include ";
var I__NOTOK="no tokens found in ";var E__NOTOK="no tokens in include ";var I__TITLE="setting title";var I__RMV="removing stuff";var E__POPDIV="unable to populate DIV with HTML - possibly malformed templates... or IE";
var I__WMRG="wrote merged";var I__LPBRKNX="**loop breaks next";var I__LPBRKNW="**loop breaks now";var I__RSTCOL="**resetting column";
var I__COL=" #### Column: ####";var I__RPTOK="TOKEN:repeat ";var I__VARTOK="TOKEN:var ";var E__RMTDATA=":-( can't read remote data: ";
var I__MSSNG="turning on show_missing in debug";var E__RSSPXY="cant read RSS. Must define: ";var E__MSSATTR="missing attribute in XML: ";
var FN__PARSE="parse to";var FN__GETTOK="get token";var FN__MKTOK="make token";var FN__PRSTMPL="Parse template";var FN__MERGE="merge";
var FN__RP="repeat";var FN__IN="include";var FN__MPT="main_parse_template";var FN__MFI="main_fetch_includes";var FN__MRI="main_recv_include";
var FN__PSX="read_static_xml";var FN__STP1="main_step1";var FN__EXPKEY="expand_key";var FN__HAI="handle_inc";var FN__HAR="handle_repeat";
var FN__HIF="handle_if";var FN__HVA="handle_var";var FN__FRS="fetch_rss";var FN__CFG="read_MEOB_config";var MEOBCONSTANTS=function(){this.ProjectID="MEOB";
this.QS_PREFIX="QS.";this.TOKENEND=".";this.RSSINCLUDE="rssinclude";this.INCLUDE="include";this.REPEAT="repeat";this.END_REPEAT="end repeat.";
this.IF="if";this.IF_NOT_EXIST="ifne";this.END_IF="end if.";this.END_IF_NOT_EXIST="end ifne.";this.GREATER_THAN="gt";this.LESS_THAN="lt";
this.EQUAL="eq";this.NOT_EQUAL="ne";this.LOOP_BREAK_AT="loopbreak";this.LOOP_VAR_NAME="loop";this.LOOPKEY_VAR_NAME="loopkey";this.LOOP_BREAK_NOW="loopbreaknow";
this.LOOP_BREAK_NEXT="loopbreaknext";this.LOOP_NEXT="loopnext";this.LOOP_PREVIOUS="loopprev";this.ROOTNODE="MEOB";this.CFG_DIV="DIV";
this.CFG_DATA="DATA";this.CFG_KEY="ID";this.CFG_DLIM=this.ProjectID+".mergedelim.begin";this.CFG_DLIMEND=this.ProjectID+".mergedelim.end";
this.CFG_RSSPROXY=this.ProjectID+".rssproxy";this.CFG_WRITETO=this.ProjectID+".WriteTo";this.CFG_TEMPLATE=this.ProjectID+".Template";
this.DEFAULT_DELIM="#"};var gConst=new MEOBCONSTANTS();var MEOB_TOKEN=function(){this.TYPE_NONE=0;this.TYPE_VAR=1;this.TYPE_REP=2;this.TYPE_TEXT=3;
this.TYPE_IF=4;this.TYPE_INCLUDE=5;this.TYPE_IF_NOTEXISTS=6;this.TYPE_RSSINCLUDE=7;this.SUBTYPE_IFEXISTS=1;this.SUBTYPE_IFGREATER=2;
this.SUBTYPE_IFLESS=3;this.SUBTYPE_IFEQUAL=4;this.SUBTYPE_IFNOT_EQUAL=5;this.SUBTYPE_IFNOTEXISTS=6;this.DataType=this.TYPE_NONE;this.Name="";
this.Operator=null;this.Operand=null;this.Value=null;this.Filename=null;this.Tokens=null;this.LoopBreak=0;this.init_string=function(a){this.DataType=this.TYPE_TEXT;
this.Name=null;this.Value=a}};var MB_DICTIONARY=function(){this.Keys=new Array();this.Values=new Array();this.get_index=function(d){var b,a,c;
b=-1;for(a=0;a<this.Keys.length;a++){c=this.Keys[a];if(c==d){b=a;break}}return b};this.set=function(c,b){var a;a=this.get_index(c);
if(a==-1){this.Keys.push(c);this.Values.push(b)}else{this.Values[a]=b}};this.get=function(c){var b,a;b=this.get_index(c);if(b!=-1){a=this.Values[b]
}else{a=null}return a};this.showdata=function(){var c,d,b,a;GOIN("SHOW DATA");DBG_AL(" >>> DATA COLLECTED >>> ",SDBG);var b,a,c;b=-1;
for(a=0;a<this.Keys.length;a++){c=this.Keys[a];d=this.get(c);DBG_AL('"'+c+'" = '+d,FDBG)}GOUT("SHOW DATA")}};function MEOB_DATA(a){this.oMEOB=a;
this.oData=new MB_DICTIONARY();this.get=function(b){return this.oData.get(b)};this.set=function(c,b){this.oData.set(c,b)};this.showdata=function(){this.oData.showdata()
};this.read_MEOB_config=function(e,c){var d,i,h,f,k,g,b,j;GOIN(FN__CFG);d=e.getElementById(c);if(d==null){this.alert(E__NODATA+c);exit
}for(f=0;f<d.childNodes.length;f++){k=d.childNodes[f];g=k.nodeName.toUpperCase();if((g==gConst.CFG_DIV)||(g==gConst.CFG_DATA)){i=k.getAttribute(gConst.CFG_KEY);
h=k.innerHTML;this.set(i,h)}}b=this.get(gConst.CFG_DLIM);j=this.get(gConst.CFG_DLIMEND);if((b==null)||(j==null)){b=j=gConst.DEFAULT_DELIM
}this.delim_start=b;this.delim_end=j;h=this.get(gConst.CFG_WRITETO);if(h==null){FATAL(E__WRTDIV);exit}h=this.get(gConst.CFG_TEMPLATE);
if(h==null){FATAL(E__NOTMPL);return}GOUT(FN__CFG)};this.read_query_string=function(){var f,c,d,e,b;f=window.location.search;if(f.length>0){f=decodeURI(f.substring(1));
c=f.split("&");for(e=0;e<c.length;e++){b=c[e];d=b.split("=");this.set(gConst.QS_PREFIX+d[0],d[1])}}};this.read_static_xml=function(f){var i,e,c,d,k,j,h,b,g;
GOIN(FN__PSX);DBG_AL(I__VALIDXML,SDBG);b=f.responseXML;i=b.getElementsByTagName(gConst.ROOTNODE);if(i.length!=1){throw E__NOMEOB;return null
}e=i[0];DBG_AL(I__GOTMEOB,SDBG);c=e.getElementsByTagName(gConst.CFG_DIV);if(c==null){throw E__NOXMLDIV;return null}if(c.length==0){throw E__NOLENDIV;
return null}DBG_AL(I__GOTDATA+c.length,SDBG);g=true;for(d=0;d<c.length;d++){h=null;k=c[d];j=k.getAttribute(gConst.CFG_KEY);if(j==null){FATAL(E__MSSATTR+gConst.CFG_KEY);
throw E__MSSATTR+gConst.CFG_KEY;exit}h=getNodeText(k);this.set(j,h);DBG_AL(j+":"+h,MDBG)}GOUT(FN__PSX);return true};this.read_rss=function(l,h){var d,f,j,o,c,g,b;
var i,k,n,e,m;GOIN("read_RSS");d=l.responseXML;f=d.getElementsByTagName("item");if(f==null){throw"no items in XML";return}g=f.length;
for(iIndex=1;iIndex<=g;iIndex++){DBG_AL("item "+iIndex,MDBG);c=h+"."+iIndex;this.set(c,1);o=f[iIndex-1];b=o.childNodes;for(k=0;k<b.length;
k++){n=b[k];e=n.nodeName;DBG_AL("/"+e,MDBG);m=getNodeText(n);DBG_AL("= "+m,MDBG);this.set(c+"."+e,m)}}GOUT("read_RSS")}}function MEOB_PARSER(a,c,b){this.delim_start=c;
this.delim_end=b;this.MEOB=a;this.parse_to=function(f,j,h){var g,i,e,d;GOIN(FN__PARSE);i=false;g=this.delim_start+j+this.delim_end;
DBG_AL(I__SRCH+g,FDBG);e=f.indexOf(g,h);if(e==-1){this.alert(E__CRPTFIND+j);aItems=this.make_text_token(E__NOFIND+j);i=true;e=h}else{DBG_AL(I__FND+g,FDBG);
d=f.substring(h,e);aItems=this.parse_template(d);e+=g.length}GOUT(FN__PARSE);return[aItems,i,e]};this.parse_template=function(i){var e,k,d,h,j,f=new Array();
var g;GOIN(FN__PRSTMPL);h=0;while(true){e=this.get_token(i,h);k=e[0];d=e[1];h=e[2];if(k!=null){f.push(k)}if(d==null){break}g=d.DataType;
if((g==d.TYPE_REP)||(g==d.TYPE_IF)||(g==d.TYPE_IF)){switch(g){case d.TYPE_REP:j=gConst.END_REPEAT+d.Name;break;case d.TYPE_IF:j=gConst.END_IF+d.Name;
break;case d.TYPE_IF_NOTEXISTS:j=gConst.END_IF_NOT_EXIST+d.Name;break}aResult=this.parse_to(i,j,h);e=aResult[0];bIsText=aResult[1];
iEndPos=aResult[2];if(bIsText){f.push(e)}else{d.Tokens=e;h=iEndPos}}f.push(d)}GOUT(FN__PRSTMPL);return f};this.get_token=function(k,h){var f,e,i,j,g,l,d;
GOIN(FN__GETTOK);g=null;i=h;l=true;f=k.indexOf(this.delim_start,i);if(f==-1){DBG_AL(I__NODELIM,FDBG);d=k.substring(h,k.length);j=this.make_text_token(d);
l=false}if(l){if(f>i){d=k.substring(i,f);j=this.make_text_token(d)}i=f}if(l){i+=this.delim_start.length;e=k.indexOf(this.delim_end,i);
if(e==-1){this.alert(E__CRPTDLM);l=false}}if(l){d=k.substring(i,e);DBG_AL("delimited: [["+d+"]]",FDBG);i=e+this.delim_end.length;g=this.make_token(d)
}GOUT(FN__GETTOK);return[j,g,i]};this.make_text_token=function(d){var e=new MEOB_TOKEN();DBG_AL(I__TXTTOK,SDBG);e.init_string(d);return e
};this.make_token=function(d){var e,k,f,m,h,l,j,i,g;GOIN(FN__MKTOK);e=null;l=null;i=null;m=null;h=null;f=d.split(" ");m=null;h=null;
if(f.length==3){j=f[0];m=f[1];h=f[2]}else{j=d}k=j.indexOf(gConst.TOKENEND);if(k==-1){i=j}else{i=j.substring(0,k);l=j.substring(k+1)
}e=new MEOB_TOKEN();e.Name=null;e.Value=null;switch(i){case gConst.RSSINCLUDE:DBG_AL(I__RSSTOK,MDBG);e.DataType=e.TYPE_RSSINCLUDE;e.Value=m;
e.Filename=h;if(this.MEOB.rssincludes[m]==null){this.MEOB.rssincludes.set(m,e)}break;case gConst.INCLUDE:DBG_AL(I__INCTOK,MDBG);e.DataType=e.TYPE_INCLUDE;
e.Filename=l;if(this.MEOB.includes[l]==null){this.MEOB.includes.set(l,e)}break;case gConst.REPEAT:DBG_AL(I__RPTTOK,MDBG);e.DataType=e.TYPE_REP;
e.Name=l;if(m==gConst.LOOP_BREAK_AT){DBG_AL(I__BRKAT+h,FDBG);e.LoopBreak=h}break;case gConst.IF:DBG_AL(I__IFTOK,MDBG);e.DataType=e.TYPE_IF;
e.Name=l;if(m==null){g=e.SUBTYPE_IFEXISTS}else{switch(m){case gConst.GREATER_THAN:g=e.SUBTYPE_IFGREATER;break;case gConst.LESS_THAN:g=e.SUBTYPE_IFLESS;
break;case gConst.EQUAL:g=e.SUBTYPE_IFEQUAL;break;case gConst.NOT_EQUAL:g=e.SUBTYPE_IFNOT_EQUAL;break}e.Operand=h}e.Operator=g;break;
case gConst.IF_NOT_EXIST:DBG_AL(I__IFNETOK,MDBG);e.DataType=e.TYPE_IF_NOTEXISTS;e.Name=l;break;default:DBG_AL(I__VARTOK,MDBG);DBG_AL("[["+j+"]]",FDBG);
e.DataType=e.TYPE_VAR;e.Name=j;break}GOUT(FN__MKTOK);return e}}function MEOB_MERGER(a){this.in_if=false;this.in_repeat=false;this.MEOB=a;
this.get=function(b){return this.MEOB.get(b)};this.set=function(c,b){this.MEOB.set(c,b)};this.handle_repeat=function(h){var c,g,k,d,j,e,i;
var l,f,b;GOIN(FN__HAR);c="";g="";k=h.Name;DBG_AL(I__RPTOK+k,FDBG);d=1;j=1;this.set(gConst.LOOP_PREVIOUS,null);this.set(gConst.LOOP_NEXT,null);
while(true){sLoopKey=k+"."+d;this.set(gConst.LOOPKEY_VAR_NAME,sLoopKey);DBG_AL("Loop: "+sLoopKey,MDBG);i=this.get(sLoopKey);if(i==null){DBG_AL("missing "+sLoopKey,MDBG);
break}if(d>1){l=k+"."+(d-1);this.set(gConst.LOOP_PREVIOUS,l)}f=k+"."+(d+1);b=this.get(f);this.set(gConst.LOOP_NEXT,(b?f:null));if(h.LoopBreak>0){DBG_AL(I__COL+j,FDBG);
if(j==1){this.set(gConst.LOOP_BREAK_NOW,"y")}else{this.set(gConst.LOOP_BREAK_NOW,"n")}if((!b)||((j+1)==h.LoopBreak)){this.set(gConst.LOOP_BREAK_NEXT,"y")
}else{this.set(gConst.LOOP_BREAK_NEXT,"n")}j++;if(j==h.LoopBreak){j=1}}c=this.merge(h.Tokens);g+=c;d++}if((d==1)&&(i==null)&&this.MEOB.HIGHLIGHT_MISSING){g+="<font color=red><I>repeat ?"+sLoopKey+"?</I></font>"
}GOUT(FN__HAR);return g};this.handle_if=function(h){var g,b,f,c,i,d,e;GOIN(FN__HIF);g=h.Name;b=this.expand_key(g);f=this.get(b);c=false;
e="";DBG_AL("TOKEN:if '"+g+"' expanded to '"+b+"'",FDBG);if(h.Operator==h.SUBTYPE_IFNOTEXISTS){c=(f==null)}else{if(f!=null){i=h.Operand;
if(i!=null){i=this.expand_key(i);d=this.get(i);if(d==null){d=i}}switch(h.Operator){case h.SUBTYPE_IFEXISTS:c=true;break;case h.SUBTYPE_IFGREATER:c=(f>d);
break;case h.SUBTYPE_IFLESS:c=(f<d);break;case h.SUBTYPE_IFEQUAL:c=(f==d);break;case h.SUBTYPE_IFNOT_EQUAL:c=(f!=d);break}}}if(c){e=this.merge(h.Tokens)
}GOUT(FN__HIF);return e};this.handle_include=function(d){var b,e,c;GOIN(FN__HAI);b="";e=d.Filename;DBG_AL("filename: "+e,FDBG);c=this.MEOB.includes.get(e);
if(c.Tokens==null){this.MEOB.alert(E__INOTOK+e)}else{b=this.merge(c.Tokens)}GOUT(FN__HAI);return b};this.handle_text=function(b){return b.Value
};this.handle_var=function(e){var d,b,c;d=e.Name;b=this.expand_key(d);c=this.get(b);if(c==null){DBG_AL(E__NOKEY+d,SDBG);if(this.MEOB.HIGHLIGHT_MISSING){c="<font color=red><I>?"+d+"?</I></font>"
}}return c};this.merge=function(e){var d,c,b;c="";for(d=0;d<e.length;d++){b=e[d];switch(b.DataType){case b.TYPE_NONE:break;case b.TYPE_VAR:c+=this.handle_var(b);
break;case b.TYPE_REP:GOIN(FN__RP);if(this.in_repeat){this.alert(E__NONSTRP);break}this.in_repeat=true;c+=this.handle_repeat(b);this.in_repeat=false;
GOUT(FN__RP);break;case b.TYPE_IF:GOIN("if");if(this.in_if){this.alert(E__NONSTIF);break}this.in_if=true;c+=this.handle_if(b);this.in_if=false;
GOUT("if");break;case b.TYPE_INCLUDE:c+=this.handle_include(b);break;case b.TYPE_TEXT:c+=this.handle_text(b);break;default:}}DBG_AL(c,FDBG);
return c};this.expand_key=function(b){var g,f,j,i,c,e,h,d;i=b;if(this.in_repeat){g=this.get(gConst.LOOPKEY_VAR_NAME);if(b==gConst.LOOP_VAR_NAME){i=g
}i=i.replace(gConst.LOOP_VAR_NAME+".",g+".");f=this.get(gConst.LOOP_NEXT);if(f){i=i.replace(gConst.LOOP_NEXT,f)}j=this.get(gConst.LOOP_PREVIOUS);
if(j){i=i.replace(gConst.LOOP_PREVIOUS,j)}}if(i.indexOf(gConst.QS_PREFIX)==0){c=i.split(".");if(c.length>2){h=gConst.QS_PREFIX+c[1];
d=this.get(h);for(e=2;e<c.length;e++){d+="."+c[e]}i=d}}if(DEBUG_LEVEL>0){DBG_AL(b+" => "+i,SDBG)}return i}};