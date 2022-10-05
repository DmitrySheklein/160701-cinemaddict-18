import AbstractView from '../framework/view/abstract-view';

const createFooterStatisticsTemplate = (filmsCount) => `<p>${filmsCount} movies inside</p>`;

export default class FooterStatisticsView extends AbstractView {
  #filmsCount = 0;

  constructor(filmsCount) {
    super();
    this.#filmsCount = filmsCount;
  }

  get template() {
    return createFooterStatisticsTemplate(this.#filmsCount);
  }
}
