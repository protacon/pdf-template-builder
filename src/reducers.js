import update from 'immutability-helper';
import Schema from './Resource/Schema';

const initialState = getInitialState();

export function pdfTemplateBuilder(state = initialState, action) {
  switch (action.type) {
    case 'ADD_ELEMENT':
      return update(
        {
          ...state,
          selectedUuid: action.payload.i
        },
        {
          elements: { 
            [action.payload.i]: {
              $set: { }
            }
          },
          layout: {
            $push: [action.payload]
          }
        }
      );

    case 'REMOVE_ELEMENT':
      return update(state, {
        layout: {
          $splice: [[state.layout.findIndex(l => l.i === action.payload), 1]]
        },
        elements: {
          $unset: [action.payload]
        },
        $unset: ['selectedUuid']
      });

    case 'UPDATE_ELEMENT':
      return update(state, {
        elements: {
          [action.payload.i]: {
            $merge: action.payload
          },
        }
      });

    case 'SELECT_ELEMENT':
      return {...state, selectedUuid: action.payload};

    case 'SET_LAYOUT':
      return {...state, layout: action.payload};

    case 'CONFIGURE':
      return {
        ...state,
        pdfStorageUri: action.payload.pdfStorageUri,
        schema: action.payload.schema || []
      };
    default:
      return state;
  }
}

function getInitialState() {
  const state = {
    elements: {},
    layout: [],
    schema: [],
    selectedUuid: null,
    pdfStorageUri: process.env.REACT_APP_PDF_STORAGE_URI
  };

  if (process.env.NODE_ENV === 'development') {
    state.schema = new Schema().forExample();
  }

  return state;
}