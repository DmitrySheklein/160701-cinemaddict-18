import { generateFilms } from '../mock/film';

export default class FilmsModel {
  #films = generateFilms();

  get = () => this.#films;
}
