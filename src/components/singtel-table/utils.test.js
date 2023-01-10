import { isNumeric, getKeyIndex, getSortLogic, filterIsSelectedforRadio } from './utils';

describe("Utils function", () => {

    test("isNumeric - it should Properly validate correct numric string", () => {
        expect(isNumeric("1")).toBeTruthy();
        expect(isNumeric("qwe")).toBeFalsy();
    });

    test("getKeyIndex - it should Properly return the correct key", () => {
        const headers = [
            { value: "First Name", key: 'firstName' },
            { value: "Last Name", key: 'lastName' },
            { value: "Gender", key: 'gender' },
            { value: "Domain", key: 'domain' },
            { value: "Phone", key: 'phone' },
            { value: "University", key: 'university' },
          ]

        expect(getKeyIndex(headers)[2].key).toEqual('gender');
        expect(getKeyIndex([])).toEqual([]);
    });

    test("getSortLogic - it should Properly validate correct order of string", () => {
        expect(getSortLogic("Ashray", "sanu", true)).toEqual(-1);
        expect(getSortLogic("Ashray", "sanu", false)).toEqual(1);
        expect(getSortLogic("sanu", "Ashray", false)).toEqual(-1);
        expect(getSortLogic("sanu", "Ashray", true)).toEqual(1);
    });

    test("filterIsSelectedforRadio - it should Properly set isSeleected value", () => {
        const request = [
            {tableIndex:0, name: "ashray", isSelected: true},
            {tableIndex:1, name: "sanu", isSelected: true}
        ]
        filterIsSelectedforRadio(request);
        expect(request[0].isSelected).toBeTruthy();
        expect(request[1].isSelected).toBeFalsy();
    });

});