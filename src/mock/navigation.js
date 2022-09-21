import { NavigationFilter } from '../util';
import { NavigationType } from '../main-const';

export const generateNavigation = (films) =>
  Object.entries(NavigationFilter).map(([filterId, filterFunction]) => ({
    filterId,
    filterName: NavigationType[filterId.toLocaleUpperCase()]?.name,
    filterCount: filterFunction(films).length,
  }));
