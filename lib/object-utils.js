const groupByKey = function(collection, key) {
  const group = {};
  for(item of collection) {
    const groupKey = item[key];
    group[groupKey] = (group[groupKey] === undefined) ? [item] : group[groupKey].concat(item);
  }
  return group;
}

test = [
  {gr1: 2, name:'qas'},
  {gr1: 5, name:'bis'},
  {gr1: 2, name:'ram'},
  {gr1: 6, name: 'gen'},
  {gr1: 2, name: 'gen'},
];

exports.groupByKey = groupByKey;
