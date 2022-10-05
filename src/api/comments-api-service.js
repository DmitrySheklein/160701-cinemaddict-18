import ApiService from '../framework/api-service';

export default class CommentsApiService extends ApiService {
  getFilmComments = async (filmId) =>
    this._load({ url: `comments/${filmId}` }).then(ApiService.parseResponse);
}
