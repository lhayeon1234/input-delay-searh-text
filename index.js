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
    "c",
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
        let context = text.replaceAll(
          search,
          `<span style="background: tomato">${search}</span>`
        );
        return `<div>${context}</div>`;
      })
      .join("");
    $("#result").innerHTML = innerHTML;
  };
}

new App();
