import * as THREE from 'three';
import WebGL from 'three/addons/capabilities/WebGL.js';
import { TextGeometry } from 'three/addons/geometries/TextGeometry.js';
import { FontLoader } from 'three/addons/loaders/FontLoader.js';

// Configuración del renderizador
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Configuración de la cámara
const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 500);
camera.position.set(0, 0, 50); // Ajusta la posición de la cámara
camera.lookAt(0, 0, 0);

// Creación de la escena
const scene = new THREE.Scene();

// Creación de la línea azul
const material = new THREE.LineBasicMaterial({ color: 0x0000ff });
const points = [];
points.push(new THREE.Vector3(-10, 0, 0));
points.push(new THREE.Vector3(0, 10, 0));
points.push(new THREE.Vector3(10, 0, 0));
const geometry = new THREE.BufferGeometry().setFromPoints(points);
const line = new THREE.Line(geometry, material);
scene.add(line);

// Creación del cubo verde
const geometryCube = new THREE.BoxGeometry(1, 1, 1);
const materialCube = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
const cube = new THREE.Mesh(geometryCube, materialCube);
cube.position.set(9, 3, 20); // Posición del cubo
scene.add(cube);

//add text:
const loader = new FontLoader();

loader.load('https://threejs.org/examples/fonts/helvetiker_regular.typeface.json', function (font) {

  const geometrytxt = new TextGeometry('Hello three.js!', {
    font: font,
    size: 5, // Tamaño del texto aumentado
    depth: 0.5, // Profundidad del texto
    curveSegments: 12,
    bevelEnabled: true,
    bevelThickness: 0.1, // Grosor del bisel reducido
    bevelSize: 0.1, // Tamaño del bisel reducido
    bevelOffset: 0,
    bevelSegments: 5
  });

  const materialtxt = new THREE.MeshBasicMaterial({ color: 0x00ff00 });

  const txt = new THREE.Mesh(geometrytxt, materialtxt);
  txt.position.set(-20, 0, 0);
  scene.add(txt);
});





// Función de animación
function animate() {
  cube.rotation.x += 0.01;
  cube.rotation.y += 0.01;
  renderer.render(scene, camera);
}

// Verificación de soporte para WebGL
if (WebGL.isWebGLAvailable()) {
  renderer.setAnimationLoop(animate);
} else {
  const warning = WebGL.getWebGLErrorMessage();
  document.getElementById('container').appendChild(warning);
}