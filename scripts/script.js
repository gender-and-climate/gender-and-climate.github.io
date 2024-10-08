// # Scrolling the page when clicked the "Learn More" button:

const learnMoreButton = document.getElementById("learn-more-button");
const firstArticleElement = document.getElementById("first-article");

learnMoreButton.addEventListener("click", () => {
  firstArticleElement.scrollIntoView({ behavior: "smooth" });
});

// # Linking numeric in-text citations to the references list:

const references = document.querySelectorAll("#reference-list li");

// Assigning an ID (e.g. ref-1, ref-2) based on the index of the reference in the list
for (let i = 0; i < references.length; i++) {
  references[i].setAttribute("id", `ref-${i + 1}`);
}

const articleElements = document.querySelectorAll("article");

for (let i = 0; i < articleElements.length; i++) {
  let element = articleElements[i];
  let matchesInsideBrackets = element.innerHTML.match(/\[(.*)\]/g); // matches all text that is inside square brackets (including) (e.g "[1]", "[2]")

  if (matchesInsideBrackets == null) continue;

  for (let j = 0; j < matchesInsideBrackets.length; j++) {
    let match = matchesInsideBrackets[j];

    element.innerHTML = element.innerHTML.replace(
      match,
      `<a href="#ref-${match[1]}">[${match[1]}]</a>`
      // match[1] converts the text with square brackets and a digit into only the digit
      // (e.g. "[1]" becomes "1"; "[2]" becomes "2")
    ); // links matches to the references' IDs
  }
}
