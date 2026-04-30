import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { gsap } from "gsap";
import "./Character.css";
import setCharacter from "./utils/character";
import setLighting from "./utils/lighting";
import handleResize from "./utils/resizeUtils";
import {
  handleMouseMove,
  handleTouchEnd,
  handleHeadRotation,
  handleTouchMove,
} from "./utils/mouseUtils";

const Scene = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [showGreetingBubble, setShowGreetingBubble] = useState(false);
  const canvasDiv = useRef<HTMLDivElement | null>(null);
  const hoverDivRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef(new THREE.Scene());

  useEffect(() => {
    if (!canvasDiv.current) return;

    let rect = canvasDiv.current.getBoundingClientRect();
    let container = { width: rect.width, height: rect.height };
    const aspect = container.width / container.height;
    const scene = sceneRef.current;

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
    });
    renderer.setSize(container.width, container.height);
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1;
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.outputColorSpace = THREE.SRGBColorSpace;

    canvasDiv.current.appendChild(renderer.domElement);

    const camera = new THREE.PerspectiveCamera(14.5, aspect, 0.1, 1000);
    camera.position.set(0, 5, 20);
    camera.updateProjectionMatrix();

    let mixers: THREE.AnimationMixer[] = [];
    let headBone: THREE.Object3D | null = null;
    let heroGroup: THREE.Group | null = null;
    let animationStarted = false; // When true, mouse tracking starts

    const clock = new THREE.Clock();

    const light = setLighting(scene);
    light.turnOnLights(); // Turn on immediately

    let isMounted = true;
    const { loadWavingModel, loadStandingModel } = setCharacter(renderer, scene, camera);

    let mouse = { x: 0, y: 0 },
      interpolation = { x: 0.1, y: 0.2 };

    let isHoveringCanvas = false;
    let activeZone = 'NONE'; // Tracks if we are currently locked onto 'HEAD' or 'BODY'
    let canvasMouseX = 0;
    let canvasMouseY = 0;
    let targetBodyRotationY = 0;
    let targetHeadRotationX = 0;
    let targetHeadRotationY = 0;
    let currentHeadOffsetX = 0;
    let currentHeadOffsetY = 0;

    let raycaster = new THREE.Raycaster();
    let proxyMesh: THREE.Mesh | null = null;

    const onMouseMove = (event: MouseEvent) => {
      handleMouseMove(event, (x, y) => (mouse = { x, y }));
    };

    const onCanvasMouseEnter = () => { isHoveringCanvas = true; };
    const onCanvasMouseLeave = () => { 
      isHoveringCanvas = false; 
      activeZone = 'NONE'; // Reset tracking when leaving canvas
    };
    const onCanvasMouseMove = (e: MouseEvent) => {
      if (!canvasDiv.current) return;
      const rect = canvasDiv.current.getBoundingClientRect();
      canvasMouseX = ((e.clientX - rect.left) / rect.width) * 2 - 1; // -1 to 1 relative to canvas
      canvasMouseY = (e.clientY - rect.top) / rect.height; 
    };

    let debounce: number | undefined;
    const onTouchStart = (event: TouchEvent) => {
      const element = event.target as HTMLElement;
      debounce = window.setTimeout(() => {
        element?.addEventListener("touchmove", (e: TouchEvent) =>
          handleTouchMove(e, (x, y) => (mouse = { x, y }))
        );
      }, 200);
    };

    const onTouchEnd = () => {
      handleTouchEnd((x, y, interpolationX, interpolationY) => {
        mouse = { x, y };
        interpolation = { x: interpolationX, y: interpolationY };
      });
    };

    document.addEventListener("mousemove", onMouseMove);
    const landingDiv = document.getElementById("landingDiv");
    if (landingDiv) {
      landingDiv.addEventListener("touchstart", onTouchStart);
      landingDiv.addEventListener("touchend", onTouchEnd);
    }
    
    if (canvasDiv.current) {
      canvasDiv.current.addEventListener('mouseenter', onCanvasMouseEnter);
      canvasDiv.current.addEventListener('mouseleave', onCanvasMouseLeave);
      canvasDiv.current.addEventListener('mousemove', onCanvasMouseMove);
    }

    // Start loading standing model in parallel in the background
    const standingPromise = loadStandingModel();

    // Render waving model immediately once it arrives for near-instant first paint
    loadWavingModel().then((wavingGltf) => {
      if (!isMounted) return;
      setIsLoaded(true);

      heroGroup = new THREE.Group();

      proxyMesh = new THREE.Mesh(
        new THREE.CylinderGeometry(0.5, 0.5, 2.0, 8),
        new THREE.MeshBasicMaterial({ visible: false }) // Invisible hitbox
      );
      proxyMesh.position.y = 1.0; 
      heroGroup.add(proxyMesh);

      const wavingModel = wavingGltf.scene;
      heroGroup.add(wavingModel);

      // Scale up slightly to make it bigger (from 4.5 to 4.9)
      // Adjust Y to keep head framed correctly near the top
      heroGroup.scale.set(4.9, 4.9, 4.9);
      heroGroup.position.set(0, -3.8, 0); 
      scene.add(heroGroup);

      // Initially only waving is visible
      wavingModel.visible = true;

      const wavingMixer = new THREE.AnimationMixer(wavingModel);
      mixers.push(wavingMixer);

      const wavingClip = wavingGltf.animations.find(c => c.name === "Waving");
      let wavingAction: THREE.AnimationAction | null = null;

      if (wavingClip) {
        wavingAction = wavingMixer.clipAction(wavingClip);
        // Play waving exactly once
        wavingAction.setLoop(THREE.LoopOnce, 1);
        wavingAction.clampWhenFinished = true;
        wavingAction.timeScale = 0.6; // Slow down the waving animation
      }

      let standingModel: THREE.Group | null = null;
      let standingAction: THREE.AnimationAction | null = null;
      let hasWavingFinished = false;

      const switchToStanding = () => {
        if (!standingModel || !isMounted) return;
        wavingModel.visible = false;
        standingModel.visible = true;
        setShowGreetingBubble(false);

        if (standingAction) {
          standingAction.play();
        }

        // Enable head tracking once standing
        standingModel.traverse((child) => {
          if (child.type === "Bone") {
            const name = child.name.toLowerCase();
            if (name.includes("neck") || name.includes("head")) {
              headBone = child; // Robustly find the neck/head bone
            }
          }
        });
        animationStarted = true;
      };

      // When standing model finishes downloading in background, wire it up
      standingPromise.then((standingGltf) => {
        if (!isMounted || !heroGroup) return;
        standingModel = standingGltf.scene;
        heroGroup.add(standingModel);
        standingModel.visible = false;

        const standingMixer = new THREE.AnimationMixer(standingModel);
        mixers.push(standingMixer);

        const standingClip = standingGltf.animations.find(c => c.name === "standing");
        if (standingClip) {
          standingAction = standingMixer.clipAction(standingClip);
          standingAction.setLoop(THREE.LoopRepeat, Infinity);
        }

        // If waving already finished while standing was downloading, transition now
        if (hasWavingFinished) {
          switchToStanding();
        }
      }).catch((err) => {
        console.error("Error loading standing model:", err);
      });

      // Transition when waving finishes
      if (wavingAction) {
        wavingMixer.addEventListener('finished', () => {
          hasWavingFinished = true;
          if (standingModel) {
            switchToStanding();
          } else {
            standingPromise.then(() => {
              switchToStanding();
            });
          }
        });
      } else {
        // Fallback if waving animation not found
        hasWavingFinished = true;
        standingPromise.then(() => {
          switchToStanding();
        });
      }

      const playWavingIntro = () => {
        if (!wavingAction) return;
        wavingModel.visible = true;
        if (standingModel) {
          standingModel.visible = false;
        }
        animationStarted = false; // Disable head tracking during wave
        hasWavingFinished = false;
        
        setShowGreetingBubble(true);

        // Reset and play the animation from the beginning
        wavingAction.reset();
        wavingAction.play();
      };

      // Play intro whenever the user scrolls to the hero section
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            playWavingIntro();
          }
        });
      }, { threshold: 0.3 }); // Trigger when 30% of canvas is visible
      
      if (canvasDiv.current) {
        observer.observe(canvasDiv.current);
      }

      // Setup Camera
      camera.position.set(0, 3, 22);
      camera.lookAt(0, 3, 0);

      // ------------------------------------------------
      // Resize
      // ------------------------------------------------

      const onResize = () => {
        handleResize(
          renderer,
          camera,
          canvasDiv,
          standingModel || wavingModel
        );
        camera.lookAt(0, 3, 0);
      };

      // Use ResizeObserver for robust, stretch-free sizing
      const resizeObserver = new ResizeObserver(() => {
        onResize();
      });
      
      if (canvasDiv.current) {
        resizeObserver.observe(canvasDiv.current);
      }

      // Store cleanup on character object
      (wavingModel as any).__portfolioResizeHandler = () => {
        resizeObserver.disconnect();
        observer.disconnect();
      };
    }).catch((err) => {
      console.error("Error loading waving model:", err);
    });

    const animate = () => {
      requestAnimationFrame(animate);

      const delta = clock.getDelta();
      // Update animations FIRST so we can add manual offsets afterward
      mixers.forEach(mixer => mixer.update(delta));

      if (animationStarted && heroGroup && proxyMesh) {
        if (isHoveringCanvas) {
          const rayY = -(canvasMouseY * 2) + 1;
          raycaster.setFromCamera(new THREE.Vector2(canvasMouseX, rayY), camera);
          
          const intersects = raycaster.intersectObject(proxyMesh);

          if (intersects.length > 0) {
            // Update the active zone ONLY when directly hovering over the character!
            const localPoint = proxyMesh.worldToLocal(intersects[0].point.clone());
            if (localPoint.y > 0.4) {
              activeZone = 'HEAD';
            } else {
              activeZone = 'BODY';
            }
          }
          // IF intersects.length === 0, we DO NOT change activeZone!
          // This creates the "sticky" effect. Once they touch the body, they can move left/right 
          // as far as they want, and it will keep turning without failing!

          if (activeZone === 'HEAD') {
            targetHeadRotationX = -mouse.y * 0.6; 
            targetHeadRotationY = canvasMouseX * 0.6;  
            targetBodyRotationY = 0; 
          } else if (activeZone === 'BODY') {
            targetBodyRotationY = canvasMouseX * 0.9; 
            targetHeadRotationX = 0; 
            targetHeadRotationY = 0;
          } else {
            // activeZone === 'NONE'
            targetBodyRotationY = 0;
            targetHeadRotationX = 0;
            targetHeadRotationY = 0;
          }
        } else {
          // CURSOR IS OUTSIDE CANVAS -> Return to normal
          targetBodyRotationY = 0;
          targetHeadRotationX = 0;
          targetHeadRotationY = 0;
          activeZone = 'NONE';
        }
      } else {
        // Not tracking (e.g., during waving intro)
        targetBodyRotationY = 0;
        targetHeadRotationX = 0;
        targetHeadRotationY = 0;
      }

      // Smoothly lerp the target values
      if (heroGroup) {
        heroGroup.rotation.y = THREE.MathUtils.lerp(heroGroup.rotation.y, targetBodyRotationY, 0.05);
      }

      currentHeadOffsetX = THREE.MathUtils.lerp(currentHeadOffsetX, targetHeadRotationX, 0.08);
      currentHeadOffsetY = THREE.MathUtils.lerp(currentHeadOffsetY, targetHeadRotationY, 0.08);

      // Add the smoothed offsets to the bone AFTER the mixer updates it, preserving natural idle sway
      if (headBone && animationStarted) {
        headBone.rotation.x += currentHeadOffsetX;
        headBone.rotation.y += currentHeadOffsetY;
      }

      renderer.render(scene, camera);
    };
    animate();

    return () => {
      isMounted = false;
      clearTimeout(debounce);
      scene.clear();
      renderer.dispose();
      if (canvasDiv.current) {
        canvasDiv.current.removeChild(renderer.domElement);
        canvasDiv.current.removeEventListener('mouseenter', onCanvasMouseEnter);
        canvasDiv.current.removeEventListener('mouseleave', onCanvasMouseLeave);
        canvasDiv.current.removeEventListener('mousemove', onCanvasMouseMove);
      }
      document.removeEventListener("mousemove", onMouseMove);
      if (landingDiv) {
        landingDiv.removeEventListener("touchstart", onTouchStart);
        landingDiv.removeEventListener("touchend", onTouchEnd);
      }
    };
  }, []);

  return (
    <>
      <div className="character-container">
        <div className="character-model" ref={canvasDiv}>
          {/* Subtle loading spinner while 3D model loads */}
          {!isLoaded && (
            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none z-10">
              <div className="w-10 h-10 rounded-full border-2 border-purple-500/20 border-t-[#8245ec] animate-spin"></div>
              <span className="text-[11px] text-purple-300/70 mt-3 font-medium tracking-wider animate-pulse">
                Loading avatar...
              </span>
            </div>
          )}

          {/* Greeting Bubble */}
          {showGreetingBubble && (
            <div className="absolute top-4 md:top-[6%] -left-6 md:left-4 w-max max-w-[85vw] z-50 animate-[fade-in-up_0.5s_ease-out_forwards]">
              <div className="bg-[#0b061e] border-2 border-[#8245ec] rounded-[14px] md:rounded-[24px] py-1.5 px-2.5 md:py-3 md:px-5 flex items-center space-x-1.5 md:space-x-3 shadow-[0_0_25px_rgba(130,69,236,0.5)]">
                <span className="text-xl md:text-4xl flex-shrink-0" style={{ display: 'inline-block', animation: 'wave 2s infinite transform-origin-bottom-right' }}>👋</span>
                <div className="flex flex-col text-left">
                  <span className="text-white font-bold text-[11px] md:text-lg leading-tight tracking-wide whitespace-normal md:whitespace-nowrap">Hi! Welcome to</span>
                  <span className="text-[#a1a1aa] font-medium text-[10px] md:text-base leading-tight tracking-wide whitespace-normal md:whitespace-nowrap">my Portfolio</span>
                </div>
              </div>
              <div className="absolute -bottom-1.5 md:-bottom-2 left-6 md:left-10 w-4 h-4 md:w-5 md:h-5 bg-[#0b061e] border-b-2 border-r-2 border-[#8245ec] transform rotate-45"></div>
            </div>
          )}

          {/* Whitish shadow/glow behind the character */}
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-[40%] w-[350px] md:w-[450px] h-[450px] md:h-[550px] bg-white opacity-[0.25] blur-[100px] md:blur-[140px] rounded-full pointer-events-none z-[-1]"></div>
          
          <div className="character-base-back"></div>
          <div className="character-hover" ref={hoverDivRef}></div>
          <div className="character-base-front"></div>
        </div>
      </div>
    </>
  );
};

export default Scene;
