let grid = [];
let rand = 0;
const maxTracks = 2;
let tracks = [];
let moved = false;
const moveRand = {
  up: 0.11,
  down: 0.23,
  left: 0.37,
  right: 0.53,
  top: 0.71,
  bottom: 0.89,
};

export default {
  data: {
    uiSizes: $app.getImports().uiSizes,
    headerBar: {},
    showGrid: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    score: 0,
    hiScore: 0,
    lf: "\n",
    // tileBgColor: {
    //   0: "#ccc0b4",
    //   2: "#eee4da",
    //   4: "#ede0c8",
    //   8: "#f2b179",
    //   16: "#f59563",
    //   32: "#f67c5f",
    //   64: "#f65e3b",
    //   128: "#edcf72",
    //   256: "#edcc61",
    //   512: "#edc850",
    //   1024: "#edc53f",
    //   2048: "#edc22e",
    //   4096: "#edbf1d",
    //   8192: "#edbc0c",
    //   16384: "#edb900",
    //   32768: "#edb600",
    //   65536: "#edb300",
    //   131072: "#edb000",
    // },
  },
  onInit() {
    const headerBarAnimation = $app.getImports().headerBar.setAnimation({
      updateFn: progress => {
        this.headerBar.progress = progress;
        this.headerBar = this.headerBar;
      },
    });
    this.headerBar.triggerShowAnimation = headerBarAnimation.triggerShowAnimation;

    $app.getImports().storage.get({
      key: "game",
      default: "",
      success: str => {
        if (str === "") return this.initGrid();
        const data = JSON.parse(str)
        grid = data.grid;
        this.score = data.score || 0;
        this.hiScore = data.hiScore || 0;
        rand = data.rand || Math.random();
        this.track();
        this.refreshGrid();
      }
    });
  },
  onDestroy() {
    this.saveProgress();
  },
  onGridSwipe(e) {
    moved = false;
    this.moveGrid(e.direction);
    if (moved) {
      rand = (rand + (moveRand[e.direction] || 0)) % 1;
      this.addTile();
      this.track();
      this.refreshGrid();
      this.saveProgress();
    }
  },
  onReplaySwipe(e) {
    if (e.direction === "right") {
      this.hiScore = Math.max(this.hiScore || 0, this.score || 0);
      this.score = 0;
      this.initGrid();
      this.saveProgress();
    }
  },
  onUndoSwipe(e) {
    if (e.direction === "left" && tracks.length >= 2) {
      tracks.pop();
      const data = tracks[tracks.length - 1];
      for (let i = 0; i < 16; i++) grid[i] = data.grid[i];
      this.score = data.score || 0;
      this.hiScore = data.hiScore || 0;
      rand = data.rand || Math.random();
      this.refreshGrid();
      this.saveProgress();
    }
  },
  initGrid() {
    tracks = [];
    grid = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    rand = Math.random();
    this.addTile();
    this.addTile();
    this.track();
    this.refreshGrid();
  },
  addTile() {
    let zeroTiles = [];
    for (let i = 0; i < 16; i++) if (grid[i] === 0) zeroTiles.push(i);
    let idx = Math.floor(newRand() * zeroTiles.length);
    grid[zeroTiles[idx]] = newRand() < 0.9 ? 2 : 4;
  },
  moveGrid(direction) {
    const isRow = (direction === "left" || direction === "right");
    const isReverse = (direction === "down" || direction === "bottom" || direction === "right");

    let i = 0, j, ij, j2, ij2, val, val2;
    while (i < 4) {
      j = 0;
      j2 = 1;
      while (j < 4 && j2 < 4) {
        ij = i * (isRow ? 4 : 1) + (isReverse ? 3 - j : j) * (isRow ? 1 : 4);
        ij2 = i * (isRow ? 4 : 1) + (isReverse ? 3 - j2 : j2) * (isRow ? 1 : 4);
        val = grid[ij];
        val2 = grid[ij2];

        if (val2 === 0) {
        } else if (val === 0) {
          grid[ij] = val2;
          grid[ij2] = 0;
          moved = true
        } else if (val === val2) {
          grid[ij] += val;
          this.score += grid[ij];
          grid[ij2] = 0;
          moved = true
          j++;
        } else {
          if (j + 1 === j2) j2++;
          j++;
          continue;
        }
        j2++;
      }
      i++;
    }
  },
  track() {
    const trackGrid = [];
    for (let i = 0; i < 16; i++) trackGrid[i] = grid[i];
    tracks.push({
      grid: trackGrid,
      score: this.score,
      hiScore: this.hiScore,
      rand: rand,
    });
    if (tracks.length > maxTracks) {
      tracks.shift();
    }
  },
  refreshGrid() {
    // let val;
    // for (let i = 0; i < 16; i++) {
    //   val = grid[i];
    //   this.showGrid[i] = grid[i];
    //   // this.showGrid[i].value = 0 + val || " ";
    //   // this.showGrid[i].bgColor = this.tileBgColor[val];
    //   // this.showGrid[i].color = val < 8 ? "#776e65" : "#f9f6f2";
    //   // this.showGrid[i].fontSize = val < 16384 ? "30px" : "26px";
    // }
    this.showGrid = grid;
  },
  saveProgress() {
    $app.getImports().storage.set({
      key: "game",
      value: JSON.stringify({
        grid: grid,
        score: this.score,
        hiScore: this.hiScore,
        rand: rand,
      }),
    });
  },
  onHeaderBarSwipe(data) {
    if (data.direction !== "down" && data.direction !== "bottom") return;
    if (this.headerBar.progress === 1) {
      return $app.getImports().router.replace({
        uri: "/pages/menu/menu",
      });
    }
    this.headerBar.triggerShowAnimation();
  },
}

function newRand() {
  let x = (rand * 0x100000000) >>> 0;
  x = (x * 1664525 + 1013904223) >>> 0;
  rand = x / 0x100000000;
  return rand;
}