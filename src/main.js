import { render } from "./render";
import ProfileView from "./profile-view";
import NavigationView from "./navigation-view";
import SortView from "./sort-view";
import FooterStatisticsView from "./footer-statistics-view";
import FilmsPresenter from "./presenter/films-presenter";

const siteMainElement = document.querySelector(".main");
const siteHeaderElement = document.querySelector(".header");
const filmsPresenter = new FilmsPresenter();
const siteFooterElement = document.querySelector(".footer");
const siteFooterStatistics = siteFooterElement.querySelector(
  ".footer__statistics"
);

render(new ProfileView(), siteHeaderElement);
render(new NavigationView(), siteMainElement);
render(new SortView(), siteMainElement);

filmsPresenter.init(siteMainElement);

render(new FooterStatisticsView(), siteFooterStatistics);
