import Observable from '../framework/observable';
import { TransformKeysObject } from '../utils/transform-keys';
import { UpdateType } from '../main-const';
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

    this._notify(UpdateType.INIT);
  };

  get films() {
    return this.#films;
  }

  updateFilm = async (updateType, updateFilm, isLocalUpdate = false) => {
    const index = this.#films.findIndex((item) => item.id === updateFilm.id);

    if (index === -1) {
      throw new Error('Can not update unexisting film');
    }

    try {
      let updatedFilm = null;

      if (isLocalUpdate) {
        updatedFilm = this.#adaptToClient(updateFilm);
      } else {
        const response = await this.#filmsApiService.updateFilm(updateFilm);
        updatedFilm = this.#adaptToClient(response);
      }
      this.#films = [...this.#films.slice(0, index), updatedFilm, ...this.#films.slice(index + 1)];
      this._notify(updateType, updatedFilm);
    } catch (error) {
      throw new Error('Can not update film');
    }
  };

  #adaptToClient = (film) => {
    const adaptedFilm = new TransformKeysObject(film).toCamelCase();

    return adaptedFilm;
  };
}
