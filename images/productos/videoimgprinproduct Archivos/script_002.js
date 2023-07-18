/*$(document).ready(function(){
  $('#modalPop').show();
  document.body.style.overflowY = 'hidden';
})*/
$('.modal-content__close').click(function (e) {
  e.preventDefault();
  $(this).closest('.modalnew').hide();
  document.body.style.overflowY = 'visible';
});
