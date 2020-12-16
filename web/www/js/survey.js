// document.addEventListener('DOMContentLoaded', function() {
//     var elems = document.querySelectorAll('.modal');
//     var instances = M.Modal.init(elems, options);
//   });

/*
function popupOpen() {
  url = "/survey.html";
  name = "컬러 테스트";
  specs = "width=500, height=500, top=200, left=100, toolbar=no, menubar=no, scrollbars=yes, resizable=no";
  window.open(url, name, specs);
  return false;
}
*/

var popupOpen= function () {
  url = "/survey.html";
  name = "컬러 테스트";
  specs = "width=770, height=700, top=200, left=100, toolbar=no, menubar=no, resizable=no";
  window.open(url, "컬러테스트", specs);
  return false;
}

if (document.getElementById('color_test2')) {
  document.getElementById('color_test2').addEventListener('click', popupOpen)
}

// document.getElementById('color_test').addEventListener('click', popupOpen)
document.getElementById('color_test1').addEventListener('click', popupOpen)