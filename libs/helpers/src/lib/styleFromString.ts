import { hashString } from "./hashString";

// prettier-ignore
const colors = [
    '#66994D', '#CC9999', '#99E6E6', '#CCFF1A',
    '#E6331A', '#FFFF99', '#E6FF80', '#FF33FF',
    '#FF3380', '#4D8066', '#809980', '#E666B3',
    '#FF6633', '#FFB399', '#6666FF', '#E64D66',
    '#33991A', '#999933', '#4D8000', '#B3B31A',
    '#3366E6', '#1AFF33', '#33FFCC', '#00B3E6',
    '#FF99E6', '#66E64D', '#999966', '#B34D4D',
    '#99FF99', '#CC80CC', '#66664D', '#E666FF',
    '#B33300', '#80B300', '#CCCC00', '#E6B3B3',
    '#1AB399', '#991AFF', '#4DB380', '#FF4D4D',
    '#B366CC', '#4DB3FF', '#FF1A66', '#9900B3',
    '#00E680', '#66991A', '#809900', '#6680B3',
    '#E6B333', '#4D80CC'
];

export const styleFromString = (str: string) => {
  const hash = hashString(str);

  return {
    color: colors[hash % colors.length],
    bold: hash % 8 === 0,
    italic: hash % 6 === 0,
  };
};
