import { all, takeLatest } from 'redux-saga/effects';
import { addDev } from './devs';
import { Types as DevTypes } from '../ducks/devs';

export default function* rootSaga() {
  yield all([
    takeLatest(DevTypes.ADD_REQUEST, addDev),
  ]);
}
