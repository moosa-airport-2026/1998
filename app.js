// مسح البيانات القديمة عند التحديث لضمان عدم التعارض
try { if(localStorage.getItem("ARTY_VER") !== "24") { localStorage.clear(); localStorage.setItem("ARTY_VER","24"); } } catch(e){}

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

var D2R=Math.PI/180,R2D=180/Math.PI;
var MILS=6400; 
var $=function(id){return document.getElementById(id);};

function mkCurve(rmin,rmax,eMin,eMax,tMin,tMax,dMax){var pts=[],N=6;for(var i=0;i<=N;i++){var f=i/N,r=rmin+(rmax-rmin)*f,g=Math.pow(f,2.2);pts.push({r:Math.round(r/50)*50,e:+(eMin+(eMax-eMin)*g).toFixed(1),t:+(tMin+(tMax-tMin)*Math.pow(f,1.35)).toFixed(1),d:+(dMax*Math.pow(f,1.6)).toFixed(1)});}return pts;}

function makePoints(arr) {
    return arr.map(function(p) {
        return {
            r: p[0], e1_comp: p[1] || 0, e1_neck: p[2] || 0, e1_fuze: p[3] || 0,
            y: p[4] || 0, Z: p[5] || 0, dZw: p[6] || 0, dXw: p[7] || 0,
            dXH: p[8] || 0, dXT: p[9] || 0, dXe: p[10] || 0,
            dXTcb: p[11] || 0, dXq: p[12] || 0, dX: p[13] || 0,
            B: p[14] || 0, N: p[15] || 0, theta: p[16] || 0,
            vsh: p[17] || 0, tof: p[18] || 0, 
            Epr: p[19] || 0, Eph: p[20] || 0, Epd: p[21] || 0
        };
    });
}

var DW={
"130":{name:"مدفع 130 ملم",max:27150,info:{caliber:"130 ملم"},charges:[
    {n:"1",equip:"M-46",pts:makePoints([[3000, 120, 0,0,0,0,0,0,0,0,0, 0,0,0, 0,0,0, 0,6, 35,0.1,0.1], [9000, 420, 0,0,0,0,0,0,0,0,0, 0,0,0, 0,0,0, 0,22, 45,0.2,0.2]])},
    {n:"2",equip:"M-46",pts:makePoints([[6000, 90, 0,0,0,0,0,0,0,0,0, 0,0,0, 0,0,0, 0,8, 30,0.1,0.1], [15000, 400, 0,0,0,0,0,0,0,0,0, 0,0,0, 0,0,0, 0,32, 40,0.2,0.2]])},
    {n:"3",equip:"M-46",pts:makePoints([[10000, 70, 0,0,0,0,0,0,0,0,0, 0,0,0, 0,0,0, 0,11, 50,0.3,0.3], [27150, 520, 0,0,0,0,0,0,0,0,0, 0,0,0, 0,0,0, 0,52, 60,0.4,0.4]])}
]},
"122":{name:"مدفع 122 ملم (D-30)",max:15300,info:{caliber:"122 ملم"},charges:[
    {n:"1",equip:"D-30",pts:makePoints([[1500, 110, 0,0,0,0,0,0,0,0,0, 0,0,0, 0,0,0, 0,4, 20,0.1,0.1], [5000, 400, 0,0,0,0,0,0,0,0,0, 0,0,0, 0,0,0, 0,16, 25,0.1,0.1]])},
    {n:"كامل",equip:"D-30",pts:makePoints([[6000, 70, 0,0,0,0,0,0,0,0,0, 0,0,0, 0,0,0, 0,9, 30,0.2,0.2], [15300, 470, 0,0,0,0,0,0,0,0,0, 0,0,0, 0,0,0, 0,42, 35,0.3,0.3]])}
]}};

var DB={version:24,pin:"1998",batteries:[],targets:[],restrictedTargets:[],weapons:JSON.parse(JSON.stringify(DW)),
 equipTypes:["M-46", "D-30", "هاون"],
 fuzeTypes:["انفجاري", "تأخيري", "زمني"],
 milSystem: 6400,
 arcColor: "#4caf50",
 arcOpacity: 0.15
};
var CORR={dirSide:'R',dirUnit:'mil',dirVal:0,rngSide:'A',rngVal:0};
var EDIT_BAT_ID = null, CUR_WPN_ADD_BAT = null, CUR_WPN_EDIT_ID = null;

function save(){try{localStorage.setItem("ARTY_DB",JSON.stringify(DB));}catch(e){}}
function load(){
  var s=localStorage.getItem("ARTY_DB");if(s){try{DB=JSON.parse(s);}catch(e){}}
  if(!DB.milSystem) DB.milSystem = 6400;
  if(!DB.arcColor) DB.arcColor = "#4caf50";
  if(DB.arcOpacity === undefined) DB.arcOpacity = 0.15;
  MILS = parseInt(DB.milSystem);
  for(var k in DW){if(!DB.weapons[k])DB.weapons[k]=JSON.parse(JSON.stringify(DW[k]));}
}

function changeMilSystem(){ DB.milSystem = parseInt($("setMilSystem").value); MILS = DB.milSystem; save(); alert("✔ تم تغيير النظام."); }

function addEquipType(){
  var v = $("newEquipName").value.trim(); if(!v) return;
  if(DB.equipTypes.indexOf(v) === -1) { DB.equipTypes.push(v); save(); renderSetupLists(); $("newEquipName").value = ""; alert("✔ تم إضافة العتاد"); }
}
function delEquipType(i){ DB.equipTypes.splice(i,1); save(); renderSetupLists(); }
function addFuzeType(){
  var v = $("newFuzeName").value.trim(); if(!v) return;
  if(DB.fuzeTypes.indexOf(v) === -1) { DB.fuzeTypes.push(v); save(); renderSetupLists(); $("newFuzeName").value = ""; alert("✔ تم إضافة الصمام"); }
}
function delFuzeType(i){ DB.fuzeTypes.splice(i,1); save(); renderSetupLists(); }

function renderSetupLists(){
  var eqH='', fzH='';
  DB.equipTypes.forEach(function(eq,i){eqH+='<div class="item" style="display:flex;justify-content:space-between;padding:5px 8px"><span>'+eq+'</span><button class="btn red sm" style="width:auto;margin:0;padding:2px 8px" onclick="delEquipType('+i+')">✕</button></div>';});
  DB.fuzeTypes.forEach(function(fz,i){fzH+='<div class="item" style="display:flex;justify-content:space-between;padding:5px 8px"><span>'+fz+'</span><button class="btn red sm" style="width:auto;margin:0;padding:2px 8px" onclick="delFuzeType('+i+')">✕</button></div>';});
  $("equipList").innerHTML=eqH; $("fuzeList").innerHTML=fzH;
}
function renderWeaponFormDropdowns(){
  var eqOpts='', fzOpts='';
  DB.equipTypes.forEach(function(eq){eqOpts+='<option value="'+eq+'">'+eq+'</option>';});
  DB.fuzeTypes.forEach(function(fz){fzOpts+='<option value="'+fz+'">'+fz+'</option>';});
  $("nwEquip").innerHTML=eqOpts; $("nwFuze").innerHTML=fzOpts;
}

