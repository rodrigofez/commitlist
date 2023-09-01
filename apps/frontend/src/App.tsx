import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import { Home } from './screens';
import Error from './components/Error';
import Header from './layouts/Header';
import { Toaster } from 'react-hot-toast';

const queryClient = new QueryClient();

const router = createBrowserRouter([
  {
    path: '/',
    element: <Header />,
    errorElement: <Error />,
    children: [
      {
        path: '/',
        element: <Home />,
      },
    ],
  },
]);

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Toaster toastOptions={{ duration: 5000 }} />
      <RouterProvider router={router} />
    </QueryClientProvider>
  );
}
