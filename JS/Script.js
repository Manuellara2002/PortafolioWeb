if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js').then((registration) => {
      console.log('Service Worker registrado con éxito: ', registration);
    }).catch((error) => {
      console.log('Error al registrar el Service Worker: ', error);
    });
  });
}






function redirectToHome() {
    window.location.href = "/index.html";
}

  function isElementInViewport(el) {
    const rect = el.getBoundingClientRect();
    return (
      rect.top >= 0 &&
      rect.left >= 0 &&
      rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
      rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
  }

  function handleScroll() {
    const elements = document.querySelectorAll('.section');
    elements.forEach(element => {
      if (isElementInViewport(element)) {
        element.classList.add('visible');
      }
    });
  }

  window.addEventListener('scroll', handleScroll);
  document.addEventListener('DOMContentLoaded', handleScroll);

  const videos = document.querySelectorAll('video');

  videos.forEach(video => {
      video.addEventListener('play', () => {
          videos.forEach(otherVideo => {
              if (otherVideo !== video) {
                  otherVideo.pause();
              }
          });
      });
  });