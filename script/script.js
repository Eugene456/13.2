'use strict';
window.addEventListener('DOMContentLoaded', function(){
    

    //Timer
    function countTimer (){
        const timerHours = document.querySelector('#timer-hours'),
              timerMinutes = document.querySelector('#timer-minutes'),
              timerSeconds = document.querySelector('#timer-seconds');
       
        function getTimeRemaining(){
            let dateStop = 24 * 3600 * 1000,
            dateNow = new Date().getTime() % (24 * 3600 * 1000),
            timeRemaining = (dateStop - dateNow)/1000,
            seconds = Math.floor(timeRemaining % 60),
            minutes = Math.floor((timeRemaining / 60) % 60),
            hours = Math.floor (timeRemaining / 60 / 60);
            //days =  Math.floor (timeRemaining / 60 / 60 / 24); 
            
            
            return{
                timeRemaining,
                hours,
                minutes,
                seconds
            };
        }
        
        function updateClock(){
            let timer =  getTimeRemaining();     
            
            function dateFormat (time , container){
                if (time < 10){
                    container.textContent = '0' + time;
                } else {
                    container.textContent = time;
                }
            }
            
            dateFormat(timer.hours, timerHours);
            dateFormat(timer.minutes, timerMinutes);
            dateFormat(timer.seconds, timerSeconds);
            

            setInterval(updateClock, 1000); 
            if (timer.hours <= 0 && timer.minutes <= 0 && timer.seconds <= 0){
                clearInterval();
                timerHours.textContent = '00';
                timerMinutes.textContent = '00';
                timerSeconds.textContent = '00';
                countTimer();
            }
            
        }
        updateClock();
    }
    countTimer();

    //Меню
    const menu = document.querySelector('menu'),
        menuItems = menu.querySelectorAll('ul>li');
    const toggleMenu = () => {
        const btnMenu = document.querySelector('.menu'),
             
             closeBtn = document.querySelector('.close-btn');
             
        let interval,
            count = -100;
             const handlerMenu = () => {
                document.body.style.overflow = 'hidden';
                interval = requestAnimationFrame(handlerMenu);
                    if(count < 0){
                        menu.style.transform = `translate(${count}%)`;
                        count+= 3;
                    } else{
                        cancelAnimationFrame(interval);
                    }
            };
            
            const closeMenu =() => {
                document.body.style.overflow = '';
                interval = requestAnimationFrame(closeMenu);
                    if(count > -100){
                        count-=3;
                        menu.style.transform = `translate(${count}%)`;
                        
                    } else{
                        cancelAnimationFrame(interval);
                    }
            }
        btnMenu.addEventListener('click', () => {
            
            if(screen.width < 768){
                if(!menu.style.transform || menu.style.transform === 'translate(-100%)'){
                    document.body.style.overflow = 'hidden';
                    menu.style.transform = 'translate(0)';
                }else {
                    menu.style.transform = 'translate(-100%)';
                    document.body.style.overflow = '';
                }
            }else{
            
            if(!menu.style.transform || menu.style.transform === 'translate(-100%)'){
                handlerMenu();
            }else {
                count = 0;
                closeMenu();
            };
        };
        });
        closeBtn.addEventListener('click',()=>{ 
            if (screen.width < 768){
                menu.style.transform = 'translate(-100%)';
                document.body.style.overflow = '';
            } else{closeMenu();}
        });
        menuItems.forEach(elem =>elem.addEventListener('click', ()=>{ 
           
            if (screen.width < 768){
                menu.style.transform = 'translate(-100%)';
            }else{closeMenu();}
        }));
    };
    
    
    toggleMenu();


    //popup
    let togglePopUp = () => {
        const popup = document.querySelector('.popup'),
        popupBtn = document.querySelectorAll('.popup-btn'),
        popUpClose = document.querySelector('.popup-close');

        popupBtn.forEach(elem => {
            elem.addEventListener('click',() => {
                popup.style.display = 'block';
            });
        });

        popUpClose.addEventListener('click', () => {
            popup.style.display = 'none';
        });
    };
    togglePopUp();

    let intervalScroll;
    let scrollVert = 0;
    let placeScroll = 0;

    const scrolling = () => {
        intervalScroll = requestAnimationFrame(scrolling);
                        
                            if(scrollVert < placeScroll){
                            console.log(placeScroll);
                            window.scrollTo(0, scrollVert) ;
                            scrollVert += 60;
                        } else{
                            cancelAnimationFrame(intervalScroll);
                            scrollVert = 0;
                        }
    };

    menuItems.forEach((item, i)=>{
        let linkMenu = menuItems[i].querySelector('a');
        linkMenu.setAttribute('href', '#');
        menuItems[i].addEventListener('click', () => {
            console.log (i);
            
           if (i == 0){
            placeScroll = 900;   
            } 
            switch (i){
                case 1: placeScroll = 2082;
                break;
                case 2: placeScroll = 3020;
                break;
                case 3: placeScroll = 4120;
                break;
                case 4: placeScroll = 5220;
                break;
            }
            scrolling();
            
        })
    });
    const main = document.querySelector('main'),
    nextSlide = main.querySelector('a');
    nextSlide.setAttribute('href', '#')
    nextSlide.addEventListener('click', ()=>{
        placeScroll = 900; 
        scrollVert = window.scrollY;
        scrolling();
    })
});

