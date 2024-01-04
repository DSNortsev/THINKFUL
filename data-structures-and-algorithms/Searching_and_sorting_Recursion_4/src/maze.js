/**
 * Return a string representing the path through the maze.
 * @param {array} maze
 * @param {array} index The starting point
 */
function mazeSolver(maze, index = [0, 0]) {
  const [row, col] = index;
  
  // Base case: if the current position is outside the maze or on a blocked cell, return an empty path
  if ( row < 0 || row >= maze.length || col < 0 || col >= maze[0].length || maze[row][col] === '*' || maze[row][col] === "X") {
    return "";
  }
  
  // Base case: if the current position is at the exit
  if (maze[row][col] === 'e') {
    return "E";
  }
  
  // Masrk current cell as visited
  maze[row][col] = "X"
  
  // Explore all possible directions: Right, Down, Left, Up
  const directions = ["U", "D", "L", "R"]
  
  for (const direction of directions) {
    let nextRow = row;
    let nextCol = col;
    
    if (direction === "R") {
      nextCol++;
    } else if (direction === "L") {
      nextCol--;
    } else if (direction === "U") {
      nextRow--;
    } else if (direction === "D") {
      nextRow++;
    }
    
    const path = mazeSolver(maze, [nextRow, nextCol]);

    if (path) {
      return path === 'E' ? direction : direction + path
    }
  }
 
  // If no valid path is found, backtrack by marking the current cell as unvisited
  maze[row][col] = " "
  return '';
    
}

module.exports = mazeSolver;
