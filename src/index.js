import articlesTemplates from './templates/articles.hbs';
import './sass/main.scss';
import LoadMoreBtn from './js//load_more.js';
import PixabayAPI from './js/pixabayAPI.js';

const refs = {
  searchForm: document.querySelector('.js-search-form'),
  searchBtn: document.querySelector('.js-search-btn'),
  articlesContainer: document.querySelector('.gallery'),
  loadMoreBtn: document.querySelector('.btn-load-more'),
};

const pixabayAPI = new PixabayAPI();
const loadMoreBtn = new LoadMoreBtn({ selector: '.btn-load-more', hidden: true });

console.log(loadMoreBtn);

refs.searchForm.addEventListener('submit', onSearch);
refs.searchBtn.addEventListener('submit', onSearch);
loadMoreBtn.refs.button.addEventListener('click', fetchArticles);

function onSearch(event) {
  event.preventDefault();
  pixabayAPI.query = event.currentTarget.elements.query.value;
  if (PixabayAPI.query === '') {
    return alert('input error');
  }

  pixabayAPI.resetPage();
  clearArticlesContainer();
  fetchArticles();
  loadMoreBtn.show();
}

function scrollToLastImg() {
  refs.loadMoreBtn.scrollIntoView({
    behavior: 'smooth',
    block: 'end',
  });
}

//вставляет результат вызова шаблона
function appendArticlesMarkup(hits) {
  refs.articlesContainer.insertAdjacentHTML('beforeend', articlesTemplates(hits));
  scrollToLastImg();
}
function fetchArticles() {
  pixabayAPI.fetchArticles().then(hits => appendArticlesMarkup(hits));
}

//при каждом новом запросе очищает контейнер,
//чтобы все было с самого начала.Делаем при сабмите формы
function clearArticlesContainer() {
  refs.articlesContainer.innerHTML = '';
}