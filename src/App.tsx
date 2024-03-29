import React, { useEffect } from 'react';

import { RouteObject, useLocation, useRoutes } from 'react-router-dom';
import { ROUTES } from './constants';
import { Main } from './components/Main';
import MainCars from './components/MainCars/MainCars';
import SettingMain from './components/SettingPage/SettingMain';
const routes: RouteObject[] = [
  {
    path: ROUTES.HOME,
    element: <Main />,
  },
  {
    path: ROUTES.CARS,
    element: <MainCars />
  },
  {
    path: ROUTES.SETTINGS,
    element: <SettingMain />
  }
];

export const App = () => {
  const { pathname } = useLocation();

  // //Always on top on serve
  // useEffect(() => {
  //   window.scrollTo(0, 0);
  // }, [pathname]);

  return useRoutes([
    ...routes,
    { path: '*', element: <div>Error 404</div> },
  ]);
};
