function calcFire(){
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

  var bat=getCurrentBat();if(!bat){alert("اختر بطارية");return;}
  var w=getCurrentWeapon();if(!w){alert("اختر سلاح");return;}
  var wt=DB.weapons[w.type];if(!wt){alert("جداول السلاح غير موجودة");return;}
  var ll=readMGRS('t');if(!ll){alert("أدخل إحداثيات MGRS كاملة (Zone, Square, Easting, Northing)");return;}

  var tLat = ll.lat, tLon = ll.lon;
  var baseRange=dist(w.lat,w.lon,tLat,tLon);
  var baseAzMil=toMil(bearing(w.lat,w.lon,tLat,tLon));

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
  
  if(!charge) { alert("لا توجد حشوات لهذا السلاح."); return; }
  if(!charge.pts || charge.pts.length === 0) { alert("الحشوة المختارة لا تحتوي على أي بيانات."); return; }

  var basePoint = interp(charge.pts, baseRange);
  if(!basePoint){alert("لا توجد بيانات في الجدول لهذا المدى");return;}

  var temp = parseFloat($("cTemp").value) || 15;
  var press = parseFloat($("cPress").value) || 750;
  var chargeTemp = parseFloat($("cChargeTemp").value) || 15;
  var headWind = parseFloat($("cHeadWind").value) || 0;
  var crossWind = parseFloat($("cCrossWind").value) || 0;
  var mvPct = parseFloat($("cMVPercent").value) || 0;
  var weightMark = parseFloat($("cWeightMark").value) || 0;
  var heightDiff = parseFloat($("cHeightDiff").value) || 0;

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
  if(!finalPoint){alert("المدى المصحح خارج نطاق الجدول");return;}

  var windDeflCorr = (crossWind / 10) * (finalPoint.dZw || 0);
  var finalDefl = (baseAzMil + (finalPoint.Z || 0) + windDeflCorr + MILS) % MILS;

  var aimPost = w.shakhes || 6000; 
  var diff = finalDefl - aimPost;
  if (diff > MILS/2) diff -= MILS;
  if (diff < -MILS/2) diff += MILS;
  
  var isRight = diff >= 0;
  var isWithinLimit = false;
  if (isRight && diff <= w.limitR) isWithinLimit = true;
  if (!isRight && Math.abs(diff) <= w.limitL) isWithinLimit = true;

  var isOptimalElev = (finalPoint.e1_comp >= 350 && finalPoint.e1_comp <= 550);

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
}