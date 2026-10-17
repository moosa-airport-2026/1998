// مسح البيانات القديمة عند التحديث لضمان عدم التعارض
try { if(localStorage.getItem("ARTY_VER") !== "12") { localStorage.clear(); localStorage.setItem("ARTY_VER","12"); } } catch(e){}

var MGRS=(function(){var C='AJSAJS',R='AFAFAF',S=6,I=73,O=79,V=86,Z=90,A=65;
function LD(lat){var b=['C','D','E','F','G','H','J','K','L','M','N','P','Q','R','S','T','U','V','W','X'];if(lat<-80||lat>84)return'Z';return b[Math.floor((lat+80)/8)];}
function L2U(lat,lon){var a=6378137,e=0.00669438,k=0.9996,d=Math.PI/180;var la=lat*d,lo=lon*d,zn=Math.floor((lon+180)/6)+1,lo0=((zn-1)*6-180+3)*d;var ep=e/(1-e),N=a/Math.sqrt(1-e*Math.pow(Math.sin(la),2)),T=Math.pow(Math.tan(la),2);var Cc=ep*Math.pow(Math.cos(la),2),Aa=Math.cos(la)*(lo-lo0);var M=a*((1-e/4-3*e*e/64-5*Math.pow(e,3)/256)*la-(3*e/8+3*e*e/32+45*Math.pow(e,3)/1024)*Math.sin(2*la)+(15*e*e/256+45*Math.pow(e,3)/1024)*Math.sin(4*la)-(35*Math.pow(e,3)/3072)*Math.sin(6*la));var E=k*N*(Aa+(1-T+Cc)*Math.pow(Aa,3)/6+(5-18*T+T*T+72*Cc-58*ep)*Math.pow(Aa,5)/120)+500000;var Nn=k*(M+N*Math.tan(la)*(Aa*Aa/2+(5-T+9*Cc+4*Cc*Cc)*Math.pow(Aa,4)/24+(61-58*T+T*T+600*Cc-330*ep)*Math.pow(Aa,6)/720));if(lat<0)Nn+=10000000;return{e:E,n:Nn,zn:zn,zl:LD(lat)};}
function U2L(e,n,zn,zl){var a=6378137,ec=0.00669438,k=0.9996;var e1=(1-Math.sqrt(1-ec))/(1+Math.sqrt(1-ec));var x=e-500000,y=n,lo=(zn-1)*6-180+3;var ep=ec/(1-ec),M=y/k,mu=M/(a*(1-ec/4-3*ec*ec/64-5*Math.pow(ec,3)/256));var p1=mu+(3*e1/2-27*Math.pow(e1,3)/32)*Math.sin(2*mu)+(21*e1*e1/16-55*Math.pow(e1,4)/32)*Math.sin(4*mu)+(151*Math.pow(e1,3)/96)*Math.sin(6*mu);var N1=a/Math.sqrt(1-ec*Math.pow(Math.sin(p1),2)),T1=Math.pow(Math.tan(p1),2);var C1=ep*Math.pow(Math.cos(p1),2),R1=a*(1-ec)/Math.pow(1-ec*Math.pow(Math.sin(p1),2),1.5);var D=x/(N1*k);var lat=p1-(N1*Math.tan(p1)/R1)*(D*D/2-(5+3*T1+10*C1-4*C1*C1-9*ep)*Math.pow(D,4)/24+(61+90*T1+298*C1+45*T1*T1-252*ep-3*C1*C1)*Math.pow(D,6)/720);var lon=(D-(1+2*T1+C1)*Math.pow(D,3)/6+(5-2*C1+28*T1-3*C1*C1+8*ep+24*T1*T1)*Math.pow(D,5)/120)/Math.cos(p1);return{lat:lat*180/Math.PI,lon:lo+lon*180/Math.PI};}
function g10(i){var p=i%S;return p===0?S:p;}
function gLT(c,r,p){var idx=p-1,ci=C.charCodeAt(idx)+c-1,ri=R.charCodeAt(idx)+r,ro=false;if(ci>Z){ci=ci-Z+A-1;ro=true;}if(ci===I||(C.charCodeAt(idx)<I&&ci>I)||((ci>I||C.charCodeAt(idx)<I)&&ro))ci++;if(ci===O||(C.charCodeAt(idx)<O&&ci>O)||((ci>O||C.charCodeAt(idx)<O)&&ro)){ci++;if(ci===I)ci++;}if(ci>Z)ci=ci-Z+A-1;if(ri>V){ri=ri-V+A-1;ro=true;}else ro=false;if(ri===I||(R.charCodeAt(idx)<I&&ri>I)||((ri>I||R.charCodeAt(idx)<I)&&ro))ri++;if(ri===O||(R.charCodeAt(idx)<O&&ri>O)||((ri>O||R.charCodeAt(idx)<O)&&ro)){ri++;if(ri===I)ri++;}if(ri>V)ri=ri-V+A-1;return String.fromCharCode(ci)+String.fromCharCode(ri);}
function enc(e,n,zn){var se='00000'+Math.round(e),sn='00000'+Math.round(n);var p=g10(zn),c=Math.floor(e/100000),r=Math.floor(n/100000)%20;return gLT(c,r,p)+se.substr(se.length-5,5)+sn.substr(sn.length-5,5);}
function gE(c,s){var cc=C.charCodeAt(s-1),ev=100000,rw=false;while(cc!==c.charCodeAt(0)){cc++;if(cc===I)cc++;if(cc===O)cc++;if(cc>Z){if(rw)throw 0;cc=A;rw=true;}ev+=100000;}return ev;}
function gN(n,s){if(n>'V')throw 0;var cr=R.charCodeAt(s-1),nv=0,rw=false;while(cr!==n.charCodeAt(0)){cr++;if(cr===I)cr++;if(cr===O)cr++;if(cr>V){if(rw)throw 0;cr=A;rw=true;}nv+=100000;}return nv;}
function gMin(z){var m={C:1100000,D:2000000,E:2800000,F:3700000,G:4600000,H:5500000,J:6400000,K:7300000,L:8200000,M:9100000,N:0,P:800000,Q:1700000,R:2600000,S:3500000,T:4400000,U:5300000,V:6200000,W:7000000,X:7900000};return m[z]!==undefined?m[z]:-1;}
function dec(s){if(!s)throw 0;var L=s.length,i=0,sb='',tc;while(!/[A-Z]/.test(tc=s.charAt(i))){if(i>=2)throw 0;sb+=tc;i++;}var zn=parseInt(sb,10);if(i===0||i+3>L)throw 0;var zl=s.charAt(i++),hk=s.substring(i,i+=2),st=g10(zn);var e1=gE(hk.charAt(0),st),n1=gN(hk.charAt(1),st),mn=gMin(zl);while(n1<mn)n1+=2000000;var rem=L-i;if(rem%2!==0)throw 0;var sep=rem/2,e=e1+parseFloat(s.substring(i,i+sep)),n=n1+parseFloat(s.substring(i+sep));return{e:e,n:n,zl:zl,zn:zn};}
return{forward:function(lat,lon){var u=L2U(lat,lon),f=enc(u.e,u.n,u.zn);return{zone:u.zn+u.zl,sq:f.substring(0,2),e:f.substring(2,7),n:f.substring(7,12)};},inverse:function(m){var b=dec(m.toUpperCase().replace(/\s/g,''));return U2L(b.e,b.n,b.zn,b.zl);}};})();

