interface Node {
	x: number;
	y: number;
	fScore: number;
	gScore: number;
	hScore: number;
	parent: Node | null;
}
class PriorityQueue {
	private nodes: Node[];
	private nodeMap: Map<string, Node>;

	constructor(private compare: (a: Node, b: Node) => number) {
		this.nodes = [];
		this.nodeMap = new Map();
	}

	enqueue(node: Node): void {
		const key = `${node.x},${node.y}`;
		const existing = this.nodeMap.get(key);

		if (existing) {
			if (node.gScore >= existing.gScore) return;
			this.nodes = this.nodes.filter((n) => n !== existing);
		}

		this.nodeMap.set(key, node);
		this.nodes.push(node);
		this.nodes.sort(this.compare);
	}

	dequeue(): Node | undefined {
		const node = this.nodes.shift();
		if (node) this.nodeMap.delete(`${node.x},${node.y}`);
		return node;
	}

	isEmpty(): boolean {
		return this.nodes.length === 0;
	}
}

const Astar = (
	start: Node,
	goal: Node,
	gridSize: number,
	obstacles: Set<string>
): { result: Node[]; exploredNodes: Set<string> } | [] => {
	const positionKey = (x: number, y: number): string => `${x},${y}`;
	const heuristic = (a: Node, b: Node): number => {
		return Math.abs(a.x - b.x) + Math.abs(a.y - b.y);
	};
	const getMovementCost = (): number => {
		let movementCost = 1;

		return movementCost;
	};

	const getNeighbors = (node: Node): Node[] => {
		const neighbors: Node[] = [];
		const { x, y } = node;

		const directions = [
			{ dx: 0, dy: 1 }, // Góra
			{ dx: 1, dy: 0 }, // Prawo
			{ dx: 0, dy: -1 }, // Dół
			{ dx: -1, dy: 0 }, // Lewo
		];

		for (const { dx, dy } of directions) {
			const newX = x + dx;
			const newY = y + dy;

			if (isValidPosition(newX, newY)) {
				neighbors.push({
					x: newX,
					y: newY,
					fScore: Infinity,
					gScore: Infinity,
					hScore: Infinity,
					parent: null,
				});
			}
		}

		return neighbors;
	};
	const isValidPosition = (x: number, y: number): boolean => {
		const posKey = `${x},${y}`;
		return (
			x >= 0 &&
			x <= gridSize &&
			y >= 0 &&
			y <= gridSize &&
			!obstacles.has(posKey)
		);
	};

	const compareNodes = (a: Node, b: Node): number => {
		if (a.fScore !== b.fScore) return a.fScore - b.fScore;
		if (a.gScore !== b.gScore) return b.gScore - a.gScore;
		return a.hScore - b.hScore;
	};

	const getShortestPath = (goalNode: Node): Node[] => {
		const path: Node[] = [];

		let currentNode: Node | null = goalNode;

		while (currentNode) {
			path.push(currentNode);
			currentNode = currentNode.parent;
		}

		return path.reverse();
	};

	start.gScore = 0;
	start.hScore = heuristic(start, goal);
	start.fScore = start.gScore + start.hScore;

	const openList = new PriorityQueue(compareNodes);
	openList.enqueue(start);

	const closedSet = new Set<string>();
	const gScoreMap = new Map<string, number>();

	gScoreMap.set(positionKey(start.x, start.y), 0);

	const exploredNodes: Set<string> = new Set();

	while (!openList.isEmpty()) {
		const currentNode = openList.dequeue() as Node;
		const currentKey = positionKey(currentNode.x, currentNode.y);

		exploredNodes.add(currentKey);

		if (currentNode.x === goal.x && currentNode.y === goal.y) {
			return {
				result: getShortestPath(currentNode),
				exploredNodes,
			};
		}
		if (closedSet.has(currentKey)) {
			continue;
		}

		closedSet.add(currentKey);

		for (const neighbor of getNeighbors(currentNode)) {
			const neighborKey = positionKey(neighbor.x, neighbor.y);

			if (closedSet.has(neighborKey)) {
				continue;
			}

			const tentativeGScore =
				currentNode.gScore + getMovementCost();

			if (
				!gScoreMap.has(neighborKey) ||
				tentativeGScore < gScoreMap.get(neighborKey)!
			) {
				neighbor.parent = currentNode;
				neighbor.gScore = tentativeGScore;
				neighbor.hScore = heuristic(neighbor, goal);
				neighbor.fScore = neighbor.gScore + neighbor.hScore;
				gScoreMap.set(neighborKey, tentativeGScore);

				openList.enqueue(neighbor);
			}
		}
	}
	return [];
};

export { Astar };

export type { Node };
