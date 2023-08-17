import './style.css';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);

const wrap = document.querySelector('.topics-archive');
const allTopics = wrap.querySelectorAll('.section');
const pixelsWrap = wrap.querySelector('.pixels');
const allPixels = pixelsWrap.querySelectorAll('.pixel');
const allCardWraps = wrap.querySelectorAll('.card-wrap');
const allCards = wrap.querySelectorAll('.card');
const allImages = wrap.querySelectorAll('.image');

const timeline = gsap.timeline();

pixelsWrap.style.zIndex = allTopics.length + 1;

allTopics.forEach((_, index) => {
  const pixel = allPixels[index];
  const cardWrap = allCardWraps[index];
  const card = cardWrap.querySelector('.card');
  const image = allImages[index];

  const cardBoundingBox = card.getBoundingClientRect();
  const pixelBoundingBox = pixel.getBoundingClientRect();

  image.style.zIndex = allImages.length - index;

  if (index < allTopics.length - 1) {
    if (index === 0) {
      card.style.opacity = 1;
      timeline.to(card, { opacity: 0 });
    }

    timeline.to(image, { opacity: 0 });

    if (index === 0) {
      timeline.fromTo(
        pixel,
        {
          '--xPos': `${cardBoundingBox.x}px`,
          '--yPos': `${cardBoundingBox.y}px`,
          '--width': `${cardBoundingBox.width}px`,
          '--height': `${cardBoundingBox.height}px`,
        },
        {
          '--xPos': `${pixelBoundingBox.x}px`,
          '--yPos': `${pixelBoundingBox.y}px`,
          '--width': `${pixelBoundingBox.width}px`,
          '--height': `${pixelBoundingBox.height}px`,
        },
        '<'
      );
    }

    timeline
      .to(
        allPixels[index + 1],
        {
          '--xPos': `${cardBoundingBox.x}px`,
          '--yPos': `${cardBoundingBox.y}px`,
          '--width': `${cardBoundingBox.width}px`,
          '--height': `${cardBoundingBox.height}px`,
        },
        '<'
      )

      .to(
        pixel,
        {
          '--xPos': `${pixelBoundingBox.x}px`,
          '--yPos': `${pixelBoundingBox.y}px`,
          '--width': `${pixelBoundingBox.width}px`,
          '--height': `${pixelBoundingBox.height}px`,
        },
        index === 0 ? '+=0' : '<'
      );
  }
  timeline
    .to(allCards[index + 1], { opacity: 1 }, index === 0 ? '<' : '+=0')
    .to({}, { duration: 0.2 });

  if (index !== allTopics.length - 2) {
    timeline.to(allCards[index + 1], { opacity: 0 });
  }
});

gsap
  .timeline({
    scrollTrigger: {
      trigger: '.topics-archive',
      start: 'top top',
      end: () => `${window.innerHeight * allTopics.length} bottom`,
      markers: true,
      scrub: 2,
      pin: true,
      anticipatePin: 2,
    },
  })
  .add(timeline);
