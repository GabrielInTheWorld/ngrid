(window.webpackJsonp=window.webpackJsonp||[]).push([[27],{"4DA5":function(t,e,c){"use strict";c.d(e,"a",function(){return l}),c.d(e,"b",function(){return a});var i=c("7+OI"),o=c("8LU1"),s=c("DcT9"),r=c("XEBs"),n=c("fXoL");const l="blockUi";let a=(()=>{class t{constructor(t,e){this.grid=t,this._blockInProgress=!1,this._removePlugin=e.setPlugin(l,this),t.registry.changes.subscribe(t=>{for(const e of t)switch(e.type){case"blocker":this.setupBlocker()}}),e.onInit().subscribe(t=>{t&&this._blockUi&&"boolean"==typeof this._blockUi&&this.setupBlocker()}),e.events.subscribe(t=>{if("onDataSource"===t.kind){const{prev:e,curr:c}=t;e&&s.r.kill(this,e),c.onSourceChanging.pipe(Object(s.r)(this,c)).subscribe(()=>{"auto"===this._blockUi&&(this._blockInProgress=!0,this.setupBlocker())}),c.onSourceChanged.pipe(Object(s.r)(this,c)).subscribe(()=>{"auto"===this._blockUi&&(this._blockInProgress=!1,this.setupBlocker())})}})}get blockUi(){return this._blockUi}set blockUi(t){let e=Object(o.c)(t);!e||"auto"!==t&&""!==t||(e="auto"),Object(i.a)(t)&&this._blockUi!==t?(Object(i.a)(this._blockUi)&&s.r.kill(this,this._blockUi),this._blockUi=t,t.pipe(Object(s.r)(this,this._blockUi)).subscribe(t=>{this._blockInProgress=t,this.setupBlocker()})):this._blockUi!==e&&(this._blockUi=e,"auto"!==e&&(this._blockInProgress=e,this.setupBlocker()))}ngOnDestroy(){s.r.kill(this),this._removePlugin(this.grid)}setupBlocker(){if(this.grid.isInit)if(this._blockInProgress){if(!this._blockerEmbeddedVRef){const t=this.grid.registry.getSingle("blocker");t&&(this._blockerEmbeddedVRef=this.grid.createView("afterContent",t.tRef,{$implicit:this.grid}),this._blockerEmbeddedVRef.detectChanges())}}else this._blockerEmbeddedVRef&&(this.grid.removeView(this._blockerEmbeddedVRef,"afterContent"),this._blockerEmbeddedVRef=void 0)}}return t.\u0275fac=function(e){return new(e||t)(n.Rb(r.f),n.Rb(r.m))},t.\u0275dir=n.Mb({type:t,selectors:[["pbl-ngrid","blockUi",""]],inputs:{blockUi:"blockUi"},exportAs:["blockUi"]}),t})()},"6JOf":function(t,e,c){"use strict";c.d(e,"a",function(){return l});var i=c("ofXK"),o=c("f6nW"),s=c("XEBs"),r=c("4DA5"),n=c("fXoL");let l=(()=>{class t{}return t.NGRID_PLUGIN=Object(s.u)({id:r.a},r.b),t.\u0275mod=n.Pb({type:t}),t.\u0275inj=n.Ob({factory:function(e){return new(e||t)},imports:[[i.c,o.r,s.j]]}),t})()},WPM6:function(t,e,c){"use strict";c.d(e,"a",function(){return n});var i=c("XiUz"),o=c("znSr"),s=c("YT2F"),r=c("fXoL");let n=(()=>{class t{}return t.\u0275mod=r.Pb({type:t}),t.\u0275inj=r.Ob({factory:function(e){return new(e||t)},imports:[[i.i,o.e,s.l],i.i,o.e,s.l]}),t})()},Ydbu:function(t,e,c){"use strict";c.r(e),c.d(e,"VirtualScrollExampleModule",function(){return j});var i=c("mrSG"),o=c("ofXK"),s=c("QibW"),r=c("XEBs"),n=c("6JOf"),l=c("YT2F"),a=c("WPM6"),b=c("fluT"),u=c("fXoL"),d=c("XkVd"),p=c("4DA5"),h=c("7WRX"),g=c("yNqP"),f=c("z6lm");function m(t,e){if(1&t&&u.Sb(0,"pbl-ngrid",13),2&t){const t=u.jc(2);u.qc("dataSource",t.ds)("columns",t.columns)}}function S(t,e){if(1&t&&u.Sb(0,"pbl-ngrid",14),2&t){const t=u.jc(2);u.qc("dataSource",t.ds)("columns",t.columns)}}function k(t,e){if(1&t&&u.Sb(0,"pbl-ngrid",15),2&t){const t=u.jc(2);u.qc("dataSource",t.ds)("columns",t.columns)}}function v(t,e){if(1&t&&u.Sb(0,"pbl-ngrid",16),2&t){const t=u.jc(2);u.qc("dataSource",t.ds)("columns",t.columns)}}function w(t,e){if(1&t&&(u.Vb(0,8),u.Jc(1,m,1,2,"pbl-ngrid",9),u.Jc(2,S,1,2,"pbl-ngrid",10),u.Jc(3,k,1,2,"pbl-ngrid",11),u.Jc(4,v,1,2,"pbl-ngrid",12),u.Ub()),2&t){u.jc();const t=u.vc(1);u.qc("ngSwitch",t.value),u.Fb(1),u.qc("ngSwitchCase","auto"),u.Fb(1),u.qc("ngSwitchCase","fixed"),u.Fb(1),u.qc("ngSwitchCase","dynamic"),u.Fb(1),u.qc("ngSwitchCase","none")}}let U=(()=>{let t=class{constructor(t){this.datasource=t,this.columns=Object(r.r)().default({minWidth:100}).table({prop:"id",sort:!0,width:"40px"},{prop:"name",sort:!0},{prop:"gender",width:"50px"},{prop:"birthdate",type:"date"}).build(),this.ds=this.createDatasource()}removeDatasource(){this.ds&&(this.ds.dispose(),this.ds=void 0)}createDatasource(){return Object(r.s)().onTrigger(()=>this.datasource.getPeople(0,1500)).create()}};return t.\u0275fac=function(e){return new(e||t)(u.Rb(b.a))},t.\u0275cmp=u.Lb({type:t,selectors:[["pbl-virtual-scroll-example"]],decls:13,vars:2,consts:[["value","auto",3,"change"],["rdGroup","matRadioGroup"],["value","auto"],["value","fixed"],["value","dynamic"],["value","none"],[3,"ngSwitch",4,"ngIf"],["mat-button","",3,"disabled","click"],[3,"ngSwitch"],["blockUi","","vScrollAuto","",3,"dataSource","columns",4,"ngSwitchCase"],["blockUi","","vScrollFixed","48",3,"dataSource","columns",4,"ngSwitchCase"],["blockUi","","vScrollDynamic","",3,"dataSource","columns",4,"ngSwitchCase"],["blockUi","","vScrollNone","",3,"dataSource","columns",4,"ngSwitchCase"],["blockUi","","vScrollAuto","",3,"dataSource","columns"],["blockUi","","vScrollFixed","48",3,"dataSource","columns"],["blockUi","","vScrollDynamic","",3,"dataSource","columns"],["blockUi","","vScrollNone","",3,"dataSource","columns"]],template:function(t,e){1&t&&(u.Xb(0,"mat-radio-group",0,1),u.fc("change",function(){return e.removeDatasource()}),u.Xb(2,"mat-radio-button",2),u.Lc(3,"Auto Size"),u.Wb(),u.Xb(4,"mat-radio-button",3),u.Lc(5,"Fixed Size"),u.Wb(),u.Xb(6,"mat-radio-button",4),u.Lc(7,"Dynamic Size"),u.Wb(),u.Xb(8,"mat-radio-button",5),u.Lc(9,"No Virtual Scroll"),u.Wb(),u.Wb(),u.Jc(10,w,5,5,"ng-container",6),u.Xb(11,"button",7),u.fc("click",function(){return e.ds=e.createDatasource()}),u.Lc(12,"Load Data"),u.Wb()),2&t&&(u.Fb(10),u.qc("ngIf",e.ds),u.Fb(1),u.qc("disabled",e.ds))},directives:[s.b,s.a,o.t,o.x,o.y,d.a,p.b,h.a,g.a,f.a],styles:[""],encapsulation:2,changeDetection:0}),t=Object(i.a)([Object(l.e)("pbl-virtual-scroll-example",{title:"Virtual Scroll"}),Object(i.b)("design:paramtypes",[b.a])],t),t})();var y=c("wl19");let O=(()=>{let t=class{constructor(t){this.datasource=t,this.columns=Object(r.r)().default({minWidth:100}).table({prop:"id",sort:!0,width:"40px"},{prop:"name",sort:!0},{prop:"gender",width:"50px"},{prop:"birthdate",type:"date"}).build(),this.ds=this.createDatasource(),this.scrollingState=0}createDatasource(){return Object(r.s)().onTrigger(()=>this.datasource.getPeople(0,1500)).create()}setIsScrolling(t){this.scrollingState=t,t&&(this.lastScrollDirection=1===t?"END":"START")}};return t.\u0275fac=function(e){return new(e||t)(u.Rb(b.a))},t.\u0275cmp=u.Lb({type:t,selectors:[["pbl-scrolling-state-example"]],decls:12,vars:4,consts:[[3,"dataSource","columns","scrolling"],[1,"virtual-scroll-css-scrolling-demo-on"],[1,"virtual-scroll-css-scrolling-demo-off"]],template:function(t,e){1&t&&(u.Xb(0,"pbl-ngrid",0),u.fc("scrolling",function(t){return e.setIsScrolling(t)}),u.Wb(),u.Xb(1,"h1"),u.Lc(2,"Scrolling is "),u.Xb(3,"span",1),u.Lc(4,"ON"),u.Wb(),u.Xb(5,"span",2),u.Lc(6,"OFF"),u.Wb(),u.Lc(7," - (CSS)"),u.Wb(),u.Xb(8,"h1"),u.Lc(9),u.Wb(),u.Xb(10,"h1"),u.Lc(11),u.Wb()),2&t&&(u.qc("dataSource",e.ds)("columns",e.columns),u.Fb(9),u.Nc("Scrolling is ",e.scrollingState?"ON":"OFF"," - (scrolling) event"),u.Fb(2),u.Nc("Last Scrolling Direction: ",e.lastScrollDirection,""))},directives:[d.a,y.a],styles:["pbl-ngrid+h1 .virtual-scroll-css-scrolling-demo-on{display:none}.pbl-ngrid-scrolling+h1 .virtual-scroll-css-scrolling-demo-on{display:inline}.pbl-ngrid-scrolling+h1 .virtual-scroll-css-scrolling-demo-off{display:none}"],encapsulation:2,changeDetection:0}),t=Object(i.a)([Object(l.e)("pbl-scrolling-state-example",{title:"Scrolling State"}),Object(i.b)("design:paramtypes",[b.a])],t),t})(),j=(()=>{let t=class{};return t.\u0275mod=u.Pb({type:t}),t.\u0275inj=u.Ob({factory:function(e){return new(e||t)},imports:[[o.c,s.c,a.a,r.j,n.a]]}),t=Object(i.a)([Object(l.a)(U,O)],t),t})()}}]);