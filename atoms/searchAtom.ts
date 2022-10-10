import { atom, selector } from "recoil";

export const searchState = atom({
    key:"searchState",
    default:""
});

export const searchValue = selector({
    key:"searchValue",
    get:({get})=>{
        const search = get(searchState);
        return search;
    }
})
