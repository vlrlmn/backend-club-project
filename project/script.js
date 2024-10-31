/* MENU */
const menuButton = document.querySelector('.explore-button');
const menu = document.getElementById('menu');
const body = document.body;

window.addEventListener('load', function(){
    if (this.localStorage.getItem('menuActive') === 'true'){
        menu.classList.add('active');
        body.classList.add('menu-active');
    }
});

menuButton.addEventListener('click', function() {
    menu.classList.toggle('active');
    body.classList.toggle('menu-active');

    const isActive = menu.classList.contains('active');
    localStorage.setItem('menuActive', isActive);
});

/* PAGES ELEMENTS */
const articlesLink = document.getElementById('articles-link');
const articlesPage = document.getElementById('articles-page');
const articlesContainer = document.querySelector('.articles-container');
const homepageBtn = document.getElementById('back-homepage-btn');
const moodboardPage = document.getElementById('moodboard-page');
const moodboardBtn = document.getElementById('moodboard-btn');
const menuMoodboardBtn = document.getElementById('menu-moodboard-btn');

/* ARTICLES */
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
 
/* NAVIGATION */
function navigateTo(page) {

    articlesPage.classList.remove('active');
    moodboardPage.classList.remove('active');

    if (page === 'articles') {
        window.location.hash = 'articles';
        articlesPage.classList.add('active');
        displayArticles();
    } else if (page === 'moodboard') {
        window.location.hash = 'moodboard';
        moodboardPage.classList.add('active');
    } else {
        window.location.hash = '';
    }
}


/* CLICKS */
articlesLink.addEventListener('click', function(e) {
    e.preventDefault();
    navigateTo('articles');
});


homepageBtn.addEventListener('click', function() {
    navigateTo('home');
});

menuMoodboardBtn.addEventListener('click', function(e){
    e.preventDefault();
    navigateTo('moodboard');
});

moodboardBtn.addEventListener('click', function(e) {
    e.preventDefault();
    navigateTo('moodboard');
});

document.getElementById('back-homepage-btn-moodboard').addEventListener('click', function() {
    navigateTo('home');
});

document.getElementById('articles-btn').addEventListener('click', function() {
    navigateTo('articles');
});

document.getElementById('reach-out-btn-moodboard').addEventListener('click', function() {
    navigateTo('reachout');
});

document.getElementById('about-btn-moodboard').addEventListener('click', function() {
    navigateTo('about');
});

/* URL CHECK AND LOAD FIRST TIME */
window.addEventListener('load', function() {
    if (window.location.hash === '#articles') {
        navigateTo('articles');
    }
    else  if (window.location.hash === '#moodboard') {
        navigateTo('moodboard');
    }
});

/* BACK CLICK */

window.addEventListener('popstate', function(){
    const page = window.location.hash.replace('#', '');

    if (page === 'articles') {
            navigateTo('articles');
    }
    else if (page === 'moodboard') {
        navigateTo('moodboard');
    } else {
        navigateTo('home');
    }
});

/* FILTER OF ARTICLES */
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

/* ARTICLE WINDOW */ 

const articleModal = document.getElementById('article-modal');
const modalTitle = document.getElementById('modal-article-title');
const modalContent = document.getElementById('modal-article-text');
const closeModalButton = document.querySelector('.close-modal');


function openArticleModal(article) {
    document.getElementById('modal-article-title').textContent = article.title;
    document.getElementById('modal-article-cover').src = article.image;
    modalContent.innerHTML = article.content;
    articleModal.classList.add('show');
}

closeModalButton.addEventListener('click', function() {
    articleModal.classList.remove('show');
});

articleModal.addEventListener('click', function(event){
    if(event.target === articleModal) {
        articleModal.classList.remove('show');
    }
});

articlesContainer.addEventListener('click', function(event) {
    const card = event.target.closest('.article-card');
    if (card) {
        const articleIndex = Array.from(articlesContainer.children).indexOf(card);
        openArticleModal(articles[articleIndex]);
    }
});