function readMGRS(p){var z=$(p+'Zone').value.trim().toUpperCase();var s=$(p+'Sq').value.trim().toUpperCase();var e=$(p+'E').value.trim(),n=$(p+'N').value.trim();if(!z||!s||!e||!n)return null;if(e.length!==5||n.length!==5)return null;try{return MGRS.inverse(z+s+e+n);}catch(err){return null;}}
function updateHint(p){var ll=readMGRS(p),h=$(p+'Hint');if(!h)return;if(ll)h.textContent='✓ '+ll.lat.toFixed(5)+', '+ll.lon.toFixed(5);else h.textContent='';}
function fillMGRS(p,lat,lon){try{var m=MGRS.forward(lat,lon);$(p+'Zone').value=m.zone;$(p+'Sq').value=m.sq;$(p+'E').value=m.e;$(p+'N').value=m.n;updateHint(p);}catch(e){}}
function batChanged(){updateHint('nb');}

function doLogin(){var v=$("pinIn").value.trim();if(v===DB.pin){$("login").style.display="none";showSplash();}else{$("pinErr").textContent="✗ رمز خاطئ";$("pinIn").value="";}}
function showSplash(){var sp=$("splash");sp.style.display="flex";setTimeout(function(){sp.style.opacity="1";},50);setTimeout(function(){sp.style.opacity="0";setTimeout(function(){sp.style.display="none";$("app").style.display="block";boot();},800);},5000);}
$("pinIn").addEventListener("keydown",function(e){if(e.key==="Enter")doLogin();});
function changePin(){var v=$("newPin").value.trim();if(v.length<4){alert("4 أرقام على الأقل");return;}DB.pin=v;save();$("newPin").value="";alert("✔ تم");}

function tab(id,el){
  var pgs=document.querySelectorAll(".pg");for(var i=0;i<pgs.length;i++)pgs[i].classList.remove("on");$("pg-"+id).classList.add("on");
  var btns=document.querySelectorAll(".tabs button");for(var j=0;j<btns.length;j++)btns[j].classList.remove("on");el.classList.add("on");
  if(id==='map'){ setTimeout(function(){ if(map) { map.invalidateSize(); refreshMapMarkers(); } }, 400); }
  if(id==='bat'){ renderWeaponFormDropdowns(); cancelEditBat(); }
  if(id==='setup'){ renderSetupLists(); }
}

function boot(){
  $("setMilSystem").value = DB.milSystem;
  refreshWeaponDropdowns();renderBats();renderTargets();renderRestricted();renderTable();refreshBatSelect();initMap();refreshMapMarkers();
}
function refreshWeaponDropdowns(){
  var wOpts='';for(var k in DB.weapons)wOpts+='<option value="'+k+'">'+DB.weapons[k].name+'</option>';
  $("tblWeapon").innerHTML=wOpts;$("nwType").innerHTML=wOpts;
}

var map=null, layerGroup=null, arcLayers=[];
var targetLatLon=null, tMarker=null;

function initMap(){
  if(map)return;
  try{
    map=L.map('map1',{zoomControl:true}).setView([33.315,44.366],8);
    L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {maxZoom: 19, attribution: 'Esri'}).addTo(map);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {maxZoom: 19, opacity: 0.4}).addTo(map);
    layerGroup = L.layerGroup().addTo(map);

    map.on('click',function(e){
      if(tMarker) map.removeLayer(tMarker);
      tMarker=L.marker(e.latlng).addTo(map);
      var popupHtml = `
        <div style="text-align:center;">
          <button class="btn blue sm" onclick="mapActionFire(${e.latlng.lat}, ${e.latlng.lng})">🔥 رمي فوري</button>
          <button class="btn amber sm" onclick="mapActionSaveTarget(${e.latlng.lat}, ${e.latlng.lng})">💾 حفظ كهدف</button>
        </div>
      `;
      tMarker.bindPopup(popupHtml).openPopup();
    });
  }catch(e){}
}

function mapActionFire(lat, lon){
  setTgtFromMap(lat, lon);
  map.closePopup();
  tab('fire', document.querySelectorAll(".tabs button")[0]);
  setTimeout(function(){ findBestWeapon(); calcFire(); }, 300);
}
function mapActionSaveTarget(lat, lon){
  var name = prompt("أدخل اسم الهدف:");
  if(!name) return;
  var m = MGRS.forward(lat, lon);
  DB.targets.push({id:Date.now(), name:name, zone:m.zone, sq:m.sq, e:m.e, n:m.n, lat:lat, lon:lon, alt:0});
  save(); renderTargets(); refreshMapMarkers(); map.closePopup();
  alert("✔ تم حفظ الهدف: " + name);
}
function setTgtFromMap(lat,lon){
  targetLatLon = {lat:lat, lng:lon};
  fillMGRS('t',lat,lon);
  var m='';try{m=MGRS.forward(lat,lon);}catch(e){}
  $("mapInfo").textContent=m?(m.zone+' '+m.sq+' '+m.e+' '+m.n):(lat.toFixed(5)+', '+lon.toFixed(5));
  if($('tHint')) $('tHint').textContent = m ? '✓ '+m.zone+' '+m.sq+' '+m.e+' '+m.n : '';
}

function destinationPoint(lat, lon, bearingDeg, distance) {
  var R = 6371000; var brng = bearingDeg * Math.PI / 180;
  var lat1 = lat * Math.PI / 180; var lon1 = lon * Math.PI / 180;
  var d = distance / R;
  var lat2 = Math.asin(Math.sin(lat1)*Math.cos(d) + Math.cos(lat1)*Math.sin(d)*Math.cos(brng));
  var lon2 = lon1 + Math.atan2(Math.sin(brng)*Math.sin(d)*Math.cos(lat1), Math.cos(d)-Math.sin(lat1)*Math.sin(lat2));
  return [(lat2 * 180 / Math.PI), (lon2 * 180 / Math.PI)];
}

