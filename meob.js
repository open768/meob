/*
Meob  Copyright (C) 2006-2010  Sunil G Vanmullem
http://www.das-kuechen-studio.co.uk/solutions
Online JavaScript/CSS Compression Using YUI Compressor http://refresh-sf.com/yui/
for source see commented/meob-v11-src.js
*/
function MEOB(){this.oData=new MEOB_DATA(this);this.HIGHLIGHT_MISSING=false;this.SHOW_PROGRESS=false;this.sTemplate="";this.includes=new MB_DICTIONARY();
this.rssincludes=new MB_DICTIONARY();this.current_include=-1;this.current_rss=-1;this.parsed_data=null;this.delim_start="[[";this.delim_end="]]";
this.baseURL=null;this.filename="";this.get=function(a){return this.oData.get(a)};this.set=function(b,a){this.oData.set(b,a)};this.main=function(){var a,b;
GOIN(FN__STP1);this.sBaseURL=get_base_url();this.current_include=0;this.current_rss=0;if(DEBUG_LEVEL>0){DBG_AL(I__DGBLVL+DEBUG_LEVEL,DEBUG_LEVEL)
}this.oData.read_MEOB_config(document,gConst.ROOTNODE);this.oData.read_query_string();DBG_AL(I__ABSRB,SDBG);if(DEBUG_LEVEL>0){DBG_AL(I__MSSNG,SDBG);
this.HIGHLIGHT_MISSING=true}this.progress(1);a=this.get(gConst.CFG_TEMPLATE);if(a==null){FATAL(E__NOTMPL);return}DBG_AL(I__RDTMPL,SDBG);
try{XMLREMOTE.get(this.sBaseURL+a,false,this,"recv_template")}catch(c){FATAL(E__RMTDATA+this.sBaseURL+a+"\n"+c)}GOUT(FN__STP1)};this.recv_template=function(c){var a;
var b=new MEOB_PARSER(this,this.delim_start,this.delim_end);this.progress(2);DBG_AL(I__GOTTMP,SDBG);this.parsed_data=b.parse_template(c.responseText);
DBG_AL(I__PTMPL,SDBG);this.progress(3);DBG_AL(I__RSTATDT,SDBG);a=this.get(gConst.ProjectID+".Static");DBG_AL(I__STFILE+a,SDBG);this.progress(4);
if(a){try{this.filename=a;XMLREMOTE.get(this.sBaseURL+a,true,this,"recv_static")}catch(d){FATAL(d+a);return}}else{this.recv_static(null)
}};this.recv_static=function(b){var a;this.progress(5);if(b){DBG_AL(I__GSTATDT,SDBG);try{a=this.oData.read_static_xml(b)}catch(c){FATAL(c+this.filename);
return}DBG_AL(I__PSTATDT,SDBG);this.progress(6)}this.fetch_includes()};this.fetch_includes=function(){var a;GOIN(FN__MFI);this.progress(7);
if(this.includes.Keys.length>0){if(this.current_include<this.includes.Keys.length){DBG_AL(I__FTCHI+this.current_include,SDBG);a=this.includes.Keys[this.current_include];
DBG_AL(this.sBaseURL+a,FDBG);XMLREMOTE.get(this.sBaseURL+a,false,this,"recv_include")}else{GOUT(FN__MFI);this.fetch_rss()}}else{GOUT(FN__MFI);
this.fetch_rss()}};this.recv_include=function(e){var d,f,a,b;var c=new MEOB_PARSER(this,this.delim_start,this.delim_end);GOIN(FN__MRI);
d=e.responseText;b=this.includes.Keys[this.current_include];f=c.parse_template(d);DBG_AL("filename: "+b,FDBG);if(f==null){DBG_AL(I__NOTOK+b,SDBG)
}else{DBG_AL("got "+f.length+" tokens",MDBG);a=this.includes.get(b);if(a==null){FATAL(E__NOTOK+b)}a.Tokens=f;this.includes.set(b,a)
}this.current_include++;GOUT(FN__MRI);this.fetch_includes()};this.fetch_rss=function(){var b,c,a,d;var f,e;GOIN(FN__FRS);b=this.rssincludes.Keys;
f=this.get(gConst.CFG_RSSPROXY);if(b.length>0){if((this.current_rss==1)&&(!f)){FATAL(E__RSSPXY+gConst.CFG_RSSPROXY);return}DBG_AL("RSS proxy:"+f,MDBG);
DBG_AL("RSS index:"+this.current_rss,MDBG);c=b[this.current_rss];a=this.rssincludes.get(c);d=a.Filename;XMLREMOTE.Param=a.Value;e=f+"?"+escape(d);
DBG_AL("getting RSS URL:"+e,MDBG);XMLREMOTE.get(e,true,this,"recv_rss")}else{this.recv_rss(null)}GOUT(FN__FRS)};this.recv_rss=function(a){GOIN("recv_rss");
if(a){this.oData.read_rss(a,XMLREMOTE.Param);this.current_rss++;if(this.current_rss<this.rssincludes.Keys.length){fetch_rss()}}GOUT("recv_rss");
this.merge()};this.merge=function(){var b,d,c;var a=new MEOB_MERGER(this);if(DEBUG_LEVEL==FDBG){this.oData.showdata()}DBG_AL("merging",SDBG);
c=a.merge(this.parsed_data);this.progress(8);DBG_AL("merged",SDBG);this.parsed_data=null;DBG_AL(I__TITLE,SDBG);b=this.get("document.title");
if(b==null){b="Unnamed "+gConst.ProjectID+" Document"}document.title=b;DBG_AL(I__RMV,SDBG);sJavaScript=strExtract(c,"<SCRIPT","SCRIPT>");
c=strRemove(c,"<SCRIPT","SCRIPT>");c=strRemove(c,"<LINK",">");DBG_AL(c,MDBG);this.progress(9);DBG_AL("writing",SDBG);d=this.get(gConst.CFG_WRITETO);
if(d!=null){oDiv=document.getElementById(d);try{oDiv.innerHTML=c}catch(f){alert(E__POPDIV)}}else{document.write(c)}DBG_AL(I__WMRG,SDBG)
};this.progress=function(e){var c,a,d,b;if(!this.SHOW_PROGRESS){DBG_AL("progress: "+e,SDBG)}else{d='<table border="1" cellspacing="0" cellpadding="0" bordercolor="red" bgcolor="white" width="100%" height="5"><tr>';
for(b=0;b<e;b++){d=d+'<td bgcolor="red" width="10%" height="5"></td>'}for(b=e;b<=11;b++){d+='<td width="10%" bgcolor="white"></td>'
}d+="</tr></table>";c=this.get(gConst.ProjectID+".WriteTo");a=document.getElementById(c);if(a){a.innerHTML=d}}}};