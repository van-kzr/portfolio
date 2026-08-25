let direction: "forward" | "backward" = "forward";

export function setTransitionDirection(
	value: "forward" | "backward"
) {
	direction = value;
}

export function getTransitionDirection() {
	return direction;
}