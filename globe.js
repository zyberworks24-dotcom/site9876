/* Zyberworks — AU/NZ globe background. Renders into #globe-bg when THREE is present.
   Self-contained, non-interactive (pointer-events:none), reduced-motion aware. */
(function(){
  var canvas = document.getElementById('globe-bg');
  if (!canvas || !window.THREE) return;

  var reduced = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var W = window.innerWidth, H = window.innerHeight;
  var isSmall = W < 820;

  var renderer = new THREE.WebGLRenderer({canvas:canvas, antialias:true, alpha:true, powerPreference:'high-performance'});
  renderer.setPixelRatio(Math.min(window.devicePixelRatio||1, 2));
  renderer.setSize(W, H, false);

  var scene = new THREE.Scene();
  var camera = new THREE.PerspectiveCamera(42, W/H, 0.1, 100);
  camera.position.set(0, 0, 3.05);

  function ll(lat, lng, r){
    r = r || 1;
    var phi = (90 - lat) * Math.PI/180, theta = (lng + 180) * Math.PI/180;
    return new THREE.Vector3(-r*Math.sin(phi)*Math.cos(theta), r*Math.cos(phi), r*Math.sin(phi)*Math.sin(theta));
  }
  function spriteTexture(inner){
    var c=document.createElement('canvas'); c.width=c.height=64; var g=c.getContext('2d');
    var grd=g.createRadialGradient(32,32,0,32,32,32);
    grd.addColorStop(0,inner); grd.addColorStop(0.35,inner); grd.addColorStop(1,'rgba(0,0,0,0)');
    g.fillStyle=grd; g.beginPath(); g.arc(32,32,32,0,Math.PI*2); g.fill();
    var t=new THREE.CanvasTexture(c); t.needsUpdate=true; return t;
  }
  function pointInPoly(x,y,poly){
    var inside=false;
    for (var i=0,j=poly.length-1;i<poly.length;j=i++){
      var xi=poly[i][0],yi=poly[i][1],xj=poly[j][0],yj=poly[j][1];
      if (((yi>y)!==(yj>y)) && (x < (xj-xi)*(y-yi)/(yj-yi)+xi)) inside=!inside;
    }
    return inside;
  }

  var AUS=[[142.5,-10.9],[143.5,-13.5],[145.3,-15.0],[146.2,-18.5],[148.9,-20.5],[149.9,-22.5],[152.9,-25.2],[153.6,-28.6],[153.1,-30.3],[152.5,-32.6],[151.6,-33.0],[150.8,-35.2],[149.9,-37.5],[147.8,-38.0],[146.3,-38.8],[144.7,-38.4],[143.6,-38.9],[141.6,-38.4],[140.0,-37.9],[139.7,-36.9],[139.8,-35.6],[137.5,-35.7],[136.9,-35.3],[137.4,-34.1],[135.2,-34.7],[134.2,-32.6],[132.2,-32.0],[129.0,-31.7],[126.1,-32.3],[123.6,-33.9],[120.0,-33.9],[116.0,-34.9],[115.0,-33.8],[114.9,-31.9],[113.8,-26.5],[114.6,-22.5],[117.2,-20.7],[121.6,-19.5],[123.6,-17.0],[126.4,-14.0],[129.5,-14.8],[130.6,-12.4],[132.6,-11.5],[135.9,-12.2],[136.9,-14.0],[135.7,-15.5],[137.0,-16.5],[139.4,-17.4],[140.9,-17.7],[141.6,-15.0],[141.5,-12.9],[142.5,-10.9]];
  var TAS=[[144.7,-40.7],[146.3,-41.2],[148.3,-40.9],[148.3,-42.1],[147.9,-43.6],[146.9,-43.6],[145.5,-42.9],[145.0,-42.0],[144.7,-40.7]];
  var NZN=[[172.7,-34.4],[173.9,-35.2],[174.8,-36.4],[175.6,-37.2],[176.9,-37.6],[178.5,-37.6],[178.3,-38.6],[177.1,-39.3],[176.9,-40.4],[175.3,-41.6],[174.9,-41.3],[174.7,-40.0],[173.9,-39.5],[173.0,-39.1],[173.1,-37.5],[172.7,-36.0],[172.7,-34.4]];
  var NZS=[[172.6,-40.5],[174.3,-41.7],[173.8,-42.5],[172.0,-42.7],[171.4,-44.0],[169.8,-44.1],[168.0,-46.2],[166.5,-45.9],[166.7,-45.0],[168.5,-44.0],[170.0,-43.0],[171.0,-42.4],[172.0,-41.3],[172.6,-40.5]];
  var LANDS=[AUS,TAS,NZN,NZS];

  var AFRICA=[[-17,21],[-16,15],[-17,14],[-16,12],[-13,9],[-8,5],[-4,5],[4,6],[9,4],[9,2],[13,-1],[9,-1],[12,-6],[14,-11],[12,-17],[15,-23],[18,-29],[20,-34],[26,-34],[27,-32],[32,-26],[33,-22],[35,-19],[40,-15],[40,-11],[42,-2],[41,4],[48,5],[51,11],[44,11],[40,15],[37,15],[38,18],[34,24],[33,28],[32,31],[28,31],[20,31],[15,32],[11,34],[10,37],[3,36],[-1,36],[-6,35],[-9,32],[-9,30],[-13,28],[-16,24],[-17,21]];
  var EUROPE=[[-9,44],[-9,39],[-6,37],[0,39],[3,42],[8,44],[8,40],[16,41],[18,40],[16,44],[20,42],[23,40],[27,41],[28,45],[31,46],[40,46],[40,50],[38,55],[30,60],[25,60],[24,66],[21,70],[15,68],[12,66],[10,64],[5,62],[7,58],[10,57],[8,54],[4,52],[0,49],[-2,49],[-5,48],[-9,44]];
  var ASIA=[[27,41],[40,46],[48,47],[52,42],[48,38],[49,30],[57,25],[60,25],[67,24],[70,22],[73,19],[77,8],[80,6],[80,13],[85,20],[87,21],[90,22],[92,21],[99,10],[104,9],[106,10],[109,11],[108,16],[106,20],[110,21],[113,22],[117,24],[120,24],[122,30],[121,38],[126,40],[129,42],[130,43],[135,35],[140,36],[142,40],[143,44],[135,48],[142,53],[156,52],[160,60],[170,62],[170,66],[180,66],[180,70],[160,70],[140,73],[130,73],[110,74],[100,77],[90,76],[75,73],[68,73],[55,71],[50,69],[48,66],[40,66],[33,66],[30,62],[38,55],[40,50],[40,46],[31,46],[28,45],[27,41]];
  var NAM=[[-168,66],[-162,70],[-140,70],[-125,70],[-100,69],[-85,70],[-80,73],[-73,68],[-78,60],[-64,60],[-57,52],[-65,47],[-70,42],[-74,40],[-76,35],[-81,25],[-90,22],[-97,22],[-97,26],[-107,24],[-115,30],[-118,33],[-123,39],[-124,46],[-130,52],[-137,57],[-146,60],[-155,58],[-162,58],[-166,62],[-168,66]];
  var CAM=[[-97,16],[-92,15],[-88,16],[-84,10],[-83,8],[-80,8],[-78,8],[-83,14],[-90,16],[-95,16],[-97,16]];
  var SAM=[[-81,7],[-77,8],[-72,11],[-64,10],[-61,6],[-52,5],[-50,0],[-44,-2],[-38,-5],[-35,-8],[-39,-13],[-41,-18],[-48,-25],[-53,-34],[-58,-38],[-62,-40],[-65,-45],[-68,-50],[-70,-54],[-74,-52],[-73,-45],[-73,-38],[-71,-30],[-70,-20],[-76,-14],[-80,-6],[-81,-2],[-80,2],[-77,4],[-81,7]];
  var GREENLAND=[[-45,60],[-42,64],[-40,66],[-30,68],[-22,70],[-20,74],[-25,78],[-35,82],[-45,83],[-58,82],[-62,80],[-55,76],[-53,70],[-50,64],[-45,60]];
  var UK=[[-8,55],[-6,58],[-3,58],[-2,54],[0,52],[-5,50],[-8,52],[-10,52],[-8,55]];
  var SEA=[[95,6],[100,3],[105,0],[112,-3],[120,-2],[130,-3],[140,-3],[141,-9],[130,-8],[118,-9],[105,-8],[100,-2],[95,6]];
  var JAPAN=[[130,32],[136,34],[140,36],[142,40],[141,42],[138,37],[135,34],[131,31],[130,32]];
  var MADA=[[43,-12],[50,-15],[50,-25],[45,-25],[43,-18],[43,-12]];
  var CONTINENTS=[AFRICA,EUROPE,ASIA,NAM,CAM,SAM,GREENLAND,UK,SEA,JAPAN,MADA];

  var CITIES=[
    {n:'Sydney',lat:-33.87,lng:151.21,hub:true},{n:'Melbourne',lat:-37.81,lng:144.96},
    {n:'Brisbane',lat:-27.47,lng:153.03},{n:'Perth',lat:-31.95,lng:115.86},
    {n:'Adelaide',lat:-34.93,lng:138.60},{n:'Canberra',lat:-35.28,lng:149.13},
    {n:'Auckland',lat:-36.85,lng:174.76},{n:'Wellington',lat:-41.29,lng:174.78}
  ];

  var spin=new THREE.Group(), orient=new THREE.Group();
  spin.add(orient); scene.add(spin);

  var halo=new THREE.Sprite(new THREE.SpriteMaterial({map:spriteTexture('rgba(41,151,255,0.5)'),transparent:true,blending:THREE.AdditiveBlending,depthWrite:false,depthTest:false,opacity:0.4}));
  halo.scale.set(3.6,3.6,1); halo.renderOrder=-2; scene.add(halo);

  orient.add(new THREE.Mesh(new THREE.SphereGeometry(0.99,64,64), new THREE.MeshBasicMaterial({color:0x080b12})));

  (function(){
    var pts=[]; function lineLat(lat){var p=null;for(var lng=-180;lng<=180;lng+=4){var v=ll(lat,lng,1.001);if(p)pts.push(p.x,p.y,p.z,v.x,v.y,v.z);p=v;}}
    function lineLng(lng){var p=null;for(var lat=-88;lat<=88;lat+=4){var v=ll(lat,lng,1.001);if(p)pts.push(p.x,p.y,p.z,v.x,v.y,v.z);p=v;}}
    for(var la=-60;la<=60;la+=15)lineLat(la); for(var lo=-180;lo<180;lo+=15)lineLng(lo);
    var g=new THREE.BufferGeometry(); g.setAttribute('position',new THREE.Float32BufferAttribute(pts,3));
    orient.add(new THREE.LineSegments(g,new THREE.LineBasicMaterial({color:0x1d3452,transparent:true,opacity:0.13})));
  })();

  function inAUNZ(lng,lat){return pointInPoly(lng,lat,AUS)||pointInPoly(lng,lat,TAS)||pointInPoly(lng,lat,NZN)||pointInPoly(lng,lat,NZS);}

  (function(){
    var step=isSmall?2.6:2.0, pos=[];
    for(var lng=-180;lng<180;lng+=step){for(var lat=-84;lat<=84;lat+=step){
      var land=false; if(lat<-68)land=true; else{for(var k=0;k<CONTINENTS.length;k++){if(pointInPoly(lng,lat,CONTINENTS[k])){land=true;break;}}}
      if(land&&!inAUNZ(lng,lat)){var v=ll(lat,lng,1.004);pos.push(v.x,v.y,v.z);}
    }}
    var g=new THREE.BufferGeometry(); g.setAttribute('position',new THREE.Float32BufferAttribute(pos,3));
    orient.add(new THREE.Points(g,new THREE.PointsMaterial({size:isSmall?0.018:0.014,map:spriteTexture('rgba(150,185,225,0.9)'),transparent:true,blending:THREE.AdditiveBlending,depthWrite:false,color:0x8ea6c6,opacity:0.36,sizeAttenuation:true})));
  })();

  (function(){
    var step=isSmall?1.0:0.66, pos=[];
    function fill(poly,a,b,c,d){for(var lng=a;lng<=b;lng+=step){for(var lat=c;lat<=d;lat+=step){if(pointInPoly(lng,lat,poly)){var v=ll(lat,lng,1.009);pos.push(v.x,v.y,v.z);}}}}
    fill(AUS,112,154,-44,-9);fill(TAS,144,149,-44,-40);fill(NZN,172,179,-42,-34);fill(NZS,166,175,-47,-40);
    var g=new THREE.BufferGeometry(); g.setAttribute('position',new THREE.Float32BufferAttribute(pos,3));
    orient.add(new THREE.Points(g,new THREE.PointsMaterial({size:isSmall?0.03:0.025,map:spriteTexture('rgba(130,228,255,0.98)'),transparent:true,blending:THREE.AdditiveBlending,depthWrite:false,color:0x8fe4ff,opacity:0.92,sizeAttenuation:true})));
  })();

  (function(){
    var seg=[]; LANDS.forEach(function(poly){for(var i=0;i<poly.length-1;i++){var a=ll(poly[i][1],poly[i][0],1.011),b=ll(poly[i+1][1],poly[i+1][0],1.011);seg.push(a.x,a.y,a.z,b.x,b.y,b.z);}});
    var g=new THREE.BufferGeometry(); g.setAttribute('position',new THREE.Float32BufferAttribute(seg,3));
    orient.add(new THREE.LineSegments(g,new THREE.LineBasicMaterial({color:0x8fe4ff,transparent:true,opacity:0.5})));
  })();

  var markerTex=spriteTexture('rgba(160,235,255,1)'), markerHubTex=spriteTexture('rgba(210,180,255,1)'), markers=[];
  CITIES.forEach(function(c){
    var s=new THREE.Sprite(new THREE.SpriteMaterial({map:c.hub?markerHubTex:markerTex,transparent:true,blending:THREE.AdditiveBlending,depthWrite:false,opacity:0.9}));
    s.position.copy(ll(c.lat,c.lng,1.02)); var base=c.hub?0.07:0.046; s.scale.set(base,base,1);
    s.userData={base:base,phase:Math.random()*Math.PI*2}; orient.add(s); markers.push(s);
  });

  var travelers=[];
  (function(){
    var a=ll(CITIES[0].lat,CITIES[0].lng,1.0);
    CITIES.slice(1).forEach(function(c){
      var b=ll(c.lat,c.lng,1.0), mid=a.clone().add(b).multiplyScalar(0.5), lift=1.0+a.distanceTo(b)*0.42;
      mid.normalize().multiplyScalar(lift);
      var curve=new THREE.QuadraticBezierCurve3(a.clone().multiplyScalar(1.01),mid,b.clone().multiplyScalar(1.01));
      var g=new THREE.BufferGeometry().setFromPoints(curve.getPoints(50));
      orient.add(new THREE.Line(g,new THREE.LineBasicMaterial({color:0x3aa0ff,transparent:true,opacity:0.28})));
      var tv=new THREE.Sprite(new THREE.SpriteMaterial({map:markerTex,transparent:true,blending:THREE.AdditiveBlending,depthWrite:false,opacity:0.85}));
      tv.scale.set(0.04,0.04,1); tv.userData={curve:curve,t:Math.random(),speed:0.12+Math.random()*0.08}; orient.add(tv); travelers.push(tv);
    });
  })();

  (function(){
    var v0=ll(-30,145,1), rotY=-Math.atan2(v0.x,v0.z), h=Math.hypot(v0.x,v0.z), rotX=Math.atan2(v0.y,h);
    var qy=new THREE.Quaternion().setFromAxisAngle(new THREE.Vector3(0,1,0),rotY);
    var qx=new THREE.Quaternion().setFromAxisAngle(new THREE.Vector3(1,0,0),rotX);
    orient.quaternion.copy(qx.multiply(qy));
  })();

  spin.position.x=isSmall?0.0:0.5; spin.position.y=isSmall?-0.22:0.0; halo.position.copy(spin.position);
  spin.scale.setScalar(isSmall?1.02:1.2);

  (function(){
    var n=isSmall?240:460, arr=[];
    for(var i=0;i<n;i++){var v=new THREE.Vector3((Math.random()-0.5),(Math.random()-0.5),(Math.random()-0.5)).normalize().multiplyScalar(8+Math.random()*10);arr.push(v.x,v.y,v.z);}
    var g=new THREE.BufferGeometry(); g.setAttribute('position',new THREE.Float32BufferAttribute(arr,3));
    scene.add(new THREE.Points(g,new THREE.PointsMaterial({size:0.05,color:0xbcd4f5,transparent:true,opacity:0.45,depthWrite:false})));
  })();

  var scrollFrac=0,tX=0,tY=0,cX=0,cY=0;
  function onScroll(){var max=(document.body.scrollHeight-window.innerHeight)||1;scrollFrac=Math.min(1,Math.max(0,window.scrollY/max));}
  window.addEventListener('scroll',onScroll,{passive:true}); onScroll();
  if(!isSmall){window.addEventListener('pointermove',function(e){tY=(e.clientX/window.innerWidth-0.5)*0.24;tX=(e.clientY/window.innerHeight-0.5)*0.16;});}
  window.addEventListener('resize',function(){W=window.innerWidth;H=window.innerHeight;renderer.setSize(W,H,false);camera.aspect=W/H;camera.updateProjectionMatrix();});

  var t0=performance.now();
  function frame(now){
    var t=(now-t0)/1000;
    var ambientYaw=reduced?0:Math.sin(t*0.14)*0.04;
    var scrollYaw=scrollFrac*0.35;
    cX+=(tX-cX)*0.05; cY+=(tY-cY)*0.05;
    spin.rotation.y=ambientYaw+scrollYaw+cY;
    spin.rotation.x=-0.04+scrollFrac*0.12+cX;
    if(!reduced){
      for(var i=0;i<markers.length;i++){var mk=markers[i],s=mk.userData.base*(1+0.28*Math.sin(t*2.2+mk.userData.phase));mk.scale.set(s,s,1);}
      for(var j=0;j<travelers.length;j++){var tv=travelers[j];tv.userData.t+=tv.userData.speed*0.016;if(tv.userData.t>1)tv.userData.t-=1;tv.userData.curve.getPoint(tv.userData.t,tv.position);tv.material.opacity=0.8*Math.sin(tv.userData.t*Math.PI);}
    }
    renderer.render(scene,camera);
    requestAnimationFrame(frame);
  }
  requestAnimationFrame(frame);
})();
