const learnMoreButton = document.getElementById('learn-more-button');
const firstArticleElement = document.getElementById('first-article');

learnMoreButton.addEventListener('click', () => {
  firstArticleElement.scrollIntoView({ behavior: 'smooth' });
});

const references = document.querySelectorAll('#reference-list li');

for (let i = 0; i < references.length; i++) {
  references[i].setAttribute('id', `ref-${(i + 1)}`)
}

const articleElements = document.querySelectorAll('article');

for (let i = 0; i < articleElements.length; i++) {
  let elementContent = articleElements[i].innerHTML;
  let matchesInsideBrackets = elementContent.match(/\[(.*)\]/g);

  if (matchesInsideBrackets == null) continue;

  let referenceNumbers = matchesInsideBrackets.map((x) => x[1]);

  for (let j = 0; j < matchesInsideBrackets.length; j++) {
    articleElements[i].innerHTML = articleElements[i].innerHTML.replace(matchesInsideBrackets[j], `<a href="#ref-${referenceNumbers[j]}">[${referenceNumbers[j]}]</a>`);
  }
}
