window.onbeforeunload = function () {
  window.scrollTo(0, 0);
};

// date functions

const clockSpan = document.getElementById('time');
const dateSpan = document.getElementById('date');
const yearSpan = document.getElementById('year');

showTime = () => {
  clockSpan.innerHTML = `${moment().format('h:mm')}`;
  dateSpan.innerHTML = `${moment().format('DD.MM')}`;
  yearSpan.innerHTML = `${moment().format('YYYY')}`;
};
setInterval(showTime, 1000);

//  background animation

var options = {
  animate: true,
  patternWidth: 100,
  patternHeight: 100,
  grainOpacity: 0.08,
  grainDensity: 1,
  grainWidth: 1,
  grainHeight: 1,
};

grained('#main-grained', options);
grained('#loader-grained', options);

//scrolling functions

const disableScrolling = () => {
  const x = window.scrollX;
  const y = window.scrollY;
  window.onscroll = function () {
    window.scrollTo(x, y);
  };
};

const enableScrolling = () => {
  window.onscroll = function () {};
};

// LOCOMOTIVESCROLL AND GSAP FUNCTION

const locomotiveAndGsapInitializer = () => {
  if (window.innerWidth >= 768) {
    gsap.registerPlugin(ScrollTrigger);

    let pageContainer = document.querySelector('.main-container');

    const scroller = new LocomotiveScroll({
      el: pageContainer,
      smooth: true,
      multiplier: 0.7,
    });

    scroller.on('scroll', ScrollTrigger.update);

    ScrollTrigger.scrollerProxy(pageContainer, {
      scrollTop(value) {
        return arguments.length ? scroller.scrollTo(value, 0, 0) : scroller.scroll.instance.scroll.y;
      },
      getBoundingClientRect() {
        return {
          left: 0,
          top: 0,
          width: window.innerWidth,
          height: window.innerHeight,
        };
      },
      pinType: pageContainer.style.transform ? 'transform' : 'fixed',
    });

    window.addEventListener('load', (e) => {
      e.preventDefault();
      let pinWrap = document.querySelector('.project-main-container');
      let pinWrapWidth = pinWrap.offsetWidth;
      let horizontalScrollLength = pinWrapWidth / 2;

      // Pinning and horizontal scrolling

      gsap.to('.project-main-container', {
        scrollTrigger: {
          scroller: pageContainer,
          scrub: true,
          trigger: '.projects-section-container',
          pin: true,
          anticipatePin: 1,
          start: 'top top',
          end: pinWrapWidth,
        },
        x: -horizontalScrollLength,
        ease: 'none',
      });

      ScrollTrigger.addEventListener('refresh', () => scroller.update());

      ScrollTrigger.refresh();
    });
  } else {
    const elementsToAnimate = [
      ...document.querySelectorAll(
        '.fadein-bottom-start, .fadein-top-start, .fadein-left-start, .fadein-right-start, .single-photo, .single-media, .project-photo-overlay'
      ),
    ];

    elementsToAnimate.forEach((element) => {
      element.style.opacity = '1';
      element.style.transition = '0s';
      element.style.transform = 'translateY(0)';
      element.style.transform = 'translateX(0)';
    });
  }
};

// loader animation

