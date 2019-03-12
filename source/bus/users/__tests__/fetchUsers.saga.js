// Core
import { put, apply } from "redux-saga/effects";
import { cloneableGenerator } from "redux-saga/utils";

// Instruments
import { api } from "../../../REST";
import { uiActions } from "../../ui/actions";
import { usersActions } from "../actions";
import { fetchUsers } from "../saga/workers";

const fetchUsersAction = usersActions.fetchUsersAsync(__.users);

const saga = cloneableGenerator(fetchUsers)(fetchUsersAction);
let clone = null;

describe("fetchUsers saga:", () => {
    describe("should pass until response receiver:", () => {
        test("should dispatch 'startFetching' action", () => {
            expect(saga.next().value).toEqual(put(uiActions.startFetching()));
        });

        test("should call a fetch reponse", () => {
            expect(saga.next().value).toEqual(apply(api, api.users.fetch));
            clone = saga.clone();
        });
    });

    describe("should handle 400 response status", () => {
        test("a fetch request should return 400 response status", () => {
            expect(clone.next(__.fetchResponseFail400).value).toEqual(
                apply(__.fetchResponseFail400, __.fetchResponseFail400.json)
            );
        });

        test("should contain a response data object", () => {
            expect(clone.next(__.responseDataFail).value).toEqual(
                put(uiActions.emitError(__.error, "fetchUsers worker"))
            );
        });

        test("should dispatch 'stopFetching' action", () => {
            expect(clone.next().value).toEqual(put(uiActions.stopFetching()));
        });

        test("should finish", () => {
            expect(clone.next().done).toBe(true);
        });
    });

    describe("should handle 200 response status", () => {
        test("a fetch request should return 200 response status", () => {
            expect(saga.next(__.fetchResponseSuccess).value).toEqual(
                apply(__.fetchResponseSuccess, __.fetchResponseSuccess.json)
            );
        });

        test("should dispatch 'fillUsers' action", () => {
            expect(saga.next(__.users).value).toMatchInlineSnapshot(`
Object {
  "@@redux-saga/IO": true,
  "PUT": Object {
    "action": Object {
      "payload": undefined,
      "type": "FILL_USERS",
    },
    "channel": null,
  },
}
`);
        });

        test("should dispatch 'stopFetching' action", () => {
            expect(saga.next().value).toEqual(put(uiActions.stopFetching()));
        });

        test("should finish", () => {
            expect(saga.next().done).toBe(true);
        });
    });
});
