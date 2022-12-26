import $ from 'jquery';
import 'slick-carousel';

export default function swiper () {
  $('.swiper-slide').slick({
    autoplay:true,
    arrows: false
  });

}