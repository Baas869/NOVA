
const BaasCtrl = (function(){
    const vbs = {
        mobileDropList: document.querySelector('.mobile-dropdown ul'),
        hambugerBtn: document.querySelector('.hambuger-tab'),
        closeHambugerBtn: document.querySelector('.close-hambuger'),
        mobileNavbar: document.querySelector('.mobile-navbar'),
        navBarItems: document.querySelector('.navbar-items'),
        mobileDropdown: document.querySelector('.mobile-dropdown'),
        animiSlideUP: document.querySelectorAll('.animi-slideUp'),
        slideUp: document.querySelector('.slide-up'),
        heroRow: document.querySelector('.obs'),
        mobileNavHeader: document.querySelector('.mobile-navbar-header'),
        backToTopBtn: document.querySelector('.back-to-top')

    
    }
    // const mobileDropList = document.querySelector('.mobile-dropdown ul');
    const clickSelector = {}
    return{
        getSelectors: () =>{
            return vbs;
        },
        hambuger: () =>{
            vbs.mobileNavbar.style.display = 'block';
            vbs.navBarItems.setAttribute('open', 'open');
        },
        closeHambuger: () =>{
            vbs.navBarItems.setAttribute('close', 'close');
            setTimeout(() =>{
                vbs.mobileNavbar.style.display = 'none';
                vbs.navBarItems.removeAttribute('close', 'close');

            },500)
            vbs.navBarItems.removeAttribute('open', 'open');
        },
        openDropdown: () =>{
            vbs.mobileDropList.style.display = 'block';
            vbs.mobileDropdown.setAttribute('dropList', '');
        },
        closeDropdown: () =>{
            vbs.mobileDropdown.setAttribute('removedropList', '');
            setTimeout(() =>{
                vbs.mobileDropList.style.display = 'none';
                vbs.mobileDropdown.removeAttribute('dropList', '');

            },500)
            vbs.mobileDropdown.removeAttribute('removedropList', '');
        }

    }
})();

const AppCtrl = (function(){
    const vbs = BaasCtrl.getSelectors();
    const loadEventListerners = function(){
        vbs.hambugerBtn.addEventListener('click', openHambuger);
        vbs.closeHambugerBtn.addEventListener('click', removeHambuger);
        vbs.mobileDropdown.addEventListener('mouseover', showDropdown);
        vbs.mobileDropdown.addEventListener('mouseleave', removeDropdown)
    }
    const loadObserver = () => {
        const generalObserver = () =>{
            const slideObserverOptions = {
                root: null,
                threshold: 0,
                rootMargin: '-1px -1px -1px -1px'
                // threshold: [1],
                // rootMargin: '0% 0% 0% 0%'    
            };
            const slideObserver = new IntersectionObserver((entries) =>{
                entries.forEach((entry) =>{
                    if(entry.isIntersecting){
                        entry.target.classList.add('slide-up');
                    }
                });
            }, slideObserverOptions);
            
            vbs.animiSlideUP.forEach((el) => {
                slideObserver.observe(el);
            });
        };
        const headingObserver = () => {
            const headingOptions = {
                threshold: 1,
                rootMargin: '-63px 0px 0px 0px'
            };
            const navBarObserver = new IntersectionObserver((entries, progressObserver) => {
                entries.forEach((entry) => {
                    if(!entry.isIntersecting){
                        vbs.mobileNavHeader.style.background = 'rgba(48, 66, 87,0.9)';
                        vbs.backToTopBtn.style.display = 'block';
                        setTimeout(() =>{
                            vbs.backToTopBtn.style.opacity = '1';
                        }, 100)
                    }else{
                        vbs.mobileNavHeader.style.background = 'none';
                        vbs.backToTopBtn.style.opacity = '0';
                        setTimeout(() =>{
                            vbs.backToTopBtn.style.display = 'none';
                        }, 100)
                    }
                });
            }, headingOptions)
            navBarObserver.observe(vbs.heroRow);
        }
       
        generalObserver();
        headingObserver();
    
    }
    const openHambuger = (e) =>{
        BaasCtrl.hambuger();
        e.preventDefault();
    }   
    const removeHambuger = () =>{
        BaasCtrl.closeHambuger();
    }
    const showDropdown = () =>{
        BaasCtrl.openDropdown();
    }
    const removeDropdown = () =>{
        BaasCtrl.closeDropdown();
    }

    return{
        init: function(){
            loadEventListerners();
            loadObserver();
        }
    }
})(BaasCtrl);
AppCtrl.init();