function refreshMapMarkers(){
  if(!map || !layerGroup) return;
  layerGroup.clearLayers();
  
  DB.batteries.forEach(function(b){
    var icon = L.divIcon({className:'', html:'<div style="font-size:24px; text-shadow: 0 0 5px #000;">🏛️</div>', iconSize:[24,24], iconAnchor:[12,12]});
    L.marker([b.lat, b.lon], {icon:icon}).addTo(layerGroup).bindPopup('<b>'+b.name+'</b><br>بطارية');
    if (b.observer && b.observer.lat) {
        var obsIcon = L.divIcon({className:'', html:'<div style="font-size:24px; text-shadow: 0 0 5px #000;">👁️</div>', iconSize:[24,24], iconAnchor:[12,12]});
        L.marker([b.observer.lat, b.observer.lon], {icon:obsIcon}).addTo(layerGroup).bindPopup('<b>'+b.observer.name+'</b><br>راصد');
    }
  });

  DB.targets.forEach(function(t){
    var icon = L.divIcon({className:'', html:'<div style="font-size:24px; text-shadow: 0 0 5px #000;">🎯</div>', iconSize:[24,24], iconAnchor:[12,12]});
    L.marker([t.lat, t.lon], {icon:icon}).addTo(layerGroup).bindPopup('<b>'+t.name+'</b><br>هدف');
  });
  
  if(DB.restrictedTargets) {
      DB.restrictedTargets.forEach(function(t){
        var r = t.radius || 250;
        var circle = L.circle([t.lat, t.lon], {radius: r, color: 'red', fillColor: 'red', fillOpacity: 0.2}).addTo(layerGroup);
        circle.bindPopup('<b>'+t.name+'</b><br>دائرة محظورة نصف قطرها '+r+'م');
      });
  }

  arcLayers.forEach(function(l){ map.removeLayer(l); });
  arcLayers = [];
  
  var b = getCurrentBat();
  if(b && b.weapons){
    b.weapons.forEach(function(w){
      var centerAzDeg = w.centerAz * (360/MILS); 
      var leftLimitDeg = (w.centerAz - w.limitL) * (360/MILS);
      var rightLimitDeg = (w.centerAz + w.limitR) * (360/MILS);
      var maxRange = w.maxRange || 15000;

      var arcPoints = [[w.lat, w.lon]];
      arcPoints.push(destinationPoint(w.lat, w.lon, leftLimitDeg, maxRange));
      var steps = 15;
      for(var i=1; i<=steps; i++){
        var az = leftLimitDeg + (rightLimitDeg - leftLimitDeg) * (i/steps);
        arcPoints.push(destinationPoint(w.lat, w.lon, az, maxRange));
      }
      arcPoints.push([w.lat, w.lon]);

      var cColor = w.arcColor || DB.arcColor;
      var arc = L.polygon(arcPoints, {color: cColor, weight: 2, fillColor: cColor, fillOpacity: DB.arcOpacity}).addTo(map);
      arcLayers.push(arc);
    });
  }
}

function getCurrentBat(){for(var i=0;i<DB.batteries.length;i++)if(DB.batteries[i].id==$("selBat").value)return DB.batteries[i];return null;}
function getCurrentWeapon(){var b=getCurrentBat();if(!b||!b.weapons)return null;for(var i=0;i<b.weapons.length;i++)if(b.weapons[i].id==$("selWeapon").value)return b.weapons[i];return null;}

function addBat(){
  var name=$("nbName").value.trim()||("بطارية "+(DB.batteries.length+1));
  var ll=readMGRS('nb');
  if(!ll){alert("أدخل مركز البطارية MGRS");return;}
  
  var obsLL = null;
  var obsName = $("nbObsName").value.trim();
  if(obsName) {
      var oz = $("nbObsZone").value.trim().toUpperCase(); var os = $("nbObsSq").value.trim().toUpperCase();
      var oe = $("nbObsE").value.trim(); var on = $("nbObsN").value.trim();
      if(oz && os && oe.length === 5 && on.length === 5) {
          try { var ol = MGRS.inverse(oz + os + oe + on); obsLL = { name: obsName, lat: ol.lat, lon: ol.lon, alt: parseFloat($("nbObsAlt").value) || 0 }; } catch(e) {}
      }
  }

  var batData = { name: name, lat: ll.lat, lon: ll.lon, alt: parseFloat($("nbAlt").value) || 0, observer: obsLL };

  if (EDIT_BAT_ID) {
      var b = DB.batteries.find(function(x){return x.id === EDIT_BAT_ID;});
      if (b) { Object.assign(b, batData); save(); renderBats(); refreshBatSelect(); refreshMapMarkers(); cancelEditBat(); alert("✔ تم التحديث"); }
  } else {
      batData.id = Date.now(); batData.weapons = [];
      DB.batteries.push(batData);
      save(); renderBats(); refreshBatSelect(); refreshMapMarkers(); cancelEditBat(); alert("✔ تم الإضافة");
  }
}

function editBat(id) {
    var b = DB.batteries.find(function(x){return x.id === id;}); if (!b) return;
    EDIT_BAT_ID = b.id; $("batFormTitle").textContent = "تعديل البطارية: " + b.name; $("nbName").value = b.name;
    var m = MGRS.forward(b.lat, b.lon); $("nbZone").value = m.zone; $("nbSq").value = m.sq; $("nbE").value = m.e; $("nbN").value = m.n; $("nbAlt").value = b.alt;
    if(b.observer) {
        $("nbObsName").value = b.observer.name; var mo = MGRS.forward(b.observer.lat, b.observer.lon);
        $("nbObsZone").value = mo.zone; $("nbObsSq").value = mo.sq; $("nbObsE").value = mo.e; $("nbObsN").value = mo.n; $("nbObsAlt").value = b.observer.alt;
    }
    $("btnAddBat").textContent = "💾 تحديث البطارية"; $("btnCancelBat").style.display = "block"; window.scrollTo(0,0);
}
function cancelEditBat() {
    EDIT_BAT_ID = null; $("batFormTitle").textContent = "إضافة بطارية جديدة";
    $("nbName").value = ""; $("nbZone").value = ""; $("nbSq").value = ""; $("nbE").value = ""; $("nbN").value = ""; $("nbAlt").value = "0";
    $("nbObsName").value = ""; $("nbObsZone").value = ""; $("nbObsSq").value = ""; $("nbObsE").value = ""; $("nbObsN").value = ""; $("nbObsAlt").value = "0";
    $("btnAddBat").textContent = "➕ إضافة بطارية"; $("btnCancelBat").style.display = "none";
}
function delBat(id){if(!confirm("حذف البطارية؟"))return;DB.batteries=DB.batteries.filter(function(b){return b.id!==id;});save();renderBats();refreshBatSelect();refreshMapMarkers();}

function showWeaponForm(batId){
  CUR_WPN_ADD_BAT=batId; CUR_WPN_EDIT_ID=null;
  var b=null;for(var i=0;i<DB.batteries.length;i++)if(DB.batteries[i].id==batId)b=DB.batteries[i];if(!b)return;
  $("wpnBatName").textContent=b.name;
  $("wpnFormTitle").innerHTML = 'إضافة سلاح إلى: <span id="wpnBatName" style="color:var(--amber)">'+b.name+'</span>';
  $("nwName").value=""; $("nwE").value=""; $("nwN").value=""; $("nwZone").value=""; $("nwSq").value=""; $("nwAlt").value="";
  $("nwCenterAz").value=0; $("nwLimR").value=800; $("nwLimL").value=800; $("nwShakhes").value=0; $("nwArcColor").value=DB.arcColor; $("nwStdMV").value=0;
  renderWeaponFormDropdowns();
  $("wpnAddCard").style.display="block";$("wpnAddCard").scrollIntoView();
  $("btnAddWpn").textContent = "➕ إضافة";
}

function editWeapon(batId, wpnId) {
    var b = DB.batteries.find(function(x){return x.id === batId;}); if (!b) return;
    var w = b.weapons.find(function(x){return x.id === wpnId;}); if (!w) return;
    CUR_WPN_ADD_BAT = batId; CUR_WPN_EDIT_ID = w.id;
    $("wpnFormTitle").innerHTML = 'تعديل سلاح في: <span style="color:var(--amber)">'+b.name+'</span>';
    $("nwType").value = w.type; $("nwName").value = w.name;
    if(w.lat !== b.lat || w.lon !== b.lon) {
        var m = MGRS.forward(w.lat, w.lon); $("nwZone").value = m.zone; $("nwSq").value = m.sq; $("nwE").value = m.e; $("nwN").value = m.n;
    } else { $("nwZone").value = ""; $("nwSq").value = ""; $("nwE").value = ""; $("nwN").value = ""; }
    $("nwAlt").value = w.alt; $("nwMinR").value = w.minRange; $("nwMaxR").value = w.maxRange; $("nwStdMV").value = w.stdMV||0;
    $("nwCenterAz").value = w.centerAz; $("nwLimR").value = w.limitR; $("nwLimL").value = w.limitL;
    $("nwEquip").value = w.equip; $("nwFuze").value = w.fuze; $("nwShakhes").value = w.shakhes || 0; $("nwArcColor").value = w.arcColor || DB.arcColor;
    $("wpnAddCard").style.display="block"; $("wpnAddCard").scrollIntoView(); $("btnAddWpn").textContent = "💾 تحديث السلاح";
}

