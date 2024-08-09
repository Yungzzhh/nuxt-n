import { nextTick } from "vue";

export const useToggleTheme = () => {
  const colorMode = useColorMode();
  const isDark = computed(() => colorMode.value === "dark");

  const toggleColorMode = () =>
    (colorMode.preference = isDark.value ? "light" : "dark");

  const enableTransitions = () =>
    "startViewTransition" in document &&
    window.matchMedia("(prefers-reduced-motion: no-preference)").matches;

  const toggleTheme = async ({ clientX, clientY }: MouseEvent) => {

    if (!enableTransitions()) {
      toggleColorMode();
      return;
    }

    const clipPath = [
      `circle(0px at ${clientX}px ${clientY}px)`,
      `circle(${Math.hypot(
        Math.max(clientX, innerWidth - clientX),
        Math.max(clientY, innerHeight - clientY)
      )}px at ${clientX}px ${clientY}px)`,
    ];

    await (document as any).startViewTransition(async () => {
      toggleColorMode();

      await nextTick();
    }).ready;

    document.documentElement.animate(
      {
        clipPath: isDark.value ? clipPath : clipPath.reverse(),
      },
      {
        duration: 500,
        easing: "ease-in",
        pseudoElement: isDark.value ? "::view-transition-new(root)" : "::view-transition-old(root)",
      }
    );
  };

  return { toggleTheme, isDark };
};

export default useToggleTheme;
