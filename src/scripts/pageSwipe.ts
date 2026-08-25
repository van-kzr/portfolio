
import { navigate } from "astro:transitions/client";

import {
	setTransitionDirection
} from "./pageTransition";

const routes = [
	"/",
	"/projects",
];


let initialized = false;

let isNavigating = false;

let lastNavigationTime = 0;

let touchStartY: number | null = null;

const SCROLL_DELAY = 1000;


/* =====================================
   CURRENT ROUTE
===================================== */

function getCurrentIndex() {

	const currentPath =
		window.location.pathname;

	const index =
		routes.indexOf(currentPath);

	return index;
}


/* =====================================
   TOP / BOTTOM
===================================== */

function isTopVisible(
	container: HTMLElement
) {

	return container.scrollTop <= 5;

}


function isBottomVisible(
	container: HTMLElement
) {

	return (
		container.scrollTop +
		container.clientHeight >=
		container.scrollHeight - 5
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
			currentPath === "/" &&
			direction === 1
		) {

			await navigate("/projects");

			return;
		}


		// UP
		if (
			currentPath === "/projects" &&
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
		container.scrollHeight - 5;


	const canScrollUp =
		container.scrollTop > 5;


	/*
	 * Masih bisa scroll.
	 *
	 * Biarkan SmoothScroll
	 * menangani scrolling.
	 */

	if (
		(scrollingDown && canScrollDown) ||
		(scrollingUp && canScrollUp)
	) {

		return;

	}


	/*
	 * Sudah mentok.
	 *
	 * Pindah halaman.
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

	if (!touch) return;


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

	if (!touch) return;


	const container =
		document.querySelector<HTMLElement>(
			".scrollable-content"
		);

	if (!container) return;


	const diffY =
		touchStartY -
		touch.clientY;


	/*
	 * Reset
	 */

	touchStartY = null;


	/*
	 * Minimal swipe
	 */

	if (Math.abs(diffY) < 50) {
		return;
	}


	const direction =
		diffY > 0 ? 1 : -1;


	/*
	 * Swipe DOWN
	 * dan sudah di bawah
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
	 * Swipe UP
	 * dan sudah di atas
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
		"[PageSwipe] initialized"
	);

}