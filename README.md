# 3D Space Chicken Game Project

## Introduction

The 3D Space Chicken Game is an immersive and interactive space adventure game. The player navigates a spaceship through the cosmos, dodging planets and collecting turkeys to score points. The game is built using React, a popular JavaScript library for building user interfaces, and leverages the `@react-three/fiber` library for rendering 3D components and `three.js` for the underlying 3D functionality.

## File Structure

The project is organized into several key JSX components, each responsible for a different aspect of the game:

- `Planets.jsx`: Handles the creation, rendering, and interaction of planets within the game space.
- `Spaceship.jsx`: Manages the spaceship's rendering, controls, and interactions with other game elements.
- `Turkey.jsx`: Represents individual turkeys that the player can collect for points.
- `Turkeys.jsx`: Manages the collection of turkeys within the game space, including their spawning and interaction with the spaceship.
- `UiComps.jsx`: Contains UI components, such as the score display and end game modal.
- `App.jsx`: The main application component that brings together all other components and manages the game's state.

## Detailed Component Descriptions

### `Planets.jsx`

This component is responsible for generating a random collection of planets in the game space. It uses the `useState` hook to initialize and manage the state of the planets, and `useMemo` to memoize the planet geometries for performance optimization. Each planet is represented as a sphere with a random radius and position.

The `useFrame` hook from `@react-three/fiber` is used to update the planets' positions and check for collisions with the spaceship in each frame. If a collision is detected, the game is reset and the `onResetGame` callback is invoked.

### `Spaceship.jsx`

The `Spaceship` component uses the `useGLTF` hook from `@react-three/drei` to load a 3D model of a spaceship. The spaceship's position and orientation are managed using `useRef` and `useFrame`. The `updateSpaceshipAxis` function from the `controls` module is used to update the spaceship's position and orientation based on user input.

### `Turkey.jsx`

The `Turkey` component is responsible for rendering individual turkeys in the game. It uses the `useGLTF` hook to load the turkey model and positions it in the game world using the `position` prop. The `rotation` prop is used to orient the turkey in the direction of its movement.

### `Turkeys.jsx`

The `Turkeys` component manages multiple `Turkey` components. It uses `useState` to initialize and manage the state of the turkeys. Turkeys are spawned at random positions in the game space, and their positions are updated in each frame using the `useFrame` hook.

The `useFrame` hook is also used to check for collisions between the turkeys and the spaceship. If a collision is detected, the turkey is removed from the game and the player's score is incremented.

### `UiComps.jsx`

The `UiComps` component includes UI elements like the countdown timer and score display. It uses `useState` and `useEffect` to manage and update the countdown timer. The `EndGameModal` component, which is displayed when the game ends, is also managed by `UiComps`.

### `App.jsx`

The `App` component is the main component of the application. It sets up the `Canvas` from `@react-three/fiber` and orchestrates the rendering of the game's environment, spaceship, planets, and turkeys. It also manages the game's state, such as the score and countdown timer, using `useState`.

## Controls (`controls/index.js`)

The controls module defines user input handling and updates the spaceship's movement and orientation based on the input. It listens for key presses and releases to adjust the spaceship's velocity and applies a turbo boost when the shift key is held. The `resetGame` function is used to reset the game state when the game ends.