function hideWeaponForm(){CUR_WPN_ADD_BAT=null;CUR_WPN_EDIT_ID=null;$("wpnAddCard").style.display="none";}
function onWpnTypeChange(){var t=$("nwType").value,w=DB.weapons[t];if(w){$("nwMaxR").value=w.max;if(!$("nwName").value)$("nwName").value=w.name;}}

function addWeapon(){
  if(!CUR_WPN_ADD_BAT){alert("اختر بطارية");return;}
  var b=DB.batteries.find(function(x){return x.id==CUR_WPN_ADD_BAT;}); if(!b)return;
  var type=$("nwType").value; var name=$("nwName").value.trim()||DB.weapons[type].name;
  var lat=b.lat,lon=b.lon;
  var wE=$("nwE").value.trim(),wN=$("nwN").value.trim(),wZone=$("nwZone").value.trim().toUpperCase(),wSq=$("nwSq").value.trim().toUpperCase();
  if(wE&&wN&&wZone&&wSq&&wE.length===5&&wN.length===5){try{var ll=MGRS.inverse(wZone+wSq+wE+wN);lat=ll.lat;lon=ll.lon;}catch(e){}}
  var alt=parseFloat($("nwAlt").value); if(isNaN(alt))alt=b.alt;
  
  var wpnData = {
    type:type, name:name, lat:lat, lon:lon, alt:alt,
    minRange:parseFloat($("nwMinR").value)||0, maxRange:parseFloat($("nwMaxR").value)||DB.weapons[type].max,
    stdMV:parseFloat($("nwStdMV").value)||0,
    centerAz:parseFloat($("nwCenterAz").value)||0, limitR:parseFloat($("nwLimR").value)||800, limitL:parseFloat($("nwLimL").value)||800,
    equip:$("nwEquip").value, fuze:$("nwFuze").value,
    shakhes:parseInt($("nwShakhes").value)||0, arcColor:$("nwArcColor").value
  };

  if (CUR_WPN_EDIT_ID) {
      var w = b.weapons.find(function(x){return x.id === CUR_WPN_EDIT_ID;});
      if(w) { Object.assign(w, wpnData); alert("✔ تم تحديث السلاح"); }
  } else {
      wpnData.id = "w" + Date.now(); if(!b.weapons) b.weapons = []; b.weapons.push(wpnData); alert("✔ تم إضافة السلاح");
  }
  save();renderBats();refreshBatSelect();hideWeaponForm();refreshMapMarkers();
}
function delWeapon(batId,wpnId){if(!confirm("حذف هذا السلاح؟"))return;for(var i=0;i<DB.batteries.length;i++){if(DB.batteries[i].id==batId){DB.batteries[i].weapons=DB.batteries[i].weapons.filter(function(w){return w.id!==wpnId;});break;}}save();renderBats();refreshBatSelect();refreshMapMarkers();}

function renderBats(){
  var el=$("batList");
  if(!DB.batteries.length){el.innerHTML='<div style="color:var(--dim);font-size:11px">لا توجد بطاريات</div>';return;}
  var h='';
  DB.batteries.forEach(function(b){
    var m='';try{m=MGRS.forward(b.lat,b.lon);}catch(e){} var mg=m?(m.zone+' '+m.sq+' '+m.e+' '+m.n):'';
    h+='<div class="item"><b>'+b.name+'</b> <button class="btn amber sm" style="display:inline-block;width:auto;padding:2px 8px;margin:0 5px" onclick="editBat('+b.id+')">✏️ تعديل</button>'+
       '<div class="info">MGRS: <span class="mg">'+mg+'</span></div>';
    if(b.weapons && b.weapons.length){
      h+='<div style="margin-top:5px">';
      b.weapons.forEach(function(w){
        h+='<div style="background:var(--pnl);padding:5px;border-radius:5px;margin-top:3px;font-size:10px">'+
        '<span class="wtag">'+w.name+'</span> ('+w.equip+') | شاخص: '+w.shakhes+'<br>'+
        'قوس: '+w.centerAz+' (ي '+w.limitR+' / س '+w.limitL+')'+
        ' <div style="float:left;">'+
        '<button class="btn amber sm" style="display:inline-block;width:auto;padding:2px 8px;margin:0" onclick="editWeapon('+b.id+',\''+w.id+'\')">✏️</button> '+
        '<button class="btn red sm" style="display:inline-block;width:auto;padding:2px 8px;margin:0" onclick="delWeapon('+b.id+',\''+w.id+'\')">✕</button>'+
        '</div></div>';
      });
      h+='</div>';
    }
    h+='<div style="display:grid;grid-template-columns:1fr 1fr;gap:4px;margin-top:6px"><button class="btn blue sm" onclick="showWeaponForm('+b.id+')">➕ سلاح</button><button class="btn red sm" onclick="delBat('+b.id+')">🗑️ حذف البطارية</button></div></div>';
  });
  el.innerHTML=h;
}
function refreshBatSelect(){var s=$("selBat");s.innerHTML='';DB.batteries.forEach(function(b){var opt=document.createElement('option');opt.value=b.id;opt.text=b.name;s.add(opt);});onBatChange();}

function onBatChange(){
  var b=getCurrentBat();
  var ws=$("selWeapon");
  ws.innerHTML = "";
  
  if(b){
    if(b.weapons && b.weapons.length > 0){
      b.weapons.forEach(function(w){ var opt = document.createElement('option'); opt.value = w.id; opt.text = w.name; ws.add(opt); });
      onWeaponChange();
    } else {
      var opt = document.createElement('option'); opt.value = ""; opt.text = "— لا أسلحة —"; ws.add(opt); $("weaponInfo").innerHTML = "";
    }
  }
  $("candidatesList").innerHTML='';
  refreshMapMarkers();
}

function onWeaponChange(){
  var w=getCurrentWeapon();
  if(!w){$("weaponInfo").innerHTML='';$("selCharge").innerHTML='<option value="auto">تلقائي</option>';return;}
  var wt=DB.weapons[w.type];
  $("weaponInfo").innerHTML='النوع: '+wt.name+' | عتاد: '+w.equip+' | صمام: '+w.fuze+' | شاخص: '+(w.shakhes||0)+' | MV قياسي: '+(w.stdMV||0);
  
  var s=$("selCharge"); var h='<option value="auto">تلقائي</option>';
  if(wt) wt.charges.forEach(function(c,i){ if(c.equip === w.equip) h+='<option value="'+i+'">حشوة '+c.n+'</option>'; });
  s.innerHTML=h;
  refreshMapMarkers();
}

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

