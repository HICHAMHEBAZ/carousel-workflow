// The only file to edit for content. Replace the example with the approved outline.
// Layouts: cover | idea | stat | list | close
// Text markup: *word* = accent word, \n = line break. Everything else is escaped.
// Fields: title, kicker, numeral, lede, blocks[{h,p}], stat{value,label}, bars[{value,pct,label}],
//         chips[], items[], callout, credit, theme ("a" | "b" | "c" ...), art (trusted SVG/img markup)

export const meta = {
  lang: "en",          // "ar" for Arabic
  dir: "ltr",          // "rtl" for Arabic
  series: "Your series name",
  source: "example.com",
  swipeLabel: "Swipe",
};

export const slides = [
  {
    layout: "cover",
    theme: "a",
    numeral: "3",
    kicker: "A short kicker",
    title: "Three ideas\nthat change\n*your work*",
    lede: "One sentence that says what the reader gets.",
  },
  {
    layout: "idea",
    theme: "b",
    numeral: "1",
    title: "The first idea,\nin *two lines*",
    blocks: [
      { h: "The point", p: "One or two short lines that explain it." },
      { h: "The proof", p: "A fact from the source, with its number." },
    ],
  },
  {
    layout: "stat",
    theme: "c",
    numeral: "2",
    title: "A number that\n*sticks*",
    stat: { value: "73%", label: "What the number measures, in one line." },
  },
  {
    layout: "close",
    theme: "c",
    title: "The takeaway,\nwith two *accents*",
    lede: "One closing sentence.",
    callout: "Save this post and send it to someone who needs it.",
    credit: "Source: Author, Outlet (2026)",
  },
];
