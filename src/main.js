import FilmsPresenter from './presenter/films/films-presenter';
import NavigationPresenter from './presenter/navigation-presenter';
import FilmsModel from './model/films-model';
import CommentsModel from './model/comments-model';
import NavigationModel from './model/navigation-model';
import FilmsApiService from './api/films-api-service';
import CommentsApiService from './api/comments-api-service';
import { AUTHORIZATION, END_POINT } from './main-const';
import HeaderProfilePresenter from './presenter/header-profile-presenter';
import FooterStatisticsPresenter from './presenter/footer-statistics-presenter';
import FilmsRatedPresenter from './presenter/films/films-rated-presenter';

const siteMainElement = document.querySelector('.main');
const siteHeaderElement = document.querySelector('.header');
const siteFooterElement = document.querySelector('.footer');

const filmsApiService = new FilmsApiService(END_POINT, AUTHORIZATION);
const commentsApiService = new CommentsApiService(END_POINT, AUTHORIZATION);

const filmsModel = new FilmsModel(filmsApiService);
const commentsModel = new CommentsModel(filmsModel, commentsApiService);
const navigationModel = new NavigationModel();
const navigationPresenter = new NavigationPresenter(siteMainElement, navigationModel, filmsModel);
const filmsPresenter = new FilmsPresenter(
  siteMainElement,
  filmsModel,
  commentsModel,
  navigationModel,
  navigationPresenter,
);
const filmsRatedPresenter = new FilmsRatedPresenter({
  siteMainElement,
  filmsModel,
  commentsModel,
  navigationModel,
  navigationPresenter,
});
const headerProfilePresenter = new HeaderProfilePresenter(siteHeaderElement, filmsModel);
const footerStatisticsPresenter = new FooterStatisticsPresenter(siteFooterElement, filmsModel);

navigationPresenter.init();
filmsPresenter.init();
filmsRatedPresenter.init();
filmsModel.init().then(() => {
  footerStatisticsPresenter.init();
  headerProfilePresenter.init();
});