var D2R=Math.PI/180,R2D=180/Math.PI,MILS=6400;
var $=function(id){return document.getElementById(id);};

function mkCurve(rmin,rmax,eMin,eMax,tMin,tMax,dMax){var pts=[],N=6;for(var i=0;i<=N;i++){var f=i/N,r=rmin+(rmax-rmin)*f,g=Math.pow(f,2.2);pts.push({r:Math.round(r/50)*50,e:+(eMin+(eMax-eMin)*g).toFixed(1),t:+(tMin+(tMax-tMin)*Math.pow(f,1.35)).toFixed(1),d:+(dMax*Math.pow(f,1.6)).toFixed(1)});}return pts;}

var DW={
"130":{name:"مدفع 130 ملم",max:27150,info:{caliber:"130 ملم",range:"27,150 م",crew:"9",rof:"5-6/د",weight:"6,300 كغ",notes:"M-46"},charges:[{n:"1",equip:"M-46",pts:mkCurve(3000,9000,120,420,6,22,6)},{n:"2",equip:"M-46",pts:mkCurve(6000,15000,90,400,8,32,10)},{n:"3",equip:"M-46",pts:mkCurve(10000,27150,70,520,11,52,20)}]},
"152":{name:"مدفع 152 ملم",max:24000,info:{caliber:"152 ملم",range:"24,000 م",crew:"8",rof:"4-5/د",weight:"5,700 كغ",notes:"D-20"},charges:[{n:"1",equip:"D-20",pts:mkCurve(3000,8000,120,430,6,21,5)},{n:"2",equip:"D-20",pts:mkCurve(6000,14000,90,410,8,30,9)},{n:"3",equip:"D-20",pts:mkCurve(10000,24000,70,510,11,48,18)}]},
"122":{name:"مدفع 122 ملم (D-30)",max:15300,info:{caliber:"122 ملم",range:"15,300 م",crew:"7",rof:"6-8/د",weight:"3,210 كغ",notes:"D-30"},charges:[{n:"1",equip:"D-30",pts:mkCurve(1500,5000,110,400,4,16,3)},{n:"2",equip:"D-30",pts:mkCurve(3000,9000,85,390,6,24,6)},{n:"كامل",equip:"D-30",pts:mkCurve(6000,15300,70,470,9,42,14)}]},
"m120":{name:"هاون 120 ملم",max:7100,info:{caliber:"120 ملم",range:"7,100 م",crew:"4",rof:"10-15/د",weight:"144 كغ",notes:"هاون"},charges:[{n:"1",equip:"هاون",pts:mkCurve(400,2000,400,900,3,12,1)},{n:"2",equip:"هاون",pts:mkCurve(1000,4000,320,850,5,20,2)},{n:"3",equip:"هاون",pts:mkCurve(2000,7100,250,800,7,30,4)}]},
"m82":{name:"هاون 82 ملم",max:3900,info:{caliber:"82 ملم",range:"3,900 م",crew:"3",rof:"15-20/د",weight:"56 كغ",notes:"هاون"},charges:[{n:"1",equip:"هاون",pts:mkCurve(200,1200,380,900,2,9,1)},{n:"2",equip:"هاون",pts:mkCurve(600,2400,300,850,4,14,2)},{n:"3",equip:"هاون",pts:mkCurve(1200,3900,240,800,6,20,3)}]},
"m60":{name:"هاون 60 ملم",max:2500,info:{caliber:"60 ملم",range:"2,500 م",crew:"2",rof:"20-25/د",weight:"20 كغ",notes:"هاون"},charges:[{n:"1",equip:"هاون",pts:mkCurve(150,900,380,900,2,8,1)},{n:"2",equip:"هاون",pts:mkCurve(500,1600,300,850,3,12,2)},{n:"3",equip:"هاون",pts:mkCurve(900,2500,250,800,5,16,3)}]},
"kat107":{name:"كاتيوشا 107 ملم",max:8500,info:{caliber:"107 ملم",range:"8,500 م",crew:"4",rof:"12/دفعة",weight:"—",notes:"منصة"},charges:[{n:"وحيد",equip:"منصة",pts:mkCurve(1500,8500,60,380,6,28,25)}]},
"grad":{name:"كراد 40 فوهة 122",max:20000,info:{caliber:"122 ملم",range:"20,000 م",crew:"5",rof:"40/20ث",weight:"—",notes:"BM-21"},charges:[{n:"وحيد",equip:"BM-21",pts:mkCurve(3000,20000,50,320,10,45,40)}]}};

