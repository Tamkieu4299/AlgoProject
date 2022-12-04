const getAllNodes = (grid) => {
    const result = [];
    for (const row of grid) {
        for (const col of row) {
            result.push(col)
        }
    }
    return result;
}

export function Dijkstras(grid, start, end) {
    const visitedNodesInOrder = [];
    const unvisitedNodes = getAllNodes(grid);
    start.distance = 0;

    while (unvisitedNodes.length !== 0) {
        const current = unvisitedNodes.sort((n1, n2) => n1.distance - n2.distance).shift();
        if (current.isWall) continue;
        if (current.distance === Infinity) return visitedNodesInOrder;
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

        for (const neighbor of neighbors) {
            neighbor.distance = current.distance + 1;
            neighbor.previousNode = current;
        }
    }
}

export function getNodesInShortestPathOrder_Dijkstras(end) {
    const nodesInShortestPathOrder = [];
    let current = end;
    while (current) {
        nodesInShortestPathOrder.unshift(current);
        current = current.previousNode;
    }
    return nodesInShortestPathOrder;
}