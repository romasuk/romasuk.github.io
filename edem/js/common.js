(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
'use strict';
/* ===========================
  #SWIPER
============================= */

/*import Swiper, { Navigation, Pagination } from 'swiper';
Swiper.use([Navigation, Pagination])
let mySwiper = new Swiper('.swiper-container', {
  // Optional parameters
  direction: 'horizontal',
  loop: true,

  // Navigation arrows
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },

})*/

/* ===========================
  #SMOTH SCROLL
============================= */
// import '../../node_modules/smoothscroll-for-websites/SmoothScroll.js';;

window.addEventListener("load", function () {
  document.body.classList.add('page-load');
  var screenW = document.documentElement.clientWidth,
      pageHeader = document.querySelector('.page__header'),
      dropMenu = document.querySelector('.drop-content'),
      topOffset = 0;
  /* ===========================
    #POLYFILLS
  ============================= */

  /* ===========================
    #CLOSE PRESENT
  ============================= */

  /*let present = document.querySelector('.present');
  
  if(present) {
    
    present.onclick = function(e) {
      if(e.target.closest('.present__close-btn')) {
        this.classList.remove('is-visible');
  
        topOffset -= present.offsetHeight;
        
        pageHeader.style.top           = `0px`;
        document.body.style.paddingTop = `${topOffset}px`;
  
        if(innerWidth < 1100) {
          dropMenu.style.paddingTop = `${topOffset}px`;
        }
  
        setTimeout(()=> {
          present.remove();
          present = null;
        }, 1000);
      }
    }
  
  }*/

  /* ===========================
    #ADD TOP OFFSET
  ============================= */

  /*let timer = setTimeout(function isLoad() {
  
    if(document.body.classList.contains('page-load')) {
  
      if(present) {
        present.classList.add('is-visible');
        topOffset += present.offsetHeight;
  
        pageHeader.style.top = `${present.offsetHeight}px`;
      }
  
      topOffset += pageHeader.offsetHeight;
      document.body.style.paddingTop = `${topOffset}px`;
  
      if(window.innerWidth < 1100) {
        dropMenu.style.paddingTop = `${topOffset}px`;
      }
  
  
      window.addEventListener('resize', function(e) {
  
          if(innerWidth >= 1100) dropMenu.style.paddingTop = '';
  
          let currentOffset = pageHeader.offsetHeight;
  
  
          if(present) {
            currentOffset += present.offsetHeight;
            pageHeader.style.top = `${present.offsetHeight}px`;
          }
  
          if(topOffset === currentOffset) return;
  
          topOffset = currentOffset;
  
          document.body.style.paddingTop = `${topOffset}px`;
  
          if(innerWidth < 1100) {
            dropMenu.style.paddingTop = `${topOffset}px`;
          } 
  
      })  
  
      timer = null;
    } else {
      setTimeout(isLoad, 1000);
    }
  }, 1000);*/

  /* ===========================
    #SCROLL  ON/OFF
  ============================= */

  var getFixed = function getFixed() {
    var all = document.body.querySelectorAll('*');
    return Array.from(all).filter(function (elem) {
      var bool = getComputedStyle(elem).position === 'fixed';
      return bool;
    });
  };

  var fixedElements = getFixed();

  var scrollOn = function scrollOn() {
    setTimeout(function () {
      document.body.classList.remove('scroll-off');
      document.body.style.paddingRight = '';
      fixedElements.forEach(function (elem) {
        elem.style.paddingRight = "";
      });
    }, 300);
  };

  var scrollOf = function scrollOf() {
    document.body.classList.add('scroll-off');
    document.body.style.paddingRight = "".concat(scrollW, "px");
    fixedElements.forEach(function (elem) {
      elem.style.paddingRight = "".concat(scrollW, "px");
    });
  };
  /* ===========================
    #BURGER / DROP MENU
  ============================= */


  var burger = document.querySelector('.burger'),
      menuOverlay = document.createElement('div'),
      scrollW = window.innerWidth - document.documentElement.clientWidth; //Обробляе навігацію через клавішу ТАВ

  document.addEventListener('keyup', function (e) {
    if (!document.activeElement.closest('.drop-content')) {
      // Фокус покинув останній елемент і преходить знов на burger
      if (e.code === 'Tab' && dropMenu.classList.contains('is-visible')) {
        burger.focus();
      }
    }
  });
  window.addEventListener('resize', function (e) {
    if (innerWidth >= 1100 && burger.classList.contains('is-active')) {
      menuOverlay.classList.remove('is-visible');
      burger.classList.toggle('is-active');
      dropMenu.classList.toggle('is-visible');
      scrollOn();
      setTimeout(function () {
        e.preventDefault();
        menuOverlay.remove();
      }, 500);
    }
  });
  burger.addEventListener('click', function (e) {
    scrollW = window.innerWidth - document.documentElement.clientWidth;
    burger.classList.toggle('is-active');
    dropMenu.classList.toggle('is-visible');

    if (dropMenu.classList.contains('is-visible')) {
      // Додаю overlay
      dropMenu.after(menuOverlay);
      menuOverlay.classList.add('overlay');
      menuOverlay.classList.add('is-visible'); // Виключаю скролл

      scrollOf();
    } else {
      //Удаляю overlay
      menuOverlay.classList.remove('is-visible'); // Включаю скролл

      scrollOn();
      setTimeout(function () {
        e.preventDefault();
        menuOverlay.remove();
      }, 500);
    }
  });
  /* ===========================
    #MODAL
  ============================= */

  /* ===========================
    #MEDIA JUMPERS
  ============================= */
  // ***
  //* Пригаючому иелементу присвоїти атрибут data-jump та data-jump-to
  //* В data-jump-to записати строку: 
  //* "newParentElementSelector.js-jump afterELementPosition mediaScreenWidth"
  //* newParentElementSelector.js-jump  - батьківський селектор + .js-jump
  //* afterELementPosition - після якого елемента вставляти 
  //* mediaScreenWidth - при якому розширенні переставляти
  //* 
  // ***

  var arr = document.querySelectorAll('[data-jump]');
  var jumpers = Array.from(arr).map(function (elem) {
    var param = elem.dataset.jumpTo.split(' '); // If in data-jump-to element position <= 0 showed alert(); 

    if (+param[1] < 0 || param[1] === '') {
      alert("Error: bad value in data-jump-to: \"... ".concat(+param[1], " ...\""));
      return;
    }

    return {
      el: elem,
      realParent: elem.parentElement,
      realPrevElem: elem.previousElementSibling,
      newParent: document.querySelector(param[0]),
      newPos: +param[1],
      screen: +param[2]
    };
  });

  function jump() {
    screenW = window.innerWidth;
    jumpers.forEach(function (jumper) {
      if (screenW >= jumper.screen && jumper.el.dataset.jump) {
        // Обробляє прижок в початковий елемент 
        if (!jumper.realPrevElem) {
          jumper.realParent.prepend(jumper.el);
        } else {
          jumper.realPrevElem.after(jumper.el);
        }

        jumper.el.dataset.jump = '';
      }

      if (screenW < jumper.screen && !jumper.el.dataset.jump) {
        // Обробляє прижок в новий елемент
        if (!jumper.newParent.childElementCount) {
          jumper.newParent.append(jumper.el);
        } else if (jumper.newParent.childElementCount < jumper.newPos) {
          jumper.newParent.append(jumper.el);
        } else {
          if (jumper.newPos === 0) {
            jumper.newParent.prepend(jumper.el);
          } else {
            // [jumper.newPos -1] зміщую на одиницю. JS рахує починаючи з 0.
            jumper.newParent.children[jumper.newPos - 1].after(jumper.el);
          }
        }

        jumper.el.dataset.jump = 'moved';
      }
    });
  }

  jump();
  window.addEventListener('resize', function (e) {
    // Якщо змінюється висота екрана тоді перериваєм виконання функції
    if (window.innerWidth === screenW) return;
    jump();
  });
  /* ===========================
     #SVG DRAWIND LINE
   ============================= */

  {
    var lineInit = function lineInit(elem) {
      if (!elem) {
        // alert('Sory Mickle, from svg drawing line');
        return;
      }

      var list = document.querySelector('.steps__list'),
          itemsArr = document.querySelectorAll('.steps__item'),
          drawArea = document.querySelector('.steps__svg-wrap'),
          pathElem = document.querySelector('.svg__line'),
          circleElem = document.querySelector('.svg__circle'),
          itemsInRow,
          vIndent,
          hIndent = 10,
          lineStartPos = "M 5 0";

      function draw() {
        elem.setAttribute('viewBox', "0 0 ".concat(elem.parentElement.offsetWidth, " ").concat(elem.parentElement.offsetHeight));
        pathElem.removeAttribute('stroke-dasharray');
        pathElem.removeAttribute('stroke-dashoffset');
        itemsInRow = Math.round(list.offsetWidth / itemsArr[0].offsetWidth), vIndent = parseInt(getComputedStyle(itemsArr[0]).marginBottom);
        circleElem.setAttribute('cx', '5');
        circleElem.setAttribute('cy', '3');
        var str = '';
        str += "".concat(lineStartPos, " v").concat(itemsArr[0].offsetHeight - vIndent / 2);
        var tmpCount = itemsInRow;
        var rowLength = 0;
        itemsArr.forEach(function (item, i, arr) {
          if (i < arr.length - 1) {
            if (i + 1 === tmpCount) {
              // обробляє останній елемент ряду
              rowLength += item.offsetWidth - hIndent;
              str += " h".concat(rowLength, " v ").concat(vIndent);
              str += " h".concat(-rowLength, " v").concat(arr[i + 1].offsetHeight);
              rowLength = 0;
              tmpCount += itemsInRow;
            } else {
              // оброб. елемент
              rowLength += item.offsetWidth;
            }
          } else {
            // одробляе останній елемент в списку
            rowLength += item.offsetWidth - hIndent * 2;
            str += " h".concat(rowLength);
          }
        });
        pathElem.setAttribute('d', str);
      }

      ;

      var animate = function animate() {
        if (list.classList.contains('is-visible')) return;
        var pos = elem.getBoundingClientRect().top;
        pathElem.setAttribute('stroke-dasharray', pathElem.getTotalLength());
        pathElem.setAttribute('stroke-dashoffset', pathElem.getTotalLength());

        if (pos < document.documentElement.clientHeight / 2) {
          var lineAnimate = document.getElementById('line-animate'),
              circleAnimate = document.getElementById('circle-animate');
          circleAnimate.beginElement();
          list.classList.add('is-visible');
        }

        var timeInterval = parseInt(document.getElementById('line-animate').getAttribute('dur')) / itemsArr.length;
        document.querySelectorAll('.steps__item').forEach(function (item, index) {
          var delay = index * timeInterval;
          item.style.transitionDelay = "".concat(delay + .5, "s");
        });
      };

      draw();
      animate();
      window.addEventListener('resize', function (e) {
        draw();
      });
      window.addEventListener('scroll', function (e) {
        animate();
      });
    };

    lineInit(document.querySelector('.svg'));
  }
});

},{}]},{},[1])

