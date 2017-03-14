export const scrollToTop = () => {
  if (document.body.scrollTop !== 0 || document.documentElement.scrollTop !== 0) {
    window.scrollBy(0, -30);
    requestAnimationFrame(scrollToTop);
  }
}
