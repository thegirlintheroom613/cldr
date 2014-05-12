//>>built
define("dojox/widget/AutoRotator",["dojo/_base/declare","dojo/_base/array","dojo/_base/lang","dojo/on","dojo/mouse","dojox/widget/Rotator"],function(_1,_2,_3,on,_4,_5){
return _1("dojox.widget.AutoRotator",_5,{suspendOnHover:false,duration:4000,autoStart:true,pauseOnManualChange:false,cycles:-1,random:false,reverse:false,constructor:function(){
var _6=this;
if(_6.cycles-0==_6.cycles&&_6.cycles>0){
_6.cycles++;
}else{
_6.cycles=_6.cycles?-1:0;
}
_6._signals=[on(_6._domNode,_4.enter,function(){
if(_6.suspendOnHover&&!_6.anim&&!_6.wfe){
var t=_6._endTime,n=_6._now();
_6._suspended=true;
_6._resetTimer();
_6._resumeDuration=t>n?t-n:0.01;
}
}),on(_6._domNode,_4.leave,function(){
if(_6.suspendOnHover&&!_6.anim){
_6._suspended=false;
if(_6.playing&&!_6.wfe){
_6.play(true);
}
}
})];
if(_6.autoStart&&_6.panes.length>1){
_6.play();
}else{
_6.pause();
}
},destroy:function(){
_2.forEach(this._signals,function(_7){
_7.remove();
});
delete this._signals;
dojo.forEach(this._connects,dojo.disconnect);
this.inherited(arguments);
},play:function(_8,_9){
this.playing=true;
this._resetTimer();
if(_8!==true&&this.cycles>0){
this.cycles--;
}
if(this.cycles==0){
this.pause();
}else{
if(!this._suspended){
this.onUpdate("play");
if(_9){
this._cycle();
}else{
var r=(this._resumeDuration||0)-0,u=(r>0?r:(this.panes[this.idx].duration||this.duration))-0;
this._resumeDuration=0;
this._endTime=this._now()+u;
this._timer=setTimeout(_3.hitch(this,"_cycle",false),u);
}
}
}
},pause:function(){
this.playing=this._suspended=false;
this.cycles=-1;
this._resetTimer();
this.onUpdate("pause");
},_now:function(){
return (new Date()).getTime();
},_resetTimer:function(){
clearTimeout(this._timer);
},_cycle:function(_a){
var _b=this,i=_b.idx,j;
if(_b.random){
do{
j=Math.floor(Math.random()*_b.panes.length+1);
}while(j==i);
}else{
j=i+(_b.reverse?-1:1);
}
var _c=_b.go(j);
if(_c){
_c.addCallback(function(_d){
_b.onUpdate("cycle");
if(_b.playing){
_b.play(false,_d);
}
});
}
},onManualChange:function(_e){
this.cycles=-1;
if(_e!="play"){
this._resetTimer();
if(this.pauseOnManualChange){
this.pause();
}
}
if(this.playing){
this.play();
}
}});
});