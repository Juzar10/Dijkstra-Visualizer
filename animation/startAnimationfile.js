function startAnimation(visited, arrayOfNodes, isPathFound) {
  let delay = 0;
  visited = visited;
  arrayOfNodes = arrayOfNodes;
  colorVisited(visited);
  if (isPathFound) {
    colorPath(visited, arrayOfNodes);
  } else {
    setTimeout(() => {
      alert("no path found");
    }, (delay += parseInt(newBoard.speed)));
  }

  function colorVisited(visited) {
    for (let i = 1; i < visited.length - 1; i++) {
      let x = visited[i][0];
      let y = visited[i][1];

      setTimeout(() => {
        document.getElementById(x + "-" + y).className += " visited_color";
      }, (delay += parseInt(newBoard.speed)));
    }
  }

  function colorPath(visited, arrayOfNodes) {
    delay += 100;
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
      console.log(path)
      let x = path[i][0];
      let y = path[i][1];

      let previous_x = path[i - 1][0];
      let previous_y = path[i - 1][1];

      setTimeout(() => {
        if (previous_x - x == -1 && previous_y - y == 0) {
          document.getElementById(x + "-" + y).classList.remove("visited_color")
          document.getElementById(x + "-" + y).className += " path_up";
        }

        if (previous_x - x == 1 && previous_y - y == 0) {
          document.getElementById(x + "-" + y).classList.remove("visited_color")
          document.getElementById(x + "-" + y).className += " path_down";
        }

        if (previous_x - x == 0 && previous_y - y == -1) {
          document.getElementById(x + "-" + y).classList.remove("visited_color")
          document.getElementById(x + "-" + y).className += " path_left";
        }

        if (previous_x - x == 0 && previous_y - y == 1) {
          document.getElementById(x + "-" + y).classList.remove("visited_color")
          document.getElementById(x + "-" + y).className += " path_right";
        }
      }, (delay += parseInt(newBoard.speed) * 3));
    }
  }
}