var DB={version:12,pin:"1998",batteries:[],observers:[],targets:[],weapons:JSON.parse(JSON.stringify(DW)),
 equipTypes:["M-46", "D-20", "D-30", "هاون", "منصة", "BM-21"],
 fuzeTypes:["انفجاري", "تأخيري", "زمني", "دخاني"]
};
var CORR={dirSide:'R',dirUnit:'mil',dirVal:0,rngSide:'A',rngVal:0};
var CUR_WPN_ADD_BAT=null;

function save(){try{localStorage.setItem("ARTY_DB",JSON.stringify(DB));}catch(e){}}
function load(){var s=localStorage.getItem("ARTY_DB");if(s){try{DB=JSON.parse(s);}catch(e){}}
for(var k in DW){if(!DB.weapons[k])DB.weapons[k]=JSON.parse(JSON.stringify(DW[k]));}}

function readMGRS(p){var z=$(p+'Zone').value.trim().toUpperCase();var s=$(p+'Sq').value.trim().toUpperCase();var e=$(p+'E').value.trim(),n=$(p+'N').value.trim();if(!z||!s||!e||!n)return null;if(e.length!==5||n.length!==5)return null;try{return MGRS.inverse(z+s+e+n);}catch(err){return null;}}
function updateHint(p){var ll=readMGRS(p),h=$(p+'Hint');if(!h)return;if(ll)h.textContent='✓ '+ll.lat.toFixed(5)+', '+ll.lon.toFixed(5);else h.textContent='';}
function fillMGRS(p,lat,lon){try{var m=MGRS.forward(lat,lon);$(p+'Zone').value=m.zone;$(p+'Sq').value=m.sq;$(p+'E').value=m.e;$(p+'N').value=m.n;updateHint(p);}catch(e){}}
function tgtChanged(){updateHint('t');}function batChanged(){updateHint('nb');}function obsChanged(){updateHint('no');}

function doLogin(){var v=$("pinIn").value.trim();if(v===DB.pin){$("login").style.display="none";showSplash();}else{$("pinErr").textContent="✗ رمز خاطئ";$("pinIn").value="";}}
function showSplash(){var sp=$("splash");sp.style.display="flex";setTimeout(function(){sp.style.opacity="1";},50);setTimeout(function(){sp.style.opacity="0";setTimeout(function(){sp.style.display="none";$("app").style.display="block";boot();},800);},5000);}
$("pinIn").addEventListener("keydown",function(e){if(e.key==="Enter")doLogin();});
function changePin(){var v=$("newPin").value.trim();if(v.length<4){alert("4 أرقام على الأقل");return;}DB.pin=v;save();$("newPin").value="";alert("✔ تم");}

