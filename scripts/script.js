const articleElements = document.querySelectorAll("article");
const specialWindowInnerWidth = 1250;

function linkCitations() {
  // # Linking numeric in-text citations to the references list:

  const references = document.querySelectorAll("#reference-list li");

  // Assigning an ID (e.g. ref-1, ref-2) based on the index of the reference in the list
  for (let i = 0; i < references.length; i++) {
    references[i].setAttribute("id", `ref-${i + 1}`);
  }

  for (let i = 0; i < articleElements.length; i++) {
    let element = articleElements[i];
    let matchesInsideBrackets = element.innerHTML.match(/\[(.*)\]/g); // matches all text that is inside square brackets (including) (e.g "[1]", "[2]")

    if (matchesInsideBrackets == null) continue;

    for (let j = 0; j < matchesInsideBrackets.length; j++) {
      let match = matchesInsideBrackets[j];

      element.innerHTML = element.innerHTML.replace(
        match,
        `<a href="#ref-${match[1]}" onclick="navigateToArticle(6);">[${match[1]}]</a>`
        // match[1] converts the text with square brackets and a digit into only the digit
        // (e.g. "[1]" becomes "1"; "[2]" becomes "2")
      ); // links matches to the references' IDs
    }
  }
}

function scrollToContentStart() {
  const contentStart = document.getElementById("content-start");

  contentStart.scrollIntoView({ behavior: "smooth" });
}

// # ---- Arrow Functionality ---- #

// The website follows a slide show pattern on devices with an inner width above 1250 pixels.
// This requires the functionality of arrows that enables the user to move to the previous and
// next slides. However, on smaller screens, the arrows would take up too much space, so they
// are supposed to disappear then. The slides are represented by `article` elements on HTML.

let activeArticleIndex = 0;

const leftArrowButton = document.getElementById("left-arrow");
const rightArrowButton = document.getElementById("right-arrow");

function changeArrowColors(color_number) {
  // 0 for black, 1 for white
  // Sometimes, the arrows need to change colors to fit the background color of the current article.

  let colors = ["black", "white"];

  let color = colors[color_number];
  let oppositeColor = colors[1 - color_number];

  leftArrowButton.classList.add(color);
  leftArrowButton.classList.remove(oppositeColor);

  rightArrowButton.classList.add(color);
  rightArrowButton.classList.remove(oppositeColor);
}

function navigateToArticle(index) {
  // # This function changes the current slide (article) shown to the user
  // to that of the corresponding index.

  if (window.innerWidth < specialWindowInnerWidth) return;

  // The 1st slide doesn't have an apparent left arrow button.
  if (index === 0) {
    leftArrowButton.style.display = "none";
  } else {
    leftArrowButton.style.display = "block";
  }

  // The last slide doesn't have an apparent right arrow button.
  if (index === 7) {
    rightArrowButton.style.display = "none";
  } else {
    rightArrowButton.style.display = "block";
  }

  // The 1st, 2nd, 3rd, and 8th slides have a darker background color,
  // so the arrows change their colors for a better visual experience.
  if (index === 0 || index === 1 || index === 2 || index === 7) {
    changeArrowColors(1);
  } else {
    changeArrowColors(0);
  }

  // So far, the `activeArticleIndex` refers to the active slide shown to the user,
  // the one before it will have been changed to that of the corresponding index
  // provided to this function.
  articleElements[activeArticleIndex].style.display = "none";
  articleElements[index].style.display = "flex";

  activeArticleIndex = index;
}

function setLeftAndRightArrowFunctions() {
  leftArrowButton.addEventListener("click", () => {
    navigateToArticle(activeArticleIndex - 1);
  });

  rightArrowButton.addEventListener("click", () => {
    navigateToArticle(activeArticleIndex + 1);
  });
}

window.addEventListener("keydown", (event) => {
  if (event.code === "ArrowLeft") {
    if (activeArticleIndex === 0) {
      navigateToArticle(7);
    } else {
      leftArrowButton.click();
    }
  }

  if (event.code === "ArrowRight") {
    if (activeArticleIndex === 7) {
      navigateToArticle(0);
    } else {
      rightArrowButton.click();
    }
  }
});

