(() => {
  'use strict';

  const menuButton = document.querySelector('.menu-toggle');
  const navigation = document.querySelector('#main-nav');
  const closeMenu = () => {
    navigation.classList.remove('is-open');
    menuButton.setAttribute('aria-expanded', 'false');
    menuButton.setAttribute('aria-label', '展开导航');
  };
  menuButton.addEventListener('click', () => {
    const open = menuButton.getAttribute('aria-expanded') !== 'true';
    navigation.classList.toggle('is-open', open);
    menuButton.setAttribute('aria-expanded', String(open));
    menuButton.setAttribute('aria-label', open ? '收起导航' : '展开导航');
  });
  navigation.querySelectorAll('a').forEach(link => link.addEventListener('click', closeMenu));
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape') closeMenu();
  });
  document.addEventListener('click', event => {
    if (!event.target.closest('.header-inner')) closeMenu();
  });
  window.matchMedia('(min-width: 641px)').addEventListener('change', closeMenu);

  const scenes = {
    hiking: { title: '周末，去山里走走', place: '近郊山野 · 轻松徒步', count: '8', capacity: '12' },
    sports: { title: '老地方，痛快踢一场', place: '城市足球场 · 周末约球', count: '12', capacity: '14' },
    friends: { title: '好久不见，一起聚聚', place: '公园草坪 · 朋友野餐', count: '6', capacity: '10' }
  };
  const sceneButtons = Array.from(document.querySelectorAll('[data-scene]'));
  sceneButtons.forEach(button => button.addEventListener('click', () => {
    const scene = scenes[button.dataset.scene];
    if (!scene) return;
    sceneButtons.forEach(item => {
      const active = item === button;
      item.classList.toggle('is-active', active);
      item.setAttribute('aria-pressed', String(active));
    });
    for (const [key, value] of Object.entries(scene)) {
      document.getElementById(`scene-${key}`).textContent = value;
    }
  }));

  const tabs = Array.from(document.querySelectorAll('[data-panel]'));
  const selectTab = (selected, moveFocus = false) => {
    tabs.forEach(tab => {
      const active = tab === selected;
      tab.setAttribute('aria-selected', String(active));
      tab.tabIndex = active ? 0 : -1;
      document.getElementById(tab.getAttribute('aria-controls')).hidden = !active;
    });
    if (moveFocus) selected.focus();
  };
  tabs.forEach((tab, index) => {
    tab.addEventListener('click', () => selectTab(tab));
    tab.addEventListener('keydown', event => {
      let next;
      if (event.key === 'ArrowRight' || event.key === 'ArrowDown') next = (index + 1) % tabs.length;
      if (event.key === 'ArrowLeft' || event.key === 'ArrowUp') next = (index - 1 + tabs.length) % tabs.length;
      if (event.key === 'Home') next = 0;
      if (event.key === 'End') next = tabs.length - 1;
      if (next !== undefined) {
        event.preventDefault();
        selectTab(tabs[next], true);
      }
    });
  });

  const dialog = document.querySelector('.qr-dialog');
  // Links still reach the QR section if JavaScript or native dialog is unavailable.
  document.querySelectorAll('[data-open-qr]').forEach(trigger => {
    trigger.addEventListener('click', event => {
      if (typeof dialog.showModal !== 'function') {
        if (trigger.tagName === 'BUTTON') document.querySelector('#join').scrollIntoView();
        return;
      }
      if (trigger.tagName === 'A' && (event.ctrlKey || event.metaKey || event.shiftKey || event.altKey)) return;
      event.preventDefault();
      if (!dialog.open) {
        dialog.showModal();
        document.body.classList.add('dialog-open');
      }
    });
  });
  dialog.querySelector('.dialog-close').addEventListener('click', () => dialog.close());
  dialog.addEventListener('click', event => {
    const box = dialog.getBoundingClientRect();
    if (event.target === dialog && (event.clientX < box.left || event.clientX > box.right || event.clientY < box.top || event.clientY > box.bottom)) dialog.close();
  });
  dialog.addEventListener('close', () => document.body.classList.remove('dialog-open'));
})();
