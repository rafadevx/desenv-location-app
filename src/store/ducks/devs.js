import { toast } from 'react-toastify';
/*
  Types
*/
export const Types = {
  ADD_REQUEST: 'devs/ADD_REQUEST',
  ADD_SUCCESS: 'devs/ADD_SUCCESS',
  ADD_FAILURE: 'devs/ADD_FAILURE',
  REMOVE: 'devs/REMOVE',
};

/*
  Reducer
*/
const INITIAL_STATE = {
  loading: false,
  data: [],
  error: null,
};

export default function devs(state = INITIAL_STATE, action) {
  switch (action.type) {
    case Types.ADD_REQUEST:
      return { ...state, loading: true };
    case Types.ADD_SUCCESS:
      toast.success('Dev adicionado');
      return {
        ...state,
        loading: false,
        error: null,
        data: [...state.data, action.payload.data],
      };
    case Types.ADD_FAILURE:
      toast.error(action.payload.error);
      return { ...state, loading: false, error: action.payload.error };
    case Types.REMOVE:
      toast.warn(`Dev ${action.payload.dev.login} removido`);
      return {
        ...state,
        loading: false,
        error: null,
        data: state.data.filter(dev => (dev.id !== action.payload.dev.id)),
      };
    default:
      return state;
  }
}

/*
  Actions
*/
export const Creators = {

  addDevRequest: (dev, local) => ({
    type: Types.ADD_REQUEST,
    payload: { dev, local },
  }),

  addDevSuccess: data => ({
    type: Types.ADD_SUCCESS,
    payload: { data },
  }),

  addDevFailure: error => ({
    type: Types.ADD_FAILURE,
    payload: { error },
  }),

  removeDev: dev => ({
    type: Types.REMOVE,
    payload: { dev },
  }),

};
