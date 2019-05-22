export const imports = {
  'src/components/ActivityCard.mdx': () =>
    import(
      /* webpackPrefetch: true, webpackChunkName: "src-components-activity-card" */ 'src/components/ActivityCard.mdx'
    ),
  'src/components/index.mdx': () =>
    import(
      /* webpackPrefetch: true, webpackChunkName: "src-components-index" */ 'src/components/index.mdx'
    ),
}
