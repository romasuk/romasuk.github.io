(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
'use strict';

var html = document.documentElement;
window.addEventListener("load", function () {
  document.body.classList.add('page-load');
  var screenW = html.clientWidth,
      pageHeader = document.querySelector('.page__header'),
      dropMenu = document.querySelector('.drop-content'),
      topOffset = 0;
  /* ===========================
    #SWIPER
  ============================= */

  if (document.querySelector('.swiper-container')) {
    var gallerySlider = new Swiper('.gallery-slider .swiper-container', {
      // Optional parameters
      direction: 'horizontal',
      loop: true,
      // Navigation arrows
      navigation: {
        nextEl: '.gallery-slider .swiper-button-next',
        prevEl: '.gallery-slider .swiper-button-prev'
      }
    });
    var teamSlider = new Swiper('.our-team-slider .swiper-container', {
      direction: 'horizontal',
      loop: true,
      slidesPerView: 3,
      breakpoints: {
        // when window width is >= 900px
        900: {
          slidesPerView: 5,
          spaceBetween: 45
        }
      },
      pagination: {
        el: '.our-team-slider .swiper-pagination',
        type: 'custom',
        renderCustom: function renderCustom(swiper, current, total) {
          if (current < 10) {
            current = "0".concat(current);
          }

          if (total < 10) {
            total = "0".concat(total);
          }

          return "<span class=\"swiper-pagination-current\">".concat(current, "</span> &mdash; <span class=\"swiper-pagination-total\">").concat(total, "</span>");
        }
      },
      navigation: {
        nextEl: '.our-team-slider .swiper-button-next',
        prevEl: '.our-team-slider .swiper-button-prev'
      }
    });
    var blogPreviewsSlider = new Swiper('.main-page__blog .swiper-container', {
      slidesPerView: 'auto',
      freeMode: true
    });
    var cardSlider = new Swiper('.card-slider .swiper-container', {
      slidesPerView: 1,
      loop: true,
      pagination: {
        el: '.card-slider .swiper-pagination',
        type: 'custom',
        renderCustom: function renderCustom(swiper, current, total) {
          if (current < 10) {
            current = "0".concat(current);
          }

          if (total < 10) {
            total = "0".concat(total);
          }

          return "<span class=\"swiper-pagination-current\">".concat(current, "</span> &mdash; <span class=\"swiper-pagination-total\">").concat(total, "</span>");
        }
      },
      navigation: {
        nextEl: '.card-slider .swiper-button-next',
        prevEl: '.card-slider .swiper-button-prev'
      }
    });
    var articleSlider = new Swiper('.article-slider .swiper-container', {
      direction: 'horizontal',
      loop: true,
      slidesPerView: 1,
      pagination: {
        el: '.article-slider .swiper-pagination',
        type: 'custom',
        renderCustom: function renderCustom(swiper, current, total) {
          if (current < 10) {
            current = "0".concat(current);
          }

          if (total < 10) {
            total = "0".concat(total);
          }

          return "<span class=\"swiper-pagination-current\">".concat(current, "</span> &mdash; <span class=\"swiper-pagination-total\">").concat(total, "</span>");
        }
      },
      navigation: {
        nextEl: '.article-slider .swiper-button-next',
        prevEl: '.article-slider .swiper-button-prev'
      }
    });
    var filterSlider = new Swiper('.filter__slider .swiper-container', {
      slidesPerView: 'auto',
      spaceBetween: 20
    });
    var reportSlider = new Swiper('.report-slider .swiper-container', {
      slidesPerView: 'auto',
      spaceBetween: 20,
      breakpoints: {
        900: {
          spaceBetween: 30
        }
      }
    });
    var workTimeSlider = new Swiper('.work-time__slider .swiper-container', {
      slidesPerView: 1,
      navigation: {
        nextEl: '.work-time__slider .swiper-button-next',
        prevEl: '.work-time__slider .swiper-button-prev'
      },
      pagination: {
        el: '.work-time__slider .swiper-pagination',
        type: 'custom',
        renderCustom: function renderCustom(swiper, current, total) {
          if (current < 10) {
            current = "0".concat(current);
          }

          if (total < 10) {
            total = "0".concat(total);
          }

          return "<span class=\"swiper-pagination-current\">".concat(current, "</span> &mdash; <span class=\"swiper-pagination-total\">").concat(total, "</span>");
        }
      },
      breakpoints: {
        600: {
          slidesPerView: 3,
          spaceBetween: 30,
          navigation: false,
          pagination: false
        }
      }
    });
  }
  /* ===========================
    #SMOTH SCROLL
  ============================= */
  // import '../../node_modules/smoothscroll-for-websites/SmoothScroll.js';;

  /* ===========================
  #SERVICE FUNCTION
  ============================= */


  function ifVisible(pos) {
    var bottomLine = html.clientHeight + html.scrollTop;

    if (pos < bottomLine) {
      return true;
    }
  }

  function getCoords(elem) {
    var c = elem.getBoundingClientRect();
    return {
      top: c.top + html.scrollTop,
      left: c.left,
      right: c.right,
      bottom: c.bottom + html.scrollTop
    };
  }
  /* ===========================
    #ANIMATE PROGRESS
  ============================= */


  var progressArr = Array.from(document.querySelectorAll('.progress')).map(function (item) {
    return {
      elem: item,
      pos: getCoords(item),
      meter: item.querySelector('.progress__meter'),
      out: item.querySelector('.progress__out'),
      percent: +item.dataset.doneBy
    };
  });

  var animateProgress = function animateProgress(progress) {
    if (progress.elem.classList.contains('is-visible')) return;
    var count = 0;
    progress.elem.classList.add('is-visible');
    var timerId = setTimeout(function counter() {
      count++;
      progress.meter.style.width = "".concat(count, "%");
      progress.out.innerText = count;

      if (count >= progress.percent) {
        clearTimeout(timerId);
        return;
      }

      setTimeout(counter, 10);
    }, 10);
  };

  progressArr.forEach(function (item) {
    if (ifVisible(item.pos.top)) {
      animateProgress(item);
    }
  });
  window.addEventListener('scroll', function (e) {
    progressArr.forEach(function (item) {
      if (ifVisible(item.pos.top)) {
        animateProgress(item);
      }
    });
  });
  /* ===========================
    #STAGE ANIMATION
  ============================= */

  {
    var scheduleItems = Array.from(document.querySelectorAll('.stage')),
        svg = document.querySelector('.schedule__svg'),
        xmlns = 'http://www.w3.org/2000/svg';

    if (html.clientWidth >= 1260) {
      var createAnimate = function createAnimate(attr, values, dur, begin) {
        var animate = document.createElementNS(xmlns, 'animate');
        animate.setAttribute('attributeName', attr);
        animate.setAttribute('values', values);
        animate.setAttribute('dur', dur);
        animate.setAttribute('begin', begin);
        animate.setAttribute('fill', 'freeze');
        return animate;
      };

      var createPoint = function createPoint(yPos, fill) {
        var point = document.createElementNS(xmlns, 'circle'),
            animate = createAnimate('r', '0;20;10', '.5s', 'indefinite');
        point.setAttributeNS(null, 'cx', '30px');
        point.setAttributeNS(null, 'cy', "".concat(yPos, "px"));
        point.setAttributeNS(null, 'r', 4);
        point.setAttributeNS(null, 'fill', fill);
        point.setAttribute('id', 'circle');
        point.append(animate);
        return {
          c: point,
          a: animate
        };
      };

      var createPath = function createPath(yPos, lineLength) {
        var path = document.createElementNS(xmlns, 'path'),
            animate = createAnimate('d', "M 30 ".concat(yPos, ", v 0; M30 ").concat(yPos, ", v").concat(lineLength), '.5s', 'indefinite');
        path.setAttributeNS(null, 'd', "M 30 ".concat(yPos, ", v0"));
        path.setAttributeNS(null, 'stroke', 'grey');
        path.setAttributeNS(null, 'stroke-width', '.2px');
        path.append(animate);
        return {
          p: path,
          a: animate
        };
      };

      var animateSvg = function animateSvg(elems) {
        elems.forEach(function (item, index, itemsArr) {
          if (item.classList.contains('is-visible')) return;

          if (ifVisible(getCoords(item).top + html.clientHeight / 4)) {
            var m = parseInt(getComputedStyle(item.parentElement).marginBottom),
                pos = getCoords(item).top - getCoords(svg).top + item.offsetHeight / 2,
                point,
                path,
                pathLength;

            if (index === 0) {
              pathLength = getCoords(itemsArr[index + 1]).top + itemsArr[index + 1].offsetHeight / 2 - getCoords(svg).top - item.offsetHeight / 2;
            } else if (index !== itemsArr.length - 1) {
              pathLength = getCoords(itemsArr[index + 1]).top + itemsArr[index + 1].offsetHeight / 2 - getCoords(item).top - item.offsetHeight / 2;
            }

            var getBg = function getBg(item) {
              if (item.classList.contains('stage--complate')) {
                return '#39BFC5';
              } else if (item.classList.contains('stage--process')) {
                return '#FF5722';
              } else {
                return '#FFD0C1';
              }
            };

            point = createPoint(pos, getBg(item));
            path = createPath(pos, pathLength);
            item.classList.add('is-visible');

            if (index === itemsArr.length - 1) {
              svg.append(point.c);
              point.a.beginElement();
            } else {
              svg.append(point.c);
              point.a.beginElement();
              svg.prepend(path.p);
              path.a.beginElement();
            }
          }
        });
      };

      animateSvg(scheduleItems);
      window.addEventListener('scroll', function (e) {
        animateSvg(scheduleItems);
      });
    } else {
      var addVisible = function addVisible(elems) {
        elems.forEach(function (item) {
          if (item.classList.contains('is-visible')) return;

          if (ifVisible(getCoords(item).top + html.clientHeight / 4)) {
            item.classList.add('is-visible');
          }
        });
      };

      addVisible(scheduleItems);
      window.addEventListener('scroll', function (e) {
        addVisible(scheduleItems);
      });
    }
  }
  /* ===========================
    #POLYFILLS
  ============================= */

  /* ===========================
    #FILTER
  ============================= */

  function filter(filter) {
    if (filter) {
      console.log(filter);
    } else {
      console.log(new Error('Filter not found'));
    }
  }

  ;
  filter(document.getElementById('filter'));
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
    #ACCORDION
  ============================= */


  var accordionsContainer = document.querySelector('.accordions'),
      accordionsArr = document.querySelectorAll('.accordion');
  var currentItem = document.querySelector('.accordion.is-open');

  var accordionClose = function accordionClose(item) {
    item.classList.remove('is-open');
    item.querySelector('.accordion__drop').style.height = 0;
  };

  var accordionOpen = function accordionOpen(item) {
    var s = getComputedStyle(item.querySelector('.accordion__txt')),
        h = parseInt(s.height),
        mb = parseInt(s.marginBottom),
        itemDrop = item.querySelector('.accordion__drop');
    item.classList.add('is-open');
    itemDrop.style.height = "".concat(h + mb, "px");
  };

  if (accordionsContainer) {
    accordionsContainer.addEventListener('click', function (e) {
      if (e.target.closest('.accordion__panel')) {
        var accordion = e.target.parentElement;

        if (accordion.classList.contains('accordion')) {
          if (accordion === currentItem) {
            accordionClose(accordion);
            currentItem = null;
            return;
          }

          if (accordion !== currentItem && currentItem !== null) {
            accordionsArr.forEach(function (item) {
              if (item.classList.contains('is-open')) {
                accordionClose(item);
              }
            });
          }

          accordionOpen(accordion);
          currentItem = accordion;
        }
      }
    });
  }
  /* ===========================
    #BURGER / DROP MENU
  ============================= */


  var burger = document.querySelector('.burger'),
      menuOverlay = document.createElement('div'),
      scrollW = window.innerWidth - html.clientWidth; //Обробляе навігацію через клавішу ТАВ

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
    scrollW = window.innerWidth - html.clientWidth;
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
  //* Пригаючому елементу присвоїти атрибут data-jump та data-jump-to
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

        if (pos < html.clientHeight / 2) {
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

