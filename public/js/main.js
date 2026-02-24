const toggle = document.querySelector(".nav-toggle");
const nav = document.querySelector(".nav");

toggle.addEventListener("click", () => {
  const open = nav.classList.toggle("show");
  toggle.setAttribute("aria-expanded", open);
});

/* Category filter UI state */
document.querySelectorAll(".chip").forEach(chip => {
  chip.addEventListener("click", () => {
    document.querySelector(".chip.active")?.classList.remove("active");
    chip.classList.add("active");
  });
});



toggle?.addEventListener("click", () => {
  const open = nav.classList.toggle("show");
  toggle.setAttribute("aria-expanded", open);
});

document.getElementById("backToTop")?.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});

//Blog

const fs = require("fs");
const path = require("path");

function getBlogList(folder) {

  const files = fs.readdirSync(folder);

  const posts = files
    .filter(file => file.endsWith(".md"))
    .map(file => {

      const fullPath = path.join(folder, file);

      const obj = convertMarkdown(fullPath);

      const slug = file.replace(".md", "");
     
      return {
  title: obj.data.title,
  slug: slug,   // ✅ REQUIRED
  link: `/blog/${slug}`,  // ⭐ optional but recommended
  excerpt: obj.data.description || obj.content.substring(0, 140) + "...",
  author: obj.data.author,
  published: obj.data.published,
  image: obj.data.image || null,
  category: obj.data.category || "General",
  readTime: obj.data.readTime || stats.text
};





      const excerpt =
        obj.data.description ||
        obj.content.substring(0, 140) + "...";

  

    })
    .sort((a, b) => new Date(b.published) - new Date(a.published));

  return posts;
}

const readingTime = require("reading-time");



const pathToBlogFolder = path.join(__dirname, "blog");

