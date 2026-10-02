(() => {
  "use strict";

  const SOURCE = "https://web.madewith.me";
  const VERSION = "1.0.0";

  const $ = (id) => document.getElementById(id);

  async function loadText(url) {
    const response = await fetch(`${url}?v=${encodeURIComponent(VERSION)}`, {
      cache: "no-store",
      credentials: "omit"
    });
    if (!response.ok) throw new Error(`Failed to load ${url} (${response.status})`);
    return response.text();
  }

  function loadScript(src) {
    return new Promise((resolve, reject) => {
      const script = document.createElement("script");
      script.src = `${src}?v=${encodeURIComponent(VERSION)}`;
      script.async = false;
      script.onload = resolve;
      script.onerror = () => reject(new Error(`Failed to load ${src}`));
      document.body.appendChild(script);
    });
  }

  async function boot() {
    const mount = $("app");
    if (!mount) throw new Error('Missing #app mount element');

    try {
      mount.innerHTML = await loadText(`${SOURCE}/html/index.html`);
      await loadScript(`${SOURCE}/js/app.js`);
      await loadScript(`${SOURCE}/js/forcejoin.js`);
    } catch (error) {
      console.error("Madewith central loader:", error);
      mount.innerHTML = `
        <main style="min-height:100vh;display:grid;place-items:center;padding:24px;font-family:Inter,system-ui,sans-serif;background:#050816;color:#fff">
          <div style="max-width:520px;text-align:center">
            <h1>Unable to load website</h1>
            <p style="opacity:.7">The central website source is temporarily unavailable. Please refresh in a moment.</p>
          </div>
        </main>`;
    }
  }

  boot();
})();
