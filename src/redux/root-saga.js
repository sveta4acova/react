import { all, call } from 'redux-saga/effects';

import { shopSagas } from './shop/shop.sagas';
import { userSagas } from './user/user.sagas';
import { cartSagas } from './cart/cart.sagas';

export default function* rootSaga() {
  //так не покатит, т.к. они не будут запущены параллельно
  // yield fetchCollectionsStart();
  // yield userSagas();

  //all - запусить все саги одновременно
  yield all([
    call(shopSagas),
    call(userSagas),
    call(cartSagas),
  ])
}
