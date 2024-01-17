import { Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import { App } from './App';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from './common/theme';
import { Provider } from 'react-redux/es/exports';
import { store } from './store';


const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

root.render(
  <Suspense fallback={<div>Loading...</div>}>
    <Provider store={store}>
      <BrowserRouter>
        <ThemeProvider>
            <App />
        </ThemeProvider>
      </BrowserRouter>
    </Provider>
  </Suspense>
);