// const hambuger = document.querySelector('.hambuger-tab');
// const mobileNavbar = document.querySelector('.mobile-navbar');
// const navBarItems = document.querySelector('.navbar-items');
// const closeHambuger = document.querySelector('.close-hambuger');

// hambuger.addEventListener('click', function(){
//     mobileNavbar.style.display = 'block';
//     navBarItems.setAttribute('open', 'open');
    
//     console.log('open..')
// });

// closeHambugerBtn.addEventListener('click', function(){
//     navBarItems.setAttribute('close', 'close');
//     setTimeout(() =>{
//         mobileNavbar.style.display = 'none';
//         navBarItems.removeAttribute('close', 'close');

//     },1000)
//     navBarItems.removeAttribute('open', 'open');
// })
const swiperWraper = document.querySelector('.swiper-wrapper');
const slide = document.querySelector('.slide');
const slideBtnPrev = document.querySelector('.swiper-button-prev');
const slideBtnNext = document.querySelector('.swiper-button-next');
let slides = document.querySelectorAll('.swiper-slide');
const indicators = document.querySelectorAll('.swiper-pagination ul li')
const interval = 3000;
const whyUs = document.querySelector('.why-us');
const runSlide = () =>{
    if(whyUs){
        let index = 1;
        let slideId;

        const firstClone = slides[0].cloneNode(true);
        const lastClone = slides[slides.length - 1].cloneNode(true);

        firstClone.id = 'first-clone'
        lastClone.id = 'last-clone'

        slide.append(firstClone);
        slide.prepend(lastClone);

        const slidewidth = slides[index].clientWidth;
        index = 1;
        
        slide.style.transform = `translateX(-${slidewidth * index}px)`;

        console.log(slides);
        const startSlide = function(){
            slideId = setInterval(function(){
                moveToNextSlide();
                // console.log(index)
            }, interval);
        };
        slide.addEventListener('transitionend', () =>{
            slides = getSlides();
            if(slides[index].id === firstClone.id){
                slide.style.transition = 'none';
                index = 1;
                slide.style.transform = `translateX(${-slidewidth * index}px)`;

            }
            if(slides[index].id === lastClone.id){
                slide.style.transition = 'none';
                index = slides.length - 2;
                slide.style.transform = `translateX(${-slidewidth * index}px)`;

            }
        });
        const getSlides = () => slides = document.querySelectorAll('.swiper-slide');

        const moveToNextSlide = () => {
            slides = getSlides();
            if(index >= slides.length -1) return;
            index++;
            slide.style.transform = `translateX(${-slidewidth * index}px)`;
            slide.style.transition = '.7s';
        };

        const moveToPrevSlide = () =>{
            if(index <= 0) return;
            index--;
            slide.style.transform = `translateX(${-slidewidth * index}px)`;
            slide.style.transition = '.7s';
        }

        // swiperWraper.addEventListener('mouseenter', () =>{
        //     clearInterval(slideId);
        // });

        // swiperWraper.addEventListener('mouseleave', startSlide);

        slideBtnNext.addEventListener('click', moveToNextSlide);
        slideBtnPrev.addEventListener('click', moveToPrevSlide);
        startSlide();

    }
}
runSlide();

const testimonialSlider = document.querySelector('.testimonial-slider');
// if(testimonialSlider){
//     let testimonialSlide = document.querySelectorAll('.t-slider');
//     const nextSlide = document.querySelector('.right');
//     const prevSlide = document.querySelector('.left');

