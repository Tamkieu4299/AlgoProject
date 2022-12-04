export function BFS(grid, start, end) {
    const visitedNodesInOrder = [];
    let queue = []
    queue.push(start);
    start.distance = 0;

    while (queue.length > 0) {
        const current = queue.shift();
        if (current.isWall) continue;
        if (current.distance === Infinity) return visitedNodesInOrder;
        if (current.isVisited) continue;

        current.isVisited = true;
        visitedNodesInOrder.push(current);
        if (current === end) return visitedNodesInOrder;

        let neighbors = [];
        const { col, row } = current;
        if (row > 0) neighbors.push(grid[row - 1][col]);
        if (row < grid.length - 1) neighbors.push(grid[row + 1][col]);
        if (col > 0) neighbors.push(grid[row][col - 1]);
        if (col < grid[0].length - 1) neighbors.push(grid[row][col + 1]);
        neighbors = neighbors.filter(neighbor => !neighbor.isVisited);
        neighbors.map(neighbor => queue.push(neighbor))
        for (const neighbor of neighbors) {
            neighbor.distance = current.distance + 1;
            neighbor.previousNode = current;
        }
    }
}

export function getNodesInShortestPathOrder_BFS(end) {
    const nodesInShortestPathOrder = [];
    let current = end;
    while (current) {
        nodesInShortestPathOrder.unshift(current);
        current = current.previousNode;
    }
    return nodesInShortestPathOrder;
}