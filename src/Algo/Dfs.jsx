export function DFS(grid, start, end) {
    const visitedNodesInOrder = [];
    let stack = []
    stack.push(start);
    start.distance = 0;
    let shortLength = Infinity

    while (stack.length > 0) {
        const current = stack.pop();
        if (current.isWall) continue;
        if(current.distance>shortLength) continue;
        if (current.distance === Infinity) return visitedNodesInOrder;
        if (current.isVisited) continue;

        current.isVisited = true;
        if(current === end){
            shortLength = Math.min(current.distance,shortLength);
            continue;
        }
        visitedNodesInOrder.push(current);

        let neighbors = [];
        const { col, row } = current;
        if (row > 0) neighbors.push(grid[row - 1][col]);
        if (row < grid.length - 1) neighbors.push(grid[row + 1][col]);
        if (col > 0) neighbors.push(grid[row][col - 1]);
        if (col < grid[0].length - 1) neighbors.push(grid[row][col + 1]);
        neighbors = neighbors.filter(neighbor => !neighbor.isVisited);
        neighbors.map(neighbor => stack.push(neighbor))
        for (const neighbor of neighbors) {
            neighbor.distance = current.distance + 1;
            neighbor.previousNode = current;
        }
    }
    return visitedNodesInOrder;
}
// export function DFS(grid, start, end, visitedNodesInOrder) {
//     if(start.distance > shortLength) return;
//     if (start.isWall) return;
//     if (start.isVisited) return;
//     if(start === end){
//         shortLength = start.distance;
//         return;
//     }
//     start.isVisited = true
//     visitedNodesInOrder.push(start);
//     let neighbors = [];
//     const { col, row } = start;
//     if (row > 0) neighbors.push(grid[row - 1][col]);
//     if (row < grid.length - 1) neighbors.push(grid[row + 1][col]);
//     if (col > 0) neighbors.push(grid[row][col - 1]);
//     if (col < grid[0].length - 1) neighbors.push(grid[row][col + 1]);
//     neighbors = neighbors.filter(neighbor => !neighbor.isVisited);
//     for (const neighbor of neighbors) {
//         neighbor.distance = start.distance + 1;
//         neighbor.previousNode = start;
//     }
//     neighbors.map(neighbor => DFS(grid, neighbor, end, visitedNodesInOrder))
// }


export function getNodesInShortestPathOrder_DFS(end) {
    const nodesInShortestPathOrder = [];
    let current = end;
    while (current) {
        nodesInShortestPathOrder.unshift(current);
        current = current.previousNode;
    }
    return nodesInShortestPathOrder;
}