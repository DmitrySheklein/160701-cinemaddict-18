import ApiService from './framework/api-service';
import { TransformKeysObject } from './util';

const Method = {
  GET: 'GET',
  PUT: 'PUT',
};

export default class CommentsApiService extends ApiService {
  getFilmComments = async (filmId) =>
    this._load({ url: `comments/${filmId}` }).then(ApiService.parseResponse);

  #adaptToServer = (film) => {
    const adaptedFilm = new TransformKeysObject(film).fromCamelToSnakeCase();

    return adaptedFilm;
  };
}
