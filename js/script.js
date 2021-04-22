const clockSpan = document.getElementById('time');
const dateSpan = document.getElementById('date');
const yearSpan = document.getElementById('year');

showTime = () => {
  clockSpan.innerHTML = `${moment().format('h:mm')}`;
  dateSpan.innerHTML = `${moment().format('DD.MM')}`;
  yearSpan.innerHTML = `${moment().format('YYYY')}`;
};
setInterval(showTime, 1000);

var options = {
  animate: true,
  patternWidth: 100,
  patternHeight: 100,
  grainOpacity: 0.08,
  grainDensity: 1,
  grainWidth: 1,
  grainHeight: 1,
};

//  background animation

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
    //       return anime.random(-1000, 1000);
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
    //       // hide first animated elements
    //       const fadeInBottomInvViewCollection = document.querySelectorAll('.fadein-bottom-inview');
    //       const fadeInBottomInvViewArray = [].slice.call(fadeInBottomInvViewCollection);

    //       fadeInBottomInvViewArray.forEach((element) => {
    //         element.style.opacity = 0;
    //       });
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
        targets: '.fade-in-top',
        easing: 'easeInOutCubic',
        opacity: [0, 1],
        translateY: [20, 0],
        duration: 1000,
        complete: () => {
          fadeInBottomAnimation('.fadein-bottom-inview');
        },
      },
      '-=900'
    )
    .add(
      {
        targets: '.h-portrait',
        easing: 'linear',
        opacity: [0, 1],
        keyframes: [
          { translateY: -20, translateX: -20, duration: 500 },
          { translateY: -40, translateX: 0, duration: 500 },
          { translateY: -20, translateX: 20, duration: 400 },
          { translateY: -1, translateX: -2, duration: 400 },
          { translateY: -9, translateX: -15, duration: 400 },
          { translateY: -15, translateX: 0, duration: 400 },
        ],
      },
      '-=700'
    );
};

loaderAnimation();

// rest of animations

const fadeInBottomAnimation = (elementsClass) => {
  const fadeInBottomCollection = document.querySelectorAll(elementsClass);
  const fadeInBottomArray = [].slice.call(fadeInBottomCollection);

  fadeInBottomArray.forEach((element) => {
    element.style.opacity = 0;

    new Waypoint({
      element: element,
      handler: function () {
        anime({
          targets: element,
          easing: 'easeInOutCubic',
          duration: 1000,
          opacity: [0, 1],
          translateY: [100, 0],
          loop: false,
        });
        this.destroy();
      },
      offset: '75%',
    });
  });
};

const projectsAnimationTrigger = document.querySelector('.projects-timeline');
const projectsContainer = document.querySelector('.project-main-container');

const projectsAnimation = () => {
  projectsAnimationTrigger.style.opacity = 0;
  projectsContainer.style.transform = 'rotate(13deg) translateX(100%) ';

  new Waypoint({
    element: projectsAnimationTrigger,
    handler: function () {
      const tl = anime
        .timeline({
          easing: 'easeInOutCubic',
        })
        .add({
          targets: '.projects-h',
          keyframes: [
            { opacity: 1, duration: 1 },
            { translateY: ['200%', 0], duration: 800 },
          ],
        })
        .add(
          {
            targets: '.project-main-container',
            translateX: 0,
            duration: 1500,
            complete: () => {
              horizontalProjectsScrolling();
            },
          },
          100
        );
      this.destroy();
    },
    offset: '75%',
  });
};

projectsAnimation();

const junorPositionTrigger = document.querySelector('.junior-position-container');

const juniorPositionHeadingsCollection = document.querySelectorAll('.position-h');

const juniorPositionHeadingsArray = [].slice.call(juniorPositionHeadingsCollection);

const juniorPositionAnimation = () => {
  juniorPositionHeadingsArray.forEach((heading) => {
    heading.style.transform = 'translateY(115%)';
  });

  new Waypoint({
    element: junorPositionTrigger,
    handler: function () {
      const tl = anime
        .timeline({
          easing: 'easeInOutCubic',
        })
        .add({
          targets: '.position-h',
          translateY: 0,
          duration: 1000,
          delay: 1000,
        })
        .add({
          targets: '.position-h',
          translateY: 0,
          duration: 1000,
        })
        .add(
          {
            targets: '.position-h-overlay-1',
            easing: 'easeInOutCubic',
            keyframes: [{ translateX: [300, 0], translateY: [200, 0], duration: 1600 }],
          },
          800
        )
        .add(
          {
            targets: '.position-h-overlay-2',
            easing: 'easeInOutCubic',
            keyframes: [{ translateX: [-200, 0], translateY: [200, 0], duration: 1600 }],
          },
          800
        )
        .add(
          {
            targets: '.position-h-overlay-3',
            easing: 'easeInOutCubic',
            keyframes: [{ translateX: [300, 0], translateY: [200, 0], duration: 1600 }],
          },
          800
        )
        .add(
          {
            targets: '.position-p',
            opacity: [0, 1],
            translateY: [100, 0],
          },
          '-=500'
        );
      this.destroy();
    },
    offset: '20%',
  });
};

