import * as THREE from "three";
import { GLTF, GLTFLoader } from "three-stdlib";

const setCharacter = (
  renderer: THREE.WebGLRenderer,
  scene: THREE.Scene,
  camera: THREE.PerspectiveCamera
) => {
  const loader = new GLTFLoader();

  const prepareModel = (character: THREE.Group) => {
    character.traverse((child: any) => {
      if (child.isMesh) {
        const mesh = child as THREE.Mesh;
        mesh.castShadow = true;
        mesh.receiveShadow = true;
        mesh.frustumCulled = true;
      }
    });
  };

  const loadWavingModel = async (): Promise<GLTF> => {
    try {
      const wavingGltf = await loader.loadAsync("/models/imtiyaz_waving.glb");
      prepareModel(wavingGltf.scene);
      await renderer.compileAsync(wavingGltf.scene, camera, scene);
      return wavingGltf;
    } catch (error) {
      console.error("Error loading waving model:", error);
      throw error;
    }
  };

  const loadStandingModel = async (): Promise<GLTF> => {
    try {
      const standingGltf = await loader.loadAsync("/models/imtiyaz_standing.glb");
      prepareModel(standingGltf.scene);
      await renderer.compileAsync(standingGltf.scene, camera, scene);
      return standingGltf;
    } catch (error) {
      console.error("Error loading standing model:", error);
      throw error;
    }
  };

  return { loadWavingModel, loadStandingModel };
};

export default setCharacter;