// # ---- Screen-Size-Specific Functionality ---- #

function resetArrowFunctionality() {
  // # This function reverts the states of arrows buttons and article
  // elements to their defaults depending on the screen size.

  // For example, on screens narrower than 1250 pixels, the arrow buttons
  // disappear visually, and all the existing slides are shown to the user
  // as the arrow functionality has been abandoned.

  if (window.innerWidth < specialWindowInnerWidth) {
    leftArrowButton.style.display = "none";
    rightArrowButton.style.display = "none";

    articleElements.forEach((article) => {
      article.style.display = "flex";
    });
  } else {
    articleElements.forEach((article, index) => {
      if (index == activeArticleIndex) {
        article.style.display = "flex";
      } else {
        article.style.display = "none";
      }
    });
  }
}

function returnToStart() {
  if (window.innerWidth >= specialWindowInnerWidth) {
    navigateToArticle(0);
  } else {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  }
}

function setNavigationNote() {
  const navigationNoteSpan = document.getElementById("navigation-note");

  if (window.innerWidth >= specialWindowInnerWidth) {
    navigationNoteSpan.innerHTML =
      "Navigate through the arrows on the sides or arrow keys on your keyboard.";
  } else {
    navigationNoteSpan.innerHTML = `<a href="javascript:scrollToContentStart();">Learn more.</a>`;
  }
}

window.addEventListener("resize", () => {
  // In case the user changes the screen size without having reloaded the page,
  // the arrow functionality and slide show pattern will appear or disappear.

  setNavigationNote();
  navigateToArticle(activeArticleIndex);

  resetArrowFunctionality();
});

linkCitations();
navigateToArticle(0);
setLeftAndRightArrowFunctions();
setNavigationNote();

/*

// The code in this comment was planned to be implemented but eventually abandoned. //

function shortenArticleTexts() {
  const articleElements = document.querySelectorAll("article");

  for (let i = 0; i < articleElements.length; i++) {
    if (i == 4 || i == 5) continue;

    let element = articleElements[i];
    let elementShortText = getShortText(element);
    let elementChildrenCount = element.children.length;

    element.classList.add("hidden");
    hideChildrenAfterHeading(element, elementChildrenCount);
    element.innerHTML += elementShortText;

    let readMoreButton = document.createElement("button");
    readMoreButton.type = "button";
    readMoreButton.classList.add("read-more-button");
    readMoreButton.innerHTML = "Read more";

    element.appendChild(readMoreButton);

    readMoreButton.addEventListener("click", () => {
      if (element.classList.contains("hidden")) {
        showChildrenAfterHeading(element, elementChildrenCount);
      } else {
        hideChildrenAfterHeading(element, elementChildrenCount);
      }

      element.classList.toggle("hidden");
    });
  }
}

function getShortText(articleElement) {
  let firstElementAfterHeading = articleElement.children[1];
  let elementTagName = firstElementAfterHeading.tagName.toLowerCase();

  if (elementTagName == "img") return firstElementAfterHeading.outerHTML;

  let elementText = firstElementAfterHeading.innerHTML.trim() + " ";
  let shortenedText = "";

  let wordCount = 0;
  let cursor = 0;

  let elementChildTagName = "";

  while (wordCount < 36 && cursor < elementText.length) {
    while (elementText[cursor] !== " ") {
      shortenedText += elementText[cursor];
      cursor += 1;
    }

    cursor += 1;
    wordCount += 1;
    shortenedText += " ";
  }

  return `<${elementTagName}>${shortenedText.trim()}</${elementTagName}>`;
}

function hideChildrenAfterHeading(articleElement, childrenCount) {
  for (let i = 1; i < articleElement.children.length; i++) {
    let child = articleElement.children[i];

    if (i >= childrenCount) {
      child.style.display = "block";
    } else {
      child.style.display = "none";
    }
  }
}

function showChildrenAfterHeading(articleElement, childrenCount) {
  for (let i = 1; i < articleElement.children.length; i++) {
    let child = articleElement.children[i];

    if (i >= childrenCount) {
      child.style.display = "none";
    } else {
      child.style.display = "block";
    }
  }
}

*/
