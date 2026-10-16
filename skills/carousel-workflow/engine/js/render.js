// Turns the data in content.js into slide HTML. Layouts: cover, idea, stat, list, close.
import { meta, slides } from "./content.js";

const pad = (n) => String(n).padStart(2, "0");

const escapeHtml = (s) =>
  String(s ?? "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]);

// Escapes first, then applies the two allowed markups: *accent* and \n line breaks.
const rich = (s) =>
  escapeHtml(s)
    .replace(/\*([^*]+)\*/g, '<span class="accent">$1</span>')
    .replace(/\n/g, "<br>");

const blocks = (list = []) =>
  list.length
    ? `<div class="blocks">${list
        .map((b) => `<div class="block"><h3>${rich(b.h)}</h3><p>${rich(b.p)}</p></div>`)
        .join("")}</div>`
    : "";

const stat = (s) =>
  s ? `<div class="stat"><div class="stat-value">${escapeHtml(s.value)}</div><p class="stat-label">${rich(s.label)}</p></div>` : "";

const bars = (list = []) =>
  list.length
    ? `<div class="bars">${list
        .map(
          (b) => `<div class="bar"><span class="val">${escapeHtml(b.value)}</span>
            <div class="col" style="height:${Math.max(4, Math.min(100, Number(b.pct) || 0)) * 3.2}px"></div>
            <span class="lbl">${rich(b.label)}</span></div>`
        )
        .join("")}</div>`
    : "";

const chips = (list = []) =>
  list.length ? `<div class="chips">${list.map((c, i) => `<span class="chip${i % 3 === 2 ? " alt" : ""}">${escapeHtml(c)}</span>`).join("")}</div>` : "";

const callout = (t) => (t ? `<div class="callout">${rich(t)}</div>` : "");

const LAYOUTS = {
  cover: (s) => `
    <div class="copy">
      ${s.numeral ? `<div class="numeral">${escapeHtml(s.numeral)}</div>` : ""}
      ${s.kicker ? `<span class="kicker">${escapeHtml(s.kicker)}</span>` : ""}
      <h1>${rich(s.title)}</h1>
      ${s.lede ? `<p class="lede">${rich(s.lede)}</p>` : ""}
    </div>`,
  idea: (s) => `
    <div class="copy">
      ${s.numeral ? `<div class="numeral">${escapeHtml(s.numeral)}</div>` : ""}
      <h2>${rich(s.title)}</h2>
      ${blocks(s.blocks)}
      ${stat(s.stat)}
      ${bars(s.bars)}
      ${chips(s.chips)}
      ${callout(s.callout)}
    </div>`,
  stat: (s) => `
    <div class="copy">
      ${s.numeral ? `<div class="numeral">${escapeHtml(s.numeral)}</div>` : ""}
      <h2>${rich(s.title)}</h2>
      ${stat(s.stat)}
      ${blocks(s.blocks)}
    </div>`,
  list: (s) => `
    <div class="copy">
      ${s.numeral ? `<div class="numeral">${escapeHtml(s.numeral)}</div>` : ""}
      <h2>${rich(s.title)}</h2>
      ${chips(s.chips)}
      ${s.items ? `<ol class="items">${s.items.map((t) => `<li>${rich(t)}</li>`).join("")}</ol>` : ""}
    </div>`,
  close: (s) => `
    <div class="copy">
      <h2 class="close-title">${rich(s.title)}</h2>
      ${s.lede ? `<p class="lede">${rich(s.lede)}</p>` : ""}
      ${callout(s.callout)}
      ${s.credit ? `<p class="credit">${rich(s.credit)}</p>` : ""}
    </div>`,
};

function chrome(i, total, slide) {
  return `
    <header class="chrome-top">
      <span class="mark"><i></i>${escapeHtml(meta.series)}</span>
      <span class="counter"><b>${pad(i + 1)}</b> / ${pad(total)}</span>
    </header>
    <footer class="chrome-bottom">
      <span class="swipe">${slide.layout === "close" ? "" : escapeHtml(meta.swipeLabel || "")}</span>
      <span class="source">${escapeHtml(meta.source)}</span>
    </footer>`;
}

export function renderSlides(root) {
  const total = slides.length;
  root.innerHTML = slides
    .map((s, i) => {
      const layout = LAYOUTS[s.layout];
      if (!layout) throw new Error(`slide ${i + 1}: unknown layout "${s.layout}"`);
      const art = s.art ? `<div class="art">${s.art}</div>` : ""; // trusted markup written by the author (SVG, mascot img)
      return `
      <section class="slide theme-${escapeHtml(s.theme || "a")}" data-index="${i}" aria-label="Slide ${i + 1}">
        <div class="bg"></div>
        ${art}
        ${layout(s)}
        ${chrome(i, total, s)}
      </section>`;
    })
    .join("");
  return [...root.querySelectorAll(".slide")];
}
