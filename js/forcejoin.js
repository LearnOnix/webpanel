
(() => {
  'use strict';

  // ASCII character codes keep the channel URL out of the static HTML.
  const ascii = [
    104,116,116,112,115,58,47,47,116,46,109,101,47,
    83,104,111,119,110,88,111,102,102,105,99,105,97,108
  ];

  const channelUrl = String.fromCharCode(...ascii);
  const channelName = String.fromCharCode(...ascii.slice(13));
  const displayHandle = '@' + channelName;

  const gate = document.getElementById('shown-forcejoin-gate');
  const handle = document.getElementById('shown-fj-handle');
  const join = document.getElementById('shown-fj-join');
  const continueBtn = document.getElementById('shown-fj-continue');
  const status = document.getElementById('shown-fj-status');

  if (!gate || !handle || !join || !continueBtn || !status) return;

  handle.textContent = displayHandle;
  join.href = channelUrl;

  const STORAGE_KEY = 'shownxofficial_forcejoin_v1';
  let openedChannel = false;

  try {
    if (localStorage.getItem(STORAGE_KEY) === '1') {
      gate.hidden = true;
      return;
    }
  } catch (_) {}

  join.addEventListener('click', () => {
    openedChannel = true;
    continueBtn.disabled = false;
    status.textContent = 'Channel opened. Tap Joined to continue.';
    status.className = 'shown-fj-status ready';
  }, { passive: true });

  continueBtn.addEventListener('click', () => {
    if (!openedChannel) return;
    try { localStorage.setItem(STORAGE_KEY, '1'); } catch (_) {}
    status.textContent = 'Access granted.';
    status.className = 'shown-fj-status ok';
    gate.hidden = true;
  });

  document.addEventListener('keydown', (event) => {
    if (gate.hidden) return;
    if (event.key === 'Escape') event.preventDefault();
  }, true);
})();