const loaderAnimation = () => {
  const loaderTl = anime
    .timeline({})
    // .add({
    //   targets: '.loader-img',
    //   opacity: 1,
    //   delay: anime.stagger(250, { start: 300 }),
    //   begin: () => {
    //     anime({
    //       targets: '.counter',
    //       value: [1, 100],
    //       duration: 4000,
    //       easing: 'easeInOutCubic',
    //       round: 1,
    //     });
    //     disableScrolling();
    //   },
    // })
    // .add(
    //   {
    //     targets: '.loader-img',
    //     easing: 'easeInOutCubic',
    //     translateX: function (el, i) {
    //       return anime.random(-3000, 3000);
    //     },
    //     translateY: function (el, i) {
    //       return anime.random(-1000, 1000);
    //     },
    //     rotate: function () {
    //       return anime.random(-360, 360);
    //     },
    //     duration: 2000,
    //     direction: 'alternate',
    //   },
    //   '-=800'
    // )
    // .add(
    //   {
    //     targets: '.loader-content',
    //     easing: 'easeInOutCubic',
    //     opacity: 0,
    //     duration: 1500,
    //   },
    //   '-=900'
    // )
    // .add(
    //   {
    //     targets: '#loader',
    //     easing: 'easeInOutCubic',
    //     opacity: 0,
    //     duration: 1500,
    //     begin: () => {
    //       // // hide first animated elements
    //       // const fadeInBottomInvViewCollection = document.querySelectorAll('.fadein-bottom-inview');
    //       // const fadeInBottomInvViewArray = [].slice.call(fadeInBottomInvViewCollection);
    //       // fadeInBottomInvViewArray.forEach((element) => {
    //       //   element.style.opacity = 0;
    //       // });
    //     },
    //     complete: () => {
    //       enableScrolling();
    //       const loader = document.getElementById('loader');
    //       loader.style.display = 'none';
    //     },
    //   },
    //   '-=700'
    // )
    .add(
      {
        targets: '.h-first-line',
        easing: 'easeInOutCubic',
        translateX: ['-100%', 0],
        duration: 2500,
      },
      '-=1000'
    )
    .add(
      {
        targets: '.h-second-line',
        easing: 'easeInOutCubic',
        translateX: ['120%', 0],
        duration: 2500,
      },
      '-=2500'
    )
    .add(
      {
        targets: '.h-portrait',
        easing: 'easeInOutCubic',
        opacity: [0, 1],
        duration: 700,
        begin: locomotiveAndGsapInitializer(),
        begin: () => {
          anime({
            targets: '.h-portrait',
            easing: 'linear',
            loop: true,
            keyframes: [
              { translateY: 30, translateX: 20, duration: 700 },
              { translateY: 60, translateX: 0, duration: 700 },
              { translateY: 30, translateX: -20, duration: 700 },
              { translateY: 0, translateX: 0, duration: 700 },
            ],
          });
          document.querySelector('.arrow-container img').style.opacity = 0;
        },
        complete: () => {
          anime({
            targets: '.arrow-container img',
            easing: 'linear',
            duration: 1200,
            translateX: [-50, 50],
            loop: true,
            begin: () => {
              document.querySelector('.arrow-container img').style.opacity = 1;
            },
          });
        },
      },
      '-=500'
    );
};

loaderAnimation();

// LOTTIE ANIMATIONS

const svgHireMe = document.querySelector('.hire-svg');
const svgHireMeContainer = document.querySelector('.hire-me-container');

const hireMeAnim = bodymovin.loadAnimation({
  wrapper: svgHireMe,
  animType: 'svg',
  loop: false,
  autoplay: false,
  path: 'https://assets5.lottiefiles.com/packages/lf20_3doegq7p.json',
});

svgHireMeContainer.addEventListener('mouseover', () => {
  const currentFrame = hireMeAnim.currentFrame;
  hireMeAnim.setDirection(1);
  hireMeAnim.goToAndPlay(currentFrame, true);
});

svgHireMeContainer.addEventListener('mouseout', () => {
  const currentFrame = hireMeAnim.currentFrame;
  hireMeAnim.setDirection(-1);
  hireMeAnim.goToAndPlay(currentFrame, true);
});

const svgContactMe = document.querySelector('.contact-svg');
const svgContactMeContainer = document.querySelector('.contact-me-container');

const contactMeAnim = bodymovin.loadAnimation({
  wrapper: svgContactMe,
  animType: 'svg',
  loop: false,
  autoplay: false,
  path: 'https://assets3.lottiefiles.com/packages/lf20_c47tkgvl.json',
});

