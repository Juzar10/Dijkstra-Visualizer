let slider = document.getElementById("speedSlider");
let output = document.getElementById("innerhtml");

class Board {
  constructor() {
    this.cols = 51;
    this.rows = 20;
    this.arrayOfNodes = [];
    this.startNodeMoving = false;
    this.endNodeMoving = false;
    this.wallDrawing = false;
    this.algorithmDone = false;
    this.startNode = [3, 5];
    this.endNode = [6, 7];
    this.speed = slider.value;
    this.creategrid();
    this.addEventListener();
    this.activateButtons();
  }

  creategrid() {
    for (let r = 0; r < this.rows; r++) {
      let divOfRow = document.createElement("div");
      divOfRow.className = "row";
      divOfRow.id = "row_no-" + r;
      let arrayOfRow = [];
      for (let c = 0; c < this.cols; c++) {
        let newdiv = document.createElement("div");
        newdiv.className = "cell";
        newdiv.id = r + "-" + c;
        divOfRow.appendChild(newdiv);

        let newNode = new Node(newdiv.id, "normal", r, c);
        arrayOfRow.push(newNode);

        if (r == this.startNode[0] && c == this.startNode[1]) {
          newdiv.classList.add("StartPoint");
          newNode.status = "startNode";
        }
        if (r == this.endNode[0] && c == this.endNode[1]) {
          newdiv.classList.add("EndPoint");
          newNode.status = "endNode";
        }
      }
      document.getElementById("grid-container").appendChild(divOfRow);
      this.arrayOfNodes.push(arrayOfRow);
    }
  }

  quickAlgorithm() {
    quickDijkstra(
      this.startNode,
      this.endNode,
      this.arrayOfNodes,
      this.rows,
      this.cols
    );
  }

  clear() {
    for (let r = 0; r < this.rows; r++) {
      for (let c = 0; c < this.cols; c++) {
        document.getElementById(r + "-" + c).classList.remove("visited_color");
        document
          .getElementById(r + "-" + c)
          .classList.remove("quick_visited_color");
        document.getElementById(r + "-" + c).classList.remove("path_color");
        document
          .getElementById(r + "-" + c)
          .classList.remove("quick_path_color");

        this.arrayOfNodes[r][c].distance = Infinity;
        this.arrayOfNodes[r][c].visited = false;
        this.arrayOfNodes[r][c].previousNode = null;
      }
    }
  }

  addEventListener() {
    slider.oninput = () => {
      this.speed = slider.value;
      output.innerHTML = slider.value;
    };

    for (let r = 0; r < this.rows; r++) {
      for (let c = 0; c < this.cols; c++) {
        let currentId = r + "-" + c;
        let currentNode = this.arrayOfNodes[r][c];
        let currentElement = document.getElementById(currentId);

        currentElement.onmousedown = (e) => {
          e.preventDefault();

          if (currentNode.status == "startNode") {
            this.startNodeMoving = true;
          } else if (currentNode.status == "endNode") {
            this.endNodeMoving = true;
          } else {
            this.wallDrawing = true;
          }
        };

        currentElement.onmouseup = () => {
          this.wallDrawing = false;
          this.startNodeMoving = false;
          this.endNodeMoving = false;
        };

        currentElement.onmouseenter = () => {
          if (
            this.wallDrawing &&
            currentNode.status != "startNode" &&
            currentNode.status != "endNode"
          ) {
            currentElement.classList.remove("path_left")
            currentElement.classList.remove("path_right")
            currentElement.classList.remove("path_up")
            currentElement.classList.remove("path_down")

            currentElement.classList.add("wall");
            currentNode.status = "wall";
          }
          if (this.startNodeMoving) {
            if (currentNode.status == "wall") {
              currentElement.classList.remove("wall");
            }

            currentElement.classList.add("StartPoint");
            currentNode.status = "startNode";
            let temp = currentId.split("-");
            this.startNode[0] = parseInt(temp[0]);
            this.startNode[1] = parseInt(temp[1]);

            if (this.algorithmDone) {
              this.clear();
              this.quickAlgorithm();
            }
          }
          if (this.endNodeMoving) {
            if (currentNode.status == "wall") {
              currentElement.classList.remove("wall");
            }
            currentElement.classList.add("EndPoint");
            currentNode.status = "endNode";
            let temp = currentId.split("-");
            this.endNode[0] = parseInt(temp[0]);
            this.endNode[1] = parseInt(temp[1]);

            if (this.algorithmDone) {
              this.clear();
              this.quickAlgorithm();
            }
          }
        };

        currentElement.onmouseleave = () => {
          if (this.startNodeMoving) {
            currentElement.classList.remove("StartPoint");
            currentNode.status = "normal";
          }
          if (this.endNodeMoving) {
            currentElement.classList.remove("EndPoint");
            currentNode.status = "normal";
          }
        };
      }
    }
  }

  activateButtons() {
    document.getElementById("dijkstra").onclick = () => {
      dijkstra(
        this.startNode,
        this.endNode,
        this.arrayOfNodes,
        this.rows,
        this.cols
      );
      document.getElementById("clearBtn").onclick = () => {
        document.getElementById("grid-container").innerHTML = "";
        this.arrayOfNodes = [];
        this.algorithmDone = false;
        this.creategrid();
        this.addEventListener();
      };
    };
  }
}

class Node {
  // there can be 4 types of status
  //normal,start,end,wall
  constructor(id, status, r, c) {
    this.r = r;
    this.c = c;
    this.id = id;
    this.status = status;
    this.distance = Infinity;
    this.visited = false;
    this.previousNode = null;
  }
}

let newBoard = new Board();
