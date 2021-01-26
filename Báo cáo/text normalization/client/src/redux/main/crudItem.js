import {GET_ALL, CREATE, DELETE, UPDATE} from "./../../constants/index"

const itemsReducer = (items = [], action) => {
    switch (action.type) {
        case GET_ALL:
            return action.items
        case CREATE :
            return [...items, action.newItem];
        case DELETE :
            return items.filter((item) => item.id !== action.id)
        case UPDATE :
            return items.map((item) => item.id === action.item.id ? action.item : item)
        default:
            return items;
    }
};

export default itemsReducer