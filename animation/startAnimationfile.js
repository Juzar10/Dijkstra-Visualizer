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

    for (let i = path.length - 2; i > -1; i--) {
      let x = path[i][0];
      let y = path[i][1];

      setTimeout(() => {
        document.getElementById(x + "-" + y).className += " path_color";
      }, (delay += parseInt(newBoard.speed) * 3));
    }
  }
}
