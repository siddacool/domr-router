import hashLocationSet from './hash-location-set';
import hashLocationGet from './hash-location-get';

function loc() {
  const originalHash = location.hash;
  let path = originalHash;
  let search = '';
  let query = '';

  if (path.includes('?')) {
    const searchQuery = path.split('?');
    path = searchQuery[0];
    search = searchQuery[1].replace(/\//g, '');

    if (search !== '') {
      const obj = {};
      const filterString = search.split('&');

      for (let i = 0; i < filterString.length; i++) {
        const splitString = filterString[i].split('=');
        const field = splitString[0];
        const value = splitString[1];

        obj[field] = value;
      }
      query = obj;
    }
  }

  if (path.endsWith('/') && !path.endsWith('#/')) {
    const pathSlice = path.slice(0, -1);

    path = pathSlice.replace('#', '');
  } else {
    path = path.replace('#', '');
  }

  return {
    hash: originalHash.replace('#', ''),
    path,
    search,
    query,
    set: hashLocationSet,
    get: hashLocationGet,
  };
}

const hashLocation = loc;

export default hashLocation;
