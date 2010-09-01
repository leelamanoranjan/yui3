YUI.add("loader-base",function(D){if(!YUI.Env[D.version]){(function(){var h=D.version,d="/build/",e=h+d,c=D.Env.base,Z="gallery-2010.08.25-19-45",b="2in3",a="3",Y="2.8.1",f=c+"combo?",g={version:h,root:e,base:D.Env.base,comboBase:f,skin:{defaultSkin:"sam",base:"assets/skins/",path:"skin.css",after:["cssreset","cssfonts","cssgrids","cssbase","cssreset-context","cssfonts-context"]},groups:{},patterns:{}},X=g.groups,W=function(j,k){var i=b+"."+(j||a)+"/"+(k||Y)+d;X.yui2.base=c+i;X.yui2.root=i;},L=function(i){var j=(i||Z)+d;X.gallery.base=c+j;X.gallery.root=j;};X[h]={};X.gallery={ext:false,combine:true,comboBase:f,update:L,patterns:{"gallery-":{},"gallerycss-":{type:"css"}}};X.yui2={combine:true,ext:false,comboBase:f,update:W,patterns:{"yui2-":{configFn:function(i){if(/-skin|reset|fonts|grids|base/.test(i.name)){i.type="css";i.path=i.path.replace(/\.js/,".css");i.path=i.path.replace(/\/yui2-skin/,"/assets/skins/sam/yui2-skin");}}}}};L();W();YUI.Env[h]=g;}());}var F={},C=[],N=(D.UA.ie)?2048:8192,A=YUI.Env,Q=A._loaded,R="css",K="js",V="intl",S=D.version,U="",E=D.Object,J=D.Array,H=A._loaderQueue,T=A[S],B="skin-",I=D.Lang,O=A.mods,M,P,G=function(W,X,Y,L){var Z=W+"/"+X;if(!L){Z+="-min";}Z+="."+(Y||R);return Z;};D.Env.meta=T;D.Loader=function(X){var W=T.modules,L=this;M=T.md5;L.context=D;L.base=D.Env.meta.base;L.comboBase=D.Env.meta.comboBase;L.combine=X.base&&(X.base.indexOf(L.comboBase.substr(0,20))>-1);L.maxURLLength=N;L.root=D.Env.meta.root;L.timeout=0;L.forceMap={};L.allowRollup=true;L.filters={};L.required={};L.patterns={};L.moduleInfo={};L.groups=D.merge(D.Env.meta.groups);L.skin=D.merge(D.Env.meta.skin);L.conditions={};L.config=X;L._internal=true;P=A._renderedMods;if(P){L.moduleInfo=D.merge(P);P=A._conditions;L.conditions=D.merge(P);}else{E.each(W,L.addModule,L);}if(!A._renderedMods){A._renderedMods=D.merge(L.moduleInfo);A._conditions=D.merge(L.conditions);}L._inspectPage();L._internal=false;L._config(X);L.sorted=[];L.loaded=Q[S];L.dirty=true;L.inserted={};L.skipped={};};D.Loader.prototype={FILTER_DEFS:{RAW:{"searchExp":"-min\\.js","replaceStr":".js"},DEBUG:{"searchExp":"-min\\.js","replaceStr":"-debug.js"}},_inspectPage:function(){E.each(O,function(X,W){if(X.details){var L=this.moduleInfo[W],Z=X.details.requires,Y=L&&L.requires;if(L){if(!L._inspected&&Z&&Y.length!=Z.length){delete L.expanded;}}else{L=this.addModule(X.details,W);}L._inspected=true;}},this);},_requires:function(c,b){var Y,a,L,d,e,W=this.moduleInfo,X=W[c],Z=W[b];if(!X||!Z){return false;}a=X.expanded_map;L=X.after;d=X.after_map;if(a&&(b in a)){return true;}if(d&&(b in d)){return true;}else{if(L&&J.indexOf(L,b)>-1){return true;}}e=W[b]&&W[b].supersedes;if(e){for(Y=0;Y<e.length;Y++){if(this._requires(c,e[Y])){return true;}}}if(X.ext&&X.type==R&&!Z.ext&&Z.type==R){return true;}return false;},_config:function(b){var X,W,a,Y,Z,c,L=this;if(b){for(X in b){if(b.hasOwnProperty(X)){a=b[X];if(X=="require"){L.require(a);}else{if(X=="skin"){D.mix(L.skin,b[X],true);}else{if(X=="groups"){for(W in a){if(a.hasOwnProperty(W)){c=W;Z=a[W];L.addGroup(Z,c);}}}else{if(X=="modules"){E.each(a,L.addModule,L);}else{if(X=="gallery"){this.groups.gallery.update(a);}else{if(X=="yui2"||X=="2in3"){this.groups.yui2.update(b["2in3"],b.yui2);}else{if(X=="maxURLLength"){L[X]=Math.min(N,a);}else{L[X]=a;}}}}}}}}}}Y=L.filter;if(I.isString(Y)){Y=Y.toUpperCase();L.filterName=Y;L.filter=L.FILTER_DEFS[Y];if(Y=="DEBUG"){L.require("yui-log","dump");}}},formatSkin:function(X,L){var W=B+X;if(L){W=W+"-"+L;}return W;},_addSkin:function(d,b,c){var a,Z,L,Y=this.moduleInfo,W=this.skin,X=Y[b]&&Y[b].ext;if(b){L=this.formatSkin(d,b);if(!Y[L]){a=Y[b];Z=a.pkg||b;this.addModule({name:L,group:a.group,type:"css",after:W.after,after_map:J.hash(W.after),path:(c||Z)+"/"+W.base+d+"/"+b+".css",ext:X});}}return L;},addGroup:function(Y,W){var X=Y.modules,L=this;W=W||Y.name;Y.name=W;L.groups[W]=Y;if(Y.patterns){E.each(Y.patterns,function(a,Z){a.group=W;L.patterns[Z]=a;});}if(X){E.each(X,function(a,Z){a.group=W;L.addModule(a,Z);},L);}},addModule:function(m,v){v=v||m.name;m.name=v;if(!m||!m.name){return null;}if(!m.type){m.type=K;}if(!m.path&&!m.fullpath){m.path=G(v,v,m.type);}m.ext=("ext" in m)?m.ext:(this._internal)?false:true;m.requires=m.requires||[];var r=m.submodules,q,n,L,g,X,k,W,p,h,e,b,Z,Y,u,t,f,a,c=this.conditions,d;this.moduleInfo[v]=m;if(!m.langPack&&m.lang){h=J(m.lang);for(p=0;p<h.length;p++){u=h[p];e=this.getLangPackName(u,v);X=this.moduleInfo[e];if(!X){X=this._addLangPack(u,m,e);}}}if(r){L=m.supersedes||[];n=0;for(q in r){if(r.hasOwnProperty(q)){g=r[q];g.path=g.path||G(v,q,m.type);g.pkg=v;g.group=m.group;if(g.supersedes){L=L.concat(g.supersedes);}X=this.addModule(g,q);L.push(q);if(X.skinnable){m.skinnable=true;f=this.skin.overrides;if(f&&f[q]){for(p=0;p<f[q].length;p++){a=this._addSkin(f[q][p],q,v);L.push(a);}}a=this._addSkin(this.skin.defaultSkin,q,v);L.push(a);}if(g.lang&&g.lang.length){h=J(g.lang);for(p=0;p<h.length;p++){u=h[p];e=this.getLangPackName(u,v);b=this.getLangPackName(u,q);X=this.moduleInfo[e];if(!X){X=this._addLangPack(u,m,e);}Z=Z||J.hash(X.supersedes);if(!(b in Z)){X.supersedes.push(b);}m.lang=m.lang||[];Y=Y||J.hash(m.lang);if(!(u in Y)){m.lang.push(u);}}}n++;}}m.supersedes=E.keys(J.hash(L));m.rollup=(n<4)?n:Math.min(n-1,4);}k=m.plugins;if(k){for(q in k){if(k.hasOwnProperty(q)){W=k[q];W.pkg=v;W.path=W.path||G(v,q,m.type);W.requires=W.requires||[];W.group=m.group;this.addModule(W,q);if(m.skinnable){this._addSkin(this.skin.defaultSkin,q,v);}}}}if(m.condition){d=m.condition.trigger;c[d]=c[d]||{};c[d][v]=m.condition;}if(m.configFn){t=m.configFn(m);if(t===false){delete this.moduleInfo[v];m=null;}}return m;},require:function(W){var L=(typeof W==="string")?arguments:W;this.dirty=true;D.mix(this.required,J.hash(L));},getRequires:function(q){if(!q||q._parsed){return C;}var h,e,g,Z,Y,t,u=q.name,X,f,s=O[u]&&O[u].details,l=[],a,n,b,W,p,c=q.lang||q.intl,k=this.moduleInfo,L={};if(q.temp&&s){n=q;q=this.addModule(s,u);q.group=n.group;q.pkg=n.pkg;delete q.expanded;}if(q.expanded&&(!q.langCache||q.langCache==this.lang)){return q.expanded;
}a=q.requires;b=q.optional;q._parsed=true;if(q.skinnable){p=this.skin.overrides;if(p&&p[u]){for(h=0;h<p[u].length;h++){W=this._addSkin(p[u][h],u);l.push(W);}}else{W=this._addSkin(this.skin.defaultSkin,u);l.push(W);}}for(h=0;h<a.length;h++){if(!L[a[h]]){l.push(a[h]);L[a[h]]=true;e=this.getModule(a[h]);if(e){Z=this.getRequires(e);c=c||(e.expanded_map&&(V in e.expanded_map));for(g=0;g<Z.length;g++){l.push(Z[g]);}}}}a=q.supersedes;if(a){for(h=0;h<a.length;h++){if(!L[a[h]]){if(q.submodules){l.push(a[h]);}L[a[h]]=true;e=this.getModule(a[h]);if(e){Z=this.getRequires(e);c=c||(e.expanded_map&&(V in e.expanded_map));for(g=0;g<Z.length;g++){l.push(Z[g]);}}}}}if(b&&this.loadOptional){for(h=0;h<b.length;h++){if(!L[b[h]]){l.push(b[h]);L[b[h]]=true;e=k[b[h]];Z=this.getRequires(e);c=c||(e.expanded_map&&(V in e.expanded_map));for(g=0;g<Z.length;g++){l.push(Z[g]);}}}}X=this.conditions[u];if(X){E.each(X,function(i,d){if(!L[d]){f=i&&((i.ua&&D.UA[i.ua])||(i.test&&i.test(D,a)));if(f){L[d]=true;l.push(d);e=this.getModule(d);if(e){Z=this.getRequires(e);for(g=0;g<Z.length;g++){l.push(Z[g]);}}}}},this);}q._parsed=false;if(c){if(q.lang&&!q.langPack&&D.Intl){t=D.Intl.lookupBestLang(this.lang||U,q.lang);q.langCache=this.lang;Y=this.getLangPackName(t,u);if(Y){l.unshift(Y);}}l.unshift(V);}q.expanded_map=J.hash(l);q.expanded=E.keys(q.expanded_map);return q.expanded;},getProvides:function(W){var L=this.getModule(W),Y,X;if(!L){return F;}if(L&&!L.provides){Y={};X=L.supersedes;if(X){J.each(X,function(Z){D.mix(Y,this.getProvides(Z));},this);}Y[W]=true;L.provides=Y;}return L.provides;},calculate:function(W,L){if(W||L||this.dirty){if(W){this._config(W);}if(!this._init){this._setup();}this._explode();if(this.allowRollup){this._rollup();}this._reduce();this._sort();}},_addLangPack:function(a,L,Z){var X=L.name,W,Y=this.moduleInfo[Z];if(!Y){W=G((L.pkg||X),Z,K,true);this.addModule({path:W,intl:true,langPack:true,ext:L.ext,group:L.group,supersedes:[]},Z,true);if(a){D.Env.lang=D.Env.lang||{};D.Env.lang[a]=D.Env.lang[a]||{};D.Env.lang[a][X]=true;}}return this.moduleInfo[Z];},_setup:function(){var b=this.moduleInfo,Y,Z,X,L,W,a;for(Y in b){if(b.hasOwnProperty(Y)){L=b[Y];if(L){L.requires=E.keys(J.hash(L.requires));if(L.lang&&L.lang.length){a=this.getLangPackName(U,Y);this._addLangPack(null,L,a);}}}}W={};if(!this.ignoreRegistered){D.mix(W,A.mods);}if(this.ignore){D.mix(W,J.hash(this.ignore));}for(X in W){if(W.hasOwnProperty(X)){D.mix(W,this.getProvides(X));}}if(this.force){for(Z=0;Z<this.force.length;Z++){if(this.force[Z] in W){delete W[this.force[Z]];}}}D.mix(this.loaded,W);this._init=true;},getLangPackName:function(W,L){return("lang/"+L+((W)?"_"+W:""));},_explode:function(){var Z=this.required,L,Y,W={},X=this;X.dirty=false;E.each(Z,function(a,b){if(!W[b]){W[b]=true;L=X.getModule(b);if(L){var c=L.expound;if(c){Z[c]=X.getModule(c);Y=X.getRequires(Z[c]);D.mix(Z,J.hash(Y));}Y=X.getRequires(L);D.mix(Z,J.hash(Y));}}});},getModule:function(a){if(!a){return null;}var Z,Y,W,L=this.moduleInfo[a],X=this.patterns;if(!L){for(W in X){if(X.hasOwnProperty(W)){Z=X[W];if(a.indexOf(W)>-1){Y=Z;break;}}}if(Y){if(Z.action){Z.action.call(this,a,W);}else{L=this.addModule(D.merge(Y),a);L.temp=true;}}}return L;},_rollup:function(){},_reduce:function(a){a=a||this.required;var X,W,Z,L,Y=this.loadType;for(X in a){if(a.hasOwnProperty(X)){L=this.getModule(X);if(((this.loaded[X]||O[X])&&!this.forceMap[X]&&!this.ignoreRegistered)||(Y&&L&&L.type!=Y)){delete a[X];}Z=L&&L.supersedes;if(Z){for(W=0;W<Z.length;W++){if(Z[W] in a){delete a[Z[W]];}}}}}return a;},_finish:function(X,W){H.running=false;var L=this.onEnd;if(L){L.call(this.context,{msg:X,data:this.data,success:W});}this._continue();},_onSuccess:function(){var L=D.merge(this.skipped),W;E.each(L,function(X){delete this.inserted[X];},this);this.skipped={};E.each(this.inserted,function(Y,X){D.mix(this.loaded,this.getProvides(X));},this);W=this.onSuccess;if(W){W.call(this.context,{msg:"success",data:this.data,success:true,skipped:L});}this._finish("success",true);},_onFailure:function(X){var L=this.onFailure,W="failure: "+X.msg;if(L){L.call(this.context,{msg:W,data:this.data,success:false});}this._finish(W,false);},_onTimeout:function(){var L=this.onTimeout;if(L){L.call(this.context,{msg:"timeout",data:this.data,success:false});}this._finish("timeout",false);},_sort:function(){var g=E.keys(this.required),c={},L=0,X,f,e,Z,Y,d,W;for(;;){X=g.length;d=false;for(Z=L;Z<X;Z++){f=g[Z];for(Y=Z+1;Y<X;Y++){W=f+g[Y];if(!c[W]&&this._requires(f,g[Y])){e=g.splice(Y,1);g.splice(Z,0,e[0]);c[W]=true;d=true;break;}}if(d){break;}else{L++;}}if(!d){break;}}this.sorted=g;},_insert:function(X,Y,W){if(X){this._config(X);}this.calculate(Y);this.loadType=W;if(!W){var L=this;this._internalCallback=function(){var a=L.onCSS,c,b,Z;if(this.insertBefore&&D.UA.ie){c=D.config.doc.getElementById(this.insertBefore);b=c.parentNode;Z=c.nextSibling;b.removeChild(c);if(Z){b.insertBefore(c,Z);}else{b.appendChild(c);}}if(a){a.call(L.context,D);}L._internalCallback=null;L._insert(null,null,K);};this._insert(null,null,R);return;}this._loading=true;this._combineComplete={};this.loadNext();},_continue:function(){if(!(H.running)&&H.size()>0){H.running=true;H.next()();}},insert:function(X,W){var L=this,Y=D.merge(this,true);delete Y.require;delete Y.dirty;H.add(function(){L._insert(Y,X,W);});this._continue();},loadNext:function(Z){if(!this._loading){return;}var g,r,q,o,Y,d,a,n,c,f,p,L,b,l,X,e,t,u,W=this.loadType,k=this,v=function(i){k.loadNext(i.data);},h=function(s){k._combineComplete[W]=true;var m,j=e.length;for(m=0;m<j;m++){k.inserted[e[m]]=true;}v(s);};if(this.combine&&(!this._combineComplete[W])){e=[];this._combining=e;g=this.sorted;r=g.length;u=this.comboBase;Y=u;t=[];l={};for(q=0;q<r;q++){b=u;o=this.getModule(g[q]);f=o&&o.group;if(f){c=this.groups[f];if(!c.combine){o.combine=false;continue;}o.combine=true;if(c.comboBase){b=c.comboBase;}if(c.root){o.root=c.root;}}l[b]=l[b]||[];l[b].push(o);}for(p in l){if(l.hasOwnProperty(p)){Y=p;X=l[p];r=X.length;for(q=0;q<r;q++){o=X[q];
if(o&&(o.type===W)&&(o.combine||!o.ext)){L=(o.root||this.root)+o.path;if((Y!==p)&&(q<(r-1))&&((L.length+Y.length)>this.maxURLLength)){t.push(this._filter(Y));Y=p;}Y+=L;if(q<(r-1)){Y+="&";}e.push(o.name);}}if(e.length&&(Y!=p)){t.push(this._filter(Y));}}}if(e.length){if(W===R){d=D.Get.css;n=this.cssAttributes;}else{d=D.Get.script;n=this.jsAttributes;}d(t,{data:this._loading,onSuccess:h,onFailure:this._onFailure,onTimeout:this._onTimeout,insertBefore:this.insertBefore,charset:this.charset,attributes:n,timeout:this.timeout,autopurge:false,context:this});return;}else{this._combineComplete[W]=true;}}if(Z){if(Z!==this._loading){return;}this.inserted[Z]=true;if(this.onProgress){this.onProgress.call(this.context,{name:Z,data:this.data});}}g=this.sorted;r=g.length;for(q=0;q<r;q=q+1){if(g[q] in this.inserted){continue;}if(g[q]===this._loading){return;}o=this.getModule(g[q]);if(!o){a="Undefined module "+g[q]+" skipped";this.skipped[g[q]]=true;continue;}c=(o.group&&this.groups[o.group])||F;if(!W||W===o.type){this._loading=g[q];if(o.type===R){d=D.Get.css;n=this.cssAttributes;}else{d=D.Get.script;n=this.jsAttributes;}Y=(o.fullpath)?this._filter(o.fullpath,g[q]):this._url(o.path,g[q],c.base||o.base);d(Y,{data:g[q],onSuccess:v,insertBefore:this.insertBefore,charset:this.charset,attributes:n,onFailure:this._onFailure,onTimeout:this._onTimeout,timeout:this.timeout,autopurge:false,context:k});return;}}this._loading=null;d=this._internalCallback;if(d){this._internalCallback=null;d.call(this);}else{this._onSuccess();}},_filter:function(X,W){var Z=this.filter,L=W&&(W in this.filters),Y=L&&this.filters[W];if(X){if(L){Z=(I.isString(Y))?this.FILTER_DEFS[Y.toUpperCase()]||null:Y;}if(Z){X=X.replace(new RegExp(Z.searchExp,"g"),Z.replaceStr);}}return X;},_url:function(X,L,W){return this._filter((W||this.base||"")+X,L);}};},"@VERSION@",{requires:["get"]});