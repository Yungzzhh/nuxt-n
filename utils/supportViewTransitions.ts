

export const supportsViewTransitions = () => {
  return Boolean((document as any).startViewTransition)

}
export const isReducedMotion = (): boolean => {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches === true
}