export const imports = {
  'src/components/docz/ActivityCard.mdx': () =>
    import(
      /* webpackPrefetch: true, webpackChunkName: "src-components-docz-activity-card" */ 'src/components/docz/ActivityCard.mdx'
    ),
  'src/components/docz/PieChart.mdx': () =>
    import(
      /* webpackPrefetch: true, webpackChunkName: "src-components-docz-pie-chart" */ 'src/components/docz/PieChart.mdx'
    ),
  'src/components/docz/Tags.mdx': () =>
    import(
      /* webpackPrefetch: true, webpackChunkName: "src-components-docz-tags" */ 'src/components/docz/Tags.mdx'
    ),
  'src/components/docz/Timer.mdx': () =>
    import(
      /* webpackPrefetch: true, webpackChunkName: "src-components-docz-timer" */ 'src/components/docz/Timer.mdx'
    ),
  'src/components/docz/TimerButton.mdx': () =>
    import(
      /* webpackPrefetch: true, webpackChunkName: "src-components-docz-timer-button" */ 'src/components/docz/TimerButton.mdx'
    ),
  'src/components/docz/index.mdx': () =>
    import(
      /* webpackPrefetch: true, webpackChunkName: "src-components-docz-index" */ 'src/components/docz/index.mdx'
    ),
}
