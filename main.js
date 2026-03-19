/* ====== Portfolio JavaScript ====== */

document.addEventListener('DOMContentLoaded', () => {
  initNavbar();
  initMobileMenu();
  initTerminal();
  initScrollReveal();
  initGalleryFilter();
  initLightbox();
  setFooterYear();
});

/* ====== Navbar Scroll Effect ====== */
function initNavbar() {
  const navbar = document.getElementById('navbar');
  const onScroll = () => {
    navbar.classList.toggle('scrolled', window.scrollY > 40);
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
}

/* ====== Mobile Menu ====== */
function initMobileMenu() {
  const btn = document.getElementById('mobile-menu-btn');
  const menu = document.getElementById('mobile-menu');
  const icon = document.getElementById('menu-icon');

  btn.addEventListener('click', () => {
    const isOpen = !menu.classList.contains('hidden');
    menu.classList.toggle('hidden');
    icon.setAttribute('d', isOpen
      ? 'M4 6h16M4 12h16M4 18h16'
      : 'M6 18L18 6M6 6l12 12'
    );
  });

  // Close menu on link click
  menu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      menu.classList.add('hidden');
      icon.setAttribute('d', 'M4 6h16M4 12h16M4 18h16');
    });
  });
}

/* ====== Interactive Terminal ====== */
function initTerminal() {
  const output = document.getElementById('terminal-output');
  const buttons = document.querySelectorAll('.terminal-cmd-btn');

  const commands = {
    whoami: [
      { label: '', value: '╔══════════════════════════════════════╗' },
      { label: '', value: '║  Rajnesh Shrestha                    ║' },
      { label: '', value: '║  Engineer & Robotics Trainer         ║' },
      { label: '', value: '╚══════════════════════════════════════╝' },
      { label: '', value: '' },
      { label: 'Role', value: 'ECE&I Engineer | Robotics Trainer' },
      { label: 'Focus', value: 'Bridging Hardware & Software' },
      { label: 'Mission', value: 'Empowering engineers through STEM' },
    ],
    skills: [
      { label: 'Languages', value: 'Python • C • JavaScript • PHP', accent: true },
      { label: 'Domains', value: 'Computer Vision • IoT • FPV Drones', accent: true },
      { label: 'Hardware', value: 'Arduino • Raspberry Pi • ESP32', accent: true },
      { label: 'Education', value: 'Robotics Training • STEM Curriculum', accent: true },
      { label: '', value: '' },
      { label: '', value: '█████████████████████░░░  88% — Always Learning' },
    ],
    experience: [
      { label: '▸', value: 'Lead Trainer — Kathmandu Skill Fair' },
      { label: '▸', value: 'Drone Training Mentor — FPV Systems' },
      { label: '▸', value: 'Robotics Lead — International Competitions' },
      { label: '▸', value: 'STEM Curriculum Developer' },
      { label: '▸', value: 'Syllabus Verification — Drone Book' },
      { label: '', value: '' },
      { label: '⚡', value: 'Founder — E.V. Network & EV Education' },
    ],
  };

  let isTyping = false;

  buttons.forEach(btn => {
    btn.addEventListener('click', () => {
      if (isTyping) return;

      const cmd = btn.dataset.cmd;
      const data = commands[cmd];
      if (!data) return;

      // Set active state
      buttons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      // Clear previous output
      output.innerHTML = '';

      // Add command echo line
      const echoLine = document.createElement('div');
      echoLine.className = 'terminal-output-line';
      echoLine.innerHTML = `<span class="text-green-400">➜</span> <span class="text-blue-400 ml-1">~</span> <span class="text-white ml-1">${cmd}</span>`;
      output.appendChild(echoLine);

      // Typing effect
      isTyping = true;
      let i = 0;
      const typeNext = () => {
        if (i >= data.length) {
          isTyping = false;
          return;
        }
        const item = data[i];
        const line = document.createElement('div');
        line.className = 'terminal-output-line';

        if (item.label && item.value) {
          line.innerHTML = `<span class="label">${item.label}:</span> <span class="${item.accent ? 'accent' : 'value'}">${item.value}</span>`;
        } else if (item.label) {
          line.innerHTML = `<span class="accent">${item.label}</span> <span class="value">${item.value}</span>`;
        } else {
          line.innerHTML = `<span class="value">${item.value}</span>`;
        }

        line.style.opacity = '0';
        line.style.transform = 'translateX(-8px)';
        output.appendChild(line);

        requestAnimationFrame(() => {
          line.style.transition = 'opacity 0.2s ease, transform 0.2s ease';
          line.style.opacity = '1';
          line.style.transform = 'translateX(0)';
        });

        i++;
        setTimeout(typeNext, 60);
      };

      setTimeout(typeNext, 200);
    });
  });
}

/* ====== Scroll Reveal (IntersectionObserver) ====== */
function initScrollReveal() {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.1,
      rootMargin: '0px 0px -40px 0px',
    }
  );

  document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
}

/* ====== Gallery Filter ====== */
function initGalleryFilter() {
  const tags = document.querySelectorAll('.gallery-tag');
  const items = document.querySelectorAll('.gallery-item');

  tags.forEach(tag => {
    tag.addEventListener('click', () => {
      const filter = tag.dataset.filter;

      // Update active tag
      tags.forEach(t => t.classList.remove('active'));
      tag.classList.add('active');

      // Filter items
      items.forEach(item => {
        const cat = item.dataset.category;
        if (filter === 'all' || cat === filter) {
          item.classList.remove('hidden-item');
          item.style.opacity = '0';
          item.style.transform = 'scale(0.95)';
          requestAnimationFrame(() => {
            item.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
            item.style.opacity = '1';
            item.style.transform = 'scale(1)';
          });
        } else {
          item.classList.add('hidden-item');
        }
      });
    });
  });
}

/* ====== Lightbox ====== */
function initLightbox() {
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightbox-img');
  const closeBtn = document.getElementById('lightbox-close');
  const galleryImages = document.querySelectorAll('.gallery-item');

  galleryImages.forEach(item => {
    item.addEventListener('click', () => {
      const img = item.querySelector('img');
      if (!img) return;
      lightboxImg.src = img.src;
      lightboxImg.alt = img.alt;
      lightbox.classList.add('active');
      document.body.style.overflow = 'hidden';
    });
  });

  const closeLightbox = () => {
    lightbox.classList.remove('active');
    document.body.style.overflow = '';
  };

  closeBtn.addEventListener('click', closeLightbox);
  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) closeLightbox();
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeLightbox();
  });
}

/* ====== Footer Year ====== */
function setFooterYear() {
  const el = document.getElementById('year');
  if (el) el.textContent = new Date().getFullYear();
}
