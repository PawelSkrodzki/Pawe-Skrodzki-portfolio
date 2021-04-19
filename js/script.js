alert('123');

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

// loader animation

const loaderAnimation = () => {
  const loaderTl = anime
    .timeline({})
    .add({
      targets: '.loader-img',
      opacity: 1,
      delay: anime.stagger(250, { start: 300 }),
      begin: () => {
        anime({
          targets: '.counter',
          value: [1, 100],
          duration: 4000,
          easing: 'easeInOutCubic',
          round: 1,
        });
      },
    })
    .add(
      {
        targets: '.loader-content',
        easing: 'easeInOutCubic',
        opacity: 0,
        duration: 1500,
      },
      '-=900'
    )
    .add(
      {
        targets: '#loader',
        easing: 'easeInOutCubic',
        opacity: 0,
        duration: 1500,
        complete: () => {
          const loader = document.getElementById('loader');
          loader.style.display = 'none';
        },
      },
      '-=700'
    )
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
