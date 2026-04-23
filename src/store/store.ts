import { configureStore } from '@reduxjs/toolkit';
import { authApi } from '@/features/auth/authApi';
import { dashboardApi } from '@/features/dashboard/dashboardApi';
import { eventsApi } from '@/features/events/eventsApi';
import { usersApi } from '@/features/users/usersApi';
import { subscriptionsApi } from '@/features/subscriptions/subscriptionsApi';
import authReducer from '@/features/auth/authSlice';

export const store = configureStore({
  reducer: {
    [authApi.reducerPath]: authApi.reducer,
    [dashboardApi.reducerPath]: dashboardApi.reducer,
    [eventsApi.reducerPath]: eventsApi.reducer,
    [usersApi.reducerPath]: usersApi.reducer,
    [subscriptionsApi.reducerPath]: subscriptionsApi.reducer,
    auth: authReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      authApi.middleware,
      dashboardApi.middleware,
      eventsApi.middleware,
      usersApi.middleware,
      subscriptionsApi.middleware
    ),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
