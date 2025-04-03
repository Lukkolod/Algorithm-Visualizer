import { useEffect, useRef, useState } from "react";
import { Astar, Node } from "../../utils/Astar";
import { TbCircleLetterA, TbCircleLetterB } from "react-icons/tb";
import { FaDotCircle } from "react-icons/fa";
import { GiBrickWall } from "react-icons/gi";
import { motion, spring } from "framer-motion";

type DraggingProps = "start" | "goal";

const FindingVisualizer = () => {
	const gridSize = 20;
	const [startPos, setStartPos] = useState({ x: 2, y: 9 });
	const [goalPos, setGoalPos] = useState({ x: 12, y: 3 });
	const [obstacles, setObstacles] = useState<Set<string>>(new Set());
	const [visitedNodes, setVisitedNodes] = useState<Set<string>>(new Set());
	const [path, setPath] = useState<Node[]>([]);
	
	const [isAnimating, setIsAnimating] = useState(false);
	const [animationPhase, setAnimationPhase] = useState<
		"search" | "path" | "complete"
	>("complete");
	const [isObstacleMode, setIsObstacleMode] = useState(false);
	const [isMouseDown, setIsMouseDown] = useState(false);
	const cellRefs = useRef<(HTMLDivElement | null)[][]>([]);
	const [animatedVisited, setAnimatedVisited] = useState<Set<string>>(
		new Set()
	);
	const [animatedPath, setAnimatedPath] = useState<Node[]>([]);

	useEffect(() => {
		if (!isAnimating) {
			setPath([]);
			setVisitedNodes(new Set());
			setAnimatedPath([]);
			setAnimatedVisited(new Set());
		}
	}, [startPos, goalPos, obstacles]);

	useEffect(() => {
		cellRefs.current = Array(gridSize)
			.fill(null)
			.map(() => Array(gridSize).fill(null));
	}, [gridSize]);

	const positionKey = (x: number, y: number): string => `${x},${y}`;

	const isObstacle = (x: number, y: number): boolean => {
		return obstacles.has(positionKey(x, y));
	};

	const toggleObstacle = (x: number, y: number): void => {
		if (
			(x === startPos.x && y === startPos.y) ||
			(x === goalPos.x && y === goalPos.y)
		) {
			return;
		}

		const key = positionKey(x, y);
		setObstacles((prev) => {
			const newObstacles = new Set(prev);
			if (newObstacles.has(key)) {
				newObstacles.delete(key);
			} else {
				newObstacles.add(key);
			}
			return newObstacles;
		});
	};

	const handleCellMouseDown = (x: number, y: number) => {
		if (isAnimating || !isObstacleMode) return;
		setIsMouseDown(true);
		toggleObstacle(x, y);
	};

	const handleCellMouseEnter = (x: number, y: number) => {
		if (isAnimating || !isObstacleMode || !isMouseDown) return;
		toggleObstacle(x, y);
	};

	const handleMouseUp = () => {
		setIsMouseDown(false);
	};

	const calculatePath = (animate: boolean = false) => {
		const customAstar = Astar(
			{
				x: startPos.x,
				y: startPos.y,
				fScore: 0,
				gScore: 0,
				hScore: 0,
				parent: null,
			},
			{
				x: goalPos.x,
				y: goalPos.y,
				fScore: 0,
				gScore: 0,
				hScore: 0,
				parent: null,
			},
			gridSize,
			obstacles
		);

		if ("result" in customAstar && "exploredNodes" in customAstar) {
			const { result, exploredNodes } = customAstar;

			if (!animate) {
				setPath(result);
				setVisitedNodes(exploredNodes);
			}

			return { result, exploredNodes };
		}
		return null;
	};

	const startAnimation = () => {
		setIsAnimating(true);
		setAnimationPhase("search");
		setAnimatedVisited(new Set());
		setAnimatedPath([]);

		const pathResult = calculatePath(true);
		if (!pathResult) {
			setIsAnimating(false);
			return;
		}

		const { result, exploredNodes } = pathResult;
		const exploredArray = Array.from(exploredNodes);

		let visitedIndex = 0;
		const visitedInterval = setInterval(() => {
			if (visitedIndex < exploredArray.length) {
				setAnimatedVisited((prev) => {
					const newSet = new Set(prev);
					newSet.add(exploredArray[visitedIndex]);
					return newSet;
				});
				visitedIndex++;
			} else {
				clearInterval(visitedInterval);

				if (result.length <= 1) {
					setAnimationPhase("complete");
					setIsAnimating(false);
					return;
				}

				setAnimationPhase("path");

				let pathIndex = 0;
				const pathInterval = setInterval(() => {
					if (pathIndex < result.length) {
						setAnimatedPath(result.slice(0, pathIndex + 1));
						pathIndex++;
					} else {
						clearInterval(pathInterval);
						setAnimationPhase("complete");
						setIsAnimating(false);
						setPath(result);
						setVisitedNodes(exploredNodes);
					}
				}, 100);
			}
		}, 30);
	};

	const clearBoard = () => {
		setObstacles(new Set());
		setPath([]);
		setVisitedNodes(new Set());
		setAnimatedPath([]);
		setAnimatedVisited(new Set());
	};

	const isInPath = (x: number, y: number) => {
		if (isAnimating && animationPhase === "search") return false;

		const pathToCheck = isAnimating ? animatedPath : path;
		return pathToCheck.some((n) => n.x === x && n.y === y);
	};

	const isVisited = (x: number, y: number) => {
		const visitedSet = isAnimating ? animatedVisited : visitedNodes;
		return visitedSet?.has(`${x},${y}`);
	};

	const getCellStatus = (x: number, y: number) => {
		if (x === startPos.x && y === startPos.y) {
			return "start";
		}
		if (x === goalPos.x && y === goalPos.y) {
			return "goal";
		}
		if (isObstacle(x, y)) {
			return "obstacle";
		}
		if (isInPath(x, y)) {
			return "path";
		}
		if (isVisited(x, y)) {
			return "visited";
		}
		return "";
	};

	const handleDragStart = (e: React.DragEvent, type: DraggingProps) => {
		if (isAnimating || isObstacleMode) return;
		e.dataTransfer.setData("text/plain", type);
	};

	const handleDragOver = (e: React.DragEvent) => {
		e.preventDefault();
	};

	const handleDrop = (e: React.DragEvent, x: number, y: number) => {
		if (isAnimating || isObstacleMode) return;
		e.preventDefault();
		const type = e.dataTransfer.getData("text/plain") as DraggingProps;

		if (isObstacle(x, y)) return;

		if (type === "start" && !(x === goalPos.x && y === goalPos.y)) {
			setStartPos({ x, y });
		} else if (type === "goal" && !(x === startPos.x && y === startPos.y)) {
			setGoalPos({ x, y });
		}

	};

	const setRef = (x: number, y: number) => (element: HTMLDivElement | null) => {
		if (cellRefs.current[x] === undefined) cellRefs.current[x] = [];
		cellRefs.current[x][y] = element;
		return undefined;
	};

	return (
		<div
			className="flex flex-col items-center gap-4"
			onMouseUp={handleMouseUp}
			onMouseLeave={handleMouseUp}
		>
			<div className="flex gap-4 mb-4 flex-wrap justify-center">
				<button
					onClick={startAnimation}
					disabled={isAnimating}
					className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 disabled:bg-gray-400"
				>
					{isAnimating
						? animationPhase === "search"
							? "Searching..."
							: "Building Path..."
						: "Start Animation"}
				</button>

				<button
					onClick={() => setIsObstacleMode(!isObstacleMode)}
					disabled={isAnimating}
					className={`px-4 py-2 text-white rounded ${
						isObstacleMode
							? "bg-blue-600 hover:bg-blue-700"
							: "bg-blue-500 hover:bg-blue-600"
					} disabled:bg-gray-400`}
				>
					{isObstacleMode ? "Exit Obstacle Mode" : "Add Obstacles"}
				</button>

				<button
					onClick={clearBoard}
					disabled={isAnimating}
					className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 disabled:bg-gray-400"
				>
					Clear Board
				</button>
			</div>

			<div
				className="grid rounded bg-gray-500/10 w-fit h-fit"
				style={{
					display: "grid",
					gridTemplateColumns: `repeat(${gridSize}, 2.5rem)`,
					gridTemplateRows: `repeat(${gridSize}, 2.5rem)`,
				}}
			>
				{Array.from({ length: gridSize }, (_, y) =>
					Array.from({ length: gridSize }, (_, x) => {
						const status = getCellStatus(x, y);
						return (
							<motion.div
								key={`${x}-${y}`}
								ref={setRef(x, y)}
								className={`border border-green-800/50 w-10 h-10 flex justify-center items-center
                  ${status === "visited" ? "bg-blue-200" : ""} 
                  ${status === "path" ? "bg-green-200" : ""}
                  ${status === "obstacle" ? "bg-gray-700" : ""}
                  ${
										isObstacleMode &&
										!isAnimating &&
										status !== "start" &&
										status !== "goal"
											? "cursor-cell"
											: ""
									}
                `}
								onMouseDown={() => handleCellMouseDown(x, y)}
								onMouseEnter={() => handleCellMouseEnter(x, y)}
								onDragOver={handleDragOver}
								onDrop={(e) => handleDrop(e, x, y)}
								initial={{ opacity: 0.7 }}
								animate={{
									opacity: 1,
									scale: [
										status === "visited" &&
										isAnimating &&
										animationPhase === "search"
											? 0.8
											: 1,
										1,
									],
									backgroundColor:
										status === "obstacle"
											? "rgb(55, 65, 81)"
											: status === "visited"
											? "rgb(191, 219, 254)"
											: status === "path"
											? "rgb(187, 247, 208)"
											: "transparent",
								}}
								transition={{
									duration: 0.3,
									scale: { duration: 0.2 },
								}}
							>
								{status === "start" && (
									<div
										draggable={!isAnimating && !isObstacleMode}
										onDragStart={(e) => handleDragStart(e, "start")}
										className={`${
											isAnimating || isObstacleMode
												? "cursor-not-allowed"
												: "cursor-grab"
										}`}
									>
										<TbCircleLetterA size={32} className="text-green-600" />
									</div>
								)}
								{status === "goal" && (
									<div
										draggable={!isAnimating && !isObstacleMode}
										onDragStart={(e) => handleDragStart(e, "goal")}
										className={`${
											isAnimating || isObstacleMode
												? "cursor-not-allowed"
												: "cursor-grab"
										}`}
									>
										<TbCircleLetterB size={32} className="text-green-600" />
									</div>
								)}
								{status === "path" &&
									!(
										(x === startPos.x && y === startPos.y) ||
										(x === goalPos.x && y === goalPos.y)
									) && <FaDotCircle size={16} className="text-green-600" />}
								{status === "obstacle" && (
									<motion.span
                                        initial={{
                                            rotate: -30,
                                            scale: 1.35,
                                            y: -30,
                                        }}
                                        animate={{
                                            rotate: 0,
                                            scale: 1,
                                            y: 0
                                        }}
                                        transition={{
                                            duration: 1,
                                            type: spring,
                                        }}
                                    >
										<GiBrickWall size={24} className="text-red-300" />
									</motion.span>
								)}
							</motion.div>
						);
					})
				)}
			</div>

			<div className="mt-4 text-center">
				{isObstacleMode ? (
					<p>Click or drag to add/remove obstacles</p>
				) : isAnimating ? (
					<p>
						{animationPhase === "search"
							? "Exploring the grid..."
							: "Building the shortest path..."}
					</p>
				) : (
					<p>
						Drag and drop the start (A) and goal (B) points to change their
						positions
					</p>
				)}
			</div>
		</div>
	);
};

export default FindingVisualizer;
