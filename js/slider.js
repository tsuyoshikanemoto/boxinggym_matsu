//Topへボタン
window.addEventListener('scroll',function(){
  const button= this.document.querySelector('.moveToTop')
  if(this.window.scrollY >= 300){
    button.style.display ='block'
  }else{
    button.style.display ='none'
  }
});
const button = this.document.querySelector('.moveToTop');
button.addEventListener('click',function(){
window.scrollTo({
top:0,
left:0,
behavior:'smooth'
}
)
});

$(function(){
  $('.course-item').on('inview',function(){
$('.course-item').addClass('fadeIn');
  });
});


// ハンバーガーメニュー
$('#menuButton').on('click',function(){
  $(this).toggleClass('active');
  $('#nav').toggleClass('active');
  $('#mask').toggleClass('active');
  $('.click-tab').toggleClass('active');
  return false ;
});

$('#mask').on('click',function(){
  $('#menuButton').removeClass('active');
  $('#nav').removeClass('active');
  $(this).removeClass('active');
});


$('.scroll').on('click',function(){
  let id=$(this).attr('href')
  let position =$(id).offset().top;
  $('html,body').animate({'scrollTop':position},500);

  $('#menuButton').toggleClass('active');
  $('#nav').toggleClass('active');
  $('#mask').toggleClass('active');

})

$('.page-top').on('click',function(){
  $('html,body').animate({'scrollTop':0},300);

})



// スライダー
$('.slider').slick({
dots:true ,
slidesToShow:1,
centerMode:true,
autoplay:true,
autoplaySpeed:5000
});


