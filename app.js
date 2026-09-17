import { portfolio } from './data.js';

const byId = (id) => document.getElementById(id);
const escapeHtml = (value) => String(value).replace(/[&<>'"]/g, (character) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;' }[character]));

function renderProfile() {
  const { profile } = portfolio;
  byId('hero-eyebrow').textContent = profile.eyebrow;
  byId('hero-title').innerHTML = escapeHtml(profile.headline).replace(/\n/g, '<br />');
  byId('hero-intro').textContent = profile.intro;
  byId('hero-currently').textContent = profile.currently;
  byId('hero-location').textContent = profile.location;
  byId('hero-email').href = '#about';
  byId('hero-email').innerHTML = '了解我的方式 <span>↗</span>';
  byId('contact-email').href = `mailto:${profile.email}`;
  byId('contact-note').textContent = profile.contactNote;
  byId('ticker-content').innerHTML = [...profile.ticker, ...profile.ticker].map((item) => `<span>${escapeHtml(item)}</span><b>✳</b>`).join('');
}

function renderProjects() {
  const filters = ['全部', ...new Set(portfolio.projects.flatMap((project) => project.categories.filter((category) => category !== '全部')))];
  byId('filters').innerHTML = filters.map((filter, index) => `<button class="filter-button${index === 0 ? ' is-active' : ''}" type="button" role="tab" aria-selected="${index === 0}" data-filter="${escapeHtml(filter)}">${escapeHtml(filter)}</button>`).join('');
  const render = (filter = '全部') => {
    byId('projects').innerHTML = portfolio.projects.filter((project) => filter === '全部' || project.categories.includes(filter)).map((project) => `<article class="project-card ${project.className}"><div class="project-art"><span class="project-index">${project.index}</span><span class="project-tag">${project.tag}</span><div class="art-shape"></div><span class="art-word">${project.title}</span></div><div class="project-info"><div><h3>${project.title}</h3><p>${project.description}</p></div><div class="project-meta"><span>${project.type}</span><span>${project.year}</span></div></div></article>`).join('');
  };
  render();
  byId('filters').addEventListener('click', (event) => {
    const button = event.target.closest('[data-filter]');
    if (!button) return;
    document.querySelectorAll('.filter-button').forEach((item) => { item.classList.toggle('is-active', item === button); item.setAttribute('aria-selected', item === button); });
    render(button.dataset.filter);
  });
}

function renderExperience() {
  byId('experience-list').innerHTML = portfolio.experience.map((item, index) => `<article class="timeline-item"><span class="timeline-number">0${index + 1}</span><div class="timeline-period">${item.period}</div><div><h3>${item.role}</h3><p class="timeline-company">${item.company}</p><p class="timeline-detail">${item.detail}</p></div></article>`).join('');
}

function renderAbout() {
  byId('about-copy').innerHTML = `<p>${portfolio.about}</p>`;
  byId('skills').innerHTML = portfolio.skills.map((skill, index) => `<div class="skill-item"><span>0${index + 1}</span><div><h3>${skill.label}</h3><p>${skill.items}</p></div></div>`).join('');
}

function setupMenu() {
  const toggle = document.querySelector('.menu-toggle');
  const nav = document.querySelector('.main-nav');
  toggle.addEventListener('click', () => { const isOpen = document.body.classList.toggle('menu-open'); toggle.setAttribute('aria-expanded', isOpen); nav.querySelector('a').focus(); });
  nav.addEventListener('click', () => document.body.classList.remove('menu-open'));
}

function setupMotionEffects() {
  const hero = document.querySelector('.hero-visual');
  if (hero) {
    hero.addEventListener('pointermove', (event) => {
      const rect = hero.getBoundingClientRect();
      const x = (event.clientX - rect.left) / rect.width - 0.5;
      const y = (event.clientY - rect.top) / rect.height - 0.5;
      hero.style.setProperty('--tilt-x', `${(x * 10).toFixed(2)}deg`);
      hero.style.setProperty('--tilt-y', `${(-y * 9).toFixed(2)}deg`);
    });
    hero.addEventListener('pointerleave', () => {
      hero.style.setProperty('--tilt-x', '0deg');
      hero.style.setProperty('--tilt-y', '0deg');
    });
  }

  const strip = document.querySelector('.palmo-strip__track');
  if (strip) {
    let dragging = false;
    let startX = 0;
    let scrollLeft = 0;

    strip.addEventListener('pointerdown', (event) => {
      dragging = true;
      startX = event.clientX;
      scrollLeft = strip.scrollLeft;
      strip.setPointerCapture(event.pointerId);
      strip.style.animationPlayState = 'paused';
    });

    strip.addEventListener('pointermove', (event) => {
      if (!dragging) return;
      const delta = event.clientX - startX;
      strip.scrollLeft = scrollLeft - delta;
    });

    const stopDrag = () => {
      if (!dragging) return;
      dragging = false;
      strip.style.animationPlayState = 'running';
    };

    strip.addEventListener('pointerup', stopDrag);
    strip.addEventListener('pointerleave', stopDrag);
  }
}

renderProfile();
renderProjects();
renderExperience();
renderAbout();
setupMenu();
setupMotionEffects();
byId('year').textContent = new Date().getFullYear();