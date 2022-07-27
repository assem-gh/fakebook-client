interface State {
  content: string;
  imageFiles: File[];
  imageLinks: string[];
  showDropzone: boolean;
  loading: boolean;
}

export enum ActionType {
  ShowDropzone = 'ShowDropzone',
  AddImageFiles = 'AddImageFiles',
  RemoveImageFile = 'RemoveImageFile',
  AddImageLinks = 'AddImageLinks',
  RemoveImageLink = 'RemoveImageLink',
  UpdateContent = 'UpdateContent',
  Loading = 'Loading',
  Reset = 'Reset',
}

export interface CreatePostAction {
  type: ActionType;
  payload?: any;
}

export const initialState: State = {
  content: '',
  imageFiles: [],
  imageLinks: [],
  loading: false,
  showDropzone: false,
};

export const createPostReducer = (
  state: State,
  action: CreatePostAction
): State => {
  switch (action.type) {
    case ActionType.UpdateContent:
      return { ...state, content: action.payload };
    case ActionType.AddImageFiles:
      return { ...state, imageFiles: [...state.imageFiles, ...action.payload] };
    case ActionType.RemoveImageFile:
      return {
        ...state,
        imageFiles: state.imageFiles.filter((f) => f.name !== action.payload),
      };
    case ActionType.AddImageLinks:
      return { ...state, imageLinks: [...state.imageLinks, ...action.payload] };
    case ActionType.RemoveImageLink:
      return {
        ...state,
        imageLinks: state.imageLinks.filter((link) => link !== action.payload),
      };
    case ActionType.ShowDropzone:
      return {
        ...state,
        showDropzone: action.payload || !state.showDropzone,
      };

    case ActionType.Loading:
      return {
        ...state,
        loading: action.payload,
      };

    case ActionType.Reset:
      return initialState;
    default:
      return state;
  }
};
