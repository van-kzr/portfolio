import { navigate } from "astro:transitions/client";

const base =
	import.meta.env.BASE_URL;

	/* =====================================
   NORMALIZE PATH
===================================== */

function normalizePath(
	path: string,
): string {

	if (
		path.length > 1 &&
		path.endsWith("/")
	) {
		return path.slice(0, -1);
	}

	return path;
}


const routes = {
	landing: normalizePath(base),
	projects: normalizePath(`${base}projects`),
};

let initialized = false;
let isNavigating = false;

let touchStartY: number | null = null;

const EDGE_THRESHOLD = 5;
const SWIPE_THRESHOLD = 50;
const NAVIGATION_LOCK = 800;


/* =====================================
   DEBUG
===================================== */

function debug(label: string, data?: unknown) {
	console.log(
		`%c[PageSwipe] ${label}`,
		"color:#22d3ee;font-weight:bold;",
		data ?? "",
	);
}


/* =====================================
   CURRENT PATH
===================================== */

function getCurrentPath(): string {

	return normalizePath(
		window.location.pathname,
	);

}


/* =====================================
   CONTAINER
===================================== */

function getContainer() {
	return document.querySelector<HTMLElement>(
		".scrollable-content",
	);
}


/* =====================================
   SCROLL STATE
===================================== */

function isTopVisible(
	container: HTMLElement,
) {
	return (
		container.scrollTop <=
		EDGE_THRESHOLD
	);
}


function isBottomVisible(
	container: HTMLElement,
) {
	return (
		container.scrollTop +
			container.clientHeight >=
		container.scrollHeight -
			EDGE_THRESHOLD
	);
}


/* =====================================
   NAVIGATION
===================================== */

/* =====================================
   NAVIGATION
===================================== */

async function handleNavigation(
	direction: 1 | -1,
) {

	if (isNavigating) {

		debug("BLOCKED: navigation locked");

		return;
	}


	const currentPath =
		getCurrentPath();


	isNavigating = true;


	debug("NAVIGATION REQUEST", {
		currentPath,
		direction,
	});


	try {

		/*
		 * DOWN
		 *
		 * /portfolio/
		 *      ↓
		 * /portfolio/projects
		 */

		if (
			currentPath === routes.landing &&
			direction === 1
		) {

			debug("DOWN → navigate(projects)", {
				from: currentPath,
				to: routes.projects,
			});


			await navigate(
				routes.projects,
			);


			return;
		}


		/*
		 * UP
		 *
		 * /portfolio/projects
		 *          ↑
		 * /portfolio/
		 *
		 * Gunakan history.back()
		 * agar Astro mempertahankan
		 * arah reverse transition.
		 */

		if (
			currentPath === routes.projects &&
			direction === -1
		) {

			debug("UP → history.back()", {
				from: currentPath,
				to: routes.landing,
			});


			history.back();


			return;
		}


		debug("NO NAVIGATION", {
			currentPath,
			direction,
		});

	} finally {

		setTimeout(() => {

			isNavigating = false;

			debug(
				"NAVIGATION UNLOCKED",
			);

		}, NAVIGATION_LOCK);

	}

}


/* =====================================
   WHEEL
===================================== */

function handleWheel(
	event: WheelEvent,
) {

	const container =
		getContainer();


	if (!container) {

		debug(
			"WHEEL: container not found",
		);

		return;
	}


	const deltaY =
		event.deltaY;


	/*
	 * Ignore extremely small
	 * trackpad noise.
	 */

	if (Math.abs(deltaY) < 1) {
		return;
	}


	const scrollingDown =
		deltaY > 0;

	const scrollingUp =
		deltaY < 0;


	const atTop =
		isTopVisible(container);

	const atBottom =
		isBottomVisible(container);


	debug("WHEEL", {
		deltaY,
		direction:
			scrollingDown
				? "DOWN"
				: "UP",
		atTop,
		atBottom,
		path:
			getCurrentPath(),
	});


	/*
	 * DOWN
	 *
	 * Hanya pindah halaman jika
	 * benar-benar sudah berada
	 * di bagian bawah.
	 */

	if (
		scrollingDown &&
		atBottom
	) {

		event.preventDefault();

		debug(
			"EDGE → DOWN NAVIGATION",
		);

		handleNavigation(1);

		return;
	}


	/*
	 * UP
	 *
	 * Hanya pindah halaman jika
	 * benar-benar berada di bagian atas.
	 */

	if (
		scrollingUp &&
		atTop
	) {

		event.preventDefault();

		debug(
			"EDGE → UP NAVIGATION",
		);

		handleNavigation(-1);

		return;
	}


	/*
	 * Normal scrolling.
	 */

}


/* =====================================
   TOUCH START
===================================== */

function handleTouchStart(
	event: TouchEvent,
) {

	if (isNavigating) {
		return;
	}


	const touch =
		event.touches[0];


	if (!touch) {
		return;
	}


	touchStartY =
		touch.clientY;


	debug("TOUCH START", {
		y: touchStartY,
	});

}


/* =====================================
   TOUCH END
===================================== */

function handleTouchEnd(
	event: TouchEvent,
) {

	if (
		isNavigating ||
		touchStartY === null
	) {

		touchStartY = null;

		return;
	}


	const touch =
		event.changedTouches[0];


	if (!touch) {

		touchStartY = null;

		return;
	}


	const diffY =
		touchStartY -
		touch.clientY;


	touchStartY = null;


	debug("TOUCH END", {
		diffY,
	});



	/*
	 * Swipe terlalu kecil.
	 */

	if (
		Math.abs(diffY) <
		SWIPE_THRESHOLD
	) {

		return;
	}


	const container =
		getContainer();


	if (!container) {
		return;
	}


	const direction =
		diffY > 0
			? 1
			: -1;


	/*
	 * Swipe ke bawah
	 * + berada di bottom.
	 */

	if (
		direction === 1 &&
		isBottomVisible(container)
	) {

		debug(
			"TOUCH → DOWN NAVIGATION",
		);

		event.preventDefault();

		handleNavigation(1);

		return;
	}


	/*
	 * Swipe ke atas
	 * + berada di top.
	 */

	if (
		direction === -1 &&
		isTopVisible(container)
	) {

		debug(
			"TOUCH → UP NAVIGATION",
		);

		event.preventDefault();

		handleNavigation(-1);

		return;
	}

}


/* =====================================
   INITIALIZE
===================================== */

export function initPageSwipe() {

	if (initialized) {

		debug(
			"ALREADY INITIALIZED",
		);

		return;
	}


	initialized = true;


	debug("INITIALIZE", {
		base,
		routes,
		path:
			getCurrentPath(),
	});


	/*
	 * Touchpad / mouse
	 */

	document.addEventListener(
		"wheel",
		handleWheel,
		{
			passive: false,
		},
	);


	/*
	 * HP / touchscreen
	 */

	document.addEventListener(
		"touchstart",
		handleTouchStart,
		{
			passive: false,
		},
	);


	document.addEventListener(
		"touchend",
		handleTouchEnd,
		{
			passive: false,
		},
	);


	debug(
		"INITIALIZED",
	);

}