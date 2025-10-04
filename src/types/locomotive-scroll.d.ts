declare module 'locomotive-scroll' {
  interface LocomotiveScrollOptions {
    el: HTMLElement;
    smooth?: boolean;
    multiplier?: number;
    smartphone?: { smooth: boolean };
    tablet?: { smooth: boolean };
  }

  export default class LocomotiveScroll {
    constructor(options: LocomotiveScrollOptions);
    update(): void;
    destroy(): void;
    scrollTo(target: number | string | HTMLElement, options?: object): void;
  }
}
