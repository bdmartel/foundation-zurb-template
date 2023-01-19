module.exports = function(items) {
  let oddItems = items.filter(function(item, index){
    return index % 2 !== 0;
  });
  let evenItems = items.filter(function(item, index){
    return index % 2 === 0;
  });
  
  return {
    oddItems,
    evenItems
  };
}
