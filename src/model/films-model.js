import Observable from '../framework/observable';
import { TransformKeysObject } from '../util';

export default class FilmsModel extends Observable {
  #films = [];
  #filmsApiService = null;

  constructor(filmsApiService) {
    super();
    this.#filmsApiService = filmsApiService;
  }

  init = async () => {
    try {
      const films = await this.#filmsApiService.films;
      this.#films = films.map(this.#adaptToClient);
    } catch (error) {
      this.#films = [];
    }
  };

  get films() {
    return this.#films;
  }

  updateFilm = (updateType, update) => {
    const index = this.#films.findIndex((item) => item.id === update.id);

    if (index === -1) {
      throw new Error("Can't update unexisting film");
    }

    this.#films = [...this.#films.slice(0, index), update, ...this.#films.slice(index + 1)];
    this._notify(updateType, update);
  };

  createFilms = (updateType, update) => {
    this.#films = [...update];
    this._notify(updateType, update);
  };

  #adaptToClient = (film) => {
    const adaptedFilm = new TransformKeysObject(film).toCamelCase();

    return adaptedFilm;
  };
}
