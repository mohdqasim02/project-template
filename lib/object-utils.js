const getOrDefault = function(collection, item, defaultValue) {
  if(item in collection) {
    return collection[item];
  }

  return defaultValue;
};

const groupByKey = function(collection, key) {
  return collection.reduce(function(group, item) {
    const groupKey = item[key];
    group[groupKey] = getOrDefault(group, groupKey, []); 
    group[groupKey].push(item);
    return group;
  }, {});
}

test = [
  {gr1: 2, name:'qas'},
  {gr1: 5, name:'bis'},
  {gr1: 2, name:'ram'},
  {gr1: 6, name: 'gen'},
  {gr1: 2, name: 'gen'},
];

exports.groupByKey = groupByKey;
