import * as THREE from "three";
import { DRACOLoader, GLTF, GLTFLoader } from "three-stdlib";

const setCharacter = (
  renderer: THREE.WebGLRenderer,
  scene: THREE.Scene,
  camera: THREE.PerspectiveCamera
) => {
  const loader = new GLTFLoader();
  const dracoLoader = new DRACOLoader();
  dracoLoader.setDecoderPath("/draco/");
  loader.setDRACOLoader(dracoLoader);

  const loadModels = async (): Promise<{ wavingGltf: GLTF, standingGltf: GLTF }> => {
    try {
      const wavingGltf = await loader.loadAsync("/models/imtiyaz_waving.glb");
      const standingGltf = await loader.loadAsync("/models/imtiyaz_standing.glb");
      
      const prepareModel = (character: THREE.Group) => {
        character.traverse((child: any) => {
          if (child.isMesh) {
            const mesh = child as THREE.Mesh;
            mesh.castShadow = true;
            mesh.receiveShadow = true;
            mesh.frustumCulled = true;
          }
        });
      }

      prepareModel(wavingGltf.scene);
      prepareModel(standingGltf.scene);
      
      await renderer.compileAsync(wavingGltf.scene, camera, scene);
      await renderer.compileAsync(standingGltf.scene, camera, scene);
      
      dracoLoader.dispose();
      return { wavingGltf, standingGltf };
    } catch (error) {
      console.error("Error loading GLTF models:", error);
      throw error;
    }
  };

  return { loadModels };
};

export default setCharacter;
