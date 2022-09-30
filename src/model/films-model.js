import { generateFilms } from '../mock/film';
import Observable from '../framework/observable';

export default class FilmsModel extends Observable {
  #films = generateFilms();

  get = () => this.#films;
}
