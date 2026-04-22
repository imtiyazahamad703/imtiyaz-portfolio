import * as THREE from "three";
import { RGBELoader } from "three-stdlib";
import { gsap } from "gsap";

const setLighting = (scene: THREE.Scene) => {
  const lightsToRemove: THREE.Object3D[] = [];
  scene.children.forEach(child => {
    if ((child as any).isLight) lightsToRemove.push(child);
  });
  lightsToRemove.forEach(light => scene.remove(light));
  scene.environment = null; // Clear lingering HDR environment from HMR

  // Main key light (sun-like) coming from the front-right
  const directionalLight = new THREE.DirectionalLight(0xffffff, 0);
  directionalLight.intensity = 0;
  // Positioned in FRONT of the character (z=5) so the face is lit!
  directionalLight.position.set(2, 5, 5);
  directionalLight.castShadow = true;
  directionalLight.shadow.mapSize.width = 1024;
  directionalLight.shadow.mapSize.height = 1024;
  directionalLight.shadow.camera.near = 0.5;
  directionalLight.shadow.camera.far = 50;
  scene.add(directionalLight);

  // Removed the pink pointLight completely per user request


  // Fill light to soften shadows (sky color, ground color, intensity)
  const hemiLight = new THREE.HemisphereLight(0xffffff, 0x444444, 0); 
  scene.add(hemiLight);

  // Ambient light to ensure no part of the face is completely black
  const ambientLight = new THREE.AmbientLight(0xffffff, 0);
  scene.add(ambientLight);

  function setPointLight() {
    // Removed point light
  }
  
  const duration = 2;
  const ease = "power2.inOut";
  
  function turnOnLights() {
    gsap.to(hemiLight, {
      intensity: 1.5, // Brighter fill light
      duration: duration,
      ease: ease,
    });
    gsap.to(ambientLight, {
      intensity: 1.0, // Base brightness for everything
      duration: duration,
      ease: ease,
    });
    gsap.to(directionalLight, {
      intensity: 2.5, // Strong front light for the face
      duration: duration,
      ease: ease,
    });
  }

  return { setPointLight, turnOnLights };
};

export default setLighting;