svgContactMeContainer.addEventListener('mouseover', () => {
  const currentFrame = contactMeAnim.currentFrame;
  contactMeAnim.setDirection(1);
  contactMeAnim.goToAndPlay(currentFrame, true);
});

svgContactMeContainer.addEventListener('mouseout', () => {
  const currentFrame = contactMeAnim.currentFrame;
  contactMeAnim.setDirection(-1);
  contactMeAnim.goToAndPlay(currentFrame, true);
});

// MENU ANIMATIONS

const indexElement = document.querySelector('.index-menu');
const menuElement = document.querySelector('.menu');

const openMenu = () => {
  anime({
    targets: '.menu-item',
    easing: 'easeInOutCubic',
    opacity: [0, 1],
    translateX: [20, 0],
    delay: anime.stagger(200),
    duration: 500,
    begin: () => {
      menuElement.classList.add('open');
      menuElement.style.display = 'block';
    },
    update: () => {
      indexElement.onclick = 'null';
    },
  });
};

const closeMenu = () => {
  anime({
    targets: '.menu-item',
    easing: 'easeInOutCubic',
    opacity: 0,
    translateX: [0, 20],
    delay: anime.stagger(200),
    duration: 500,
    complete: () => {
      menuElement.classList.remove('open');
      menuElement.style.display = 'none';
    },
    update: () => {
      indexElement.onclick = 'null';
    },
  });
};

indexElement.addEventListener('click', () => {
  let isMenuOpen = menuElement.classList.contains('open');

  if (!isMenuOpen) {
    openMenu();
  } else {
    closeMenu();
  }
});

// CURSOR FUNCTIONS
window.addEventListener('resize', () => {
  if (window.innerWidth >= 992) {
    const cursor = document.querySelector('.cursor');
    const cursorAnimItems = [
      ...document.querySelectorAll(
        '.project-photo-overlay, .menu-project-title, .menu-item img, .media-link span, .media-link img , .studio-link span, .studio-link img '
      ),
    ];

    document.addEventListener('mousemove', (e) => {
      cursor.setAttribute('style', 'top: ' + (e.clientY - 4) + 'px; left: ' + (e.clientX - 4) + 'px;');
    });

    cursorAnimItems.forEach((item) => {
      item.addEventListener('mouseenter', () => {
        cursor.classList.add('active');
      });

      item.addEventListener('mouseout', () => {
        cursor.classList.remove('active');
      });
    });

    const menuObject = document.querySelector('.index-menu');
    const menuCursorText = document.querySelector('.menu-cursor-text');

    menuObject.addEventListener('click', () => {
      let isMenuOpen = menuElement.classList.contains('open');
      if (!isMenuOpen) {
        menuCursorText.textContent = 'close';
        console.log(222);
      } else {
        menuCursorText.textContent = 'open';
      }
    });

    menuObject.addEventListener('mouseenter', () => {
      cursor.classList.add('active-menu');
    });

    menuObject.addEventListener('mouseout', () => {
      cursor.classList.remove('active-menu');
    });
  }
});

// rest of animations

// const fadeInBottomAnimation = (elementsClass) => {
//   const fadeInBottomCollection = document.querySelectorAll(elementsClass);
//   const fadeInBottomArray = [].slice.call(fadeInBottomCollection);

//   fadeInBottomArray.forEach((element) => {
//     element.style.opacity = 0;

//     new Waypoint({
//       element: element,
//       handler: function () {
//         anime({
//           targets: element,
//           easing: 'easeInOutCubic',
//           duration: 1000,
//           opacity: [0, 1],
//           translateY: [100, 0],
//           loop: false,
//         });
//         this.destroy();
//       },
//       offset: '75%',
//     });
//   });
// };

// photosTrigger = document.querySelector('.photos-container');
// mediaTrigger = document.querySelector('.media-list');

// let controller = new ScrollMagic.Controller();
// let scene = new ScrollMagic.Scene({
//   triggerElement: '#projects-section-container',
//   duration: 2000,
//   triggerHook: 0,
// })

