export default class ImageApiService {
  constructor() {
    this.API_KEY = '22453348-6986f932e651dfab56ec0e491';
    this.BASE_URL = 'https://pixabay.com/api/?image_type=photo&orientation=horizontal';
    this.AMOUNT_IMAGES = 12;
    this.searchQuery = '';
    this.page = 1;
  }
  //возвращает промис, его значение это hits - массив обьектов где наши картинки
  fetchArticles() {
    const url = `${this.BASE_URL}&q=${this.query}&page=${this.page}&per_page=${this.AMOUNT_IMAGES}&key=${this.API_KEY}`;
    return fetch(url)
      .then(response => response.json())
      .then(({ hits }) => {
        this.incrementPage();
        return hits;
      });
  }
  incrementPage() {
    this.page += 1;
  }
  resetPage() {
    this.page = 1;
  }
  getQuery() {
    return this.searchQuery;
  }
  setQuery(newQuery) {
    this.searchQuery = newQuery;
  }
}