function tab(id,el){
  var pgs=document.querySelectorAll(".pg");for(var i=0;i<pgs.length;i++)pgs[i].classList.remove("on");$("pg-"+id).classList.add("on");
  var btns=document.querySelectorAll(".tabs button");for(var j=0;j<btns.length;j++)btns[j].classList.remove("on");el.classList.add("on");
  if(id==='map')setTimeout(function(){ if(map) { map.invalidateSize(); } }, 400);
  if(id==='bat')renderWeaponFormDropdowns();
}

function boot(){refreshWeaponDropdowns();renderBats();renderObs();renderTargets();renderTable();refreshBatSelect();initMap();}
function refreshWeaponDropdowns(){
  var wOpts='';for(var k in DB.weapons)wOpts+='<option value="'+k+'">'+DB.weapons[k].name+'</option>';
  $("tblWeapon").innerHTML=wOpts;$("nwType").innerHTML=wOpts;
}
function renderWeaponFormDropdowns(){
  var eqOpts='', fzOpts='';
  DB.equipTypes.forEach(function(eq){eqOpts+='<option value="'+eq+'">'+eq+'</option>';});
  DB.fuzeTypes.forEach(function(fz){fzOpts+='<option value="'+fz+'">'+fz+'</option>';});
  $("nwEquip").innerHTML=eqOpts; $("nwFuze").innerHTML=fzOpts;
}

var map=null, bMarker=null, tMarker=null;
var lineFire=null, lineCorr=null, lineLong=null, lineSquare=null;
var targetLatLon=null;

function initMap(){
  if(map)return;
  try{
    map=L.map('map1',{zoomControl:true}).setView([33.315,44.366],8);
    L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {maxZoom: 19, attribution: 'Esri'}).addTo(map);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {maxZoom: 19, opacity: 0.4}).addTo(map);
    map.on('click',function(e){
      if(tMarker) map.removeLayer(tMarker);
      tMarker=L.marker(e.latlng,{draggable:true}).addTo(map).bindPopup('الهدف');
      setTgtFromMap(e.latlng.lat, e.latlng.lng);
      tMarker.on('dragend',function(ev){var p=ev.target.getLatLng();setTgtFromMap(p.lat,p.lng);});
    });
  }catch(e){}
}
function setTgtFromMap(lat,lon){
  targetLatLon = {lat:lat, lng:lon};
  fillMGRS('t',lat,lon);
  var m='';try{m=MGRS.forward(lat,lon);}catch(e){}
  $("mapInfo").textContent=m?(m.zone+' '+m.sq+' '+m.e+' '+m.n):(lat.toFixed(5)+', '+lon.toFixed(5));
  if($('tHint')) $('tHint').textContent = m ? '✓ '+m.zone+' '+m.sq+' '+m.e+' '+m.n : '';
  onTargetChange();
}

function drawLine(type){
  if(!targetLatLon){alert("حدد الهدف على الخريطة أولاً");return;}
  var b=getCurrentBat(); var w=getCurrentWeapon();
  if(!w){alert("اختر بطارية وسلاحاً من تبويب النار أولاً");return;}
  
  if(type==='fire'){
    if(lineFire) map.removeLayer(lineFire);
    lineFire=L.polyline([[w.lat,w.lon],[targetLatLon.lat,targetLatLon.lng]],{color:'blue',weight:4, dashArray:'10,5'}).addTo(map).bindPopup("خط الرمي");
  } else if(type==='corr'){
    if(lineCorr) map.removeLayer(lineCorr);
    lineCorr=L.polyline([[w.lat,w.lon],[targetLatLon.lat,targetLatLon.lng]],{color:'orange',weight:4, dashArray:'5,5'}).addTo(map).bindPopup("خط التصحيح");
  } else if(type==='long'){
    if(lineLong) map.removeLayer(lineLong);
    var pts=[[w.lat,w.lon],[targetLatLon.lat,targetLatLon.lng]];
    lineLong=L.polyline(pts,{color:'red',weight:2, dashArray:'2,8'}).addTo(map).bindPopup("رمي طولي");
  } else if(type==='square'){
    if(lineSquare) map.removeLayer(lineSquare);
    var d=0.005;
    var pts=[[targetLatLon.lat-d,targetLatLon.lng-d],[targetLatLon.lat-d,targetLatLon.lng+d],[targetLatLon.lat+d,targetLatLon.lng+d],[targetLatLon.lat+d,targetLatLon.lng-d],[targetLatLon.lat-d,targetLatLon.lng-d]];
    lineSquare=L.polygon(pts,{color:'red',fillOpacity:0.2}).addTo(map).bindPopup("منطقة الرمي التربيعي");
  }
}
function clearLines(){
  [lineFire,lineCorr,lineLong,lineSquare].forEach(function(l){if(l) map.removeLayer(l);});
  lineFire=lineCorr=lineLong=lineSquare=null;
}
function getCurrentBat(){for(var i=0;i<DB.batteries.length;i++)if(DB.batteries[i].id==$("selBat").value)return DB.batteries[i];return null;}
function getCurrentWeapon(){var b=getCurrentBat();if(!b||!b.weapons)return null;for(var i=0;i<b.weapons.length;i++)if(b.weapons[i].id==$("selWeapon").value)return b.weapons[i];return null;}

