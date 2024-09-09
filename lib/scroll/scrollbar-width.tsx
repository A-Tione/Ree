// let cachedScrollbarWidth: number | null = null;
// let cachedDevicePixelRatio: number | null = null;

// window.addEventListener('resize', () => {
//   if (cachedDevicePixelRatio !== window.devicePixelRatio) {
//     cachedDevicePixelRatio = window.devicePixelRatio;
//     cachedScrollbarWidth = null;
//   }
// });

// export default function scrollbarWidth() {
//   if (cachedScrollbarWidth === null) {
//     if (typeof document === 'undefined') {
//       cachedScrollbarWidth = 0;
//       return cachedScrollbarWidth;
//     }

//     const body = document.body;
//     const div = document.createElement('div');

//     div.classList.add('ree-scroll-hide-scrollbar');

//     body.appendChild(div);

//     const width = div.getBoundingClientRect().right;

//     // body.removeChild(div);

//     cachedScrollbarWidth = width;
//   }
//   return cachedScrollbarWidth;
// }

export default function cachedScrollbarWidth() {

  const div = document.createElement('div');

  div.style.position = 'absolute';
  div.style.top = div.style.left = '-9999px'; // 把 div 放到屏幕之外，防止影响用户
  div.style.width = div.style.height = '100px';
  div.style.overflow = 'scroll';

  document.body.appendChild(div);

  const width = div.offsetWidth - div.clientWidth;
  console.log(width, 'width');
  document.body.removeChild(div);

  return width;
}