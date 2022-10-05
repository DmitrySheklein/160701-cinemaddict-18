import ApiService from '../framework/api-service';

export default class CommentsApiService extends ApiService {
  #route = 'comments';

  getFilmComments = async (filmId) =>
    this._load({ url: `${this.#route}/${filmId}` }).then(ApiService.parseResponse);

  addComment = async ({ filmId, comment }) => {
    const response = await this._load({
      url: `${this.#route}/${filmId}`,
      method: this.Method.POST,
      body: JSON.stringify(ApiService.adaptToServer(comment)),
      headers: new Headers({ 'Content-Type': 'application/json' }),
    });
    const parsedResponse = await ApiService.parseResponse(response);

    return parsedResponse;
  };

  deleteComment = async (commentID) => {
    const response = await this._load({
      url: `${this.#route}/${commentID}`,
      method: this.Method.DELETE,
    });

    return response;
  };
}