//   .setPin('#projects-section-container')
//   .addTo(controller);

// const horizontalProjectsScrolling = () => {
//   let animation = anime({
//     targets: '.project-main-container',
//     easing: 'easeInOutCubic',
//     translateX: [0, '-100%'],
//     duration: 2000,
//     delay: 0,
//     autoplay: false,
//     // check is it works without function below
//   });

//   scene.on('progress', function (event) {
//     animation.seek(animation.duration * event.progress);
//   });
// };

// const projectsAnimationTrigger = document.querySelector('.projects-timeline');
// const projectsContainer = document.querySelector('.project-main-container');

// const projectsAnimation = () => {
//   projectsAnimationTrigger.style.opacity = 0;
//   projectsContainer.style.transform = 'rotate(13deg) translateX(100%) ';

//   new Waypoint({
//     element: projectsAnimationTrigger,
//     handler: function () {
//       const tl = anime
//         .timeline({
//           easing: 'easeInOutCubic',
//         })
//         .add({
//           targets: '.projects-h',
//           keyframes: [
//             { opacity: 1, duration: 1 },
//             { translateY: ['200%', 0], duration: 800 },
//           ],
//         })
//         .add(
//           {
//             targets: '.project-main-container',
//             translateX: 0,
//             duration: 1500,
//             complete: () => {
//               horizontalProjectsScrolling();
//             },
//           },
//           100
//         );
//       this.destroy();
//     },
//     offset: '75%',
//   });
// };

// projectsAnimation();

// const junorPositionTrigger = document.querySelector('.junior-position-container');

// const juniorPositionHeadingsCollection = document.querySelectorAll('.position-h');

// const juniorPositionHeadingsArray = [].slice.call(juniorPositionHeadingsCollection);

// const juniorPositionAnimation = () => {
//   juniorPositionHeadingsArray.forEach((heading) => {
//     heading.style.transform = 'translateY(115%)';
//   });

//   new Waypoint({
//     element: junorPositionTrigger,
//     handler: function () {
//       const tl = anime
//         .timeline({
//           easing: 'easeInOutCubic',
//         })
//         .add({
//           targets: '.position-h',
//           translateY: 0,
//           duration: 1000,
//         })
//         .add(
//           {
//             targets: '.position-h-overlay-1',
//             easing: 'easeInOutCubic',
//             keyframes: [{ translateX: [300, 0], translateY: [200, 0], duration: 1600 }],
//           },
//           800
//         )
//         .add(
//           {
//             targets: '.position-h-overlay-2',
//             easing: 'easeInOutCubic',
//             keyframes: [{ translateX: [-200, 0], translateY: [200, 0], duration: 1600 }],
//           },
//           800
//         )
//         .add(
//           {
//             targets: '.position-h-overlay-3',
//             easing: 'easeInOutCubic',
//             keyframes: [{ translateX: [300, 0], translateY: [200, 0], duration: 1600 }],
//           },
//           800
//         )
//         .add(
//           {
//             targets: '.position-anim-last',
//             opacity: [0, 1],
//             translateY: [100, 0],
//           },
//           '-=500'
//         );
//       this.destroy();
//     },
//     offset: '80%',
//   });
// };

// juniorPositionAnimation();

// const groupFadeInBottomAnimation = (trigger, objectsClass) => {
//   const objectsHtmlCollection = document.querySelectorAll(objectsClass);
//   const objectsHtmlArray = [].slice.call(objectsHtmlCollection);

//   objectsHtmlArray.forEach((element) => {
//     element.style.opacity = 0;
//   });

//   new Waypoint({
//     element: trigger,
//     handler: function () {
//       anime({
//         targets: objectsClass,
//         easing: 'easeInOutCubic',
//         opacity: 1,
//         translateY: [100, 0],
//         delay: anime.stagger(250),
//         duration: 800,
//       });
//       this.destroy();
//     },
//     offset: '80%',
//   });
// };
