import React, { useState, useEffect } from "react";
import Image from "next/image";
import {IMAGES} from "../../../assets/images"

const TILE_COUNT = 9; // 3x3 grid -> 8 tiles + 1 empty
const GRID_SIZE = 3;

// Optional: set an image to render across tiles
const USE_IMAGE_TILES = true;

// Utility: count inversions (ignore null)
const countInversions = (arr) => {
  const nums = arr.filter((n) => n !== null);
  let inversions = 0;
  for (let i = 0; i < nums.length; i++) {
    for (let j = i + 1; j < nums.length; j++) {
      if (nums[i] > nums[j]) inversions++;
    }
  }
  return inversions;
};

// Check solvability for 3x3 (odd grid): inversion count must be even
const isSolvable = (tiles) => {
  const inversions = countInversions(tiles);
  return inversions % 2 === 0;
};

const shuffleTiles = () => {
  const base = [...Array(TILE_COUNT - 1).keys()].map((i) => i + 1);
  base.push(null); // empty space

  let tiles = [...base];
  // Fisher-Yates shuffle
  for (let i = tiles.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [tiles[i], tiles[j]] = [tiles[j], tiles[i]];
  }

  // Re-shuffle until solvable
  let guard = 0;
  while (!isSolvable(tiles) && guard < 50) {
    for (let i = tiles.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [tiles[i], tiles[j]] = [tiles[j], tiles[i]];
    }
    guard++;
  }
  // If guard trips, just return solved state to avoid infinite loops
  return tiles;
};

const PuzzleGame = ({ imageUrl = "/images/page-title-background/destination-page-header.png" }) => {
  const [tiles, setTiles] = useState([]);
  const [isGameStarted, setIsGameStarted] = useState(false);

  useEffect(() => {
    // Start with a solved board initially
    setTiles([...Array(TILE_COUNT - 1).keys()].map((i) => i + 1).concat(null));
  }, []);

  const handleStartGame = () => {
    setTiles(shuffleTiles());
    setIsGameStarted(true);
  };

  const handleTileClick = (clickedIndex) => {
    if (!isGameStarted) return;

    const emptyIndex = tiles.indexOf(null);
    const clickedTile = tiles[clickedIndex];

    // Check if the clicked tile is a neighbor of the empty tile (horizontally or vertically)
    const rowClicked = Math.floor(clickedIndex / GRID_SIZE);
    const colClicked = clickedIndex % GRID_SIZE;
    const rowEmpty = Math.floor(emptyIndex / GRID_SIZE);
    const colEmpty = emptyIndex % GRID_SIZE;

    const isAdjacent =
      (Math.abs(rowClicked - rowEmpty) === 1 && colClicked === colEmpty) ||
      (Math.abs(colClicked - colEmpty) === 1 && rowClicked === rowEmpty);

    if (isAdjacent) {
      const newTiles = [...tiles];
      newTiles[emptyIndex] = clickedTile;
      newTiles[clickedIndex] = null;
      setTiles(newTiles);
    }
  };

  const isSolved = tiles.every(
    (tile, index) => tile === null || tile === index + 1
  );

  // Compute background style for a tile so the whole image forms when solved
  const getTileBackgroundStyle = (tile) => {
    if (!USE_IMAGE_TILES || tile === null) return {};
    const row = Math.floor((tile - 1) / GRID_SIZE);
    const col = (tile - 1) % GRID_SIZE;
    const sizePercent = GRID_SIZE * 100; // e.g., 300% for 3x3
    const posX = GRID_SIZE === 1 ? 0 : (col / (GRID_SIZE - 1)) * 100;
    const posY = GRID_SIZE === 1 ? 0 : (row / (GRID_SIZE - 1)) * 100;
    return {
      backgroundImage: `url(${imageUrl})`,
      backgroundSize: `${sizePercent}% ${sizePercent}%`,
      backgroundPosition: `${posX}% ${posY}%`,
      backgroundRepeat: "no-repeat",
    };
  };

  return (
    <div className="game-container">
      <div className="puzzle-board">
        {tiles.map((tile, index) => (
          <div
            key={index}
            className={`puzzle-tile ${tile === null ? "empty-tile" : ""}`}
            style={getTileBackgroundStyle(tile)}
            onClick={() => handleTileClick(index)}
          >
            {!USE_IMAGE_TILES && tile}
          </div>
        ))}
      </div>
      <div className="puzzle-footer">
        <Image src={imageUrl} alt="Puzzle Image" width={120} height={120}/>
        {!isGameStarted ? (
          <button onClick={handleStartGame} className="btn btn-primary">
            Start Game
          </button>
        ) : (
          <button onClick={handleStartGame} className="btn btn-secondary">
            Restart Game
          </button>
        )}
        {isSolved && isGameStarted && <p className="win-message">Solved! 🎉</p>}
      </div>
    </div>
  );
};

export default PuzzleGame;
