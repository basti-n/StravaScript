export const imports = {
  'src/components/docz/ActivityCard.mdx': () =>
    import(
      /* webpackPrefetch: true, webpackChunkName: "src-components-docz-activity-card" */ 'src/components/docz/ActivityCard.mdx'
    ),
  'src/components/docz/CodingLanguagesTags.mdx': () =>
    import(
      /* webpackPrefetch: true, webpackChunkName: "src-components-docz-coding-languages-tags" */ 'src/components/docz/CodingLanguagesTags.mdx'
    ),
  'src/components/docz/PieChart.mdx': () =>
    import(
      /* webpackPrefetch: true, webpackChunkName: "src-components-docz-pie-chart" */ 'src/components/docz/PieChart.mdx'
    ),
  'src/components/docz/TimeTracker.mdx': () =>
    import(
      /* webpackPrefetch: true, webpackChunkName: "src-components-docz-time-tracker" */ 'src/components/docz/TimeTracker.mdx'
    ),
  'src/components/docz/TimerClock.mdx': () =>
    import(
      /* webpackPrefetch: true, webpackChunkName: "src-components-docz-timer-clock" */ 'src/components/docz/TimerClock.mdx'
    ),
  'src/components/docz/index.mdx': () =>
    import(
      /* webpackPrefetch: true, webpackChunkName: "src-components-docz-index" */ 'src/components/docz/index.mdx'
    ),
}
