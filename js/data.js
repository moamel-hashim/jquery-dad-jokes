/* exported data */
var data = {
  view: 'home-page',
  favorite: [],
  id: 0
};

const previousDateJSON = localStorage.getItem('AJAX');
if (previousDateJSON !== null) {
  data = JSON.parse(previousDateJSON);
}

window.addEventListener('beforeunload', BeforeUnloadHandler);
function BeforeUnloadHandler(event) {
  data.id = 0;
  const dataJSON = JSON.stringify(data);
  localStorage.setItem('AJAX', dataJSON);
}