function addBat(){
  var name=$("nbName").value.trim()||("بطارية "+(DB.batteries.length+1));
  var ll=readMGRS('nb');if(!ll){alert("أدخل مركز البطارية MGRS");return;}
  DB.batteries.push({id:Date.now(),name:name,lat:ll.lat,lon:ll.lon,alt:parseFloat($("nbAlt").value)||0,
    wind:parseFloat($("nbWind").value)||0, windDir:parseFloat($("nbWindDir").value)||0, temp:parseFloat($("nbTemp").value)||25, humid:parseFloat($("nbHumid").value)||50,
    weapons:[]
  });
  save();renderBats();refreshBatSelect();
  ["nbName","nbE","nbN","nbZone","nbSq"].forEach(function(i){$(i).value="";});
  $("nbHint").textContent="";
}
function delBat(id){if(!confirm("حذف البطارية؟"))return;DB.batteries=DB.batteries.filter(function(b){return b.id!==id;});save();renderBats();refreshBatSelect();}

function showWeaponForm(batId){
  CUR_WPN_ADD_BAT=batId;var b=null;for(var i=0;i<DB.batteries.length;i++)if(DB.batteries[i].id==batId)b=DB.batteries[i];if(!b)return;
  $("wpnBatName").textContent=b.name;
  $("nwCenterAz").value=0; $("nwLimR").value=800; $("nwLimL").value=800;
  renderWeaponFormDropdowns();
  $("wpnAddCard").style.display="block";$("wpnAddCard").scrollIntoView();
}
function hideWeaponForm(){CUR_WPN_ADD_BAT=null;$("wpnAddCard").style.display="none";}
function onWpnTypeChange(){var t=$("nwType").value,w=DB.weapons[t];if(w){$("nwMaxR").value=w.max;if(!$("nwName").value)$("nwName").value=w.name;}}

function addWeapon(){
  if(!CUR_WPN_ADD_BAT){alert("اختر بطارية");return;}
  var b=null;for(var i=0;i<DB.batteries.length;i++)if(DB.batteries[i].id==CUR_WPN_ADD_BAT)b=DB.batteries[i];if(!b)return;
  var type=$("nwType").value; var name=$("nwName").value.trim()||DB.weapons[type].name;
  var lat=b.lat,lon=b.lon;
  var wE=$("nwE").value.trim(),wN=$("nwN").value.trim(),wZone=$("nwZone").value.trim().toUpperCase(),wSq=$("nwSq").value.trim().toUpperCase();
  if(wE&&wN&&wZone&&wSq&&wE.length===5&&wN.length===5){try{var ll=MGRS.inverse(wZone+wSq+wE+wN);lat=ll.lat;lon=ll.lon;}catch(e){}}
  var alt=parseFloat($("nwAlt").value); if(isNaN(alt))alt=b.alt;
  
  if(!b.weapons) b.weapons = [];
  b.weapons.push({
    id: "w" + Date.now(), type:type, name:name, lat:lat, lon:lon, alt:alt,
    minRange:parseFloat($("nwMinR").value)||0, maxRange:parseFloat($("nwMaxR").value)||DB.weapons[type].max,
    centerAz:parseFloat($("nwCenterAz").value)||0, limitR:parseFloat($("nwLimR").value)||800, limitL:parseFloat($("nwLimL").value)||800,
    equip:$("nwEquip").value, fuze:$("nwFuze").value
  });
  save();renderBats();refreshBatSelect();hideWeaponForm();
  ["nwName","nwE","nwN","nwZone","nwSq","nwAlt","nwCenterAz","nwLimR","nwLimL"].forEach(function(i){$(i).value="";});
  alert("✔ تم إضافة السلاح");
}
function delWeapon(batId,wpnId){if(!confirm("حذف هذا السلاح؟"))return;for(var i=0;i<DB.batteries.length;i++){if(DB.batteries[i].id==batId){DB.batteries[i].weapons=DB.batteries[i].weapons.filter(function(w){return w.id!==wpnId;});break;}}save();renderBats();refreshBatSelect();}