function interp(pts,r){
  if(!pts||!pts.length)return null;
  if(r<=pts[0].r)return Object.assign({},pts[0]);
  var last=pts[pts.length-1];
  if(r>=last.r)return Object.assign({},last);
  for(var i=0;i<pts.length-1;i++){
    var a=pts[i],b=pts[i+1];
    if(r>=a.r&&r<=b.r){
      var f=(b.r-a.r)===0 ? 0 : (r-a.r)/(b.r-a.r);
      var res = {};
      for(var key in a) {
          if(typeof a[key] === 'number') {
              res[key] = a[key] + ((b[key]||0) - a[key]) * f;
          }
      }
      res.r = r;
      return res;
    }
  }
  return Object.assign({},last);
}

function calcFire(){
  try {
    // 1. حفظ تلقائي لبيانات الجدول
    try {
      var wk=$("tblWeapon").value;
      var ci=+$("tblCharge").value;
      if(DB.weapons[wk] && DB.weapons[wk].charges[ci]){
        var inputs=$("tblTbl").querySelectorAll("input");
        if(inputs.length > 0){
          for(var j=0;j<inputs.length;j++){
            var inp=inputs[j];
            DB.weapons[wk].charges[ci].pts[+inp.dataset.i][inp.dataset.f]=parseFloat(inp.value)||0;
          }
        }
      }
    } catch(e) { console.log("Auto-save skipped"); }

    // 2. التحقق من المدخلات
    var bat=getCurrentBat();if(!bat){alert("الخطأ: لم يتم اختيار بطارية من القائمة العلوية");return;}
    var w=getCurrentWeapon();if(!w){alert("الخطأ: لم يتم اختيار سلاح من القائمة العلوية");return;}
    var wt=DB.weapons[w.type];if(!wt){alert("الخطأ: جداول السلاح غير موجودة");return;}
    var ll=readMGRS('t');if(!ll){alert("الخطأ: إحداثيات الهدف غير مكتملة (يجب أن تكون 5 أرقام للشرقي و5 للشمالي)");return;}

    // 3. الحسابات الأساسية
    var tLat = ll.lat, tLon = ll.lon;
    var baseRange=dist(w.lat,w.lon,tLat,tLon);
    var baseAzMil=toMil(bearing(w.lat,w.lon,tLat,tLon));

    // 4. اختيار الحشوة بأمان
    var chIdx=$("selCharge").value,charge;
    if(chIdx==="auto"){
      var found=-1;
      for(var j=0;j<wt.charges.length;j++){
        var p=wt.charges[j].pts;
        if(!p || p.length === 0) continue;
        if(wt.charges[j].equip === w.equip && baseRange<=p[p.length-1].r){found=j;break;}
      }
      if(found===-1){
          for(var j=0;j<wt.charges.length;j++){
              if(wt.charges[j].pts && wt.charges[j].pts.length > 0) { found=j; break; }
          }
      }
      if(found===-1)found=0;
      chIdx=found;
    }
    charge=wt.charges[+chIdx];
    
    if(!charge) { alert("الخطأ: لا توجد حشوات لهذا السلاح. يرجى إضافتها في تبويب الجداول."); return; }
    if(!charge.pts || charge.pts.length === 0) { alert("الخطأ: الحشوة المختارة لا تحتوي على أي بيانات. يرجى تعبئتها في الجداول."); return; }

    var basePoint = interp(charge.pts, baseRange);
    if(!basePoint){alert("الخطأ: لا توجد بيانات في الجدول تغطي هذا المدى ("+Math.round(baseRange)+" متر)");return;}

    // 5. قراءة الظروف
    var temp = parseFloat($("cTemp").value) || 15;
    var press = parseFloat($("cPress").value) || 750;
    var chargeTemp = parseFloat($("cChargeTemp").value) || 15;
    var headWind = parseFloat($("cHeadWind").value) || 0;
    var crossWind = parseFloat($("cCrossWind").value) || 0;
    var mvPct = parseFloat($("cMVPercent").value) || 0;
    var weightMark = parseFloat($("cWeightMark").value) || 0;
    var heightDiff = parseFloat($("cHeightDiff").value) || 0;

    // 6. حساب التصحيحات
    var dX_press = ((press - 750) / 10) * (basePoint.dXH || 0);
    var dX_temp = ((temp - 15) / 10) * (basePoint.dXT || 0);
    var dX_headwind = (headWind / 10) * (basePoint.dXw || 0);
    var dX_mv = mvPct * (basePoint.dXe || 0);
    var dX_chargeTemp = ((chargeTemp - 15) / 10) * (basePoint.dXTcb || 0);
    var dX_weight = weightMark * (basePoint.dXq || 0);
    var dhMil = baseRange > 0 ? (heightDiff / baseRange) * 1000 : 0;
    var dX_height = dhMil * (basePoint.dX || 0); 

    var totalRangeCorrection = dX_press + dX_temp + dX_headwind + dX_mv + dX_chargeTemp + dX_weight + dX_height;
    var adjustedRange = baseRange + totalRangeCorrection;
    
    var finalPoint = interp(charge.pts, adjustedRange);
    if(!finalPoint){alert("الخطأ: المدى المصحح خارج نطاق الجدول");return;}

    var windDeflCorr = (crossWind / 10) * (finalPoint.dZw || 0);
    var finalDefl = (baseAzMil + (finalPoint.Z || 0) + windDeflCorr + MILS) % MILS;

    // [تعديل 2]: حساب الانحراف داخل التنشير والزاوية المثالية
    var aimPost = w.shakhes || 6000; 
    var diff = finalDefl - aimPost;
    if (diff > MILS/2) diff -= MILS;
    if (diff < -MILS/2) diff += MILS;
    
    var isRight = diff >= 0;
    var isWithinLimit = false;
    if (isRight && diff <= w.limitR) isWithinLimit = true;
    if (!isRight && Math.abs(diff) <= w.limitL) isWithinLimit = true;

    var isOptimalElev = (finalPoint.e1_comp >= 350 && finalPoint.e1_comp <= 550);

    // 7. بناء بطاقة النار
    var out='<div class="out"><div style="text-align:center;color:var(--acc2);font-weight:bold">🔥 بطاقة النار البالستية</div>'+
    '<div class="ln"><span>السلاح</span><span>'+w.name+'</span></div>'+
    '<div class="ln"><span>المدى الأساسي (الهندسي)</span><span>'+Math.round(baseRange)+' م</span></div>'+
    '<div class="ln"><span>إجمالي تصحيح المدى</span><span class="corr">'+(totalRangeCorrection>0?'+':'')+Math.round(totalRangeCorrection)+' م</span></div>'+
    '<div class="ln"><span>المدى المصحح (للدخول بالجدول)</span><span class="amber">'+Math.round(adjustedRange)+' م</span></div>'+
    
    '<div class="ln"><span>الزاوية (E1)</span><span class="big '+(isOptimalElev?'':'corr')+'">'+(finalPoint.e1_comp||0).toFixed(0)+' mil</span>'+(isOptimalElev?'':' <span style="font-size:10px;color:var(--red)">(خارج المثالي)</span>')+'</div>'+
    '<div class="ln"><span>الانحراف النهائي</span><span class="big '+(isWithinLimit?'':'corr')+'">'+finalDefl.toFixed(0)+' mil</span>'+(isWithinLimit?'':' <span style="font-size:10px;color:var(--red)">(خارج التنشير)</span>')+'</div>'+
    
    '<div class="ln"><span>الحشوة</span><span class="big">'+(charge.n||'-')+'</span></div>'+
    '<div class="ln"><span>مقياس السدادة المركبة</span><span>'+(finalPoint.e1_comp||0)+'</span></div>'+
    '<div class="ln"><span>مقياس السدادة الرقبية</span><span>'+(finalPoint.e1_neck||0)+'</span></div>'+
    '<div class="ln"><span>مقياس الملات</span><span>'+(finalPoint.e1_fuze||0)+'</span></div>'+
    '<div class="ln"><span>مدة الطيران</span><span>'+(finalPoint.tof||0).toFixed(1)+' ث</span></div>';

    // [تعديل 3]: عرض المتغيرات الجوية فقط التي تغيرت
    var correctionsHtml = '';
    if (Math.abs(dX_press) > 0.01) correctionsHtml += '<div class="ln"><span>تصحيح الضغط</span><span class="corr">'+(dX_press>0?'+':'')+dX_press.toFixed(1)+'</span></div>';
    if (Math.abs(dX_temp) > 0.01) correctionsHtml += '<div class="ln"><span>تصحيح حرارة الهواء</span><span class="corr">'+(dX_temp>0?'+':'')+dX_temp.toFixed(1)+'</span></div>';
    if (Math.abs(dX_headwind) > 0.01) correctionsHtml += '<div class="ln"><span>تصحيح الريح الطولية</span><span class="corr">'+(dX_headwind>0?'+':'')+dX_headwind.toFixed(1)+'</span></div>';
    if (Math.abs(dX_mv) > 0.01) correctionsHtml += '<div class="ln"><span>تصحيح السرعة</span><span class="corr">'+(dX_mv>0?'+':'')+dX_mv.toFixed(1)+'</span></div>';
    if (Math.abs(dX_chargeTemp) > 0.01) correctionsHtml += '<div class="ln"><span>تصحيح حرارة الحشوة</span><span class="corr">'+(dX_chargeTemp>0?'+':'')+dX_chargeTemp.toFixed(1)+'</span></div>';
    if (Math.abs(dX_weight) > 0.01) correctionsHtml += '<div class="ln"><span>تصحيح الوزن</span><span class="corr">'+(dX_weight>0?'+':'')+dX_weight.toFixed(1)+'</span></div>';
    if (Math.abs(dX_height) > 0.01) correctionsHtml += '<div class="ln"><span>تصحيح الارتفاع</span><span class="corr">'+(dX_height>0?'+':'')+dX_height.toFixed(1)+'</span></div>';

    if (correctionsHtml !== '') {
        out += '<div style="margin-top:5px; border-top:1px dashed var(--brd); padding-top:5px; font-size:11px; color:var(--dim);">التصحيحات المتغيرة:</div>' + correctionsHtml;
    }

    out += '</div>';
    
    $("fireOut").innerHTML=out;

  } catch(err) {
    // هذا السطر سيكشف لنا الخطأ بالضبط إذا حدث أي شي غير متوقع
    alert("حدث خطأ تقني: " + err.message);
  }
}

