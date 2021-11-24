/* eslint-disable import/prefer-default-export */
/* eslint-disable import/no-unresolved */
/* eslint-disable import/extensions */
import { configureStore } from '@reduxjs/toolkit';
import reducer from './rootReducer';

export const store = configureStore({ reducer });
