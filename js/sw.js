const cacheDomain=["fonts.googleapis.com","npm.webcache.cn","unpkg.com","fastly.jsdelivr.net","cdn.jsdelivr.net"];async function cacheRequest(e,t){try{const t=await fetch(e);return(await caches.open(VERSION)).put(e,t.clone()),t}catch(c){const n=await fetch(e,t);return(await caches.open(VERSION)).put(e,n.clone()),n}}async function respondRequest(e,t){return await caches.match(e)||cacheRequest(e,t)}self.addEventListener("install",(e=>{console.log(`Service Worker ${VERSION} installing.`),e.waitUntil(caches.open(VERSION).then((e=>e.addAll(preCache))))})),self.addEventListener("fetch",(e=>{const t=new URL(e.request.url);if(cacheDomain.includes(t.hostname))e.respondWith(respondRequest(e.request));else if("POST"===e.request.method||"GET"===e.request.method&&t.search)try{e.respondWith(fetch(e.request))}catch(t){e.respondWith(fetch(e.request,{mode:"no-cors"}))}else e.respondWith(respondRequest(e.request,{mode:"no-cors"}))})),self.addEventListener("activate",(e=>{e.waitUntil(caches.keys().then((e=>Promise.all(e.map((e=>{if(VERSION!==e)return console.log("Service Worker: deleting old cache "+e),caches.delete(e)})))))),console.log(`Service Worker ${VERSION} activated.`)})),"serviceWorker"in navigator&&navigator.serviceWorker.register(swPath).then((e=>{console.log("Service Worker 注册成功: ",e)})).catch((e=>{console.log("Service Worker 注册失败: ",e)}));