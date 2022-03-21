function $(element) {
  return document.querySelector(element);
}
function makeDelay(ms) {
  let timer = 0;
  return function (callback) {
    clearTimeout(timer);
    timer = setTimeout(callback, ms);
  };
}

export default function App() {
  let search = "";
  const delay = makeDelay(250);
  $("input").addEventListener("keyup", function (e) {
    delay(() => {
      $("#search-text").innerText = `Search : ${e.target.value}`;
      search = e.target.value;
      render();
    });
  });

  const textList = [
    "javascript",
    "aaajava",
    "bbjavacd",
    "abjavakkjavak",
    "javajava",
    "c++",
  ];
  const render = () => {
    const matches =
      search === ""
        ? []
        : textList.filter((text) => {
            return text.includes(search);
          });
    const innerHTML = matches
      .map((text) => {
        const matchIndex = [...text.matchAll(search)].map(
          (match) => match.index
        );
        let index = 0;
        let inner =
          matchIndex[0] > 0 ? text.slice(index, index + search.length) : "";
        matchIndex.forEach((match) => {
          const notMatched = text.slice(index, match);
          inner += `<span style="background: tomato">${search}</span>${notMatched}`;
          index = match + search.length;
        });
        if (index < text.length) {
          inner += text.slice(index);
        }
        return `<div>${inner}</div>`;
      })
      .join("");
    $("#result").innerHTML = innerHTML;
  };
}

new App();
