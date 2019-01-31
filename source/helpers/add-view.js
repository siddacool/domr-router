import cloneObject from './clone-object';

function addView(candidate) {
  const view = candidate.view;
  const skiplist = [
    'view',
  ];
  const routeData = cloneObject(candidate, skiplist);

  if (candidate && view) {
    if (typeof view === 'function') {
      view(routeData);
    } else {
      view;
    }
  }
}

export default addView;
