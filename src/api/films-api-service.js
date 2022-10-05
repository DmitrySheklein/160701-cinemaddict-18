import ApiService from '../framework/api-service';

export default class FilmsApiService extends ApiService {
  #route = 'movies';

  get films() {
    return this._load({ url: `${this.#route}` }).then(ApiService.parseResponse);
  }

  updateFilm = async (film) => {
    const response = await this._load({
      url: `${this.#route}/${film.id}`,
      method: this.Method.PUT,
      body: JSON.stringify(ApiService.adaptToServer(film)),
      headers: new Headers({ 'Content-Type': 'application/json' }),
    });
    const parsedResponse = await ApiService.parseResponse(response);

    return parsedResponse;
  };
}
