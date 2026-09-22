import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

interface RailwayAtmosphereProps {
  isPlanned: boolean;
  isDisrupted: boolean;
  activeRouteId?: string;
}

export const RailwayAtmosphere: React.FC<RailwayAtmosphereProps> = ({
  isPlanned,
  isDisrupted,
  activeRouteId,
}) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const stateRef = useRef({ isPlanned, isDisrupted, activeRouteId });

  // Update ref when props change so the animation loop reads fresh state
  useEffect(() => {
    stateRef.current = { isPlanned, isDisrupted, activeRouteId };
  }, [isPlanned, isDisrupted, activeRouteId]);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    // SCENE SETUP
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0xFAF3DD, 0.015); // Blends naturally into the warm off-white canvas

    const width = container.clientWidth || window.innerWidth;
    const height = container.clientHeight || window.innerHeight;

    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.set(0, 10, 24);
    camera.lookAt(0, 0, 0);

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance',
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    renderer.setClearColor(0xFAF3DD, 0); // Transparent so HTML background shows through
    container.appendChild(renderer.domElement);

    // SOFT AMBIENT LIGHTING
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.85);
    scene.add(ambientLight);

    const dirLight = new THREE.DirectionalLight(0xFAF3DD, 0.6);
    dirLight.position.set(10, 20, 15);
    scene.add(dirLight);

    // PALETTE COLORS (Soft, low saturation, restrained)
    const PALETTE = {
      teal: new THREE.Color('#138086'),
      coral: new THREE.Color('#DC8665'),
      purple: new THREE.Color('#534666'),
      rose: new THREE.Color('#CD7672'),
      amber: new THREE.Color('#EEB462'),
      slate: new THREE.Color('#696D7D'),
      canvasWarm: new THREE.Color('#FAF3DD'),
      gridLine: new THREE.Color('#E2DACB'),
    };

    // 1. SUBTLE TOPOGRAPHIC GROUND GRID (Atmospheric depth)
    const gridHelper = new THREE.GridHelper(60, 30, 0xD8CEBA, 0xEBE4D2);
    gridHelper.position.y = -3.5;
    // Lower opacity for grid
    if (Array.isArray(gridHelper.material)) {
      gridHelper.material.forEach((m) => {
        m.transparent = true;
        m.opacity = 0.28;
      });
    } else {
      gridHelper.material.transparent = true;
      gridHelper.material.opacity = 0.28;
    }
    scene.add(gridHelper);

    // 2. ABSTRACT CURVED RAILWAY TRACKS (Spline Curves)
    // Main Suburban Line (Teal/Purple tone)
    const mainTrackPoints = [
      new THREE.Vector3(-22, -2.5, -12),
      new THREE.Vector3(-14, -1.8, -6),
      new THREE.Vector3(-6, -1.0, -1),
      new THREE.Vector3(2, -0.4, 3),
      new THREE.Vector3(10, 0.2, 7),
      new THREE.Vector3(18, 0.8, 12),
      new THREE.Vector3(26, 1.5, 16),
    ];
    const mainCurve = new THREE.CatmullRomCurve3(mainTrackPoints);
    const mainTubeGeo = new THREE.TubeGeometry(mainCurve, 80, 0.06, 8, false);
    const mainTrackMat = new THREE.MeshBasicMaterial({
      color: PALETTE.teal,
      transparent: true,
      opacity: 0.35,
    });
    const mainTrackMesh = new THREE.Mesh(mainTubeGeo, mainTrackMat);
    scene.add(mainTrackMesh);

    // Secondary Bypass / Arterial Line (Muted Coral / Amber)
    const bypassTrackPoints = [
      new THREE.Vector3(-22, -2.8, -14),
      new THREE.Vector3(-12, -2.0, -9),
      new THREE.Vector3(-2, -1.2, -4),
      new THREE.Vector3(6, -0.2, 1),
      new THREE.Vector3(14, 0.5, 6),
      new THREE.Vector3(24, 1.2, 11),
    ];
    const bypassCurve = new THREE.CatmullRomCurve3(bypassTrackPoints);
    const bypassTubeGeo = new THREE.TubeGeometry(bypassCurve, 70, 0.04, 6, false);
    const bypassTrackMat = new THREE.MeshBasicMaterial({
      color: PALETTE.purple,
      transparent: true,
      opacity: 0.22,
    });
    const bypassTrackMesh = new THREE.Mesh(bypassTubeGeo, bypassTrackMat);
    scene.add(bypassTrackMesh);

    // Disruption Alternate Detour Branch (Fades in when disrupted)
    const detourPoints = [
      new THREE.Vector3(-6, -1.0, -1), // Diverges near Guindy position
      new THREE.Vector3(-1, 0.2, 2),
      new THREE.Vector3(5, 1.2, 6),
      new THREE.Vector3(12, 1.6, 9),
      new THREE.Vector3(18, 0.8, 12), // Reconnects near Central
    ];
    const detourCurve = new THREE.CatmullRomCurve3(detourPoints);
    const detourTubeGeo = new THREE.TubeGeometry(detourCurve, 60, 0.05, 8, false);
    const detourTrackMat = new THREE.MeshBasicMaterial({
      color: PALETTE.coral,
      transparent: true,
      opacity: 0.0, // Initially invisible
    });
    const detourTrackMesh = new THREE.Mesh(detourTubeGeo, detourTrackMat);
    scene.add(detourTrackMesh);

    // 3. MINIMAL STATION NODES (Architectural discs / soft rings)
    const stationNodes: THREE.Mesh[] = [];
    const stationSamplePoints = [0.15, 0.35, 0.55, 0.72, 0.9];

    stationSamplePoints.forEach((t, index) => {
      const pos = mainCurve.getPoint(t);
      const ringGeo = new THREE.RingGeometry(0.18, 0.28, 24);
      ringGeo.rotateX(-Math.PI / 2);
      const ringMat = new THREE.MeshBasicMaterial({
        color: index === 2 ? PALETTE.coral : PALETTE.teal, // Guindy node has subtle accent
        transparent: true,
        opacity: 0.45,
        side: THREE.DoubleSide,
      });
      const ringMesh = new THREE.Mesh(ringGeo, ringMat);
      ringMesh.position.copy(pos);
      ringMesh.position.y += 0.04;
      scene.add(ringMesh);
      stationNodes.push(ringMesh);

      // Soft vertical beacon line (very subtle)
      const pinPoints = [
        pos.clone(),
        new THREE.Vector3(pos.x, pos.y + 0.6, pos.z),
      ];
      const pinGeo = new THREE.BufferGeometry().setFromPoints(pinPoints);
      const pinMat = new THREE.LineBasicMaterial({
        color: PALETTE.slate,
        transparent: true,
        opacity: 0.25,
      });
      const pinLine = new THREE.Line(pinGeo, pinMat);
      scene.add(pinLine);
    });

    // 4. SUBTLE MOVING TRANSIT PULSE (Small sphere gently traversing the main line)
    const pulseGeo = new THREE.SphereGeometry(0.12, 12, 12);
    const pulseMat = new THREE.MeshBasicMaterial({
      color: PALETTE.teal,
      transparent: true,
      opacity: 0.6,
    });
    const pulseMesh = new THREE.Mesh(pulseGeo, pulseMat);
    scene.add(pulseMesh);

    // Detour pulse
    const detourPulseGeo = new THREE.SphereGeometry(0.1, 10, 10);
    const detourPulseMat = new THREE.MeshBasicMaterial({
      color: PALETTE.coral,
      transparent: true,
      opacity: 0.0,
    });
    const detourPulseMesh = new THREE.Mesh(detourPulseGeo, detourPulseMat);
    scene.add(detourPulseMesh);

    // MOUSE PARALLAX TRACKING (Slow, damped)
    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      const windowHalfX = window.innerWidth / 2;
      const windowHalfY = window.innerHeight / 2;
      mouseX = (e.clientX - windowHalfX) * 0.0006;
      mouseY = (e.clientY - windowHalfY) * 0.0006;
    };

    window.addEventListener('mousemove', handleMouseMove);

    // RESIZE LISTENER
    const handleResize = () => {
      if (!container) return;
      const w = container.clientWidth || window.innerWidth;
      const h = container.clientHeight || window.innerHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    window.addEventListener('resize', handleResize);

    // ANIMATION LOOP (Subtle, calm, subconscious)
    let clock = new THREE.Clock();
    let animId: number;

    const animate = () => {
      animId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();
      const { isPlanned: curPlanned, isDisrupted: curDisrupted } = stateRef.current;

      // Slow camera drift + mouse parallax
      targetX += (mouseX - targetX) * 0.03;
      targetY += (mouseY - targetY) * 0.03;

      camera.position.x = Math.sin(elapsedTime * 0.05) * 1.2 + targetX * 10;
      camera.position.y = 10 + Math.cos(elapsedTime * 0.04) * 0.6 - targetY * 6;
      camera.lookAt(targetX * 3, 0, 0);

      // Slow pulse traversal along main line
      const pulseT = (elapsedTime * 0.04) % 1.0;
      const pulsePos = mainCurve.getPoint(pulseT);
      pulseMesh.position.copy(pulsePos);

      // Station node breathing
      stationNodes.forEach((node, i) => {
        const s = 1.0 + Math.sin(elapsedTime * 1.5 + i * 0.8) * 0.08;
        node.scale.set(s, s, s);
      });

      // REACT TO UI STATE:
      if (curDisrupted) {
        // Disruption mode: Detour track appears in warm coral/amber, main line dims slightly
        detourTrackMat.opacity = THREE.MathUtils.lerp(detourTrackMat.opacity, 0.45, 0.05);
        mainTrackMat.color.lerp(PALETTE.coral, 0.03);
        mainTrackMat.opacity = THREE.MathUtils.lerp(mainTrackMat.opacity, 0.22, 0.05);

        // Detour pulse runs along alternate route
        detourPulseMat.opacity = THREE.MathUtils.lerp(detourPulseMat.opacity, 0.7, 0.05);
        const detourT = (elapsedTime * 0.06) % 1.0;
        detourPulseMesh.position.copy(detourCurve.getPoint(detourT));
      } else {
        // Normal mode: Detour fades away, main track restores to clean teal
        detourTrackMat.opacity = THREE.MathUtils.lerp(detourTrackMat.opacity, 0.0, 0.05);
        mainTrackMat.color.lerp(PALETTE.teal, 0.04);
        mainTrackMat.opacity = THREE.MathUtils.lerp(mainTrackMat.opacity, curPlanned ? 0.45 : 0.3, 0.05);
        detourPulseMat.opacity = THREE.MathUtils.lerp(detourPulseMat.opacity, 0.0, 0.08);
      }

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      renderer.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div
      ref={mountRef}
      className="fixed inset-0 pointer-events-none -z-10 overflow-hidden opacity-85 transition-opacity duration-700"
      style={{
        maskImage: 'linear-gradient(to bottom, rgba(0,0,0,1) 0%, rgba(0,0,0,0.6) 75%, rgba(0,0,0,0.3) 100%)',
        WebkitMaskImage: 'linear-gradient(to bottom, rgba(0,0,0,1) 0%, rgba(0,0,0,0.6) 75%, rgba(0,0,0,0.3) 100%)',
      }}
      aria-hidden="true"
    />
  );
};
