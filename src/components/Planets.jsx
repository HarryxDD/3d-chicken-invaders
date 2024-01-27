import { useState, useMemo } from "react";
import { Quaternion, SphereGeometry, Vector3, TextureLoader } from "three";
import { mergeBufferGeometries } from "three-stdlib";
import { useFrame } from "@react-three/fiber";
import { shipPosition } from "./Spaceship";
import { resetGame } from "../controls";

export function randomPoint(scale) {
  return new Vector3(
    Math.random() * 3 - 1,
    Math.random() * 3 - 1,
    Math.random() * 3 - 1
  ).multiply(scale || new Vector3(1, 1, 1));
}

const x = new Vector3(1, 0, 0);
const y = new Vector3(0, 1, 0);
const z = new Vector3(0, 0, 1);

export const PLANET_MEDIUM_RAD = 0.48;

export function Planets({onResetGame}) {
  const [planets, setPlanets] = useState(() => {
    const arr = [];
    for (let i = 0; i < 25; i++) {
      arr.push({
        center: randomPoint(new Vector3(10, 10, 10)).add(new Vector3(0, 0, 0)),
        direction: randomPoint().normalize(),
        hit: false,
      });
    }

    return arr;
  });

  const textureLoader = new TextureLoader();
  const planetTexture = textureLoader.load("public/assets/2k_mercury.jpg");

  const geometry = useMemo(() => {
    let geo;

    planets.forEach((planet) => {
      const torusGeo = new SphereGeometry(
        Math.floor(Math.random() * 0.8) + 0.6,
        30,
        15,
        25
      );
      torusGeo.applyQuaternion(
        new Quaternion().setFromUnitVectors(
          new Vector3(0, 0, 1),
          planet.direction
        )
      );
      torusGeo.translate(planet.center.x, planet.center.y, planet.center.z);

      if (!geo) geo = torusGeo;
      else geo = mergeBufferGeometries([geo, torusGeo]);
    });

    return geo;
  }, [planets]);

  useFrame(() => {
    planets.forEach((planet, i) => {
      const v = shipPosition.clone().sub(planet.center);
      const dist = planet.direction.dot(v);
      const projected = shipPosition
        .clone()
        .sub(planet.direction.clone().multiplyScalar(dist));

      const hitDist = projected.distanceTo(planet.center);
      if (hitDist < PLANET_MEDIUM_RAD) {
        planet.hit = true;
      }
    });

    const atLeastOneHit = planets.find((planet) => planet.hit);
    if (atLeastOneHit) {
      setPlanets(planets.filter((planet) => !planet.hit));
      resetGame(x, y, z, shipPosition);
      onResetGame();
    }
  });

  return (
      <mesh geometry={geometry}>
        <meshStandardMaterial map={planetTexture} roughness={0.5} metalness={0.5} />
      </mesh>
  );
}
