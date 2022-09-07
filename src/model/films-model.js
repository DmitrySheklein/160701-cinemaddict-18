import { FILM_CARD_COUNT } from '../const';
import { generateFilmCard } from '../mock/film';

export default class FilmsModel {
  films = Array.from({ length: FILM_CARD_COUNT }, generateFilmCard);

  getFilms = () => this.films;
}
