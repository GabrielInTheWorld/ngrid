(window.webpackJsonp=window.webpackJsonp||[]).push([[32],{"1MlO":function(e,t,r){"use strict";r.r(t),r.d(t,"TargetEventsExampleModule",function(){return k});var o=r("mrSG"),n=r("ofXK"),l=r("XEBs"),s=r("6JOf"),i=r("4dOD"),c=r("YT2F"),a=r("WPM6"),d=r("fluT"),b=r("fXoL"),p=r("XkVd"),u=r("4DA5"),g=r("rIse");let h=(()=>{let e=class{constructor(e){this.datasource=e,this.columns=Object(l.r)().default({minWidth:100}).table({prop:"id",sort:!0,width:"40px"},{prop:"name",sort:!0},{prop:"gender",width:"50px"},{prop:"birthdate",type:"date"}).build(),this.ds=Object(l.s)().onTrigger(()=>this.datasource.getPeople(0,500)).create()}onClickEvents(e){let t="";!function(e){return!!e.cellTarget}(e)?e.root&&(t=` [Bubbled from CELL: ${e.root.colIndex}]`):t=`  CELL: ${e.colIndex}`,alert(`CLICK EVENT at ROW: ${e.rowIndex}${t}\nType: ${e.type}\nSubType: ${e.subType}`)}};return e.\u0275fac=function(t){return new(t||e)(b.Rb(d.a))},e.\u0275cmp=b.Lb({type:e,selectors:[["pbl-target-events-example"]],decls:1,vars:2,consts:[["blockUi","",3,"dataSource","columns","cellClick","rowClick"]],template:function(e,t){1&e&&(b.Xb(0,"pbl-ngrid",0),b.fc("cellClick",function(e){return t.onClickEvents(e)})("rowClick",function(e){return t.onClickEvents(e)}),b.Wb()),2&e&&b.qc("dataSource",t.ds)("columns",t.columns)},directives:[p.a,u.b,g.c],styles:[""],encapsulation:2,changeDetection:0}),e=Object(o.a)([Object(c.e)("pbl-target-events-example",{title:"Cell/Row -> Click Events"}),Object(o.b)("design:paramtypes",[d.a])],e),e})(),v=(()=>{let e=class{constructor(e){this.datasource=e,this.columns=Object(l.r)().default({minWidth:100}).table({prop:"id",sort:!0,width:"40px"},{prop:"name",sort:!0},{prop:"gender",width:"50px"},{prop:"birthdate",type:"date"}).build(),this.ds=Object(l.s)().onTrigger(()=>this.datasource.getPeople(0,500)).create()}};return e.\u0275fac=function(t){return new(t||e)(b.Rb(d.a))},e.\u0275cmp=b.Lb({type:e,selectors:[["pbl-focus-and-range-selection-example"]],decls:1,vars:2,consts:[["blockUi","","targetEvents","","focusMode","cell",3,"dataSource","columns"]],template:function(e,t){1&e&&b.Sb(0,"pbl-ngrid",0),2&e&&b.qc("dataSource",t.ds)("columns",t.columns)},directives:[p.a,u.b,g.c],styles:[""],encapsulation:2,changeDetection:0}),e=Object(o.a)([Object(c.e)("pbl-focus-and-range-selection-example",{title:"Focus & Range Selection"}),Object(o.b)("design:paramtypes",[d.a])],e),e})();var m=r("z6lm");let f=(()=>{let e=class{constructor(e){this.datasource=e,this.columns=Object(l.r)().default({minWidth:100}).table({prop:"id",sort:!0,width:"40px"},{prop:"name",sort:!0},{prop:"gender",width:"50px"},{prop:"birthdate",type:"date"},{prop:"bio"},{prop:"email",minWidth:250,width:"250px"},{prop:"language",headerType:"language"},{prop:"lead"},{prop:"settings.avatar"},{prop:"settings.background"},{prop:"settings.timezone"},{prop:"settings.emailFrequency"},{prop:"lastLoginIp"}).header({id:"HEADER",label:"A SIMPLE 1 CELL HEADER"}).headerGroup({label:"Personal Info",columnIds:["name","gender","birthdate","bio","email"]},{label:"User Settings",columnIds:["settings.avatar","settings.background","settings.timezone","settings.emailFrequency"]}).build(),this.ds=Object(l.s)().onTrigger(()=>this.datasource.getPeople(0,90)).create()}onEnterLeaveEvents(e,t=!1){!function(e){return!!e.cellTarget}(e)?t?e.rowTarget.classList.add("row-hovered"):(e.rowTarget.classList.remove("row-hovered"),e.rowTarget.classList.remove("row-cell-hovered")):t?(e.cellTarget.classList.add("cell-hovered"),e.rowTarget.classList.add("row-cell-hovered")):(e.cellTarget.classList.remove("cell-hovered"),e.rowTarget.classList.remove("row-cell-hovered"))}};return e.\u0275fac=function(t){return new(t||e)(b.Rb(d.a))},e.\u0275cmp=b.Lb({type:e,selectors:[["pbl-enter-and-leave-events-example"]],decls:1,vars:3,consts:[["blockUi","","vScrollNone","","showFooter","",1,"pbl-ngrid-cell-ellipsis","enter-and-leave-grid-example",3,"dataSource","columns","minDataViewHeight","cellEnter","cellLeave","rowEnter","rowLeave"]],template:function(e,t){1&e&&(b.Xb(0,"pbl-ngrid",0),b.fc("cellEnter",function(e){return t.onEnterLeaveEvents(e,!0)})("cellLeave",function(e){return t.onEnterLeaveEvents(e)})("rowEnter",function(e){return t.onEnterLeaveEvents(e,!0)})("rowLeave",function(e){return t.onEnterLeaveEvents(e)}),b.Wb()),2&e&&b.qc("dataSource",t.ds)("columns",t.columns)("minDataViewHeight",-5)},directives:[p.a,u.b,m.a,g.c],styles:[".enter-and-leave-grid-example .pbl-ngrid-cell{border:2px solid transparent}.enter-and-leave-grid-example .cell-hovered{border:2px solid red}.enter-and-leave-grid-example .cell-hovered.pbl-ngrid-header-cell{border:2px solid #ff0}.enter-and-leave-grid-example .cell-hovered.pbl-header-group-cell{border:2px solid #00f}.enter-and-leave-grid-example .cell-hovered.pbl-ngrid-footer-cell{border:2px solid pink}.enter-and-leave-grid-example .row-hovered{transition:all .25s ease;background:red}.enter-and-leave-grid-example .row-hovered.row-cell-hovered{background:rgba(255,0,0,.25)}.enter-and-leave-grid-example .row-hovered.pbl-ngrid-header-row{background:#ff0}.enter-and-leave-grid-example .row-hovered.pbl-ngrid-header-row.row-cell-hovered{background:rgba(255,255,0,.25)}.enter-and-leave-grid-example .row-hovered.pbl-meta-group-row{background:#00f}.enter-and-leave-grid-example .row-hovered.pbl-meta-group-row.row-cell-hovered{background:rgba(0,0,255,.25)}.enter-and-leave-grid-example .row-hovered.pbl-ngrid-footer-row{background:pink}.enter-and-leave-grid-example .row-hovered.pbl-ngrid-footer-row.row-cell-hovered{background:rgba(255,192,203,.25)}"],encapsulation:2,changeDetection:0}),e=Object(o.a)([Object(c.e)("pbl-enter-and-leave-events-example",{title:"Cell/Row -> Enter/Leave Events"}),Object(o.b)("design:paramtypes",[d.a])],e),e})(),k=(()=>{let e=class{};return e.\u0275mod=b.Pb({type:e}),e.\u0275inj=b.Ob({factory:function(t){return new(t||e)},imports:[[n.c,a.a,l.j,s.a,i.a]]}),e=Object(o.a)([Object(c.a)(h,v,f)],e),e})()},"4DA5":function(e,t,r){"use strict";r.d(t,"a",function(){return c}),r.d(t,"b",function(){return a});var o=r("7+OI"),n=r("8LU1"),l=r("DcT9"),s=r("XEBs"),i=r("fXoL");const c="blockUi";let a=(()=>{class e{constructor(e,t){this.grid=e,this._blockInProgress=!1,this._removePlugin=t.setPlugin(c,this),e.registry.changes.subscribe(e=>{for(const t of e)switch(t.type){case"blocker":this.setupBlocker()}}),t.onInit().subscribe(e=>{e&&this._blockUi&&"boolean"==typeof this._blockUi&&this.setupBlocker()}),t.events.subscribe(e=>{if("onDataSource"===e.kind){const{prev:t,curr:r}=e;t&&l.r.kill(this,t),r.onSourceChanging.pipe(Object(l.r)(this,r)).subscribe(()=>{"auto"===this._blockUi&&(this._blockInProgress=!0,this.setupBlocker())}),r.onSourceChanged.pipe(Object(l.r)(this,r)).subscribe(()=>{"auto"===this._blockUi&&(this._blockInProgress=!1,this.setupBlocker())})}})}get blockUi(){return this._blockUi}set blockUi(e){let t=Object(n.c)(e);!t||"auto"!==e&&""!==e||(t="auto"),Object(o.a)(e)&&this._blockUi!==e?(Object(o.a)(this._blockUi)&&l.r.kill(this,this._blockUi),this._blockUi=e,e.pipe(Object(l.r)(this,this._blockUi)).subscribe(e=>{this._blockInProgress=e,this.setupBlocker()})):this._blockUi!==t&&(this._blockUi=t,"auto"!==t&&(this._blockInProgress=t,this.setupBlocker()))}ngOnDestroy(){l.r.kill(this),this._removePlugin(this.grid)}setupBlocker(){if(this.grid.isInit)if(this._blockInProgress){if(!this._blockerEmbeddedVRef){const e=this.grid.registry.getSingle("blocker");e&&(this._blockerEmbeddedVRef=this.grid.createView("afterContent",e.tRef,{$implicit:this.grid}),this._blockerEmbeddedVRef.detectChanges())}}else this._blockerEmbeddedVRef&&(this.grid.removeView(this._blockerEmbeddedVRef,"afterContent"),this._blockerEmbeddedVRef=void 0)}}return e.\u0275fac=function(t){return new(t||e)(i.Rb(s.f),i.Rb(s.m))},e.\u0275dir=i.Mb({type:e,selectors:[["pbl-ngrid","blockUi",""]],inputs:{blockUi:"blockUi"},exportAs:["blockUi"]}),e})()},"6JOf":function(e,t,r){"use strict";r.d(t,"a",function(){return c});var o=r("ofXK"),n=r("f6nW"),l=r("XEBs"),s=r("4DA5"),i=r("fXoL");let c=(()=>{class e{}return e.NGRID_PLUGIN=Object(l.u)({id:s.a},s.b),e.\u0275mod=i.Pb({type:e}),e.\u0275inj=i.Ob({factory:function(t){return new(t||e)},imports:[[o.c,n.r,l.j]]}),e})()}}]);