function renderBats(){
  var el=$("batList");
  if(!DB.batteries.length){el.innerHTML='<div style="color:var(--dim);font-size:11px">لا توجد بطاريات</div>';return;}
  var h='';
  DB.batteries.forEach(function(b){
    var m='';try{m=MGRS.forward(b.lat,b.lon);}catch(e){} var mg=m?(m.zone+' '+m.sq+' '+m.e+' '+m.n):'';
    h+='<div class="item"><b>'+b.name+'</b><div class="info">MGRS: <span class="mg">'+mg+'</span></div>';
    if(b.weapons && b.weapons.length){
      h+='<div style="margin-top:5px">';
      b.weapons.forEach(function(w){
        h+='<div style="background:var(--pnl);padding:5px;border-radius:5px;margin-top:3px;font-size:10px">'+
        '<span class="wtag">'+w.name+'</span> ('+w.equip+')<br>'+
        'قوس: '+w.centerAz+
        ' <button class="btn red sm" style="display:inline-block;width:auto;padding:2px 8px;margin:0;float:left" onclick="delWeapon('+b.id+',\''+w.id+'\')">✕</button></div>';
      });
      h+='</div>';
    }
    h+='<div style="display:grid;grid-template-columns:1fr 1fr;gap:4px;margin-top:6px"><button class="btn blue sm" onclick="showWeaponForm('+b.id+')">➕ سلاح</button><button class="btn red sm" onclick="delBat('+b.id+')">🗑️ حذف</button></div></div>';
  });
  el.innerHTML=h;
}
function refreshBatSelect(){var s=$("selBat");s.innerHTML='';DB.batteries.forEach(function(b){var opt=document.createElement('option');opt.value=b.id;opt.text=b.name;s.add(opt);});onBatChange();}

function onBatChange(){
  var b=getCurrentBat();
  var ws=$("selWeapon");
  ws.innerHTML = ""; // تفريغ القائمة بشكل كامل
  
  if(b){
    $("envInfo").innerHTML='ريح: '+b.wind+' | حرارة: '+b.temp;
    $("wind").value = b.wind; $("windDir").value = b.windDir;
    if(b.weapons && b.weapons.length > 0){
      b.weapons.forEach(function(w){
        var opt = document.createElement('option');
        opt.value = w.id;
        opt.text = w.name;
        ws.add(opt);
      });
      onWeaponChange();
    } else {
      var opt = document.createElement('option');
      opt.value = "";
      opt.text = "— لا أسلحة —";
      ws.add(opt);
      $("weaponInfo").innerHTML = "";
    }
  } else {
    $("envInfo").innerHTML='';
  }
  $("candidatesList").innerHTML='';
}

function onWeaponChange(){
  var w=getCurrentWeapon();
  if(!w){$("weaponInfo").innerHTML='';$("selCharge").innerHTML='<option value="auto">تلقائي</option>';return;}
  var wt=DB.weapons[w.type];
  $("weaponInfo").innerHTML='النوع: '+wt.name+' | عتاد: '+w.equip+' | صمام: '+w.fuze;
  
  var s=$("selCharge"); var h='<option value="auto">تلقائي</option>';
  if(wt) wt.charges.forEach(function(c,i){ if(c.equip === w.equip) h+='<option value="'+i+'">حشوة '+c.n+'</option>'; });
  s.innerHTML=h;
}
function onTargetChange(){updateHint('t');$("candidatesList").innerHTML='';}

function findBestWeapon(){
  var ll=readMGRS('t');if(!ll){alert("أدخل إحداثيات الهدف");return;}
  var tLat=ll.lat,tLon=ll.lon; var b=getCurrentBat();if(!b){alert("اختر بطارية");return;}
  if(!b.weapons || b.weapons.length===0){alert("لا توجد أسلحة في هذه البطارية. أضف سلاحاً أولاً.");return;}
  
  var candidates=[];
  b.weapons.forEach(function(w){
    var range=dist(w.lat,w.lon,tLat,tLon); var az=toMil(bearing(w.lat,w.lon,tLat,tLon));
    var relAz=(az-w.centerAz+MILS)%MILS; var isRight=relAz<=MILS/2; var deviation=isRight?relAz:MILS-relAz;
    var limit=isRight?w.limitR:w.limitL;
    var rangeOK=(range>=w.minRange && range<=w.maxRange); var azOK=(deviation<=limit);
    candidates.push({w:w,range:range,az:az,deviation:deviation,isRight:isRight,limit:limit,rangeOK:rangeOK,azOK:azOK,ok:(rangeOK&&azOK)});
  });
  candidates.sort(function(a,b){if(a.ok&&!b.ok)return -1;if(!a.ok&&b.ok)return 1;return a.deviation-b.deviation;});
  
  var h='';
  candidates.forEach(function(c){
    var w=c.w,cls=c.ok?'ok':'no'; var status=c.ok?'<span class="ok">✓ صالح</span>':'<span class="corr">✗ غير صالح</span>';
    h+='<div class="candbox '+cls+'"><b>'+w.name+'</b> '+status+'<br>المدى: '+Math.round(c.range)+'م | الزاوية: '+c.az.toFixed(0)+' mil'+(c.ok?'':'<br><span class="corr">خارج الحدود</span>')+'</div>';
  });
  $("candidatesList").innerHTML=h;
  var best=candidates.find(function(c){return c.ok;});
  if(best){$("selWeapon").value=best.w.id;onWeaponChange();alert("✔ أفضل سلاح: "+best.w.name);}
  else alert("⚠️ لا يوجد سلاح صالح");
}

