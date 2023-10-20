import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { put, takeLatest } from "redux-saga/effects";
import { getUserByToken } from "./authCrud";

export const actionTypes = {
  Login: "[Login] Action",
  Logout: "[Logout] Action",
  Register: "[Register] Action",
  UserRequested: "[Request User] Action",
  UserLoaded: "[Load User] Auth API"
};

const initialAuthState = {
  user: undefined,
  authToken: undefined
};

export const reducer = persistReducer(
  { storage, key: "risha-auth", whitelist: ["user", "authToken"] },
  (state = initialAuthState, action) => {
    switch (action.type) {
      case actionTypes.Login: {
        const { authToken, user } = action.payload;
        return { authToken, user: user };
      }

      case actionTypes.Register: {
        const { authToken } = action.payload;

        return { authToken, user: undefined };
      }

      case actionTypes.Logout: {
        // TODO: Change this code. Actions in reducer aren't allowed.
        return initialAuthState;
      }

      case actionTypes.UserLoaded: {
        const { user } = action.payload;
        let extractUser = {
          UserId: user.UserId,
          UserName: user.UserName,
          Email: user.Email,
          MobileNo: user.MobileNo,
          NationalCode: user?.RealPerson?.MobileNo,
          FirstName: user?.RealPerson?.FirstNameFa,
          LastName: user?.RealPerson?.LastNameFa,
          FullName: user?.RealPerson?.FirstNameFa + " " + user?.RealPerson?.LastNameFa,
          BirthDate: user?.RealPerson?.BirthDate,
        };
        
        return { ...state, extractUser };
      }

      default:
        return state;
    }
  }
);

export const actions = {
  login: (authToken, user) => ({ type: actionTypes.Login, payload: { authToken, user } }),
  register: authToken => ({
    type: actionTypes.Register,
    payload: { authToken }
  }),
  logout: () => ({ type: actionTypes.Logout }),
  requestUser: user => ({ type: actionTypes.UserRequested, payload: { user } }),
  fulfillUser: user => ({ type: actionTypes.UserLoaded, payload: { user } })
};

export function* saga() {
  yield takeLatest(actionTypes.Login, function* loginSaga() {
    yield put(actions.requestUser());
  });

  yield takeLatest(actionTypes.Register, function* registerSaga() {
    yield put(actions.requestUser());
  });

  yield takeLatest(actionTypes.UserRequested, function* userRequested() {
    const { data: user } = yield getUserByToken();

    yield put(actions.fulfillUser(user));
  });
}
