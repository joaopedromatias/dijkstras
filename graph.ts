export class Vertex {
  value: number
  isVisited: boolean

  constructor(value: number) {
    this.value = value
    this.isVisited = false
  }
}

export class Graph {
  readonly vertices: Vertex[]
  private totalVertices: number
  readonly adjacencyMatrix: number[][]

  constructor(totalVertices: number) {
    this.totalVertices = totalVertices
    this.vertices = []
    this.adjacencyMatrix = []
    for (let row = 0; row < totalVertices; row++) {
      const arr = new Array(totalVertices).fill(0)
      this.adjacencyMatrix[row] = arr
    }
  }

  addVertex(data: number) {
    if (this.vertices.length < this.totalVertices) {
      const vertex = new Vertex(data)
      this.vertices.push(vertex)
    }
  }

  addEdge(indexVertexOne: number, indexVertexTwo: number, weigth: number) {
    if (indexVertexOne !== indexVertexTwo) {
      this.adjacencyMatrix[indexVertexOne][indexVertexTwo] = weigth
      this.adjacencyMatrix[indexVertexTwo][indexVertexOne] = weigth
    }
  }

  showVertex(index: number) {
    return this.vertices[index] ? this.vertices[index].value : null
  }

  getMatrix() {
    return this.adjacencyMatrix
  }

  traverse() {
    const queue = new Queue()
    queue.enqueue(0)

    do {
      const vertexIndex = queue.dequeue()!
      const vertexValue = this.vertices[vertexIndex].value
      if (vertexValue !== undefined) {
        console.log('vertex at index', vertexIndex, 'has value', vertexValue)
        this.vertices[vertexIndex].isVisited = true
        for (let columnIndex = 0; columnIndex < this.totalVertices; columnIndex++) {
          const edgeWeigth = this.adjacencyMatrix[vertexIndex][columnIndex]
          if (edgeWeigth && !queue.has(columnIndex) && !this.vertices[columnIndex].isVisited) {
            queue.enqueue(columnIndex)
          }
        }
      }
    } while (queue.hasValues())

    this.vertices.forEach((vertex) => {
      vertex.isVisited = false
    })
  }
}

class Queue {
  values: number[]

  constructor() {
    this.values = []
  }

  enqueue(value: number) {
    this.values.push(value)
  }

  dequeue() {
    return this.values.shift()
  }

  hasValues() {
    return this.values.length > 0
  }

  has(value: number) {
    return this.values.indexOf(value) !== -1
  }
}
