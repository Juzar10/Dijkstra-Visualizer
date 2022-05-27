function quickDijkstra(startNode, endNode, arrayOfNodes, rows, cols) {
  let priority_queue = [];
  let visited = [];
  let isPathFound = false;
  arrayOfNodes = arrayOfNodes;

  // pushing start node to Priority queue
  priority_queue.push(arrayOfNodes[startNode[0]][startNode[1]]);
  arrayOfNodes[startNode[0]][startNode[1]].distance = 0;

  while (priority_queue.length != 0) {
    let four_direction = [
      [1, 0], //down
      [0, 1], //right
      [-1, 0], //up
      [0, -1], //left
    ];
    let firstPriorityQueueNode = priority_queue[0];

    if (
      firstPriorityQueueNode.r == endNode[0] &&
      firstPriorityQueueNode.c == endNode[1]
    ) {
      isPathFound = true;
      visited.push([firstPriorityQueueNode.r, firstPriorityQueueNode.c]);

      colorElements(visited, arrayOfNodes, isPathFound);
      return;
    }

    for (let i = 0; i < four_direction.length; i++) {
      if (
        firstPriorityQueueNode.r + four_direction[i][0] >= 0 &&
        firstPriorityQueueNode.r + four_direction[i][0] < rows &&
        firstPriorityQueueNode.c + four_direction[i][1] >= 0 &&
        firstPriorityQueueNode.c + four_direction[i][1] < cols
      ) {
        let currentNode =
          arrayOfNodes[firstPriorityQueueNode.r + four_direction[i][0]][
            firstPriorityQueueNode.c + four_direction[i][1]
          ];
        if (currentNode.visited == false) {
          if (currentNode.status != "wall") {
            if (firstPriorityQueueNode.distance + 1 < currentNode.distance) {
              currentNode.distance = firstPriorityQueueNode.distance + 1;
              currentNode.previousNode = firstPriorityQueueNode.id;
              priority_queue.push(currentNode);
              arrayOfNodes[firstPriorityQueueNode.r + four_direction[i][0]][
                firstPriorityQueueNode.c + four_direction[i][1]
              ] = currentNode;
            }
          }
        }
      }
    }

    firstPriorityQueueNode.visited = true;
    visited.push([firstPriorityQueueNode.r, firstPriorityQueueNode.c]);
    arrayOfNodes[firstPriorityQueueNode.r][
      firstPriorityQueueNode.c
    ] = firstPriorityQueueNode;
    priority_queue.splice(0, 1);
  }
  colorElements(visited, arrayOfNodes, isPathFound);
}

function colorElements(visited, arrayOfNodes, isPathFound) {
  visited = visited;
  arrayOfNodes = arrayOfNodes;
  colorVisited(visited);
  if (isPathFound) {
    colorPath(visited, arrayOfNodes);
  } else {
    alert("no path found");
  }

  function colorVisited(visited) {
    for (let i = 1; i < visited.length - 1; i++) {
      let x = visited[i][0];
      let y = visited[i][1];

      document.getElementById(x + "-" + y).classList.remove("path_up")
      document.getElementById(x + "-" + y).classList.remove("path_down")
      document.getElementById(x + "-" + y).classList.remove("path_left")
      document.getElementById(x + "-" + y).classList.remove("path_right")

      document.getElementById(x + "-" + y).className += " quick_visited_color";
    }
  }

  function colorPath(visited, arrayOfNodes) {
    lastNode = visited[visited.length - 1];
    path = [];
    for (let i = visited.length - 2; i > -1; i--) {
      let str1 = arrayOfNodes[lastNode[0]][lastNode[1]].previousNode;
      let str2 = arrayOfNodes[visited[i][0]][visited[i][1]].id;

      if (str1.localeCompare(str2) == 0) {
        path.push([visited[i][0], visited[i][1]]);
        lastNode = [visited[i][0], visited[i][1]];
      }
    }
    path.unshift(newBoard.endNode);


    for (let i = path.length - 2; i > 0; i--) {
      let x = path[i][0];
      let y = path[i][1];
      console.log("i" , i)
      console.log(path)
      let previous_x = path[i - 1][0];
      let previous_y = path[i - 1][1];
      console.log(x,y)
      console.log(previous_x,previous_y)

      
        if (previous_x - x == -1 && previous_y - y == 0) {
          document.getElementById(x + "-" + y).classList.remove("quick_visited_color")
          document.getElementById(x + "-" + y).className += " path_up";
        }

        if (previous_x - x == 1 && previous_y - y == 0) {
          document.getElementById(x + "-" + y).classList.remove("quick_visited_color")
          document.getElementById(x + "-" + y).className += " path_down";
        }

        if (previous_x - x == 0 && previous_y - y == -1) {
          document.getElementById(x + "-" + y).classList.remove("quick_visited_color")
          document.getElementById(x + "-" + y).className += " path_left";
        }

        if (previous_x - x == 0 && previous_y - y == 1) {
          console.log("hi" , previous_x ,x,previous_y,y)
          document.getElementById(x + "-" + y).classList.remove("quick_visited_color")
          document.getElementById(x + "-" + y).className += " path_right";
        }
      // document.getElementById(x + "-" + y).className += " quick_path_color";
    }
  }
}
