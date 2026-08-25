import { navigate } from "astro:transitions/client";

const base = import.meta.env.BASE_URL;

const routes = {
	landing: base,
	projects: `${base}projects`,
};

let initialized = false;
let isNavigating = false;

let touchStartY: number | null = null;

const NAVIGATION_DELAY = 600;
const EDGE_THRESHOLD = 5;
const SWIPE_THRESHOLD = 50;


/* =====================================
   CURRENT ROUTE
===================================== */

function getCurrentPath(): string {
	return window.location.pathname;
}


/* =====================================
   SCROLL POSITION
===================================== */

function isTopVisible(
	container: HTMLElement
): boolean {
	return container.scrollTop <= EDGE_THRESHOLD;
}


function isBottomVisible(
	container: HTMLElement
): boolean {
	return (
		container.scrollTop +
			container.clientHeight >=
		container.scrollHeight - EDGE_THRESHOLD
	);
}


/* =====================================
   NAVIGATION
===================================== */

async function handleNavigation(direction: number) {

	if (isNavigating) return;

	const currentPath =
		window.location.pathname;

	isNavigating = true;

	try {

		// DOWN
		if (
			currentPath === base &&
			direction === 1
		) {

			await navigate(`${base}projects`);

			return;
		}


		// UP
		if (
			currentPath === `${base}projects` &&
			direction === -1
		) {

			history.back();

			return;
		}

	} finally {

		setTimeout(() => {
			isNavigating = false;
		}, 600);

	}

}


/* =====================================
   WHEEL
===================================== */

function handleWheel(
	event: WheelEvent
) {
	const container =
		document.querySelector<HTMLElement>(
			".scrollable-content"
		);

	if (!container) return;


	const scrollingDown =
		event.deltaY > 0;

	const scrollingUp =
		event.deltaY < 0;


	const canScrollDown =
		container.scrollTop +
			container.clientHeight <
		container.scrollHeight -
			EDGE_THRESHOLD;


	const canScrollUp =
		container.scrollTop >
		EDGE_THRESHOLD;


	/*
	 * Masih bisa scrolling.
	 */

	if (
		(scrollingDown && canScrollDown) ||
		(scrollingUp && canScrollUp)
	) {
		return;
	}


	/*
	 * Sudah mencapai edge.
	 */

	event.preventDefault();


	handleNavigation(
		scrollingDown ? 1 : -1
	);
}


/* =====================================
   TOUCH START
===================================== */

function handleTouchStart(
	event: TouchEvent
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
}


/* =====================================
   TOUCH END
===================================== */

function handleTouchEnd(
	event: TouchEvent
) {
	if (
		isNavigating ||
		touchStartY === null
	) {
		return;
	}


	const touch =
		event.changedTouches[0];

	if (!touch) {
		return;
	}


	const container =
		document.querySelector<HTMLElement>(
			".scrollable-content"
		);

	if (!container) {
		return;
	}


	const diffY =
		touchStartY -
		touch.clientY;


	touchStartY = null;


	/*
	 * Bukan swipe yang cukup jauh.
	 */

	if (
		Math.abs(diffY) <
		SWIPE_THRESHOLD
	) {
		return;
	}


	const direction =
		diffY > 0 ? 1 : -1;


	/*
	 * Swipe ke bawah
	 * saat sudah berada di bawah.
	 */

	if (
		direction === 1 &&
		isBottomVisible(container)
	) {
		event.preventDefault();

		handleNavigation(1);

		return;
	}


	/*
	 * Swipe ke atas
	 * saat sudah berada di atas.
	 */

	if (
		direction === -1 &&
		isTopVisible(container)
	) {
		event.preventDefault();

		handleNavigation(-1);
	}
}


/* =====================================
   INITIALIZE
===================================== */

export function initPageSwipe() {
	if (initialized) {
		return;
	}


	initialized = true;


	document.addEventListener(
		"wheel",
		handleWheel,
		{
			passive: false
		}
	);


	document.addEventListener(
		"touchstart",
		handleTouchStart,
		{
			passive: false
		}
	);


	document.addEventListener(
		"touchend",
		handleTouchEnd,
		{
			passive: false
		}
	);


	console.log(
		"[PageSwipe] initialized",
		{
			base,
			landing: routes.landing,
			projects: routes.projects,
		}
	);
}