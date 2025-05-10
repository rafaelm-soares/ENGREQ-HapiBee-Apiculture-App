import { merge } from "lodash";

//Convert object from {"01-01-2022": "something"} to {"day": "01-01-2022", "value": "something"}
export function handleOneArea(data: { [key: string]: number }) {
  let chartData: Array<{ day: string; value: number }> = [];

  Object.keys(data).forEach((day) => {
    chartData.push({
      day: day,
      value: data[day],
    });
  });
  return chartData;
};

//Convert object from {"01-01-2022": {"subKey1": "something1", "subKey2": "something2"}} to {"day": "01-01-2022", "value1": "something1", "value2": "something2"}
export function handleTwoAreasFromOneObject(data: { [key: string]: { subKey1: string, subKey2: string } }) {
  let chartData: Array<{ day: string; value: string; value2: string }> = []

  Object.keys(data).forEach((day) => {
    chartData.push({
      day: day,
      value: data[day].subKey1,
      value2: data[day].subKey2,
    });
  });
  return chartData;
};

//Convert 2 equal objects from {"01-01-2022": "something"} to {"day": "01-01-2022", "value": "something", "value2": "something"}
export function handleTwoAreasFromTwoObjects(data: { [key: string]: number }, data2: { [key: string]: number }) {
  let chartData: Array<{ day: string; value: number; value2: number }> = [];
  let mergedData = merge({ ...data, ...data2 });
  Object.keys(mergedData).forEach((day) => {
    chartData.push({
      day: day,
      value: data[day],
      value2: data2[day],
    });
  });
  return chartData;
};

//Convert object from {1: {"subKey1": "something1", "subKey2": "something2", "subKey3": "something3", "subKey4": "something4"}} to {"date": "01-01-2022", "value": "something1", "event": "something2"}
export function handleOneAreaScatter(data: { [key: string]: { subKey1: string, subKey2: string | number, subKey3: string } }) {
  let chartData: Array<{ day: string; value: number; event: string }> = []

  Object.keys(data).forEach((day) => {
    chartData.push({
      day: String(data[day].subKey1),
      value: Number(data[day].subKey2),
      event: String(data[day].subKey3),
    });
  });

  return chartData;
};