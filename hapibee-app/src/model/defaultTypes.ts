import { DateInterval } from "src/model/myTypes";

export const defaultInterval: DateInterval = {
  from: new Date(new Date().getFullYear(), new Date().getMonth(), 1), // get current month initial day
  to: new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0), // get current month final day
};
