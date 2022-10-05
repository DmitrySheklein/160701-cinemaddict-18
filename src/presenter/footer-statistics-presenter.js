import { render } from '../framework/render';
import FooterStatisticsView from '../view/footer-statistics-view';

export default class FooterStatisticsPresenter {
  #container = null;

  #filmsModel = null;

  constructor(container, filmModel) {
    this.#container = container;
    this.#filmsModel = filmModel;
  }

  init = () => {
    this.#renderFooterStatistics();
  };

  #renderFooterStatistics = () => {
    const filmsCount = this.#filmsModel.films.length;

    render(
      new FooterStatisticsView(filmsCount),
      this.#container.querySelector('.footer__statistics'),
    );
  };
}