const horizontalProjectsScrolling = () => {
  let controller = new ScrollMagic.Controller();

  // let tl2 = anime.timeline({ autoplay: false });

  let animation = anime({
    targets: '#conten',
    easing: 'easeInOutCubic',
    translateX: [0, '-100%'],
    duration: 2000,
    delay: 0,
    autoplay: false,
    complete: () => {
      photosTrigger = document.querySelector('.photos-container');
      mediaTrigger = document.querySelector('.media-list');

      groupFadeInBottomAnimation(photosTrigger, '.single-photo');
      groupFadeInBottomAnimation(mediaTrigger, '.media');

      fadeInBottomAnimation('.footer-fadein-bottom');
    },
  });

  let scene = new ScrollMagic.Scene({
    triggerElement: '#section',
    duration: 2000,
    triggerHook: 0,
  })

    .on('progress', function (event) {
      animation.seek(animation.duration * event.progress);
    })

    .setPin('#section')
    .addTo(controller);
};

juniorPositionAnimation();

const groupFadeInBottomAnimation = (trigger, objectsClass) => {
  const objectsHtmlCollection = document.querySelectorAll(objectsClass);
  const objectsHtmlArray = [].slice.call(objectsHtmlCollection);

  objectsHtmlArray.forEach((element) => {
    element.style.opacity = 0;
  });

  new Waypoint({
    element: trigger,
    handler: function () {
      anime({
        targets: objectsClass,
        easing: 'easeInOutCubic',
        opacity: 1,
        translateY: [100, 0],
        delay: anime.stagger(250),
        duration: 800,
      });
      this.destroy();
    },
    offset: '80%',
  });
};

// menu function

const indexElement = document.querySelector('.index-menu');
const menuElement = document.querySelector('.menu');

const openMenu = () => {
  anime({
    targets: '.menu-item',
    easing: 'easeInOutCubic',
    opacity: [0, 1],
    translateX: [20, 0],
    delay: anime.stagger(200),
    begin: () => {
      menuElement.classList.add('open');
      menuElement.style.display = 'block';
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
    complete: () => {
      menuElement.classList.remove('open');
      menuElement.style.display = 'none';
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

// zapasowy kod animacji loadera

// const img1 = document.getElementById('loader-img1');
// const img2 = document.getElementById('loader-img2');
// const img3 = document.getElementById('loader-img3');
// const img4 = document.getElementById('loader-img4');
// const img5 = document.getElementById('loader-img5');
// const img6 = document.getElementById('loader-img6');
// const img7 = document.getElementById('loader-img7');
// const img8 = document.getElementById('loader-img8');
// const img9 = document.getElementById('loader-img9');
// const img10 = document.getElementById('loader-img10');
// const img11 = document.getElementById('loader-img11');

// imgArray1 = [img1, img2, img3, img4];
// imgArray2 = [img5, img6, img7, img8, img9, img10, img11];

// imgArray1.forEach((img) => {
//   img.style.opacity = 0;
// });

// imgArray2.forEach((img) => {
//   img.style.opacity = 0;
// });

// anime({
//   targets: imgArray1,
//   opacity: 1,
//   duration: 1000,
//   delay: anime.stagger(250, { start: 300 }),
//   endDelay: -800,
//   begin: () => {
//     anime({
//       targets: '.counter',
//       value: [1, 100],
//       duration: 4000,
//       easing: 'easeInOutCubic',
//       round: 1,
//     });
//   },
//   complete: () => {
//     anime({
//       targets: imgArray2,
//       opacity: 1,
//       duration: 1000,
//       delay: anime.stagger(250),
//       endDelay: -650,
//       loop: 1,
//       complete: () => {
//         anime({
//           targets: imgArray2,
//           opacity: 0,
//         });
//       },
//     });
//   },
// });