function onTblWeaponChange(){
  var h='';
  DB.equipTypes.forEach(function(eq){ h+='<option value="'+eq+'">'+eq+'</option>'; });
  $("tblEquip").innerHTML=h;
  renderTable();
}

function addCharge() {
    var wk = $("tblWeapon").value;
    var w = DB.weapons[wk];
    if(!w) { alert("اختر سلاحاً أولاً"); return; }
    var eq = $("tblEquip").value; 
    var nextNum = w.charges.length + 1;
    
    w.charges.push({ n: nextNum.toString(), equip: eq, pts: [] });
    save();
    renderTable();
    $("tblCharge").value = w.charges.length - 1;
    renderTable();
    alert("✔ تم إضافة حشوة رقم " + nextNum + ". يرجى إدخال بياناتها في الجدول.");
}

function deleteCharge() {
    var wk = $("tblWeapon").value;
    var w = DB.weapons[wk];
    var ci = +$("tblCharge").value;
    if(!w || isNaN(ci) || !w.charges[ci]) { alert("اختر حشوة لحذفها"); return; }
    if(w.charges.length <= 1) { alert("لا يمكن حذف الحشوة الوحيدة"); return; }
    if(!confirm("هل تريد حذف هذه الحشوة نهائياً؟")) return;
    
    w.charges.splice(ci, 1);
    save();
    renderTable();
    alert("✔ تم حذف الحشوة");
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
  
  var html='<tr>'+
    '<th>المسافة (R)</th>'+
    '<th>E1 (مركبة)</th><th>E1 (رقبية)</th><th>E1 (ملات)</th>'+
    '<th>y (علو)</th><th>Z (حيدان)</th>'+
    '<th>dZw (ريح جانبية)</th><th>dXw (ريح طولية)</th><th>dXH (ضغط)</th><th>dXT (حرارة)</th><th>dXe+ (سرعة)</th>'+
    '<th>dXTcb (حرارة الحشوة)</th><th>dXq (وزن)</th><th>dX (ارتفاع)</th>'+
    '<th>B (حاصرة)</th><th>N (زاوية)</th><th>theta (سقوط)</th>'+
    '<th>vsh (سرعة باقية)</th><th>TOF (طيران)</th>'+
    '<th>الخطأ بالمسافة</th><th>الخطأ بالعلو</th><th>الخطأ بالاتجاه</th>'+
    '<th></th></tr>';
    
  ch.pts.forEach(function(p,i){
    html+='<tr>'+
    '<td><input type="number" value="'+(p.r||0)+'" data-i="'+i+'" data-f="r" style="width:50px"></td>'+
    '<td><input type="number" value="'+(p.e1_comp||0)+'" data-i="'+i+'" data-f="e1_comp"></td>'+
    '<td><input type="number" value="'+(p.e1_neck||0)+'" data-i="'+i+'" data-f="e1_neck"></td>'+
    '<td><input type="number" value="'+(p.e1_fuze||0)+'" data-i="'+i+'" data-f="e1_fuze"></td>'+
    '<td><input type="number" step="0.1" value="'+(p.y||0)+'" data-i="'+i+'" data-f="y"></td>'+
    '<td><input type="number" step="0.1" value="'+(p.Z||0)+'" data-i="'+i+'" data-f="Z"></td>'+
    '<td><input type="number" step="0.1" value="'+(p.dZw||0)+'" data-i="'+i+'" data-f="dZw"></td>'+
    '<td><input type="number" step="0.1" value="'+(p.dXw||0)+'" data-i="'+i+'" data-f="dXw"></td>'+
    '<td><input type="number" step="0.1" value="'+(p.dXH||0)+'" data-i="'+i+'" data-f="dXH"></td>'+
    '<td><input type="number" step="0.1" value="'+(p.dXT||0)+'" data-i="'+i+'" data-f="dXT"></td>'+
    '<td><input type="number" step="0.1" value="'+(p.dXe||0)+'" data-i="'+i+'" data-f="dXe"></td>'+
    '<td><input type="number" step="0.1" value="'+(p.dXTcb||0)+'" data-i="'+i+'" data-f="dXTcb"></td>'+
    '<td><input type="number" step="0.1" value="'+(p.dXq||0)+'" data-i="'+i+'" data-f="dXq"></td>'+
    '<td><input type="number" step="0.1" value="'+(p.dX||0)+'" data-i="'+i+'" data-f="dX"></td>'+
    '<td><input type="number" step="0.1" value="'+(p.B||0)+'" data-i="'+i+'" data-f="B"></td>'+
    '<td><input type="number" value="'+(p.N||0)+'" data-i="'+i+'" data-f="N"></td>'+
    '<td><input type="number" step="0.1" value="'+(p.theta||0)+'" data-i="'+i+'" data-f="theta"></td>'+
    '<td><input type="number" value="'+(p.vsh||0)+'" data-i="'+i+'" data-f="vsh"></td>'+
    '<td><input type="number" step="0.1" value="'+(p.tof||0)+'" data-i="'+i+'" data-f="tof"></td>'+
    
    '<td><input type="number" step="0.1" value="'+(p.Epr||0)+'" data-i="'+i+'" data-f="Epr"></td>'+
    '<td><input type="number" step="0.1" value="'+(p.Eph||0)+'" data-i="'+i+'" data-f="Eph"></td>'+
    '<td><input type="number" step="0.1" value="'+(p.Epd||0)+'" data-i="'+i+'" data-f="Epd"></td>'+
    
    '<td><button class="del" onclick="delRow('+i+')">✕</button></td>'+
    '</tr>';
  });
  $("tblTbl").innerHTML=html;
}

