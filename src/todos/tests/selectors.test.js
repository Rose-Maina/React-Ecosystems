import { expect } from "chai";
import { getCompletedTodos } from '../selectors';

describe("The getCompletedTodos selector", () => {
    it("should return only complteted todos", () => {
        const fakeTodos = [{
            text: 'Say hello',
            isCompleted: true,
        }, {
            text: 'Say Goodbye',
            isCompleted: false,
        }, {
            text: 'Climb Mount Everest',
            isCompleted: false,
        }];
        const expected = [{
            text: 'Say hello',
            isCompleted: true,
        }];
        const actual = getCompletedTodos.resultFunc(fakeTodos);

        expect(actual).to.deep.equal(expected);
    });
});