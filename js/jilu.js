var matArrayB = new THREE.MeshBasicMaterial( { color: 0XECF1F3});
var  right_wall = returnWallObject(40, 90, 6,1,matArrayB,-95,45,98);
var right_cube = returnWallObject(40, 90, 6, 0, matArrayB, -95,45,98);
//茶色：0x58ACFA   透明玻璃色：0XECF1F3
var glass_material=new THREE.MeshBasicMaterial( { color: 0XECF1F3});
glass_material.opacity=0.4;
glass_material.transparent = true;
createCubeWall(40, 90, 6, 0, glass_material, -95,45,98);

var door = createResultBsp(right_wall, right_cube, 1);

function createResultBsp(bsp,less_bsp,mat){    
  var material = new THREE.MeshPhongMaterial({ color: 0xafc0ca, specular: 0xafc0ca, shininess: 30, transparent: true, opacity: 1 });
  var sphere1BSP = new ThreeBSP(bsp);  
  var cube2BSP = new ThreeBSP(less_bsp);//0x9cb2d1 淡紫,0xC3C3C3 白灰 , 0xafc0ca灰
  var resultBSP = sphere1BSP.subtract(cube2BSP);  
    
  var result = resultBSP.toMesh(material); 
  result.material.flatshading = THREE.FlatShading;  
  result.geometry.computeFaceNormals();  //重新计算几何体侧面法向量
  result.geometry.computeVertexNormals();  
  result.material.needsUpdate = true;  //更新纹理
  result.geometry.buffersNeedUpdate = true;  
  result.geometry.uvsNeedUpdate = true;  
  scene.add(result);     
}

//返回墙对象
function returnWallObject(width, height, depth,angle,material,x,y,z){
  var cubeGeometry = new THREE.BoxGeometry(width, height, depth);     
      var cube = new THREE.Mesh( cubeGeometry, material );  
      cube.position.x = x;  
      cube.position.y = y;  
      cube.position.z = z;  
      cube.rotation.y += angle*Math.PI;    
      return cube;
}
   //创建墙
function createCubeWall(width, height, depth,angle,material,x,y,z){
var cubeGeometry = new THREE.BoxGeometry(width, height, depth );     
   var cube = new THREE.Mesh( cubeGeometry, material );  
   cube.position.x = x;  
   cube.position.y = y;  
   cube.position.z = z;  
   cube.rotation.y += angle*Math.PI;  //-逆时针旋转,+顺时针
   scene.add(cube);  
}