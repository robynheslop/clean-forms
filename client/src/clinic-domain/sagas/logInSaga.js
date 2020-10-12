import { all, takeEvery } from 'redux-saga/effects';
// import { events } from "../../app-domain"

export function * notifiyClinic() {
   console.log("notifying clinic")
}

export function * logInSaga() {
   console.log("login");
   yield takeEvery("app-domain/LOGGED_IN", notifiyClinic)
}
