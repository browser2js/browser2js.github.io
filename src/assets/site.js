"use strict";

// This website is a joke. The demonstration only opens a JavaScript alert.
const runButton = document.querySelector("#run-proof");
const result = document.querySelector("#demo-result");
let runs = 0;
runButton.addEventListener("click", () => {
  window.alert("Arbitrary Code Execution!");
  runs += 1;
  result.textContent = `Executed ${runs} ${runs === 1 ? "time" : "times"} — the web is working`;
  result.classList.add("has-run");
});

document.querySelectorAll("[data-copy]").forEach(button => {
  button.addEventListener("click", async () => {
    const code = document.getElementById(button.dataset.copy);
    const status = button.querySelector("[aria-live]");
    try {
      await navigator.clipboard.writeText(code.textContent);
      status.textContent = "Copied";
    } catch {
      const range = document.createRange();
      range.selectNodeContents(code);
      const selection = window.getSelection();
      selection.removeAllRanges();
      selection.addRange(range);
      status.textContent = "Select code to copy";
    }
  });
});

const tabs = [...document.querySelectorAll('.runtime-tabs [role="tab"]')];
function selectTab(index, focus = false) {
  tabs.forEach((tab, current) => {
    const selected = current === index;
    tab.setAttribute("aria-selected", String(selected));
    tab.tabIndex = selected ? 0 : -1;
    document.getElementById(tab.getAttribute("aria-controls")).hidden = !selected;
  });
  if (focus) tabs[index].focus();
}
tabs.forEach((tab, index) => {
  tab.addEventListener("click", () => selectTab(index));
  tab.addEventListener("keydown", event => {
    let next;
    if (event.key === "ArrowRight") next = (index + 1) % tabs.length;
    else if (event.key === "ArrowLeft") next = (index + tabs.length - 1) % tabs.length;
    else if (event.key === "Home") next = 0;
    else if (event.key === "End") next = tabs.length - 1;
    else return;
    event.preventDefault();
    selectTab(next, true);
  });
});

// Both deferred scripts run after the table exists; refresh its drag listeners.
window.dragscroll.reset();
