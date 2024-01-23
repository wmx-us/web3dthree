import { useCallback, useEffect, useRef } from "react";
import * as THREE from "three";

const width = window.innerWidth;
const height = window.innerHeight;
const robot = new THREE.Object3D();

function App() {
  const containerRef = useRef<HTMLDivElement>(null);

  const initScene = useCallback(() => {
    if (containerRef.current) {
      const scene = new THREE.Scene();
      // 创建相机
      const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
      camera.position.set(10, 12, 20);

      camera.lookAt(0, 5, 0);

      // 创建渲染器
      const renderer = new THREE.WebGLRenderer({
        antialias: true,
      });

      generateLegs(0, -2);
      generateLegs(0, 2);
      generateArm(3, 5);
      generateArm(3, -5);
      //   创建光源
      const straightLight = new THREE.DirectionalLight(0xffffff, 5);
      straightLight.position.x = 40;
      straightLight.position.y = 30;
      straightLight.position.z = 50;
      scene.add(straightLight);
      renderer.setSize(width, height);

      //   创建身体
      const body = new THREE.CylinderGeometry(4, 4, 6);
      const bodyMaterial = new THREE.MeshStandardMaterial({
        color: 0x43b988,
        roughness: 0.5,
        metalness: 1.0,
      });
      const bodyMesh = new THREE.Mesh(body, bodyMaterial);
      bodyMesh.position.y = 4;
      robot.add(bodyMesh);

      //   脑袋
      const head = new THREE.SphereGeometry(
        4,
        32,
        16,
        0,
        Math.PI * 2,
        0,
        Math.PI * 0.5
      );

      const headMaterial = new THREE.MeshStandardMaterial({
        color: 0x43b988,
        roughness: 0.5,
        metalness: 1.0,
      });

      const headMesh = new THREE.Mesh(head, headMaterial);
      headMesh.position.y = 6.5;
      robot.add(headMesh);

      generategHorn(11, -1, (-Math.PI * 30) / 180);
      generategHorn(11, -1, (Math.PI * 30) / 180);

      scene.add(robot);
      renderer.render(scene, camera);
      if (!containerRef.current?.querySelector("canvas")) {
        containerRef.current?.append(renderer.domElement);
      }
    }
  }, [containerRef]);
  /**
   * 创建双脚
   * @param y
   * @param z
   */
  const generateLegs = (y: number, z: number) => {
    const leg1 = new THREE.CapsuleGeometry(1, 4);
    const legMaterial1 = new THREE.MeshStandardMaterial({
      color: 0x43b988,
      roughness: 0.5,
      metalness: 1.0,
    });

    const leg1Mesh = new THREE.Mesh(leg1, legMaterial1);
    leg1Mesh.position.y = y;
    leg1Mesh.position.z = z;
    robot.add(leg1Mesh);
  };

  // 手臂
  const generateArm = (y: number, z: number) => {
    const arm = new THREE.CapsuleGeometry(1, 3);
    const armMaterial = new THREE.MeshStandardMaterial({
      color: 0x43b988,
      roughness: 0.5,
      metalness: 1.0,
    });
    const armMesh = new THREE.Mesh(arm, armMaterial);
    armMesh.position.y = y;
    armMesh.position.z = z;
    robot.add(armMesh);
  };

  //触角
  const generategHorn = (y: number, z: number, angle: number) => {
    const line = new THREE.CapsuleGeometry(0.1, 2);
    const lineMaterial = new THREE.MeshStandardMaterial({
      color: 0x43b988,
      roughness: 0.5,
      metalness: 1.0,
    });
    const lineMesh = new THREE.Mesh(line, lineMaterial);
    lineMesh.position.y = y;
    lineMesh.position.z = z;
    lineMesh.position.x = angle;
    robot.add(lineMesh);
  };

  useEffect(() => {
    initScene();
  }, [initScene]);
  return <div ref={containerRef}></div>;
}

export default App;