//     let testIndex = 1;
//     let num = 1;
//     const firstClone = testimonialSlide[0].cloneNode(true);
//     const lastClone = testimonialSlide[testimonialSlide.length - 1].cloneNode(true);

//     firstClone.id = 'test-first-clone';
//     lastClone.id = 'test-last-clone';

//     testimonialSlider.append(firstClone);
//     testimonialSlider.prepend(lastClone);
//     const testSlideWidth = testimonialSlide[testIndex].clientWidth

//     testimonialSlider.style.transform = `translate(-${testSlideWidth * testIndex}px)`;

//     nextSlide.addEventListener('click', () =>{
//         testIndex++;
//         document.querySelector('.active-slide').classList.remove('active-slide');
//         testimonialSlider.style.transform = `translate(-${testSlideWidth * testIndex}px)`;
//         // testimonialSlider.style.transform = `translate(-${testIndex * 100}%)`;


//         testimonialSlider.style.transition = '0.4s';
//         testimonialSlide[testIndex - 1 + 1].classList.add('active-slide');
//         console.log(testIndex)
//     });

//     setInterval(() =>{
//         testIndex++;
//         document.querySelector('.active-slide').classList.remove('active-slide');
//         testimonialSlider.style.transform = `translate(-${testSlideWidth * testIndex}px)`;
//         // testimonialSlider.style.transform = `translate(-${testIndex * 100}%)`;


//         testimonialSlider.style.transition = 'All 0.4s ease-in-out';
//         testimonialSlide[testIndex - 1 + 1].classList.add('active-slide');
//     }, 3000)
//     testimonialSlider.addEventListener('transitionend', () =>{
//         testimonialSlide = document.querySelectorAll('.t-slider');
//         if(testimonialSlide[testIndex].id === firstClone.id){
//             testimonialSlider.style.transition = 'none';
//             document.querySelector('.active-slide').classList.remove('active-slide');
//             testIndex = 1;
//             testimonialSlide[testIndex - 1 + 1].classList.add('active-slide');
//             testimonialSlider.style.transform = `translate(-${testSlideWidth * testIndex}px)`;
//         }
//     })

//     // testimonialSlider.addEventListener('transitionend', () =>{
//     //     testimonialSlider.appendChild(testimonialSlider.firstElementChild);

//     //     testimonialSlider.style.transform = `none`;
//     //     testimonialSlider.style.transition = 'none';
//     //     setTimeout(()=>{
//     //         document.querySelector('.active-slide').classList.remove('active-slide');
//     //         testimonialSlide[testIndex].classList.add('active-slide')
//     //         testimonialSlider.style.transition = '0.4s';
//     //     })
//     // })
// }

// $('.testimonial-slider').slick({
//     slidesToShow: 3,
//     slidesToScroll: 1,
//     autoplay: true,
//     autoplaySpeed: 2000,
//   });

if(testimonialSlider){
    
$(document).ready(function(){
    $('.your-class').slick({
      dots: true,
      arrows: false,
      autoplay: true,
      pauseOnHover: false,
      centerMode: true,
      centerPadding: '60px',
      slidesToShow: 3,
      responsive: [
        {
            breakpoint: 1200,
            settings: {
              dots: true,
              arrows: false,
              centerMode: true,
              centerPadding: '40px',
              slidesToShow: 2
            }
          },
        {
          breakpoint: 1056,
          settings: {
            dots: true,
            arrows: false,
            centerMode: true,
            centerPadding: '40px',
            slidesToShow: 2
          }
        },
        {
          breakpoint: 768,
          settings: {
            dots: true,
            arrows: false,
            centerMode: true,
            centerPadding: '40px',
            slidesToShow: 1
          }
        },
        {
          breakpoint: 480,
          settings: {
            arrows: false,
            centerMode: true,
            centerPadding: '40px',
            slidesToShow: 1,
            dots: true
          }
        }
      ]
       });
  });
}