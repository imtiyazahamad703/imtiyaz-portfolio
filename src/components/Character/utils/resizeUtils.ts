import * as THREE from "three";

export default function handleResize(
  renderer: THREE.WebGLRenderer,
  camera: THREE.PerspectiveCamera,
  canvasDiv: React.RefObject<HTMLDivElement>,
  character: THREE.Object3D
) {
  if (!canvasDiv.current) return;
  let canvas3d = canvasDiv.current.getBoundingClientRect();
  const width = canvas3d.width;
  const height = canvas3d.height;
  renderer.setSize(width, height);
  camera.aspect = width / height;

  if (window.innerWidth < 768) {
    camera.position.z = 24; // Reverted size back to normal
    camera.position.y = 4.5; // Raised camera up to push the avatar down, revealing the head
  } else {
    camera.position.z = 22; // Default desktop distance
    camera.position.y = 3;
  }

  camera.updateProjectionMatrix();
}
