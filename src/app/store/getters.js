export default {
  mq: state => {
    const breakpoints = {
      xs: 600,
      sm: 960,
      md: 1264,
      lg: 1904
    }
    const { windowWidth } = state

    return {
      windowWidth,
      xsOnly: breakpoints.xs > windowWidth,

      smOnly: breakpoints.xs < windowWidth && breakpoints.sm > windowWidth,
      smAndDown: breakpoints.sm > windowWidth,
      smAndUp: breakpoints.sm < windowWidth,

      mdOnly: breakpoints.sm < windowWidth && breakpoints.md > windowWidth,
      mdAndDown: breakpoints.md > windowWidth,
      mdAndUp: breakpoints.md < windowWidth,

      lgOnly: breakpoints.md < windowWidth && breakpoints.lg > windowWidth,
      lgAndDown: breakpoints.lg > windowWidth,
      lgAndUp: breakpoints.lg < windowWidth,

      xlOnly: breakpoints.lg < windowWidth
    }
  }
}
