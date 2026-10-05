// 예전 Jekyll(Chirpy) 블로그의 서비스 워커(/sw.js)를 대체하는 자기 해제용 서비스 워커.
// 브라우저가 업데이트를 확인하며 이 파일을 받아가면, 캐시를 비우고 스스로를 해제한 뒤 열려 있는 탭을 새로고침한다.
self.addEventListener('install', function () {
  self.skipWaiting();
});

self.addEventListener('activate', function (event) {
  event.waitUntil(
    (async function () {
      var keys = await caches.keys();
      await Promise.all(keys.map(function (k) { return caches.delete(k); }));
      await self.registration.unregister();
      var clients = await self.clients.matchAll({ type: 'window' });
      clients.forEach(function (c) { c.navigate(c.url); });
    })()
  );
});
