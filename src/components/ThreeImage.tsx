"use client";

import React, { useEffect, useRef } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

interface ThreeImageProps {
  imageUrl: string; // لینک تصویر محصول
}

const ThreeImage: React.FC<ThreeImageProps> = ({ imageUrl }) => {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!mountRef.current) return;

    // صحنه و دوربین
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      45,
      mountRef.current.clientWidth / mountRef.current.clientHeight,
      0.1,
      100
    );
    camera.position.z = 3;

    // رندرر
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(mountRef.current.clientWidth, mountRef.current.clientHeight);
    mountRef.current.appendChild(renderer.domElement);

    // کنترل موس
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.enableZoom = true;

    // نور
    const ambientLight = new THREE.AmbientLight(0xffffff, 1);
    scene.add(ambientLight);

    // بارگذاری تصویر
    const loader = new THREE.TextureLoader();
    loader.setCrossOrigin("anonymous"); // اگر تصویر از API می‌آید
    loader.load(
      imageUrl,
      (texture) => {
        // Cube با 6 وجه
        const geometry = new THREE.BoxGeometry(1, 1, 1);
        const material = [
          new THREE.MeshBasicMaterial({ map: texture }),
          new THREE.MeshBasicMaterial({ map: texture }),
          new THREE.MeshBasicMaterial({ map: texture }),
          new THREE.MeshBasicMaterial({ map: texture }),
          new THREE.MeshBasicMaterial({ map: texture }),
          new THREE.MeshBasicMaterial({ map: texture }),
        ];

        const cube = new THREE.Mesh(geometry, material);
        scene.add(cube);

        // چرخه انیمیشن
        const animate = () => {
          requestAnimationFrame(animate);
          controls.update();
          renderer.render(scene, camera);
        };
        animate();
      },
      undefined,
      (err) => console.error("Error loading texture:", err)
    );

    // تمیزکاری
    return () => {
      renderer.dispose();
      if (mountRef.current) mountRef.current.innerHTML = "";
    };
  }, [imageUrl]);

  return <div ref={mountRef} style={{ width: "100%", height: "400px" }} />;
};

export default ThreeImage;
