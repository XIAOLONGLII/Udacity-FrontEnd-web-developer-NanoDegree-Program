
// 1. Test click each one get the innerHTML of that section.
// const sections = document.querySelectorAll('section');
// for(let i = 0; i < sections.length; i++) {
//     sections[i].addEventListener('click', function(){
//         var pageNav = sections[i].getAttribute("data-nav");
//         alert('The ' + sections[i].innerHTML + " a " + pageNav);
//     });
// }

/**
 * 
 * Manipulating the DOM exercise.
 * Exercise programmatically builds navigation,
 * scrolls to anchors from navigation,
 * and highlights section in viewport upon scrolling.
 * 
 * Dependencies: None
 * 
 * JS Version: ES2015/ES6
 * 
 * JS Standard: ESlint
 * 
*/

/**
 * Define Global Variables
 * 
*/
window.addEventListener('DOMContentLoaded', (event) => {
    console.log('DOM fully loaded and parsed');
});

//1. find sections list and create a fragmament instead of <div>
const sectionsList = document.querySelectorAll('section');
// console.log(sectionsList);
const frag = document.createDocumentFragment();
const navBar = document.getElementById('navbar__list');
/**
 * End Global Variables
 * Start Helper Functions
 * 
*/
//2. helper function: we will need to create anchor under <ul> </ul> so <a> </a>
function createNavList(id, name) {
    const anchor = `<a class = "menu__link" id = "${id}">${name}</a>`;
    return anchor;
}
function nearPortView(element) {
    const size = element.getBoundingClientRect();
    return (size.top >= 0 && size.left >= 0 && 
        size.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        size.right <= (window.innerWidth || document.documentElement.clientWidth));
    //console.log(size);
}


/**
 * End Helper Functions
 * Begin Main Functions
 * 
*/

// build the nav
//<li><a class = "menu__link" id = "${id}">${name}</a></li>
function buildNav(sectionsList) {
    for(const section of sectionsList) {
        const list = document.createElement('li');
        const section_id = section.getAttribute('id');
        const section_dataNav = section.getAttribute('data-nav');
        list.innerHTML = createNavList(section_id, section_dataNav);
        frag.appendChild(list);
        
    }
    navBar.appendChild(frag);
   
    //console.log(frag); // <li> <a...>Section 1</a></li>
}

// Add class 'active' to section when near top of viewport
function addActive() {
    for(const section of sectionsList) {
        if(nearPortView(section)) {
            section.classList.add("your-active-class");
        }
        else {
            section.classList.remove("your-active-class");
        }
    }
}

// Scroll to anchor ID using scrollTO event
function scrollAnchor(event) {
    if(event.target.nodeName === 'A') {
        const id = event.target.getAttribute('id');
        const section = document.getElementById(id);
        console.log("id: "+id);
        console.log(section);
        section.scrollIntoView({behavior: "smooth"});
    }
}

/**
 * End Main Functions
 * Begin Events
 * 
*/

// Build menu 

// Scroll to section on link click

document.addEventListener('scroll', function() {
    addActive();
});

// Set sections as active
const navList = document.getElementById('navbar__list');
navList.addEventListener('click', function(event) {
    scrollAnchor(event);
});

buildNav(sectionsList);