function saveTable(){
  var wk=$("tblWeapon").value,w=DB.weapons[wk],ci=+$("tblCharge").value;
  var inputs=$("tblTbl").querySelectorAll("input");
  for(var j=0;j<inputs.length;j++){
    var inp=inputs[j],i=+inp.getAttribute("data-i"),f=inp.getAttribute("data-f");
    w.charges[ci].pts[i][f]=parseFloat(inp.value)||0;
  }
  w.charges[ci].pts.sort(function(a,b){return (a.r||0)-(b.r||0);});
  save();renderTable();alert("✔ تم الحفظ");
}

function addRow(){
  var wk=$("tblWeapon").value,ci=+$("tblCharge").value;
  DB.weapons[wk].charges[ci].pts.push({r:0,e1_comp:0,e1_neck:0,e1_fuze:0,y:0,Z:0,dZw:0,dXw:0,dXH:0,dXT:0,dXe:0,dXTcb:0,dXq:0,dX:0,B:0,N:0,theta:0,vsh:0,tof:0, Epr:0, Eph:0, Epd:0});
  save();renderTable();
}

function delRow(i){
  var wk=$("tblWeapon").value,ci=+$("tblCharge").value;
  DB.weapons[wk].charges[ci].pts.splice(i,1);
  save();renderTable();
}

function openOCR(){$("importPanel").style.display="block";$("importTitle").textContent="📷 استيراد من صورة";$("importPhotoBox").style.display="block";$("importPasteBox").style.display="none";$("importPreview").style.display="none";$("ocrProgress").textContent="";$("importPanel").scrollIntoView();}
function openPaste(){$("importPanel").style.display="block";$("importTitle").textContent="📋 استيراد من نص";$("importPhotoBox").style.display="none";$("importPasteBox").style.display="block";$("importPreview").style.display="none";$("pasteArea").value="";$("importPanel").scrollIntoView();}
function closeImport(){$("importPanel").style.display="none";IMPORT_ROWS=[];}
function runOCR(){var f=$("ocrFile").files[0];if(!f){alert("اختر صورة أولاً");return;}if(typeof Tesseract==="undefined"){alert("مكتبة OCR لم تُحمّل");return;}$("ocrProgress").textContent="⏳ جاري التحليل...";Tesseract.recognize(f,"eng",{logger:function(m){if(m.status==="recognizing text"){$("ocrProgress").textContent="📖 "+Math.round(m.progress*100)+"%";}}}).then(function(res){$("ocrProgress").textContent="✅ تم";parseTableText(res.data.text);}).catch(function(err){$("ocrProgress").textContent="✗ فشل: "+err.message;});}
function parsePasteText(){var txt=$("pasteArea").value;if(!txt.trim()){alert("الصق نصاً أولاً");return;}parseTableText(txt);}
function parseTableText(text){
  var lines=text.split(/\r?\n/);var rows=[];
  for(var i=0;i<lines.length;i++){
    var line=lines[i].trim();if(!line)continue;
    var clean=line.replace(/[\t|,;]+/g," ");
    var nums=clean.match(/-?\d+(\.\d+)?/g);
    if(!nums)continue;if(nums.length<3)continue;
    var r=parseFloat(nums[0]);var e=parseFloat(nums[1]);var t=parseFloat(nums[2]);var d=nums[3]!==undefined?parseFloat(nums[3]):0;
    if(r<50||r>100000)continue;if(e<0||e>1600)continue;
    rows.push({r:r,e1_comp:e,tof:t,Z:d, Epr:0, Eph:0, Epd:0}); 
  }
  if(!rows.length){alert("لم يتم العثور على بيانات صالحة");return;}
  IMPORT_ROWS=rows;showPreview();
}
function showPreview(){
  var h='<tr><th>#</th><th>المدى</th><th>الزاوية</th><th>الزمن</th><th>الحيدان</th><th></th></tr>';
  IMPORT_ROWS.forEach(function(r,i){
    h+='<tr><td>'+(i+1)+'</td><td><input type="number" value="'+(r.r||0)+'" onchange="IMPORT_ROWS['+i+'].r=parseFloat(this.value)||0"></td><td><input type="number" step="0.1" value="'+(r.e1_comp||0)+'" onchange="IMPORT_ROWS['+i+'].e1_comp=parseFloat(this.value)||0"></td><td><input type="number" step="0.1" value="'+(r.tof||0)+'" onchange="IMPORT_ROWS['+i+'].tof=parseFloat(this.value)||0"></td><td><input type="number" step="0.1" value="'+(r.Z||0)+'" onchange="IMPORT_ROWS['+i+'].Z=parseFloat(this.value)||0"></td><td><button class="del" onclick="IMPORT_ROWS.splice('+i+',1);showPreview()">✕</button></td></tr>';
  });
  $("previewTable").innerHTML=h;$("importPreview").style.display="block";$("importPreview").scrollIntoView();
}
function applyImport(){
  if(!IMPORT_ROWS.length){alert("لا بيانات");return;}
  var wk=$("tblWeapon").value,w=DB.weapons[wk];var ci=+$("tblCharge").value;
  if(!w||!w.charges[ci]){alert("اختر سلاحاً وحشوة أولاً");return;}
  if(!confirm("سيتم استبدال "+w.charges[ci].pts.length+" نقطة بـ "+IMPORT_ROWS.length+" نقطة.\n\nمتابعة؟"))return;
  w.charges[ci].pts=IMPORT_ROWS.slice();w.charges[ci].pts.sort(function(a,b){return a.r-b.r;});save();renderTable();closeImport();alert("✔ تم التطبيق");
}

