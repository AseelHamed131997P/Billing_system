import {
  useDispatch as useDispatchBase,
  useSelector as useSelectorBase,
} from "react-redux";

export const useDispatch = () => useDispatchBase();
export const useSelector = useSelectorBase;
