import { dijkstras } from './dijkstras'
import { Graph } from './graph'

describe('dijkstras algorithm', () => {
  it('should return the correct shortest distances between all vertices', () => {
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

    const shortestDistance0And1 = dijkstras(graph, 0, 1)
    expect(shortestDistance0And1).toBe(8)
    const shortestDistance0And2 = dijkstras(graph, 0, 2)
    expect(shortestDistance0And2).toBe(5)
    const shortestDistance0And3 = dijkstras(graph, 0, 3)
    expect(shortestDistance0And3).toBe(15)
    const shortestDistance0And4 = dijkstras(graph, 0, 4)
    expect(shortestDistance0And4).toBe(7)
    const shortestDistance1And2 = dijkstras(graph, 1, 2)
    expect(shortestDistance1And2).toBe(3)
    const shortestDistance1And3 = dijkstras(graph, 1, 3)
    expect(shortestDistance1And3).toBe(10)
    const shortestDistance1And4 = dijkstras(graph, 1, 4)
    expect(shortestDistance1And4).toBe(2)
    const shortestDistance2And3 = dijkstras(graph, 2, 3)
    expect(shortestDistance2And3).toBe(13)
    const shortestDistance2And4 = dijkstras(graph, 2, 4)
    expect(shortestDistance2And4).toBe(5)
    const shortestDistance3And4 = dijkstras(graph, 3, 4)
    expect(shortestDistance3And4).toBe(8)
  })
  it('should not be affected if there is a vertex not connected to any other vertex in the graph', () => {
    const graph = new Graph(3)
    graph.addVertex(10)
    graph.addVertex(22)
    graph.addVertex(17)

    graph.addEdge(0, 1, 3)

    const shortestDistance0And1 = dijkstras(graph, 0, 1)
    expect(shortestDistance0And1).toBe(3)
  })

  it('should return Infinity distance between two vertices not connected by any path', () => {
    const graph = new Graph(2)
    graph.addVertex(10)
    graph.addVertex(22)

    const shortestDistance0And1 = dijkstras(graph, 0, 1)
    expect(shortestDistance0And1).toBe(Infinity)
  })
})
