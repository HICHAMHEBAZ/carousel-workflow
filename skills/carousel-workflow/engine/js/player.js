// Mounts slides, fits the stage to the window, and wires prev/next + arrow keys.
import { meta } from "./content.js";
import { renderSlides } from "./render.js";

const params = new URLSearchParams(location.search);
const exporting = params.has("export");

document.documentElement.lang = meta.lang || "en";
document.documentElement.dir = meta.dir || "ltr";
if (exporting) document.documentElement.classList.add("export");

const stage = document.getElementById("stage");
const slides = renderSlides(stage);
let current = 0;

function fit() {
  if (exporting) return;
  const scale = Math.min((window.innerWidth - 40) / 1080, (window.innerHeight - 110) / 1350, 1);
  document.documentElement.style.setProperty("--scale", String(scale));
}

function show(i) {
  current = Math.max(0, Math.min(slides.length - 1, i));
  slides.forEach((s, n) => s.classList.toggle("is-active", n === current));
  document.getElementById("pos").textContent = `${current + 1} / ${slides.length}`;
}

document.getElementById("prev").addEventListener("click", () => show(current - 1));
document.getElementById("next").addEventListener("click", () => show(current + 1));
window.addEventListener("keydown", (e) => {
  if (e.key === "ArrowRight") show(current + (meta.dir === "rtl" ? -1 : 1));
  if (e.key === "ArrowLeft") show(current + (meta.dir === "rtl" ? 1 : -1));
});
window.addEventListener("resize", fit);

fit();
show(0);
