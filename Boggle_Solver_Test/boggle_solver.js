
/**
 * Given a Boggle board and a dictionary, returns a list of available words in
 * the dictionary present inside of the Boggle board.
 * @param {string[][]} grid - The Boggle game board.
 * @param {string[]} dictionary - The list of available words.
 * @returns {string[]} solutions - Possible solutions to the Boggle board.
 */
/*
 * Rachel Ibihwiori
 *  @02983638
 */
exports.findAllSolutions = function (grid, dictionary) {
  let solutions = [];

  //makes sure either array doesnt have null value
  if (grid == null || dictionary == null) {
    return solutions;
  }

  //check if grid is nxn
  let N = grid.length;
  for (let k = 0; k < N; k++) {
    if (grid[k].length != N) {
      return solutions;
    }
  }

  //convert to lowercase
  lowerCaseify(grid, dictionary);

  //check grid validity
  if (!isgridValid(grid)) {
    return solutions;
  }
  //set up data structures
  let sltnSet = new Set();
  let hash = createHashMap(dictionary);

  //iterate over NxN grid
  for (let j = 0; j < N; j++) {
    for (let i = 0; i < N; i++) {
      let newWord = "";

      let vis = new Array(N).fill(false).map(() => new Array(N).fill(false));

      dfs(newWord, j, i, grid, vis, hash, sltnSet);
    }
  }

  solutions = Array.from(sltnSet);

  return solutions;
};

dfs = function (newWord, j, i, grid, vis, hash, sltnSet) {
  let adjMatrix = [
    [-1, -1],
    [-1, 0],
    [-1, 1],
    [0, 1],
    [1, 1],
    [1, 0],
    [1, -1],
    [0, -1],
  ];
  //base cases
  if (
    i < 0 ||
    j < 0 ||
    i >= grid.length ||
    j >= grid.length ||
    vis[j][i] == true
  )
    return;

  //append
  newWord += grid[j][i];

  //check if a prefix for words in hash
  if (checkPrefix(hash, newWord)) {
    vis[j][i] = true;

    if (checkWord(hash, newWord)) {
      if (newWord.length >= 3) sltnSet.add(newWord);
    }

    //recursion, adjacency matrix

    for (let a = 0; a < 8; a++) {
      dfs(
        newWord,
        j + adjMatrix[a][0],
        i + adjMatrix[a][1],
        grid,
        vis,
        hash,
        sltnSet
      );
    }
  }
  //else
  vis[j][i] = false;
}; //eof

lowerCaseify = function (grid, dctnry) {
  for (let p = 0; p < grid.length; p++) {
    for (let q = 0; q < grid[p].length; q++) {
      grid[p][q] = grid[p][q].toLowerCase();
    }
  }
  for (let t = 0; t < dctnry.length; t++) {
    dctnry[t] = dctnry[t].toLowerCase();
  }
};

isgridValid = function (grid) {
  regex = /(st|qu)|[a-prt-z]/;
  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid[i].length; j++) {
      if (!grid[i][j].match(regex)) {
        return false;
      }
    }
  }
  return true;
};

checkPrefix = function (hash, newWord) {
  return hash[newWord] != undefined;
};

checkWord = function (hash, newWord) {
  return hash[newWord] == 1;
};

//create hash map
createHashMap = function (dictionary) {
  var dict = {};

  for (let i = 0; i < dictionary.length; i++) {
    dict[dictionary[i]] = 1;
    let wordlength = dictionary[i].length;
    var str = dictionary[i];
    for (let j = wordlength; wordlength > 1; wordlength--) {
      str = str.substr(0, wordlength - 1);
      if (str in dict) {
        if (str == 1) {
          dict[str] = 1;
        }
      } else {
        dict[str] = 0;
      }
    }
  }

  return dict;
}; //eof

var grid = [
  ["T", "W", "Y", "R"],
  ["E", "N", "P", "H"],
  ["G", "Z", "Qu", "R"],
  ["St", "N", "T", "A"],
];
var dictionary = [
  "art",
  "ego",
  "gent",
  "get",
  "net",
  "new",
  "newt",
  "prat",
  "pry",
  "qua",
  "quart",
  "quartz",
  "rat",
  "tar",
  "tarp",
  "ten",
  "went",
  "wet",
  "arty",
  "egg",
  "not",
  "quar",
];

console.log(exports.findAllSolutions(grid, dictionary));

