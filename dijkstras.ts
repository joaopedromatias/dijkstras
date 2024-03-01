import { Graph, type Vertex } from './graph'

function getUnvisitedNeighboursIndexes(
  matrix: number[][],
  vertices: Vertex[],
  vertexIndex: number
) {
  const unvisitedNeighbours: number[] = []
  const vertexRow = matrix[vertexIndex]
  for (let columnIndex = 0; columnIndex < vertexRow.length; columnIndex++) {
    const columnWeight = vertexRow[columnIndex]
    if (columnWeight && !vertices[columnIndex].isVisited) {
      unvisitedNeighbours.push(columnIndex)
    }
  }
  return unvisitedNeighbours
}

export function dijkstras(
  graph: Graph,
  indexOfStartVertex: number,
  indexOfEndVertex: number
): number {
  const matrix = graph.adjacencyMatrix
  const nbOfVertices = graph.vertices.length
  const shortestPathsFromStartVertex = new Array(nbOfVertices)
    .fill(null)
    .map((_, i) => (i === indexOfStartVertex ? 0 : Infinity))
  const verticesIndexToVisit = [indexOfStartVertex]

  while (verticesIndexToVisit.length) {
    const currentVertexIndex = verticesIndexToVisit[0]

    const indexesOfNeighbours = getUnvisitedNeighboursIndexes(
      matrix,
      graph.vertices,
      currentVertexIndex
    )

    for (let i = 0; i < indexesOfNeighbours.length; i++) {
      const neighbourIndex = indexesOfNeighbours[i]
      if (!verticesIndexToVisit.includes(neighbourIndex)) {
        verticesIndexToVisit.push(neighbourIndex)
      }

      const weigth = matrix[currentVertexIndex][neighbourIndex]

      const currentShortestPathToNeighbour = shortestPathsFromStartVertex[neighbourIndex]
      const shortestDistanceToCurrentIndex = shortestPathsFromStartVertex[currentVertexIndex]
      shortestPathsFromStartVertex[neighbourIndex] = Math.min(
        shortestDistanceToCurrentIndex + weigth,
        currentShortestPathToNeighbour
      )
    }

    graph.vertices[currentVertexIndex].isVisited = true
    verticesIndexToVisit.splice(0, 1)
  }

  graph.vertices.forEach((vertex) => (vertex.isVisited = false))
  return shortestPathsFromStartVertex[indexOfEndVertex]
}

const graph = new Graph(5)
graph.addVertex(10)
graph.addVertex(22)
graph.addVertex(17)
graph.addVertex(3)
graph.addVertex(7)

graph.addEdge(0, 2, 5)
graph.addEdge(0, 4, 7)
graph.addEdge(1, 4, 2)
graph.addEdge(1, 2, 3)
graph.addEdge(3, 4, 8)

const startVertex = 2
const endVertex = 4

const shortestDistance = dijkstras(graph, startVertex, endVertex)
console.log(
  `The shortest distance between vertex ${startVertex} and vertex ${endVertex} is ${shortestDistance}`
)

/*
[
  [ 0, 0, 5, 0, 7 ],
  [ 0, 0, 3, 0, 2 ],
  [ 5, 3, 0, 0, 0 ],
  [ 0, 0, 0, 0, 8 ],
  [ 7, 2, 0, 8, 0 ]
]
 
           (7)         (8)
    10(0) ------ 7(4) ------ 3(3)
    |            |
    |(5)         |(2)
    |      (3)   |
    17(2) ------ 22(1)

*/
