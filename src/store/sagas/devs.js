import { call, put, select } from 'redux-saga/effects';
import api from '../../services/api';

import { Creators as DevActions } from '../ducks/devs';

export function* addDev(action) {
  try {
    const { data } = yield call(api.get, `/users/${action.payload.dev}`);

    const isDuplicated = yield select(state => (
      state.devs.data.find(dev => dev.id === data.id)
    ));

    if (isDuplicated) {
      yield put(DevActions.addDevFailure('Usuário duplicado'));
    } else {
      const devData = {
        id: data.id,
        name: data.full_name,
        login: data.login,
        avatar: data.avatar_url,
        longitude: action.payload.local[0],
        latitude: action.payload.local[1],
      };

      yield put(DevActions.addDevSuccess(devData));
    }
  } catch (err) {
    yield put(DevActions.addDevFailure('Erro ao adicionar usuário'));
  }
}
