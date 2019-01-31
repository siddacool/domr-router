const defaultSkipList = ['view'];

function findInArr(arr, itm) {
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] === itm) {
      return true;
    }
  }
}

function cloneObject(obj, skipList = defaultSkipList) {
  const newObj = {};

  Object.keys(obj).forEach((key) => {
    const value = obj[key];
    const skip = findInArr(skipList, key);

    if (!skip) {
      newObj[key] = value;
    }
  });

  return newObj;
}

export default cloneObject;
