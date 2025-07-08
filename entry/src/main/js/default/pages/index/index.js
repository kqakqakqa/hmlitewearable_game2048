import app from '@system.app';
import storage from '@system.storage';
import router from '@system.router';

export default {
  data: {
    showLeftSideSwipe: false,
    showTopSideSwipe:false,
    leftSideSwipeTimeout:null,
    topSideSwipeTimeout: null,
    grid: [],
    score: 0,
    highScore: 0,
    refresh: true,
    cellBgColor: {
      0: "#ccc0b4",
      2: "#eee4da",
      4: "#ede0c8",
      8: "#f2b179",
      16: "#f59563",
      32: "#f67c5f",
      64: "#f65e3b",
      128: "#edcf72",
      256: "#edcc61",
      512: "#edc850",
      1024: "#edc53f",
      2048: "#edc22e",
      4096: "#edbf1d",
      8192: "#edbc0c",
      16384: "#edb900",
      32768: "#edb600",
      65536: "#edb300",
      131072: "#edb000",
    },
  },
  onInit() {
    storage.get({
      key: "grid",
      default: "",
      success: str => {
        if(str==="") return this.initGrid();
        this.grid = JSON.parse(str);
      }
    });
    storage.get({
      key: "score",
      default: "0",
      success: str => { this.score = JSON.parse(str) }
    });
    storage.get({
      key: "highScore",
      default: "0",
      success: str => { this.highScore = JSON.parse(str) }
    });
  },
  onDestroy() {
    this.saveProgress();
  },
  err(v){
    throw new Error(v);
  },
  onLeftSideSwipe(e) {
    if (e.direction === "right"){
      if(this.showLeftSideSwipe){
        app.terminate();
      } else{
        this.showLeftSideSwipe = true;
        this.leftSideSwipeTimeout = setTimeout(()=>{
          this.showLeftSideSwipe = false;
        },1200);
      }
    }
  },
  onTopSideSwipe(e){
    if (e.direction === "down"){
      if(this.showTopSideSwipe){
        router.replace({uri: "/pages/about/about"});
      } else{
        this.showTopSideSwipe = true;
        this.topSideSwipeTimeout = setTimeout(()=>{
          this.showTopSideSwipe = false;
        },1200);
      }
    }
  },
  onGridSwipe(e){
    const oldGrid = this.grid.join(",");
    let mergeCount = this.moveGrid(e.direction);
    if (oldGrid !== this.grid.join(",")){
      this.addCellNumber();
      this.score += mergeCount;
      this.refreshGrid();
      this.saveProgress();
      return;
    }
  },
  onReplaySwipe(e){
    if (e.direction === "right") {
      this.highScore = Math.max(this.highScore, this.score);
      this.score = 0;
      this.initGrid();
      this.refreshGrid();
      this.saveProgress();
    }
  },
  initGrid(){
    this.grid = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
    this.addCellNumber();
    this.addCellNumber();
  },
  addCellNumber(){
    let zeroCells = [];
    for (let i = 0; i < 16; i++) if(this.grid[i] === 0) zeroCells.push(i);
    let idx = Math.floor(Math.random() * zeroCells.length);
    this.grid[zeroCells[idx]] = Math.random() < 0.9 ? 2 : 4;
  },
  moveGrid(direction) {
    let mergeCount = 0;
    const isRow = (direction === 'left' || direction === 'right');
    const isReverse = (direction === 'down' || direction === 'right');
    for (let i = 0; i < 4; i++) {
      // 根据方向提取一行或一列
      let line;
      if (isRow) {
        if (isReverse) {
          line = [this.grid[i*4+3],this.grid[i*4+2],this.grid[i*4+1],this.grid[i*4]];
        } else {
          line = [this.grid[i*4],this.grid[i*4+1],this.grid[i*4+2],this.grid[i*4+3]];
        }
      } else {
        if (isReverse) {
          line = [this.grid[i+12],this.grid[i+8],this.grid[i+4],this.grid[i]];
        } else{
          line = [this.grid[i],this.grid[i+4],this.grid[i+8],this.grid[i+12]];
        }
      }
      // line = line.filter(cell => cell !== 0);

      // 处理合并
      let write = 0;
      for (let read = 0; read < 4; ) {
        if (line[read] === 0) {
          read++;
          continue;
        }

        let cell = line[read];

        let next = read + 1;
        while (next < 4 && line[next] === 0) {
          next++;
        }

        if (next < 4 && line[read] === line[next]) {
          cell *= 2;
          mergeCount += cell;
          read = next + 1;
        } else {
          read++;
        }

        line[write++] = cell;
      }

      // 填充空白
      while (write < 4) {
        line[write++] = 0;
      }

      // // 处理合并
      // let newLine = [];
      // for (let i = 0; i < line.length; i++) {
      //   let cell = line[i];
      //   if (i < line.length - 1 && cell === line[i + 1]) {
      //     cell *= 2;
      //     mergeCount += cell;
      //     i++;
      //   }
      //   newLine.push(cell);
      // }
      //
      // // 填充空白
      // while (newLine.length < 4) newLine.push(0);

      // 更新到新格子
      for (let j = 0; j < 4; j++) {
        if (isRow) {
          if (isReverse){
            this.grid[i * 4 + j] = line[3 - j];
          } else{
            this.grid[i * 4 + j] = line[j];
          }
        } else {
          if (isReverse) {
            this.grid[j * 4 + i] = line[3 - j];
          } else{
            this.grid[j * 4 + i] = line[j];
          }
        }
      }
    }

    return mergeCount;
  },
  refreshGrid(){
    this.grid = this.grid;
  },
  saveProgress(){
    storage.set({
      key: "grid",
      value: JSON.stringify(this.grid)
    });
    storage.set({
      key: "score",
      value: JSON.stringify(this.score)
    });
    storage.set({
      key: "highScore",
      value: JSON.stringify(this.highScore)
    });
  }
}