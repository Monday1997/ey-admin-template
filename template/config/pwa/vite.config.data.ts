export default function getData() {
  return {
    importers: [`import { VitePWA } from 'vite-plugin-pwa'`],
    plugins: [
      ` VitePWA({
      workbox: {
        runtimeCaching: [
          {
            // 匹配 bootcdn、unpkg、jsdelivr 等 CDN
            urlPattern: /^https:\/\/(cdn\.bootcdn\.net|unpkg\.com|cdn\.jsdelivr\.net)\/.*\.(js|css)/,
            handler: 'CacheFirst',
            // handler: 'StaleWhileRevalidate', // 改为 StaleWhileRevalidate
            options: {
              cacheName: 'cdn-cache',
              expiration: {
                maxEntries: 50, // 最多缓存 50 个文件
                maxAgeSeconds: 60 * 60 * 24 * 30, // 缓存 30 天
              },
              cacheableResponse: {
                statuses: [0, 200],
              },
            },
          },
        ],
      },
    })`,
    ],
  };
}
