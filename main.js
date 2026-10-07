import * as THREE from 'three';
import { PointerLockControls } from 'three/examples/jsm/controls/PointerLockControls.js';

// Setup Scene, Camera, Renderer
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x87ceeb); // Sky blue
scene.fog = new THREE.FogExp2(0x87ceeb, 0.02);

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.y = 2; // Player height

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);
// Simple shadows
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
document.body.appendChild(renderer.domElement);

// Setup Controls
const controls = new PointerLockControls(camera, renderer.domElement);
const crosshair = document.getElementById('crosshair');

document.addEventListener('click', () => {
    if (!controls.isLocked) {
        controls.lock();
    }
});

controls.addEventListener('lock', () => {
    crosshair.style.display = 'block';
});

controls.addEventListener('unlock', () => {
    crosshair.style.display = 'none';
});

scene.add(controls.getObject());

// Lighting
const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
scene.add(ambientLight);

const dirLight = new THREE.DirectionalLight(0xffffff, 0.8);
dirLight.position.set(100, 150, 50);
dirLight.castShadow = true;
dirLight.shadow.camera.top = 100;
dirLight.shadow.camera.bottom = -100;
dirLight.shadow.camera.left = -100;
dirLight.shadow.camera.right = 100;
scene.add(dirLight);

// Comic Style Material Helper (Toon Shading)
// We use a custom gradient map to give that stepped lighting effect
const format = (renderer.capabilities.isWebGL2) ? THREE.RedFormat : THREE.LuminanceFormat;
const colors = new Uint8Array([0, 80, 160, 255]); // 4 steps
const gradientMap = new THREE.DataTexture(colors, colors.length, 1, format);
gradientMap.needsUpdate = true;
gradientMap.magFilter = THREE.NearestFilter;
gradientMap.minFilter = THREE.NearestFilter;

// Environment: Terrain
const terrainGeometry = new THREE.PlaneGeometry(200, 200, 32, 32);
// Add some noise to terrain (simple hills)
const pos = terrainGeometry.attributes.position;
for (let i = 0; i < pos.count; i++) {
    const x = pos.getX(i);
    const y = pos.getY(i);
    // Simple pseudo-random hills
    let z = Math.sin(x * 0.1) * Math.cos(y * 0.1) * 2;
    z += Math.sin(x * 0.03) * Math.cos(y * 0.04) * 5;
    pos.setZ(i, z);
}
terrainGeometry.computeVertexNormals();

const terrainMaterial = new THREE.MeshToonMaterial({ 
    color: 0x55aa55, 
    gradientMap: gradientMap 
});
const terrain = new THREE.Mesh(terrainGeometry, terrainMaterial);
terrain.rotation.x = -Math.PI / 2;
terrain.receiveShadow = true;
scene.add(terrain);

// Environment: Trees (InstancedMesh for performance)
const treeCount = 200;
const trunkGeometry = new THREE.CylinderGeometry(0.2, 0.4, 2, 8);
const leavesGeometry = new THREE.ConeGeometry(1.5, 3, 8);
trunkGeometry.translate(0, 1, 0); // Origin at bottom
leavesGeometry.translate(0, 3, 0);

const trunkMaterial = new THREE.MeshToonMaterial({ color: 0x8B4513, gradientMap: gradientMap });
const leavesMaterial = new THREE.MeshToonMaterial({ color: 0x228B22, gradientMap: gradientMap });

// Create instanced meshes
const trunkMesh = new THREE.InstancedMesh(trunkGeometry, trunkMaterial, treeCount);
const leavesMesh = new THREE.InstancedMesh(leavesGeometry, leavesMaterial, treeCount);
trunkMesh.castShadow = true;
trunkMesh.receiveShadow = true;
leavesMesh.castShadow = true;
leavesMesh.receiveShadow = true;

const dummy = new THREE.Object3D();
for (let i = 0; i < treeCount; i++) {
    const x = (Math.random() - 0.5) * 180;
    const z = (Math.random() - 0.5) * 180;
    
    // Find height at x, z roughly
    let y = Math.sin(x * 0.1) * Math.cos(z * 0.1) * 2;
    y += Math.sin(x * 0.03) * Math.cos(z * 0.04) * 5;

    dummy.position.set(x, y, z);
    // Random scale and rotation
    const scale = 0.5 + Math.random() * 0.8;
    dummy.scale.set(scale, scale, scale);
    dummy.rotation.y = Math.random() * Math.PI * 2;
    dummy.updateMatrix();

    trunkMesh.setMatrixAt(i, dummy.matrix);
    leavesMesh.setMatrixAt(i, dummy.matrix);
}
scene.add(trunkMesh);
scene.add(leavesMesh);


