import { render } from './framework/render';
import ProfileView from './view/profile-view';
import FooterStatisticsView from './view/footer-statistics-view';
import FilmsPresenter from './presenter/films-presenter';
import NavigationPresenter from './presenter/navigation-presenter';
import FilmsModel from './model/films-model';
import CommentsModel from './model/comments-model';
import NavigationModel from './model/navigation-model';
import FilmsApiService from './films-api-service';
import { AUTHORIZATION, END_POINT } from './main-const';

const siteMainElement = document.querySelector('.main');
const siteHeaderElement = document.querySelector('.header');
const siteFooterElement = document.querySelector('.footer');

const filmsModel = new FilmsModel(new FilmsApiService(END_POINT, AUTHORIZATION));
const navigationModel = new NavigationModel();
const commentsModel = new CommentsModel(filmsModel);
const navigationPresenter = new NavigationPresenter(siteMainElement, navigationModel, filmsModel);
const filmsPresenter = new FilmsPresenter(
  siteMainElement,
  filmsModel,
  commentsModel,
  navigationModel,
  navigationPresenter,
);
const siteFooterStatistics = siteFooterElement.querySelector('.footer__statistics');

render(new ProfileView(), siteHeaderElement);
navigationPresenter.init();
filmsPresenter.init();
filmsModel.init();
render(new FooterStatisticsView(), siteFooterStatistics);
