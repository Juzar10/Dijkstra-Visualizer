function dijkstra(startNode, endNode, arrayOfNodes, rows, cols) {
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

      startAnimation(visited, arrayOfNodes, isPathFound);
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
  startAnimation(visited, arrayOfNodes, isPathFound);
}
