$(function(){

    'use strict';
/********************************************************************* */
    // 1 - scroll to elements
    $('nav ul li a').on('click', function(e){
        e.preventDefault();
        $('html, body').animate({
            scrollTop: $('#'+$(this).data('scroll')).offset().top+5
        },700);
    });
    /**************************************************************** */
    //2 - scroll to top
    $('#scrollTop').on('click', function(){
        $('html, body').animate({
            scrollTop: 0
        }, 500);
    });
/************************************************************************** */
    // 3 - add class active
    $('nav .nav-link').on('click', function(){
        $(this).addClass('active').parent().siblings().find('.nav-link').removeClass('active');
    });
/***************************************************************************** */
    //4 - sync active links with main section
    //5 -  $('body').css('paddingTop',$('header').innerHeight());

    // 6 - pop-up
    $('.show').on('click', function(){
        $($(this).data('target')).fadeIn(700);
    });

    $('.pop-up').on('click', function(){
        $(this).fadeOut(500);
    });

    $('.content-pop-up').on('click', function(e){
        e.stopPropagation(); //to not fadeOut when i click on it with #pop-up parent
    });

    $('.close-pop-up').on('click', function(e){
        e.preventDefault();
        $(this).parentsUntil('.pop-up').parent().fadeOut(500);
    });
    /**************************************************************************** */
    //7 - fixed menu
    $('#fixed-menu .icon').on('click',function(){
        $('#fixed-menu').toggleClass('unvisiable-menu');
        if($('#fixed-menu').hasClass('unvisiable-menu')){
            $('#fixed-menu').animate({
                left: -$('#fixed-menu').innerWidth()
            }, 500);

            $('body').animate({
                paddingLeft: 0
            },500);
            
        }else{
            $('#fixed-menu').animate({
                left: 0
            }, 500);

                $('body').animate({ 
                    //body not html as html contain the white space body made it
                    paddingLeft: $('#fixed-menu').innerWidth()
                },500);
            
        }
    });
    /********************************************************************************* */
    // 8 - gallary

    //for a dynamic width
    var marginBetweenThumbnails = '.5',
        numberOfThumbnails = $('.gallary .thumbnails').children().length,
        totalMarginBetweenThumbnails = marginBetweenThumbnails * (numberOfThumbnails - 1),
        // length -1 ==> because the last thumbanil i won't it has margin right
        widthOfThumbnail = (100 - totalMarginBetweenThumbnails) / numberOfThumbnails;

    $('#services .gallary .thumbnails img').css({
        width: widthOfThumbnail + '%',
        marginRight: marginBetweenThumbnails + '%'
    });

    // for selected class
    $('.gallary .thumbnails img').on('click', function(){
        $(this).addClass('selected').siblings().removeClass('selected');
        $('.gallary .main-img img').attr('src', $(this).attr('src'));
    });

    //for traversing with chevrons icons 
    $('.gallary .main-img .fa-chevron-circle-left').on('click', function(){
        if($('.gallary .thumbnails img.selected').is(':first-child')){
            $('.thumbnails img:last').click();
        }else{
        $('.gallary .thumbnails img.selected').prev().click();
        }
    });

    $('.gallary .main-img .fa-chevron-circle-right').on('click', function(){
        if($('.gallary .thumbnails img.selected').is(':last-child')){
            $('.thumbnails img:first').click();
        }else{
            $('.thumbnails img.selected').next().click();
        }
    });
    /**************************************************************************** */
    // 9 - form

      //a - hide-show palceholder
    var placeholderContent = '';
    $('[placeholder]').focus(function(){
        placeholderContent = $(this).attr('placeholder');
        $(this).attr('placeholder','');
    }).blur(function(){
        $(this).attr('placeholder',placeholderContent);
    });
    /************************************* */
    // b - validation error massage on required inputs
    $('[required]').blur(function(){
        if($(this).val('')){
            $(this).siblings('span.required').fadeIn().delay(2000).fadeOut();
        }
    });
    /************************************* */
    // c - asterisks on required
    $("<span class='asterisk'>*</span>").insertBefore(':input[required]');
    $('.asterisk').each(function(){
        $(this).css({
            'position': 'absolute',
            'top': '40%',
            'left':$(this).siblings('input').outerWidth(true) - 15,
            'display': 'inline-block'
        });
    });
    /*************************************** */
    // d - input file upload 
    $('#contact form .custom-file input[type="file"]').change(function(){
        $(this).siblings('span').text($(this).val()).css('opacity', 1);
    });
    /*************************************** */
    // e - unicode key
    $('form .funny input').on('keyup', function(e){
        var keyboardKey = e.keycode || e.which;
        $(this).siblings('span').text(keyboardKey).css('opacity', 1);
    });
    /********************************************** */
    // f - auto direction depends on the language
    /*
        the unicode != the amirecan standard code
        - unicode == the keyboard key itself, not depends on the language. [ with { e.keyCode || e.which} ]
        - standard amirecan code depends on the language itself [ with { charCodeAt() } ]
     */
    $('input[type="text"]').on('keyup', function(){
        if($(this).val().charCodeAt(0) < 200){
            // < 200 ==> as the english letters less than 200 in standard amirecan code
            $(this).css('direction','ltr');
        }else{
            $(this).css('direction','rtl');
        }
    });
    /********************************************* */
    // g - add input tags
    $('form input.add-tag').on('keyup', function(e){
        var keyboardKey = e.keycode || e.which,
            tagValue = $(this).val().slice(0, -1);
        if(keyboardKey === 188){ // 188 == ,
            $('form .tags').append('<span class="added-tag"><i class="fa fa-times"></i>'+tagValue +'</span>');
            $(this).val('');
        }
    });
    // for remove the tag
    /* 
        i made this (parent).on(e, element i wnat, function){} 
        as i would treate with a future element i created it with dom
    */
    $('form .tags').on('click','i.fa-times', function(e){
        $(this).parent('.added-tag').fadeOut();
    });
    /********************************************** */
    // h - e-mail suggestion

    var emailList = ['@gmail.com', '@yahoo.com', '@hotmail.com'],
        fullEmail = '';
    $('form .email-suggest').on('keyup', function(){
        fullEmail = ''; //for reset the string and contain the new letter only, when looping it

        if(! $(this).next().is($('.suggest-box')) ){
            //the condition to not make ul every keyup and check if it has
            $('<ul class="suggest-box"></ul>').insertAfter($(this));
        }

        for(var i = 0; i <= emailList.length; i++){
            //to make all li has the full email with the different emails
            fullEmail += '<li>'+$(this).val()+emailList[i]+'</li>';
        }

        // put the li with their contents in the ul as a html not a text
        $('.suggest-box').html(fullEmail);

    });

    //to choose the email that i want then remove the ul from the dom
    $('form').on('click', '.suggest-box li', function(){
        $('form .email-suggest').val($(this).text());
        $(this).parent('.suggest-box').remove();
    });
    //task ==> when you edit the email i don't need to repeat the email list again in the li and the input value 

    /******************************************************************************** */
    //  10 - animate with js [bounce effect]//
    function bounceEffect(element, duration, distance, times){
        
        $(element).css('position', 'relative');

        for(var i=0; i<times; i=i+1){

            $(element).animate({
                top:'-=' + distance
            },duration).animate({
                top: '+=' + distance
            },duration);
        }
    }

    $('.bounce').on('click', function(){
        bounceEffect($(this),400, 20, 4);
    });
    /************************************************************* */
    // 11 - shuffel cards
    var zIndex = 0; 
    //it's a global out of the function to save his last value and not to rebeat his values (to complete count on his last value and compelete count)

    $('.shuffel-cards .card').on('click', function(){
        $(this).animate({
            left: -250,
            top: 75
        },400, function(){
            zIndex--;
            $(this).css('z-index', zIndex);
        }).animate({
            left: 0,
            top: 0 
        }, 400);
    });
    /****************************************************** */
    // 12 - recursion in js [infinity function or to the condition]
    /************************************************************** */
    // 13 - toggle classes
    /*
        $('i').on('click', function(){
            //you can switch between classes in one line code by toggleClass 
            //if the first(fa-plus) exist the second(fa-minus) remove and reverse is true 

            $(this).toggleClass('fa-plus fa-minus').next('p').slideToggle();
        });
    */
    /******************************************************* */
    // 14 - todo-list
    //add task
    var addedTask = $('.adding-task');
    $('form.new-task').on('submit', function(e){
        e.preventDefault();
        if(addedTask.val() !=''){
            $('<li class="task">'+ addedTask.val() +'</li>').appendTo('.tasks');
            addedTask.val('');
        }
    });
    //remove task
    $('.tasks').on('dblclick', 'li.task', function(){
        $(this).css('text-decoration', 'line-through').delay(500).fadeOut(1000, function(){
        $(this).remove();
        });
    });
    //edit task
    $('.tasks').on('click', 'li.task', function(){
    // var lastValue = $(this).text();
        addedTask.val($(this).text());
        $(this).fadeOut(500);
        $(this).text(addedTask.val());
    });
    /******************************************************* */
    // 15 - auto-change-notes (self invoke function())
    (function autoChange(){
        $('.notes li.actived').each(function(){
            if(! $(this).is(':last-child')){ //if not last-child
                $(this).delay(1500).fadeOut(500, function(){
                    $(this).removeClass('actived').next().addClass('actived').fadeIn();
                    autoChange(); //recursive
                });
            }else{
                $(this).delay(1500).fadeOut(500, function(){
                    $(this).removeClass('actived').siblings(':first-child').addClass('actived').fadeIn();
                    autoChange();
                });
            }
        });
    }());
    /********************************************************* */
    // 16 - type writer
    var dataWrite = $('.auto-writer').data('write'),
        count = 0;
        //setInterval() ==> to repeat the function and loop until the clearInterval()
        //[count] ==> to iterate letter by letter from [0] to [dataWrite.length] by count+=1 until the clearInterval()

    var typeWriter = setInterval(function(){
        $('.auto-writer').each(function(){
            $(this).text($(this).text() + dataWrite[count]);
        });

        count += 1;

        if(count >= dataWrite.length){
            clearInterval(typeWriter);
        }
    }, 100);
    /********************************************************** */
    // 17 - dynamic tabs
    $('#about .dynamic-tabs li').on('click', function(){
        $(this).addClass('chosen').siblings().removeClass('chosen');
        $($(this).data('content')).fadeIn(1).siblings().hide();
    });
    /************************************************************ */
    // 18 - total price
    var totalPrice = 0;
    $('footer table tr td.price').each(function(){
        if($(this).text()!=isNaN){
            totalPrice += parseInt($(this).text());
            $('.total-price').text(totalPrice);
        }
    });
    /******************************************************************************** */
           // actions on scroll //    
        $(window).on('scroll', function(){

            //scroll to top (2)
            if($(window).scrollTop() >= 1000){
                if($('#scrollTop').is(':hidden')){ /*hidden to not check everytime if win>1000*/
                    $('#scrollTop').fadeIn(500);
                }
            }else{
                $('#scrollTop').fadeOut(500);
            }
            /*********************************************************** */
            // 4 - sync links(4)
            // $('.main').each(function(){
            //     var mainId = $(this).attr('id');
            //     if($(window).scrollTop() >= $(this).offset().top){
            //         console.log(mainId);
            //         // $('nav a').removeClass('active');
            //         $("nav a.nav-link[data-scroll="+mainId+"]").addClass('active').parent().siblings().find('.nav-link').removeClass('active');
            //     }
            // });
            /***************************************************************** */

    });
});