// Basic Outline helper (Inverted Hull technique)
// Add outline to terrain (not doing instanced trees for simplicity right now)
const outlineMat = new THREE.MeshBasicMaterial({
    color: 0x000000,
    side: THREE.BackSide
});
const thickness = 0.2;
const outlineGeo = terrain.geometry.clone();
const outlinePos = outlineGeo.attributes.position;
const norm = outlineGeo.attributes.normal;
for(let i=0; i<outlinePos.count; i++) {
    outlinePos.setXYZ(
        i, 
        outlinePos.getX(i) + norm.getX(i) * thickness,
        outlinePos.getY(i) + norm.getY(i) * thickness,
        outlinePos.getZ(i) + norm.getZ(i) * thickness
    );
}
const outlineMesh = new THREE.Mesh(outlineGeo, outlineMat);
terrain.add(outlineMesh);


// Movement State
let moveForward = false;
let moveBackward = false;
let moveLeft = false;
let moveRight = false;
let canJump = false;

const velocity = new THREE.Vector3();
const direction = new THREE.Vector3();

const onKeyDown = function (event) {
    switch (event.code) {
        case 'ArrowUp':
        case 'KeyW':
            moveForward = true;
            break;
        case 'ArrowLeft':
        case 'KeyA':
            moveLeft = true;
            break;
        case 'ArrowDown':
        case 'KeyS':
            moveBackward = true;
            break;
        case 'ArrowRight':
        case 'KeyD':
            moveRight = true;
            break;
        case 'Space':
            if (canJump === true) velocity.y += 15;
            canJump = false;
            break;
    }
};

const onKeyUp = function (event) {
    switch (event.code) {
        case 'ArrowUp':
        case 'KeyW':
            moveForward = false;
            break;
        case 'ArrowLeft':
        case 'KeyA':
            moveLeft = false;
            break;
        case 'ArrowDown':
        case 'KeyS':
            moveBackward = false;
            break;
        case 'ArrowRight':
        case 'KeyD':
            moveRight = false;
            break;
    }
};

document.addEventListener('keydown', onKeyDown);
document.addEventListener('keyup', onKeyUp);


// Resize handler
window.addEventListener('resize', onWindowResize, false);
function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}

// Animation Loop
const clock = new THREE.Clock();

function animate() {
    requestAnimationFrame(animate);

    const delta = clock.getDelta();

    if (controls.isLocked === true) {
        // Friction / Drag
        velocity.x -= velocity.x * 10.0 * delta;
        velocity.z -= velocity.z * 10.0 * delta;
        velocity.y -= 9.8 * 5.0 * delta; // Mass = 5.0 (gravity)

        direction.z = Number(moveForward) - Number(moveBackward);
        direction.x = Number(moveRight) - Number(moveLeft);
        direction.normalize();

        if (moveForward || moveBackward) velocity.z -= direction.z * 40.0 * delta;
        if (moveLeft || moveRight) velocity.x -= direction.x * 40.0 * delta;

        controls.moveRight(-velocity.x * delta);
        controls.moveForward(-velocity.z * delta);
        
        // Simple terrain collision (adjust camera height)
        const currentPos = controls.getObject().position;
        // Re-calculate terrain height at current pos
        let targetY = Math.sin(currentPos.x * 0.1) * Math.cos(currentPos.z * 0.1) * 2;
        targetY += Math.sin(currentPos.x * 0.03) * Math.cos(currentPos.z * 0.04) * 5;
        
        const playerHeight = 2.0;

        controls.getObject().position.y += velocity.y * delta; // apply vertical velocity

        if (controls.getObject().position.y < targetY + playerHeight) {
            velocity.y = 0;
            controls.getObject().position.y = targetY + playerHeight;
            canJump = true;
        }
    }

    renderer.render(scene, camera);
}

animate();
