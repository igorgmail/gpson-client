import React, { useEffect } from 'react';

import { RouteObject, useLocation, useRoutes } from 'react-router-dom';
import { ROUTES } from './constants';
import { Main } from './components/Main';
import MainCars from './components/MainCars/MainCars';
import SettingMain from './components/SettingPage/SettingMain';
import FormSignUp from './components/RegistrComponents/FormSignUp';
import FormResetPassword from './components/RegistrComponents/FormResetPassword';
import Companies from './components/RegistrComponents/Companies';

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
  },
  {
    path: ROUTES.REGISTRATION,
    element: <FormSignUp />
  },
  {
    path: ROUTES.RESET_PASSWORD,
    element: <FormResetPassword />
  },
  {
    path: ROUTES.COMPANIES,
    element: <Companies />
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
