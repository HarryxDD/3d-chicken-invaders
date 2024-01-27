import React, {useMemo} from "react";
import { useGLTF } from "@react-three/drei";
import * as THREE from 'three'

export function Turkey({ scale, position, rotation, ...props }) {
  const { nodes, materials } = useGLTF("../../public/assets/models/turkey.gltf");

  return (
    <group {...props} dispose={null}>
    <mesh
      castShadow
      receiveShadow
      geometry={nodes.turkey.geometry}
      material={materials.brownDark}
    >
      <group
        position={[position.x, position.y, position.z]}
        rotation={[rotation.x, rotation.y, rotation.z]}
        scale={1.305}
      >
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Mesh_leg.geometry}
          material={materials.brownDark}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Mesh_leg_1.geometry}
          material={materials.brownLight}
        />
      </group>
      <group
        position={[position.x, position.y, position.z]}
        rotation={[rotation.x, rotation.y, rotation.z]}
        scale={1.305}
      >
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Mesh_leg_2.geometry}
          material={materials.brownDark}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Mesh_leg_3.geometry}
          material={materials.brownLight}
        />
      </group>
    </mesh>
  </group>
  )
}

useGLTF.preload("../../public/assets/models/turkey.gltf");