function addTargetFromList() {
    var z=$("ntZone").value.trim().toUpperCase();
    var s=$("ntSq").value.trim().toUpperCase();
    var e=$("ntE").value.trim();
    var n=$("ntN").value.trim();
    if(!z||!s||!e||!n||e.length!==5||n.length!==5){alert("أدخل MGRS كامل");return;}
    try{
        var ll=MGRS.inverse(z+s+e+n);
        var name=$("ntName").value.trim()||("هدف "+(DB.targets.length+1));
        DB.targets.push({id:Date.now(),name:name,zone:z,sq:s,e:e,n:n,lat:ll.lat,lon:ll.lon,alt:parseFloat($("ntAlt").value)||0});
        save();renderTargets();refreshMapMarkers();
        $("ntName").value=""; $("ntE").value=""; $("ntN").value=""; $("ntAlt").value="0";
        alert("✔ تم حفظ الهدف: " + name);
    }catch(err){alert("MGRS غير صالح");}
}

function editTargetFromList(id){
    var t = DB.targets.find(function(x){return x.id == id;});
    if(!t) return;
    $("ntName").value=t.name; $("ntZone").value=t.zone; $("ntSq").value=t.sq; $("ntE").value=t.e; $("ntN").value=t.n; $("ntAlt").value=t.alt; $("ntE").focus();
}

function saveFireCardFromTarget(id){
    var t = DB.targets.find(function(x){return x.id == id;}); if(!t) return;
    var bat=getCurrentBat(); var w=getCurrentWeapon(); if(!bat||!w){alert("اختر بطارية وسلاح أولاً"); return;}
    
    if(DB.restrictedTargets) {
        for(var i=0; i<DB.restrictedTargets.length; i++) {
            var res = DB.restrictedTargets[i];
            var d = dist(t.lat, t.lon, res.lat, res.lon);
            if(d <= (res.radius || 250)) { alert("⛔ الهدف يقع داخل منطقة محظورة: " + res.name); return; }
        }
    }
    
    var baseRange=dist(w.lat,w.lon,t.lat,t.lon); var baseAzMil=toMil(bearing(w.lat,w.lon,t.lat,t.lon)); var wt=DB.weapons[w.type];
    var chIdx=$("selCharge").value,charge,point;
    if(chIdx==="auto"){
        var found=-1; for(var j=0;j<wt.charges.length;j++){ if(wt.charges[j].equip === w.equip && baseRange<=wt.charges[j].pts[wt.charges[j].pts.length-1].r){found=j;break;} }
        if(found===-1)found=0; chIdx=found;
    }
    charge=wt.charges[+chIdx]; point=interp(charge.pts,baseRange);
    var dh=t.alt-w.alt; var site=baseRange>0?(dh/baseRange)*1000:0; 
    var finalElev = point.e1_comp + site;
    var finalDefl=(baseAzMil+point.Z+MILS)%MILS;
    if(!DB.fireLog)DB.fireLog=[];
    var now = new Date().toLocaleString('ar-EG');
    DB.fireLog.push({date:now, target:t.name, bat:bat.name, wpn:w.name, elev:finalElev.toFixed(0), defl:finalDefl.toFixed(0), charge:charge.n});
    save();
    alert("✔ تم حفظ بطاقة النار للهدف: "+t.name+"\nالزاوية: "+finalElev.toFixed(0)+" | الانحراف: "+finalDefl.toFixed(0));
}

function delTarget(id){if(!confirm("حذف الهدف؟"))return;DB.targets=DB.targets.filter(function(t){return t.id!==id;});save();renderTargets();refreshMapMarkers();}

function renderTargets(){
    var el=$("tgtList"); if(!DB.targets.length){el.innerHTML='<div style="color:var(--dim);font-size:11px">لا توجد أهداف</div>';return;}
    var h='';
    DB.targets.forEach(function(t){
        h+='<div class="item"><b>'+t.name+'</b><div class="info">MGRS: <span class="mg">'+t.zone+' '+t.sq+' '+t.e+' '+t.n+'</span></div>'+
           '<div style="display:grid;grid-template-columns:1fr 1fr;gap:4px;margin-top:6px">'+
           '<button class="btn sm" onclick="mapActionFire('+t.lat+','+t.lon+')">🔥 رمي</button>'+
           '<button class="btn amber sm" onclick="saveFireCardFromTarget('+t.id+')">💾 حفظ البطاقة</button>'+
           '<button class="btn sec sm" onclick="editTargetFromList('+t.id+')">✏️ تعديل</button>'+
           '<button class="btn red sm" onclick="delTarget('+t.id+')">🗑️ حذف</button></div></div>';
    });
    el.innerHTML=h;
}

function addRestrictedFromList() {
    var name = $("rtName").value.trim();
    var z = $("rtZone").value.trim().toUpperCase(); var s = $("rtSq").value.trim().toUpperCase();
    var e = $("rtE").value.trim(); var n = $("rtN").value.trim();
    var r = parseFloat($("rtRadius").value) || 250;
    
    if (!name) { alert("أدخل اسم الموقع المحظور"); return; }
    if (!z || !s || !e || !n || e.length !== 5 || n.length !== 5) { alert("أدخل إحداثيات MGRS كاملة"); return; }
    
    try {
        var ll = MGRS.inverse(z + s + e + n);
        DB.restrictedTargets.push({id:Date.now(), name:name, lat:ll.lat, lon:ll.lon, radius: r});
        save(); renderRestricted(); refreshMapMarkers();
        $("rtName").value = ""; $("rtE").value = ""; $("rtN").value = "";
        alert("⛔ تم حفظ الموقع المحظور: " + name);
    } catch(err) { alert("MGRS غير صالح"); }
}

function delRestricted(id){if(!confirm("حذف الموقع المحظور؟"))return;DB.restrictedTargets=DB.restrictedTargets.filter(function(t){return t.id!==id;});save();renderRestricted();refreshMapMarkers();}

function renderRestricted(){
    var el=$("resList");
    if(!DB.restrictedTargets || !DB.restrictedTargets.length){el.innerHTML='<div style="color:var(--dim);font-size:11px">لا توجد مواقع محظورة</div>';return;}
    var h='';
    DB.restrictedTargets.forEach(function(t){
        h+='<div class="item" style="border-right-color: var(--red);"><b>'+t.name+'</b> <span style="font-size:10px; color:var(--red);">(دائرة '+t.radius+'م)</span>'+
           '<button class="btn red sm" style="display:inline-block;width:auto;padding:2px 8px;margin:0;float:left" onclick="delRestricted('+t.id+')">🗑️</button></div>';
    });
    el.innerHTML=h;
}

function exportData(){var blob=new Blob([JSON.stringify(DB,null,2)],{type:"application/json"});var a=document.createElement("a");a.href=URL.createObjectURL(blob);a.download="arty_backup.json";a.click();}
function importData(){$("fileIn").click();}
$("fileIn").addEventListener("change",function(e){var f=e.target.files[0];if(!f)return;var r=new FileReader();r.onload=function(ev){try{DB=JSON.parse(ev.target.result);save();boot();alert("✔");}catch(err){alert("✗");}};r.readAsText(f);});
function resetAll(){if(!confirm("حذف كل البيانات؟"))return;localStorage.removeItem("ARTY_DB");location.reload();}

load();