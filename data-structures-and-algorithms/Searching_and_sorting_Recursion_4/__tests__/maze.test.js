const mazeSolver = require("../src/maze");

describe("Maze", () => {
  it("should find a single path", () => {
    let mySmallMaze = [
      [" ", "*", " "],
      [" ", "*", " "],
      [" ", " ", "e"],
    ];
    expect(mazeSolver(mySmallMaze)).toEqual("DDRR");
    
    let anotherSmallMaze = [
      [" ", " ", "*"],
      ["*", " ", "*"],
      [" ", " ", "*"],
      [" ", "*", "*"],
      [" ", " ", "e"],
    ];
    expect(mazeSolver(anotherSmallMaze)).toEqual("RDDLDDRR");
  });

  it("should find an alternate path", () => {
    let mySmallMaze = [
      [" ", "*", " "],
      [" ", " ", " "],
      [" ", "*", "e"],
    ];
    expect(mazeSolver(mySmallMaze)).toEqual("DRRD");
    
    let anotherSmallMaze = [
      [" ", " ", "*"],
      ["*", " ", "*"],
      [" ", " ", " "],
      [" ", "*", " "],
      [" ", "*", "e"],
    ];
    expect(mazeSolver(anotherSmallMaze)).toEqual("RDDRDD");
  });

  it("should find one path when multiple present", () => {
    let mySmallMaze = [
      [" ", " ", " "],
      [" ", "*", " "],
      [" ", " ", "e"],
    ];
    expect(["DDRR", "RRDD"]).toEqual(
      expect.arrayContaining([mazeSolver(mySmallMaze)])
    );
    
    let anotherSmallMaze = [
      [" ", " ", "*"],
      ["*", " ", "*"],
      [" ", " ", " "],
      [" ", "*", " "],
      [" ", " ", "e"],
    ];
    expect(["RDDLDDRR", "RDDRDD"]).toEqual(
      expect.arrayContaining([mazeSolver(anotherSmallMaze)])
    );
  });
});
