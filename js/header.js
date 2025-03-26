$(function(){
    var $navbar = $("#main-navbar");

    function navbarSticky(){
        var screenHeight = $(window).height();
        var scrollPos = $(window).scrollTop();

        if(scrollPos >= screenHeight * 0.3){
            $navbar.addClass("stick");
        } else {
            $navbar.removeClass("stick");
        }
    }

    $(window).on("scroll", navbarSticky);

    navbarSticky();
  });