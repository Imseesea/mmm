// const headerEl = document.querySelector("#header");

// // 페이지에 스크롤 이벤트 추가
// window.addEventListener(
//   "scroll",
//   // _.throttle(함수, 시간)
//   // 스크롤이 300ms마다 한번씩 실행되도록 설정
//   _.throttle(function () {
//     console.log(window.scrollY);
//     // 페이지의 스크롤 위치가 200px보다 크면
//     if (window.scrollY > 200) {
//       //gsap.to(요소, 시간, 옵션);
//       gsap.to(headerEl, 0.6, {
//         opacity: 0,
//         display: "none",
//       });
//     } else {
//       // 페이지의 스크롤 위치가 200px보다 작으면
//       gsap.to(headerEl, 0.6, {
//         opacity: 1,
//         display: "block",
//       });
//     }
//   }, 300)
// );

ScrollTrigger.defaults({
  markers: false,
});

var points = gsap.utils.toArray(".point");
var indicators = gsap.utils.toArray(".indicator");

var height = 100 * points.length;

gsap.set(".indicators", { display: "flex" });

var tl = gsap.timeline({
  duration: points.length,
  scrollTrigger: {
    trigger: ".philosophie",
    start: "top center",
    end: "+=" + height + "%",
    scrub: true,
    id: "points",
  },
});

var pinner = gsap.timeline({
  scrollTrigger: {
    trigger: ".philosophie .scr-tr-wrap",
    start: "top top",
    end: "+=" + height + "%",
    scrub: true,
    pin: ".philosophie .scr-tr-wrap",
    pinSpacing: true,
    id: "pinning",
    markers: false,
  },
});

points.forEach(function (elem, i) {
  gsap.set(elem, { position: "absolute", top: 0 });

  tl.to(indicators[i], { backgroundColor: "black", duration: 0.25 }, i);
  tl.from(elem.querySelector("img"), { autoAlpha: 0 }, i);
  tl.from(elem.querySelector("article"), { autoAlpha: 0, translateY: 100 }, i);

  if (i != points.length - 1) {
    tl.to(
      indicators[i],
      { backgroundColor: "#adadad", duration: 0.25 },
      i + 0.75
    );
    tl.to(
      elem.querySelector("article"),
      { autoAlpha: 0, translateY: -100 },
      i + 0.75
    );
    tl.to(elem.querySelector("img"), { autoAlpha: 0 }, i + 0.75);
  }
});

// movie

//cursor
document.addEventListener("DOMContentLoaded", function (event) {
  var cursor = document.querySelector(".custom-cursor");
  var links = document.querySelectorAll("a");
  var initCursor = false;

  for (var i = 0; i < links.length; i++) {
    var selfLink = links[i];

    selfLink.addEventListener("mouseover", function () {
      cursor.classList.add("custom-cursor--link");
    });
    selfLink.addEventListener("mouseout", function () {
      cursor.classList.remove("custom-cursor--link");
    });
  }

  window.onmousemove = function (e) {
    var mouseX = e.clientX;
    var mouseY = e.clientY;

    if (!initCursor) {
      // cursor.style.opacity = 1;
      TweenLite.to(cursor, 0.3, {
        opacity: 1,
      });
      initCursor = true;
    }

    TweenLite.to(cursor, 0, {
      top: mouseY + "px",
      left: mouseX + "px",
    });
  };

  window.onmouseout = function (e) {
    TweenLite.to(cursor, 0.3, {
      opacity: 0,
    });
    initCursor = false;
  };
});

//cf-img
