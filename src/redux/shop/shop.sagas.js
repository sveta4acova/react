import { takeEvery, takeLatest, call, put, all } from 'redux-saga/effects';
import ShopActionTypes from './shop.types';
import { firestore, convertCollectionsSnapshotToMap } from '../../firebase/firebase.utils';
import {fetchCollectionsFailure, fetchCollectionsSuccess} from './shop.actions';

export function* fetchCollectionsAsync() {
   try {
     const collectionRef = firestore.collection('collections');
     const snapshot = yield collectionRef.get();
     //создаем описание эффекта, которое инструктирует промежуточное ПО вызывать функцию с аргументами.
     //функция может быть генератором или обычной
     //если была передана функция-генератор, то родительский генератор будет приостановлен,
     //до тех пор, пока не завершится дочерний (успех или ошибка)
     const collectionsMap = yield call(convertCollectionsSnapshotToMap, snapshot);
     //создаем описание эффекта, которое инструктирует промежуточное ПО отправлять экшн в хранилище
     //аргументом является объект экшена с обязательным полем type
     yield put(fetchCollectionsSuccess(collectionsMap));
   } catch(e) {
     yield put(fetchCollectionsFailure(e.message));
   }
}

export function* fetchCollectionsStart() {
  //создаем описание эффекта, который поручает мидлваре ждать специфический экшн,
  //удовлетворяющий шаблону, а именно FETCH_COLLECTIONS_START
  //как только он произойдет, каждый раз, выполняем функцию-генератор, которая передана 2-м аргументом
  // yield takeEvery(ShopActionTypes.FETCH_COLLECTIONS_START, fetchCollectionsAsync);

  //но т.к. мы хотим выполнить этот запрос только один раз
  //юзаем takeLatest
  //при повторном экшене, предыдущая сага будет закрыта, в итоге, все выполнится один раз
  yield takeLatest(ShopActionTypes.FETCH_COLLECTIONS_START, fetchCollectionsAsync);
}

export function* shopSagas() {
  yield all([
    call(fetchCollectionsStart),
  ])
}
