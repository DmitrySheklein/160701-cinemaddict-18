import { render } from './render';
import ProfileView from './view/profile-view';
import NavigationView from './view//navigation-view';
import SortView from './view/sort-view';
import FooterStatisticsView from './view/footer-statistics-view';
import FilmsPopup from './view/film-popup-view';
import FilmsPresenter from './presenter/films-presenter';
import FilmsModel from './model/films-model';

const siteBodyElement = document.body;
const siteMainElement = document.querySelector('.main');
const siteHeaderElement = document.querySelector('.header');
const siteFooterElement = document.querySelector('.footer');

const filmsModel = new FilmsModel();
const filmsPresenter = new FilmsPresenter();
const siteFooterStatistics = siteFooterElement.querySelector('.footer__statistics');

render(new ProfileView(), siteHeaderElement);
render(new NavigationView(), siteMainElement);
render(new SortView(), siteMainElement);

filmsPresenter.init(siteMainElement, filmsModel);

render(new FooterStatisticsView(), siteFooterStatistics);
// render(new FilmsPopup(), siteBodyElement);
import { generateFilmCard } from './mock/film';
console.dir(generateFilmCard());
