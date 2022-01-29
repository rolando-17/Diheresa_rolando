const navigatorActive = (counter, navigators) => {
    for (let i = 0; i < navigators.length; i++) {
      if (counter > navigators.length) counter = 1;
      if (counter < 1) counter = navigators.length;
  
      if (navigators[i].id === "slider_img_" + counter) {
        navigators[i].classList.add("navigatorChildActive");
      } else {
        navigators[i].classList.remove("navigatorChildActive");
      }
    }
  };
  
  window.onload = () => {
    const slider = document.querySelector(".sliderSlider");
    let sliderImages = document.querySelectorAll(".sliderImg");
  
    const prevBtn = document.querySelector(".prevBtn");
    const nextBtn = document.querySelector(".nextBtn");
  
    const navigator = document.querySelector(".navigator");
    //navigator
    for (let i = 0; i < sliderImages.length; i++) {
      const navigatorChild = document.createElement("div");
      navigatorChild.classList.add("navigatorChild");
      navigatorChild.id = "slider_img_" + (i + 1);
      navigator.appendChild(navigatorChild);
    }
    const navigators = document.querySelectorAll(".navigatorChild");
    navigators[0].classList.add("navigatorChildActive");
  
    //first node clone
    const firstNodeClone = sliderImages[0].cloneNode(true);
    firstNodeClone.id = "firstClone";
    slider.appendChild(firstNodeClone);
  
    //last node clone
    const lastNodeClone = sliderImages[sliderImages.length - 1].cloneNode(true);
    lastNodeClone.id = "lastClone";
    slider.prepend(lastNodeClone);
  
    sliderImages = document.querySelectorAll(".sliderImg");
  
    let counter = 1;
  
    let ImageWidth = sliderImages[0].clientWidth;
    slider.style.transform = `translateX(${-counter * ImageWidth}px)`;
  
    nextBtn.addEventListener("click", () => {
      if (counter >= sliderImages.length - 1) return null;
      slider.style.transition = "all 0.3s ease-in-out";
      counter++;
      slider.style.transform = `translateX(${-counter * ImageWidth}px)`;
      navigatorActive(counter, navigators);
    });
  
    prevBtn.addEventListener("click", () => {
      if (counter <= 0) return null;
      slider.style.transition = "all 0.3s ease-in-out";
      counter--;
      slider.style.transform = `translateX(${-counter * ImageWidth}px)`;
      navigatorActive(counter, navigators);
    });
  
    slider.addEventListener("transitionend", () => {
      if (sliderImages[counter].id === "lastClone") {
        slider.style.transition = "none";
        counter = sliderImages.length - 2;
        slider.style.transform = `translateX(${-counter * ImageWidth}px)`;
      }
  
      if (sliderImages[counter].id === "firstClone") {
        slider.style.transition = "none";
        counter = sliderImages.length - counter;
        slider.style.transform = `translateX(${-counter * ImageWidth}px)`;
      }
    });
  
    navigators.forEach((el, i) => {
      el.addEventListener("click", () => {
        counter = i + 1;
        slider.style.transition = "all 0.3s ease-in-out";
        slider.style.transform = `translateX(${-counter * ImageWidth}px)`;
        navigatorActive(counter, navigators);
      });
    });
  
    //resize handler
    window.onresize = () => {
      ImageWidth = sliderImages[0].offsetWidth;
      slider.style.transform = `translateX(${-counter * ImageWidth}px)`;
    };
  };