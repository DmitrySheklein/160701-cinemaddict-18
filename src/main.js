import FilmsPresenter from './presenter/films-presenter';
import NavigationPresenter from './presenter/navigation-presenter';
import FilmsModel from './model/films-model';
import CommentsModel from './model/comments-model';
import NavigationModel from './model/navigation-model';
import FilmsApiService from './api/films-api-service';
import CommentsApiService from './api/comments-api-service';
import { AUTHORIZATION, END_POINT } from './main-const';
import HeaderProfilePresenter from './presenter/header-profile-presenter';
import FooterStatisticsPresenter from './presenter/footer-statistics-presenter';

const siteMainElement = document.querySelector('.main');
const siteHeaderElement = document.querySelector('.header');
const siteFooterElement = document.querySelector('.footer');

const filmsModel = new FilmsModel(new FilmsApiService(END_POINT, AUTHORIZATION));
const navigationModel = new NavigationModel();
const commentsModel = new CommentsModel(
  filmsModel,
  new CommentsApiService(END_POINT, AUTHORIZATION),
);
const navigationPresenter = new NavigationPresenter(siteMainElement, navigationModel, filmsModel);
const filmsPresenter = new FilmsPresenter(
  siteMainElement,
  filmsModel,
  commentsModel,
  navigationModel,
  navigationPresenter,
);
const headerProfilePresenter = new HeaderProfilePresenter(siteHeaderElement, filmsModel);
const footerStatisticsPresenter = new FooterStatisticsPresenter(siteFooterElement, filmsModel);

navigationPresenter.init();
filmsPresenter.init();
filmsModel.init().then(() => {
  footerStatisticsPresenter.init();
  headerProfilePresenter.init();
});
