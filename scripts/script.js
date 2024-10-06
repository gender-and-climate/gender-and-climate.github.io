const learnMoreButton = document.getElementById('learn-more-button');
const articleElement = document.getElementById('first-article');

learnMoreButton.addEventListener('click', () => {
  articleElement.scrollIntoView({ behavior: 'smooth' });
});