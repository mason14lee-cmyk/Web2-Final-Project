---
title: Web Accessibility Research
description: An in-depth guide to web accessibility best practices, ARIA roles, semantic HTML, and code examples.
author: Mason Olson
published: 2026-02-24
category: Accessibility
image: "/images/accessibility-guide.png"
---

# Web Accessibility Research: Making the Web Inclusive

Web accessibility ensures that websites are usable by **all people**, including those with **disabilities** such as visual, auditory, motor, or cognitive impairments. Accessible websites are not only **legally required in many regions**, but they also improve **usability, SEO, and user satisfaction**.

This research summarizes key accessibility principles, techniques, and code examples learned in this year’s Web & Software Developer course.

---

## 1. Semantic HTML

Using semantic HTML tags is the foundation of accessibility. Semantic elements provide **meaning** to screen readers and assistive technologies.

### Examples:

```html id="semantic-html"
<header>
  <h1>My Website</h1>
  <nav aria-label="Main Navigation">
    <ul>
      <li><a href="/">Home</a></li>
      <li><a href="/blog">Blog</a></li>
      <li><a href="/contact">Contact</a></li>
    </ul>
  </nav>
</header>

<main>
  <article>
    <h2>Blog Post Title</h2>
    <p>Content of the blog post...</p>
  </article>
</main>

<footer>
  <p>&copy; 2026 My Website</p>
</footer>
```
Why it matters: Semantic elements allow screen readers to navigate your page efficiently and improve search engine understanding.


## 2. ARIA Roles and Attributes

ARIA (Accessible Rich Internet Applications) roles provide additional information for interactive elements when native HTML is insufficient.
```HTML
<button aria-label="Close menu" aria-expanded="false" aria-controls="menu">
  ☰
</button>

<div id="menu" role="menu">
  <a role="menuitem" href="/blog">Blog</a>
  <a role="menuitem" href="/contact">Contact</a>
</div>

```
- (aria-label) describes elements for screen readers.
- (aria-expanded) indicates the state of expandable content.
- (role provides) context to interactive components.

## 3. Keyboard Navigation
Websites must be fully navigable via keyboard. Users rely on the Tab, Enter, and Arrow keys to access content.

Example: Focusable elements
```HTML
<a href="/blog" tabindex="0">Blog</a>
<button onclick="toggleMenu()" tabindex="0">Menu</button>
<input type="text" placeholder="Search..." tabindex="0">

```
- (tabindex="0") makes elements focusable.
- Avoid (tabindex) values greater than 0, as it disrupts natural tab order.

## 4. Coloar Contrast And Visual Accessibility
ext should be readable for users with visual impairments. WCAG recommends a minimum contrast ratio of 4.5:1 for body text.

Example CSS:
```CSS
body {
  background-color: #f5f1e8;
  color: #3c2f2f;
}

a {
  color: #1a73e8;
}

a:hover {
  color: #1558b0;
}
```
- Always test color combinations with tools like WebAIM Contrast Checker

## 5. Alt Text for Images
Every meaningful image must have (alt) text describing its content.
```html
<img src="/public/images/A-Cat.jpg" alt="A Picture Of a Cat.">
```
- Decorative images can have (alt="") to ignore them in screen readers.
- Good alt text is concise yet descriptive.

## 6. Forms & Labels
Forms must have associated labels for each input.
```HTML
<form>
  <label for="name">Full Name:</label>
  <input type="text" id="name" name="fullName">

  <label for="email">Email Address:</label>
  <input type="email" id="email" name="email">

  <input type="submit" value="Submit">
</form>
```
- for attribute links the label to its input.
- Use fieldset and legend for grouped fields:

```HTML
<fieldset>
  <legend>Contact Preferences</legend>
  <input type="checkbox" id="emailOpt" name="emailOpt">
  <label for="emailOpt">Email me updates</label>
</fieldset>
```
## 7. Skip Links
Provide skip links to allow users to bypass navigation and jump directly to the main content.

```HTML
<a href="#maincontent" class="skip-link">Skip to main content</a>

<main id="maincontent">
  <h1>Welcome to My Blog</h1>
</main>

```
- Visible when focused via keyboard.
- Improves efficiency for screen reader and keyboard users.

## 8. Responsive & Accessible Navigation
On small screens, ensure menu buttons are accessible:

```HTML 
<button aria-label="Toggle navigation" aria-expanded="false" id="menu-toggle">
  ☰ Menu
</button>

<nav id="nav" role="navigation">
  <ul>
    <li><a href="/">Home</a></li>
    <li><a href="/blog">Blog</a></li>
    <li><a href="/contact">Contact</a></li>
  </ul>
</nav>
```
```JS
const menuToggle = document.getElementById('menu-toggle');
const nav = document.getElementById('nav');

menuToggle.addEventListener('click', () => {
  const expanded = menuToggle.getAttribute('aria-expanded') === 'true';
  menuToggle.setAttribute('aria-expanded', !expanded);
  nav.classList.toggle('open');
});
```
- Maintains keyboard access and screen reader compatibility.

## 9. Headings & Landmark Structure
Headings should follow a logical hierarchy (h1 → h2 → h3) for screen readers.
Landmarks (<.header>, <.main>, <.footer>, <.nav>) help users jump between sections.

## 10. Testing Accessibility

Always test your site with:

- Screen readers (NVDA, VoiceOver)
- Keyboard-only navigation
- Color contrast checkers
- Browser extensions like axe or Lighthouse

## Conclusion

I had a lot of fun researching this topic, and it has reinforced for me how important it is to make websites accessible to everyone. Moving forward, it is my goal to ensure that all of my future websites are **web accessible**, so that all users, regardless of ability, can navigate, interact with, and enjoy my content.  

By combining:

- Semantic HTML  
- ARIA attributes  
- Keyboard navigation  
- Color contrast  
- Proper form labels  
- Skip links  
- Accessible responsive design  

