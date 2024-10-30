
const menuButton = document.querySelector('.explore-button');
const menu = document.getElementById('menu');
const body = document.body;

menuButton.addEventListener('click', function() {
    menu.classList.toggle('active');
    body.classList.toggle('menu-active');
});

const articlesLink = document.getElementById('articles-link');
const articlesPage = document.getElementById('articles-page');
const articlesContainer = document.querySelector('.articles-container');
const homepageBtn = document.getElementById('back-homepage-btn');

function displayArticles(filteredArticles = articles) {
    articlesContainer.innerHTML = '';
    filteredArticles.forEach(article => {
        const articleCard = document.createElement('div');
        articleCard.classList.add('article-card');
        articleCard.innerHTML = `
            <img class="card-img" src="${article.image}" alt="${article.title}" />
            <div class="article-card-content">
                <h2>${article.title}</h2>
                <p>${article.excerpt}</p>
                <div class="article-card-category">${article.category}</div>
            </div>
        `;
        articlesContainer.appendChild(articleCard);
    });
}
 
function navigateTo(page) {
    if (page === 'articles') {
        window.location.hash = 'articles';
        articlesPage.classList.add('active');
        displayArticles();
    } else {
        window.location.hash = '';
        articlesPage.classList.remove('active');
    }
}


articlesLink.addEventListener('click', function(e) {
    e.preventDefault();
    navigateTo('articles');
});

window.addEventListener('load', function() {
    if (window.location.hash === '#articles') {
        navigateTo('articles');
    }
});

homepageBtn.addEventListener('click', function() {
    navigateTo('home');
});

const categoryButtons = document.querySelectorAll('.category-btn');
categoryButtons.forEach(button => {
    button.addEventListener('click', function() {
        const category = button.getAttribute('data-category');
        if (category === 'All'){
            displayArticles(articles);
        }
        else
        {
            const filteredArticles = articles.filter(article => article.category === category);
            displayArticles(filteredArticles);
        }
    });
});
