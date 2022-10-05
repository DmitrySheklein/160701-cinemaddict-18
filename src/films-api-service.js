import ApiService from './framework/api-service';
import { TransformKeysObject } from './util';

const Method = {
  GET: 'GET',
  PUT: 'PUT',
};

export default class FilmsApiService extends ApiService {
  get films() {
    return this._load({ url: 'movies' }).then(ApiService.parseResponse);
  }

  updateFilm = async (film) => {
    const response = await this._load({
      url: `movies/${film.id}`,
      method: Method.PUT,
      body: JSON.stringify(this.#adaptToServer(film)),
      headers: new Headers({ 'Content-Type': 'application/json' }),
    });
    const parsedResponse = await ApiService.parseResponse(response);

    return parsedResponse;
  };

  #adaptToServer = (film) => {
    const adaptedFilm = new TransformKeysObject(film).fromCamelToSnakeCase();

    return adaptedFilm;
  };
}
