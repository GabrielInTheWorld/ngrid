(window.webpackJsonp=window.webpackJsonp||[]).push([[31],{"4DA5":function(e,t,i){"use strict";i.d(t,"a",function(){return l}),i.d(t,"b",function(){return a});var o=i("7+OI"),s=i("8LU1"),r=i("DcT9"),n=i("XEBs"),c=i("fXoL");const l="blockUi";let a=(()=>{class e{constructor(e,t){this.grid=e,this._blockInProgress=!1,this._removePlugin=t.setPlugin(l,this),e.registry.changes.subscribe(e=>{for(const t of e)switch(t.type){case"blocker":this.setupBlocker()}}),t.onInit().subscribe(e=>{e&&this._blockUi&&"boolean"==typeof this._blockUi&&this.setupBlocker()}),t.events.subscribe(e=>{if("onDataSource"===e.kind){const{prev:t,curr:i}=e;t&&r.r.kill(this,t),i.onSourceChanging.pipe(Object(r.r)(this,i)).subscribe(()=>{"auto"===this._blockUi&&(this._blockInProgress=!0,this.setupBlocker())}),i.onSourceChanged.pipe(Object(r.r)(this,i)).subscribe(()=>{"auto"===this._blockUi&&(this._blockInProgress=!1,this.setupBlocker())})}})}get blockUi(){return this._blockUi}set blockUi(e){let t=Object(s.c)(e);!t||"auto"!==e&&""!==e||(t="auto"),Object(o.a)(e)&&this._blockUi!==e?(Object(o.a)(this._blockUi)&&r.r.kill(this,this._blockUi),this._blockUi=e,e.pipe(Object(r.r)(this,this._blockUi)).subscribe(e=>{this._blockInProgress=e,this.setupBlocker()})):this._blockUi!==t&&(this._blockUi=t,"auto"!==t&&(this._blockInProgress=t,this.setupBlocker()))}ngOnDestroy(){r.r.kill(this),this._removePlugin(this.grid)}setupBlocker(){if(this.grid.isInit)if(this._blockInProgress){if(!this._blockerEmbeddedVRef){const e=this.grid.registry.getSingle("blocker");e&&(this._blockerEmbeddedVRef=this.grid.createView("afterContent",e.tRef,{$implicit:this.grid}),this._blockerEmbeddedVRef.detectChanges())}}else this._blockerEmbeddedVRef&&(this.grid.removeView(this._blockerEmbeddedVRef,"afterContent"),this._blockerEmbeddedVRef=void 0)}}return e.\u0275fac=function(t){return new(t||e)(c.Rb(n.f),c.Rb(n.m))},e.\u0275dir=c.Mb({type:e,selectors:[["pbl-ngrid","blockUi",""]],inputs:{blockUi:"blockUi"},exportAs:["blockUi"]}),e})()},"6JOf":function(e,t,i){"use strict";i.d(t,"a",function(){return l});var o=i("ofXK"),s=i("f6nW"),r=i("XEBs"),n=i("4DA5"),c=i("fXoL");let l=(()=>{class e{}return e.NGRID_PLUGIN=Object(r.u)({id:n.a},n.b),e.\u0275mod=c.Pb({type:e}),e.\u0275inj=c.Ob({factory:function(t){return new(t||e)},imports:[[o.c,s.r,r.j]]}),e})()},iQQw:function(e,t,i){"use strict";i.r(t),i.d(t,"CopySelectionExampleModule",function(){return v});var o=i("mrSG"),s=i("XEBs"),r=i("6JOf"),n=i("pLZG"),c=i("ofXK"),l=i("fXoL");class a{constructor(e,t){this._document=t;const i=this._textarea=this._document.createElement("textarea"),o=i.style;o.position="fixed",o.top=o.opacity="0",o.left="-999em",i.setAttribute("aria-hidden","true"),i.value=e,this._document.body.appendChild(i)}copy(){const e=this._textarea;let t=!1;try{if(e){const i=this._document.activeElement;e.select(),e.setSelectionRange(0,e.value.length),t=this._document.execCommand("copy"),i&&i.focus()}}catch(i){}return t}destroy(){const e=this._textarea;e&&(e.parentNode&&e.parentNode.removeChild(e),this._textarea=void 0)}}let u=(()=>{class e{constructor(e){this._document=e}copy(e){const t=this.beginCopy(e),i=t.copy();return t.destroy(),i}beginCopy(e){return new a(e,this._document)}}return e.\u0275fac=function(t){return new(t||e)(l.bc(c.e))},e.\u0275prov=Object(l.Nb)({factory:function(){return new e(Object(l.bc)(c.e))},token:e,providedIn:"root"}),e})();var d=i("DcT9");const p=/^mac/.test(navigator.platform.toLowerCase()),b="clipboard";let h=(()=>{class e{constructor(e,t,i){this.grid=e,this.injector=t,this.pluginCtrl=i,this.config=t.get(s.g),this.clipboard=t.get(u),this.init()}static create(t,i){const o=s.m.find(t);return new e(t,i,o)}ngOnDestroy(){d.r.kill(this),this._removePlugin(this.grid)}isCopyEvent(e){return!!(e instanceof KeyboardEvent&&"c"===e.key&&(!p&&e.ctrlKey||p&&e.metaKey))}doCopy(){const{cellSeparator:e,rowSeparator:t}=this.config.get("clipboard",{}),{rows:i,minIndex:o}=this.getSelectedRowData(this.grid);this.clipboard.copy(i.map(t=>t.slice(o).join(this.clpCellSep||e||"\t")).join(this.clpRowSep||t||"\n"))}getSelectedRowData(e){const{columnApi:t,contextApi:i}=e,o=new Map;let s=Number.MAX_SAFE_INTEGER;for(const n of i.selectedCells){const r=t.columns[n.colIndex];if(r){const c=t.renderIndexOf(r);if(c>-1){const t=i.findRowInCache(n.rowIdent).dsIndex,l=r.getValue(e.ds.source[t]),a=o.get(n.rowIdent)||[];a[c]=l,o.set(n.rowIdent,a),s=Math.min(s,c)}}}const r=Array.from(o.entries());return r.sort((e,t)=>i.findRowInCache(e[0]).dsIndex<i.findRowInCache(t[0]).dsIndex?-1:1),{minIndex:s,rows:r.map(e=>e[1])}}init(){this._removePlugin=this.pluginCtrl.setPlugin(b,this),this.pluginCtrl.ensurePlugin("targetEvents"),this.pluginCtrl.getPlugin("targetEvents").keyDown.pipe(Object(n.a)(e=>this.isCopyEvent(e.source)),Object(d.r)(this)).subscribe(e=>this.doCopy())}}return e.\u0275fac=function(t){return new(t||e)(l.Rb(s.f),l.Rb(l.v),l.Rb(s.m))},e.\u0275dir=l.Mb({type:e,selectors:[["pbl-ngrid","clipboard",""]],inputs:{clpCellSep:"clpCellSep",clpRowSep:"clpRowSep"},exportAs:["pblNgridClipboard"]}),e})();var g=i("4dOD");let f=(()=>{class e{constructor(t){s.m.onCreatedSafe(e,(e,i)=>{!0===t.get(b,{}).autoEnable&&i.onInit().subscribe(()=>{i.hasPlugin(b)||i.createPlugin(b)})})}}return e.NGRID_PLUGIN=Object(s.u)({id:b,factory:"create"},h),e.\u0275mod=l.Pb({type:e}),e.\u0275inj=l.Ob({factory:function(t){return new(t||e)(l.bc(s.g))},imports:[[c.c,s.j,g.a]]}),e})();var m=i("YT2F"),k=i("WPM6"),y=i("fluT"),_=i("XkVd"),w=i("IO+B");let C=(()=>{let e=class{constructor(e){this.datasource=e,this.columns=Object(s.r)().table({prop:"id",sort:!0,width:"40px"},{prop:"name",sort:!0},{prop:"gender",width:"50px"},{prop:"birthdate",type:"date"},{prop:"bio"},{prop:"email",minWidth:250,width:"250px"},{prop:"language",headerType:"language"}).build(),this.ds=Object(s.s)().onTrigger(()=>this.datasource.getPeople(100,500)).create(),this.hideColumns=["bio"]}};return e.\u0275fac=function(t){return new(t||e)(l.Rb(y.a))},e.\u0275cmp=l.Lb({type:e,selectors:[["pbl-copy-selection-example"]],decls:1,vars:3,consts:[["clipboard","","focusMode","cell",3,"dataSource","columns","hideColumns"]],template:function(e,t){1&e&&l.Sb(0,"pbl-ngrid",0),2&e&&l.qc("dataSource",t.ds)("columns",t.columns)("hideColumns",t.hideColumns)},directives:[_.a,h,w.a],styles:[""],encapsulation:2,changeDetection:0}),e=Object(o.a)([Object(m.e)("pbl-copy-selection-example",{title:"Copy Selection"}),Object(o.b)("design:paramtypes",[y.a])],e),e})(),v=(()=>{let e=class{};return e.\u0275mod=l.Pb({type:e}),e.\u0275inj=l.Ob({factory:function(t){return new(t||e)},imports:[[k.a,s.j,r.a,f]]}),e=Object(o.a)([Object(m.a)(C)],e),e})()}}]);