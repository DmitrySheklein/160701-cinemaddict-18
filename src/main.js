import { render } from './framework/render';
import ProfileView from './view/profile-view';
import NavigationView from './view//navigation-view';
import FooterStatisticsView from './view/footer-statistics-view';
import FilmsPresenter from './presenter/films-presenter';
import FilmsModel from './model/films-model';
import CommentsModel from './model/comments-model';
import { generateNavigation } from './mock/navigation';

const siteMainElement = document.querySelector('.main');
const siteHeaderElement = document.querySelector('.header');
const siteFooterElement = document.querySelector('.footer');

const filmsModel = new FilmsModel();
const commentsModel = new CommentsModel(filmsModel);
const filmsPresenter = new FilmsPresenter(siteMainElement, filmsModel, commentsModel);
const filmsNavigation = generateNavigation(filmsModel.get());
const siteFooterStatistics = siteFooterElement.querySelector('.footer__statistics');

render(new ProfileView(), siteHeaderElement);
render(new NavigationView(filmsNavigation), siteMainElement);

filmsPresenter.init();

render(new FooterStatisticsView(), siteFooterStatistics);
