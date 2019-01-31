import hashLocation from './hash-location';

function hashLocationGet(field) {
  const loc = hashLocation();
  const thisField = loc[field];

  if (thisField) {
    return thisField;
  } else {
    console.error('incorrect get location params');
  }
}

export default hashLocationGet;