function dist(lat1,lon1,lat2,lon2){var R=6371000,p1=lat1*D2R,p2=lat2*D2R,dp=(lat2-lat1)*D2R,dl=(lon2-lon1)*D2R;var a=Math.sin(dp/2)*Math.sin(dp/2)+Math.cos(p1)*Math.cos(p2)*Math.sin(dl/2)*Math.sin(dl/2);return 2*R*Math.asin(Math.min(1,Math.sqrt(a)));}
function bearing(lat1,lon1,lat2,lon2){var p1=lat1*D2R,p2=lat2*D2R,dl=(lon2-lon1)*D2R;var y=Math.sin(dl)*Math.cos(p2);var x=Math.cos(p1)*Math.sin(p2)-Math.sin(p1)*Math.cos(p2)*Math.cos(dl);return (Math.atan2(y,x)*R2D+360)%360;}
function toMil(deg){return (deg*MILS/360+MILS)%MILS;}
function interp(pts,r){if(!pts||!pts.length)return null;if(r<=pts[0].r)return Object.assign({},pts[0]);var last=pts[pts.length-1];if(r>=last.r)return Object.assign({},last);for(var i=0;i<pts.length-1;i++){var a=pts[i],b=pts[i+1];if(r>=a.r&&r<=b.r){var f=(r-a.r)/(b.r-a.r);return{r:r,e:a.e+(b.e-a.e)*f,t:a.t+(b.t-a.t)*f,d:a.d+(b.d-a.d)*f};}}return Object.assign({},last);}

function calcFire(){
  var bat=getCurrentBat();if(!bat){alert("اختر بطارية");return;}
  var w=getCurrentWeapon();if(!w){alert("اختر سلاح");return;}
  var wt=DB.weapons[w.type];if(!wt){alert("جداول السلاح غير موجودة");return;}
  var ll=readMGRS('t');if(!ll){alert("أدخل MGRS");return;}
  
  var baseRange=dist(w.lat,w.lon,ll.lat,ll.lon);
  var baseAzMil=toMil(bearing(w.lat,w.lon,ll.lat,ll.lon));
  var chIdx=$("selCharge").value,charge,point;
  
  if(chIdx==="auto"){
    var found=-1;
    for(var j=0;j<wt.charges.length;j++){
      var p=wt.charges[j].pts;
      if(wt.charges[j].equip === w.equip && baseRange<=p[p.length-1].r){found=j;break;}
    }
    if(found===-1)found=0;
    chIdx=found;
  }
  charge=wt.charges[+chIdx];if(!charge){alert("حشوة غير صالحة");return;}
  point=interp(charge.pts,baseRange);if(!point){alert("لا بيانات");return;}

  var dh=parseFloat($("tAlt").value)-w.alt;var site=baseRange>0?(dh/baseRange)*1000:0;
  var windSpeed=parseFloat($("wind").value)||0;
  var windCorr=windSpeed*0.1; // تبسيط
  var finalElev=point.e+site+(parseFloat($("elevCorr").value)||0);
  var finalDefl=(baseAzMil+point.d+windCorr+MILS)%MILS;
  
  var out='<div class="out"><div style="text-align:center;color:var(--acc2);font-weight:bold">🔥 بطاقة النار</div>'+
  '<div class="ln"><span>السلاح</span><span>'+w.name+'</span></div>'+
  '<div class="ln"><span>المدى</span><span class="big">'+Math.round(baseRange)+' م</span></div>'+
  '<div class="ln"><span>الزاوية</span><span class="big">'+finalElev.toFixed(0)+' mil</span></div>'+
  '<div class="ln"><span>الانحراف</span><span class="big">'+finalDefl.toFixed(0)+' mil</span></div>'+
  '<div class="ln"><span>الحشوة</span><span class="big">'+charge.n+'</span></div></div>';
  $("fireOut").innerHTML=out;
}

