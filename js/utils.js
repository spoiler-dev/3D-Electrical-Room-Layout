var utils = {
  makeShape: function () {
    var shape
	// 对输入的参数进行跟踪
    if (window.THREE && arguments.length) {
      var arry = arguments[0]
	 /**
     * 创建网格模型
     */
      shape = new THREE.Shape()
	  /**四条直线绘制一个矩形轮廓*/
      shape.moveTo(arry[0][0], arry[0][1]) // 起点
      for (var i=1; i<arry.length; i++) {
        shape.lineTo(arry[i][0], arry[i][1])
      }
      if (arguments.length > 1) {
        for (var i = 1; i < arguments.length; i ++) {
          var pathCoords = arguments[i]
          var path = new THREE.Path()
          path.moveTo(pathCoords[0][0], pathCoords[0][1])
          for (var i = 1; i < pathCoords.length; i++) {
            path.lineTo(pathCoords[i][0], pathCoords[i][1])
          }
          shape.holes.push(path)
        } 
      }
      return shape
    }else {
      console.error('Something wrong!')
    }
  },
  makeExtrudeGeometry: function (shape, amount) {
    var extrudeSetting = {
      steps: 1,
      amount: amount,
      bevelEnabled: false
    }
    // 这个物体将二维形状挤压到三维几何图形中。
    var geometry = new THREE.ExtrudeBufferGeometry(shape, extrudeSetting)
    geometry.rotateX( -0.5 * Math.PI)
    return geometry
  },
  makeShapeGeometry: function (shapeCoords) {
    var shape = this.makeShape(shapeCoords)
    var geometry = new THREE.ShapeGeometry(shape)
    return geometry
  },
  makeMesh: function (type, geometry, color,opacity) { 
    var material
    if (type === 'lambert') {
		// 材质
      material = new THREE.MeshLambertMaterial({color: color})
    } else if (type === 'phong') {
      material = new THREE.MeshPhongMaterial({ color: color })
    } else if (type === 'glass') {
      material = new THREE.MeshBasicMaterial( { color: color,opacity: opacity,transparent: true});
    } else {
      console.error('unrecognized type!')
    }
    
    mesh = new THREE.Mesh(geometry, material)

    mesh.castShadow = true
    mesh.receiveShadow = true

    return mesh
  },
  bsp: function (type,sphereBSP,cubeBSP) {   
    var resultBSP
    if (type === 'subtract') {
      resultBSP = sphereBSP.subtract(cubeBSP)
    } else if (type === 'intersect') {
      resultBSP = sphereBSP.intersect(cubeBSP)
    } else if (type === 'union') {
      resultBSP = sphereBSP.union(cubeBSP)
    } else {
      console.error('BSP-Type is wrong!')
    }

    return resultBSP
  },
  bspMesh: function (type,color,bsp) {
    // 从BSP对象内获取到处理完后的mesh模型数据
    var result = bsp.toMesh()
    // 更新模型的面和顶点的数据
    result.geometry.computeFaceNormals()
    result.geometry.computeVertexNormals()
    // 重新赋值一个纹理
    var material
    if (type === 'lambert') {
		// 材质
      material = new THREE.MeshLambertMaterial({color: color})
    } else if (type === 'phong') {
      material = new THREE.MeshPhongMaterial({color: color})
    } else {
      console.error('unrecognized type!')
    }
    result.material = material;

    return result
  }
  
}