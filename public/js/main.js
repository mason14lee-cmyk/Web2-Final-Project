document.addEventListener("DOMContentLoaded", () => {

  // ===== NAV TOGGLE =====
  const toggle = document.querySelector(".nav-toggle");
  const nav = document.querySelector(".nav");

  toggle?.addEventListener("click", () => {
    const open = nav.classList.toggle("show");
    toggle.setAttribute("aria-expanded", open);
  });

  // ===== CATEGORY FILTER CHIP UI =====
  document.querySelectorAll(".chip").forEach(chip => {
    chip.addEventListener("click", () => {
      document.querySelector(".chip.active")?.classList.remove("active");
      chip.classList.add("active");
    });
  });

  // ===== BACK TO TOP =====
  const backToTop = document.getElementById("backToTop");

  window.addEventListener("scroll", () => {
    if(window.scrollY > 300){
      backToTop.classList.add("show");
    } else {
      backToTop.classList.remove("show");
    }
  });

  backToTop?.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });

  // ===== DARK MODE =====
  const darkToggle = document.getElementById("dark-mode-toggle");
  if(localStorage.getItem("darkMode") === "true"){
    document.body.classList.add("dark-mode");
  }

  darkToggle?.addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");
    const isDark = document.body.classList.contains("dark-mode");
    localStorage.setItem("darkMode", isDark);
  });

  // ===== WAFFLE MENU =====
  const waffleButton = document.getElementById('waffle-button');
  const waffleMenu = document.getElementById('waffle-menu');
  const waffleLinks = waffleMenu?.querySelectorAll('a');

  waffleButton?.addEventListener('click', () => {
    const expanded = waffleButton.getAttribute('aria-expanded') === 'true';
    waffleButton.setAttribute('aria-expanded', !expanded);
    waffleMenu.style.display = expanded ? 'none' : 'block';
    waffleMenu.setAttribute('aria-hidden', expanded);

    if (!expanded) waffleLinks[0].focus();
  });

  document.addEventListener('click', (e) => {
    if(!waffleButton?.contains(e.target) && !waffleMenu?.contains(e.target)){
      waffleButton?.setAttribute('aria-expanded', 'false');
      if (waffleMenu) waffleMenu.style.display = 'none';
      waffleMenu?.setAttribute('aria-hidden', 'true');
    }
  });

  waffleButton?.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowDown' || e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      waffleLinks[0]?.focus();
    }
  });

  waffleLinks?.forEach((link, index) => {
    link.addEventListener('keydown', (e) => {
      switch(e.key){
        case 'ArrowDown':
          e.preventDefault();
          if (index + 1 < waffleLinks.length) waffleLinks[index + 1].focus();
          break;
        case 'ArrowUp':
          e.preventDefault();
          if (index - 1 >= 0) waffleLinks[index - 1].focus();
          else waffleButton.focus();
          break;
        case 'Escape':
          e.preventDefault();
          waffleButton.setAttribute('aria-expanded', 'false');
          waffleMenu.style.display = 'none';
          waffleMenu.setAttribute('aria-hidden', 'true');
          waffleButton.focus();
          break;
      }
    });
  });

  // ===== BLOG SEARCH & TAG FILTER =====
  const blogSearch = document.getElementById('blog-search');
  const blogCards = document.querySelectorAll('.post-grid .card');
  const postCount = document.getElementById('post-count');

  blogSearch?.addEventListener('input', () => {
    const query = blogSearch.value.toLowerCase();
    let visibleCount = 0;

    blogCards.forEach(card => {
      const title = card.querySelector('.card-title')?.textContent.toLowerCase() || '';
      const category = card.querySelector('.meta span')?.textContent.toLowerCase() || '';
      const tags = Array.from(card.querySelectorAll('.tags .tag')).map(tag => tag.textContent.toLowerCase());

      const matches =
        title.includes(query) ||
        category.includes(query) ||
        tags.some(tag => tag.includes(query));

      card.style.display = matches ? '' : 'none';
      if(matches) visibleCount++;
    });

    if(postCount) postCount.textContent = `Showing ${visibleCount} post${visibleCount !== 1 ? 's' : ''}`;
  });

  document.querySelectorAll('.tag').forEach(tagEl => {
    tagEl.addEventListener('click', () => {
      const tag = tagEl.textContent.toLowerCase();
      let visibleCount = 0;

      blogCards.forEach(card => {
        const tags = Array.from(card.querySelectorAll('.tags .tag')).map(t => t.textContent.toLowerCase());
        const matches = tags.includes(tag);
        card.style.display = matches ? '' : 'none';
        if(matches) visibleCount++;
      });

      if(postCount) postCount.textContent = `Showing ${visibleCount} post${visibleCount !== 1 ? 's' : ''}`;
    });
  });


  const footer = document.querySelector(".site-footer");
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if(entry.isIntersecting){
        footer.querySelectorAll("> .footer-inner > *").forEach(el => {
          el.style.opacity = 1;
        });
        observer.unobserve(footer);
      }
    });
  }, { threshold: 0.2 });

  observer.observe(footer);


});