function onTblWeaponChange(){
  var wk=$("tblWeapon").value, w=DB.weapons[wk]; if(!w)return;
  var eqs = {}; w.charges.forEach(function(c){ if(c.equip) eqs[c.equip]=1; });
  var h=''; for(var eq in eqs) h+='<option value="'+eq+'">'+eq+'</option>';
  $("tblEquip").innerHTML=h;
  renderTable();
}
function renderTable(){
  var wk=$("tblWeapon").value,w=DB.weapons[wk];if(!w)return;
  var eq=$("tblEquip").value;
  var cs=$("tblCharge"),cur=cs.value;
  var h='';
  w.charges.forEach(function(c,i){ if(!eq||c.equip===eq) h+='<option value="'+i+'">حشوة '+c.n+'</option>'; });
  cs.innerHTML=h;
  if(cur&&cur<w.charges.length)cs.value=cur;
  var ci=+cs.value||0,ch=w.charges[ci];if(!ch){ $("tblTbl").innerHTML=''; return;}
  var html='<tr><th>المدى</th><th>الزاوية</th><th>الزمن</th><th>الانحراف</th><th></th></tr>';
  ch.pts.forEach(function(p,i){html+='<tr><td><input type="number" value="'+p.r+'" data-i="'+i+'" data-f="r"></td><td><input type="number" step="0.1" value="'+p.e+'" data-i="'+i+'" data-f="e"></td><td><input type="number" step="0.1" value="'+p.t+'" data-i="'+i+'" data-f="t"></td><td><input type="number" step="0.1" value="'+p.d+'" data-i="'+i+'" data-f="d"></td><td><button class="del" onclick="delRow('+i+')">✕</button></td></tr>';});
  $("tblTbl").innerHTML=html;
}
function saveTable(){var wk=$("tblWeapon").value,w=DB.weapons[wk],ci=+$("tblCharge").value;var inputs=$("tblTbl").querySelectorAll("input");for(var j=0;j<inputs.length;j++){var inp=inputs[j],i=+inp.getAttribute("data-i"),f=inp.getAttribute("data-f");w.charges[ci].pts[i][f]=parseFloat(inp.value)||0;}w.charges[ci].pts.sort(function(a,b){return a.r-b.r;});save();renderTable();alert("✔ تم");}
function addRow(){var wk=$("tblWeapon").value,ci=+$("tblCharge").value;DB.weapons[wk].charges[ci].pts.push({r:0,e:0,t:0,d:0});save();renderTable();}
function delRow(i){var wk=$("tblWeapon").value,ci=+$("tblCharge").value;DB.weapons[wk].charges[ci].pts.splice(i,1);save();renderTable();}

function addObs(){var name=$("noName").value.trim()||("راصد "+(DB.observers.length+1));var ll=readMGRS('no');if(!ll){alert("أدخل MGRS");return;}DB.observers.push({id:Date.now(),name:name,lat:ll.lat,lon:ll.lon,alt:parseFloat($("noAlt").value)||0});save();renderObs();["noName","noE","noN","noZone","noSq"].forEach(function(i){$(i).value="";});$("noHint").textContent="";}
function delObs(id){if(!confirm("حذف؟"))return;DB.observers=DB.observers.filter(function(o){return o.id!==id;});save();renderObs();}
function renderObs(){var el=$("obsList");if(!DB.observers.length){el.innerHTML='<div style="color:var(--dim);font-size:11px">لا يوجد</div>';return;}var h='';DB.observers.forEach(function(o){h+='<div class="item"><b>'+o.name+'</b><button class="btn red sm" onclick="delObs('+o.id+')">حذف</button></div>';});el.innerHTML=h;}

function saveTarget(){var ll=readMGRS('t');if(!ll){alert("أدخل MGRS");return;}var name=$("tName").value.trim()||("هدف "+(DB.targets.length+1));var m=MGRS.forward(ll.lat,ll.lon);DB.targets.push({id:Date.now(),name:name,zone:m.zone,sq:m.sq,e:m.e,n:m.n,lat:ll.lat,lon:ll.lon,alt:parseFloat($("tAlt").value)||0});save();renderTargets();$("tName").value="";alert("✔ تم");}
function delTarget(id){if(!confirm("حذف؟"))return;DB.targets=DB.targets.filter(function(t){return t.id!==id;});save();renderTargets();}
function renderTargets(){var el=$("tgtList");if(!DB.targets.length){el.innerHTML='<div style="color:var(--dim);font-size:11px">لا توجد</div>';return;}var h='';DB.targets.forEach(function(t){h+='<div class="item"><b>'+t.name+'</b><button class="btn red sm" onclick="delTarget('+t.id+')">🗑️</button></div>';});el.innerHTML=h;}

function exportData(){var blob=new Blob([JSON.stringify(DB,null,2)],{type:"application/json"});var a=document.createElement("a");a.href=URL.createObjectURL(blob);a.download="arty_backup.json";a.click();}
function importData(){$("fileIn").click();}
$("fileIn").addEventListener("change",function(e){var f=e.target.files[0];if(!f)return;var r=new FileReader();r.onload=function(ev){try{DB=JSON.parse(ev.target.result);save();boot();alert("✔");}catch(err){alert("✗");}};r.readAsText(f);});
function resetAll(){if(!confirm("حذف كل البيانات؟"))return;localStorage.removeItem("ARTY_DB");location.reload();}

load();