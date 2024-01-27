import { Environment, PerspectiveCamera } from "@react-three/drei";
import React, {useState, useEffect, Suspense} from "react";
import { Spaceship } from "./components/Spaceship";
import { SphereEnv } from "./SphereEnv";
import { Planets } from "./components/Planets";
import { Vector3 } from "three";
import { randomPoint } from "./components/Planets";
import { Turkeys } from "./components/Turkeys";
import { Canvas } from "@react-three/fiber";
import UiComps from "./ui-comps/UiComps";

export const COUNTDOWN_VALUE = 60;

function App() {
  const [score, setScore] = useState(0);
  const [seconds, setSeconds] = useState(COUNTDOWN_VALUE);

  return (
    <>
    <UiComps countdownValue={seconds} onSetCountdownValue={setSeconds} score={score} setScore={setScore} />
    <Canvas shadows>
      <Suspense fallback={null}>
      <SphereEnv />
      <Environment background={false} files={"assets/textures/envmap.hdr"} />
      <PerspectiveCamera makeDefault position={[0, 10, 10]} />
      <Spaceship />
      <Planets onResetGame={() => setSeconds(0)} />
      <Turkeys score={score} setScore={setScore} countdownValue={seconds} />
      </Suspense>
      </Canvas>
      
    </>
  );
}

export default App;
