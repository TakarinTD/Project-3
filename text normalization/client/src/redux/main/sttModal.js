import {OPEN_MODAL, CLOSE_MODAL} from "./../../constants/index"

const sttModal = (stt = false, action) => {
    switch (action.type) {
        case OPEN_MODAL :
            return true
        case CLOSE_MODAL : 
            return false
        default:
            return stt;
    }
};

export default sttModal