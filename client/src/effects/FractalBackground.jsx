import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const FractalPlane = () => {
  const mesh = useRef();
  
  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    mesh.current.material.uniforms.uTime.value = time;
  });

  const shaderArgs = {
    uniforms: {
      uTime: { value: 0 },
    },
    vertexShader: `
      varying vec2 vUv;
      void main() {
        vUv = uv;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
    `,
    fragmentShader: `
      uniform float uTime;
      varying vec2 vUv;

      void main() {
        vec2 uv = vUv * 2.0 - 1.0;
        float d = length(uv);
        vec3 col = vec3(0.05, 0.0, 0.0);
        
        for(float i = 0.0; i < 4.0; i++) {
          uv = fract(uv * 1.5) - 0.5;
          d = length(uv) * exp(-length(vUv));
          vec3 c = vec3(0.5, 0.1, 0.1) * (0.5 + 0.5 * cos(uTime + i * 2.0 + vec3(0,2,4)));
          d = sin(d * 8.0 + uTime) / 8.0;
          d = abs(d);
          d = 0.01 / d;
          col += c * d;
        }

        gl_FragColor = vec4(col, 1.0);
      }
    `,
  };

  return (
    <mesh ref={mesh} scale={[20, 20, 1]}>
      <planeGeometry args={[1, 1, 32, 32]} />
      <shaderMaterial args={[shaderArgs]} transparent={true} />
    </mesh>
  );
};

const FractalBackground = () => {
  return (
    <div className="fixed inset-0 -z-10 opacity-40">
      <Canvas camera={{ position: [0, 0, 1] }}>
        <FractalPlane />
      </Canvas>
    </div>
  );
};

export default FractalBackground;
