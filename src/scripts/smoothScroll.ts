type SmoothScrollOptions = {
	speed?: number;
	touchSpeed?: number;
	lerpFactor?: number;
	damping?: number;
};

let cleanupSmoothScroll: (() => void) | null = null;

export function initSmoothScroll(
	options: SmoothScrollOptions = {}
) {
	const {
		speed = 0.5,
		touchSpeed = 0.8,
		lerpFactor = 0.3,
		damping = 0.92,
	} = options;

	const container =
		document.querySelector<HTMLElement>(
			".scrollable-content"
		);

	if (!container) return;

	/*
	 * Hindari duplicate initialization
	 */
	if (cleanupSmoothScroll) {
		cleanupSmoothScroll();
		cleanupSmoothScroll = null;
	}


	let targetScroll = container.scrollTop;
	let currentScroll = container.scrollTop;

	let velocity = 0;

	let touchStartY: number | null = null;

	let animationFrame = 0;


	const lerp = (
		start: number,
		end: number,
		amount: number
	) => {
		return (
			start * (1 - amount) +
			end * amount
		);
	};


	/* =====================================
	   WHEEL
	===================================== */

	const onWheel = (event: WheelEvent) => {

		event.preventDefault();

		velocity +=
			event.deltaY * speed;

	};


	/* =====================================
	   TOUCH START
	===================================== */

	const onTouchStart = (
		event: TouchEvent
	) => {

		const touch = event.touches[0];

		if (!touch) return;

		touchStartY =
			touch.clientY;

		velocity = 0;

	};


	/* =====================================
	   TOUCH MOVE
	===================================== */

	const onTouchMove = (
		event: TouchEvent
	) => {

		if (touchStartY === null) {
			return;
		}

		const touch =
			event.touches[0];

		if (!touch) return;


		const delta =
			touchStartY -
			touch.clientY;


		velocity +=
			delta * touchSpeed;


		touchStartY =
			touch.clientY;


		event.preventDefault();

	};


	/* =====================================
	   TOUCH END
	===================================== */

	const onTouchEnd = () => {

		touchStartY = null;

	};


	/* =====================================
	   ANIMATION
	===================================== */

	const update = () => {

		const maxScroll =
			Math.max(
				0,
				container.scrollHeight -
				container.clientHeight
			);


		targetScroll += velocity;


		/*
		 * Batasi target scroll
		 */

		targetScroll =
			Math.max(
				0,
				Math.min(
					targetScroll,
					maxScroll
				)
			);


		/*
		 * Interpolasi
		 */

		currentScroll =
			lerp(
				currentScroll,
				targetScroll,
				lerpFactor
			);


		container.scrollTop =
			currentScroll;


		/*
		 * Damping
		 */

		velocity *= damping;


		/*
		 * Hilangkan velocity
		 * ketika sudah sangat kecil
		 */

		if (Math.abs(velocity) < 0.01) {
			velocity = 0;
		}


		animationFrame =
			requestAnimationFrame(update);

	};


	/* =====================================
	   EVENT LISTENER
	===================================== */

	container.addEventListener(
		"wheel",
		onWheel,
		{
			passive: false
		}
	);


	container.addEventListener(
		"touchstart",
		onTouchStart,
		{
			passive: false
		}
	);


	container.addEventListener(
		"touchmove",
		onTouchMove,
		{
			passive: false
		}
	);


	container.addEventListener(
		"touchend",
		onTouchEnd
	);


	animationFrame =
		requestAnimationFrame(update);


	/* =====================================
	   CLEANUP
	===================================== */

	cleanupSmoothScroll = () => {

		cancelAnimationFrame(
			animationFrame
		);


		container.removeEventListener(
			"wheel",
			onWheel
		);


		container.removeEventListener(
			"touchstart",
			onTouchStart
		);


		container.removeEventListener(
			"touchmove",
			onTouchMove
		);


		container.removeEventListener(
			"touchend",
			onTouchEnd
		);

	};


	return cleanupSmoothScroll;
}