import React, { useState, useEffect } from "react";
import { useFrame } from "@react-three/fiber";
import { Turkey } from "./Turkey";
import { Vector3, Quaternion } from "three";
import { shipPosition } from "./Spaceship";

export function randomPoint(scale) {
  return new Vector3(
    Math.random() * 3 - 1,
    Math.random() * 3 - 1,
    Math.random() * 3 - 1
  ).multiply(scale || new Vector3(1, 1, 1));
}

export const PLANET_MEDIUM_RAD = 0.3;

export function Turkeys({score, setScore, countdownValue}) {
  const [turkeys, setTurkeys] = useState(() => {
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

  console.log('score', score)

  useEffect(() => {
    const intervalId = setInterval(() => {
      setTurkeys([...turkeys, {
        center: randomPoint(new Vector3(10, 10, 10)).add(new Vector3(0, 0, 0)),
        direction: randomPoint().normalize(),
        hit: false,
      }])
    }, 5000);

    return () => clearInterval(intervalId);
  }, [turkeys]);

  useFrame(() => {
    turkeys.forEach((planet) => {
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

    const atLeastOneHit = turkeys.find((planet) => planet.hit);
    if (atLeastOneHit) {
      setTurkeys(turkeys.filter((planet) => !planet.hit));
      console.log('countdownValue', countdownValue)
      if (countdownValue !== 0) {
        setScore(score + 1)
      }
    }
  });

  return (
    <>
      {turkeys.map((planet, index) => (
        <Turkey
          key={index}
          position={{x: planet.center.x, y: planet.center.y, z: planet.center.z}}
          rotation={new Quaternion().setFromUnitVectors(new Vector3(0, 0, 1), planet.direction)}
          scale={2.55}
        />
      ))}
    </>
  );
}