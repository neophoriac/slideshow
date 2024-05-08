//https://www.w3schools.com/howto/howto_js_fullscreen.asp
//https://picsum.photos/
//https://imgur.com/gallery/0TyCqY3
//https://photoswipe.com/
// https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-reduced-motion
// will-change
// aria
// https://developer.mozilla.org/en-US/docs/Web/HTML/Element/section

// -------------------------- Show large image on Hover & display the whole small image-----------------------------
(function () {
    'use strict';
    const loadSVG = `<?xml version="1.0" encoding="utf-8"?> <svg width="24px" height="24px" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" fill="none" class="hds-flight-icon--animation-loading"><g fill="#000000" fill-rule="evenodd" clip-rule="evenodd"><path d="M8 1.5a6.5 6.5 0 100 13 6.5 6.5 0 000-13zM0 8a8 8 0 1116 0A8 8 0 010 8z" opacity=".2"/><path d="M7.25.75A.75.75 0 018 0a8 8 0 018 8 .75.75 0 01-1.5 0A6.5 6.5 0 008 1.5a.75.75 0 01-.75-.75z"/></g></svg>`;

    // https://www.figma.com/@thewolfkit
    let createSvgIcon = (svg, className) => {
        let div = document.createElement('div');
        div.innerHTML = svg;
        div.className = className;
        return div;
    }

class Slideshow {
    constructor(id, slides) {

        if (typeof id !== "string") {
            throw new Error('Id parameter not a string')
        }
        if (!Array.isArray(slides)) {
            throw new Error('Slide parameter not an array')
        }
        this.id = id;
        this.slideShowHTML = `
<div id="slideshow-background-surface">
   <div id="${this.id}">
      <div id="slideshow-toolbar">
        <span id="slideshow-info" class="info-icon"><svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 431.855 431.855" style="enable-background:new 0 0 431.855 431.855;" xml:space="preserve"> <g> <path d="M215.932,0C96.726,0,0.012,96.592,0.012,215.814c0,119.336,96.714,216.041,215.919,216.041 c119.279,0,215.911-96.706,215.911-216.041C431.843,96.592,335.202,0,215.932,0z M215.923,85.374 c12.323,0,22.313,9.99,22.313,22.313S228.246,130,215.923,130c-12.331,0-22.297-9.99-22.297-22.313 C193.619,95.356,203.592,85.374,215.923,85.374z M238.253,313.974c0,13.469-9.99,24.386-22.313,24.386 c-12.323,0-22.313-10.917-22.313-24.386V177.349c0-13.469,9.99-24.386,22.313-24.386c12.323,0,22.313,10.917,22.313,24.386V313.974z"/> </g> </svg></span>
        <span class="zoom-tooltip">100%</span>
        <button id="ogSize" class="tool-icon"><svg xmlns="http://www.w3.org/2000/svg" width="800" height="800" fill="none" viewBox="0 0 24 24"><path stroke="#292D32" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9 22h6c5 0 7-2 7-7V9c0-5-2-7-7-7H9C4 2 2 4 2 9v6c0 5 2 7 7 7z"/><g fill="#000"><path stroke-width=".251" d="M6.026 6.68q0-.393.35-.393h2.829q.35 0 .35.393 0 2.655.009 5.32.008 2.655.008 5.32 0 .393-.35.393H7.778q-.35 0-.35-.393 0-2.09.008-4.18t.008-4.169q0-.163-.213-.153t-.496.048q-.273.029-.486-.038-.215-.068-.215-.374 0-.45-.008-.892v-.881zm5.11 4.151q0-.537.385-.901.385-.374.838-.374.461 0 .83.374.375.364.375.901 0 .555-.376.91-.368.345-.847.345-.47 0-.836-.355-.368-.354-.368-.9zm-.016 5.616q0-.536.385-.91t.846-.374q.453 0 .837.355.393.355.393.891 0 .566-.384.94-.385.364-.872.364-.47 0-.838-.355t-.367-.91zm3.307-9.767q0-.393.35-.393h2.829q.35 0 .35.393 0 2.655.009 5.32.009 2.655.009 5.32 0 .393-.35.393h-1.445q-.35 0-.35-.393 0-2.09.008-4.18t.008-4.169q0-.163-.213-.153t-.496.048q-.273.029-.487-.038-.214-.068-.214-.374 0-.45-.008-.892v-.881z" aria-label="1:1"/><path d="M8.25 22.723c-2.436-.126-4.07-.72-5.19-1.889a4.847 4.847 0 0 1-.687-.873c-.64-1.031-.983-2.318-1.082-4.058-.04-.686-.04-7.114 0-7.8.1-1.74.442-3.027 1.082-4.058a4.74 4.74 0 0 1 .685-.873c1.11-1.15 2.694-1.741 5.027-1.879.672-.04 7.164-.04 7.83 0 2.248.135 3.777.679 4.885 1.74 1.184 1.133 1.77 2.695 1.91 5.085.038.663.038 7.106 0 7.77-.14 2.39-.732 3.965-1.913 5.086-1.124 1.068-2.65 1.609-4.897 1.738-.455.026-7.173.036-7.65.011zm7.59-1.48c1.966-.119 3.214-.56 4.057-1.436.727-.756 1.13-1.805 1.304-3.394.05-.452.054-.842.054-4.41 0-3.569-.005-3.96-.054-4.41-.309-2.826-1.415-4.163-3.846-4.648-.985-.196-1.023-.197-5.355-.197-4.329 0-4.372.001-5.348.196-2.347.469-3.478 1.751-3.814 4.324-.099.756-.113 1.477-.1 5.14.013 3.96.014 3.992.205 4.95.373 1.876 1.272 2.96 2.892 3.491.627.206 1.404.34 2.253.391.581.035 7.175.037 7.752.002z"/></g></svg></button>
        <button id="fitToScreen" class="tool-icon"><svg xmlns="http://www.w3.org/2000/svg" xml:space="preserve" width="800" height="800" fill="none" viewBox="0 0 24 24"><path stroke="#000" stroke-linecap="round" stroke-linejoin="round" stroke-width=".867405" d="M6.217 10.265V8.82A2.599 2.599 0 0 1 8.82 6.217h1.445m3.47 0h1.446a2.599 2.599 0 0 1 2.602 2.603v1.445m0 4.048v.868a2.599 2.599 0 0 1-2.602 2.602h-.868m-4.048 0H8.82a2.599 2.599 0 0 1-2.603-2.602v-1.446"/><g transform="translate(-.286 -.286) scale(1.0238)"><path stroke="#000" stroke-linecap="round" stroke-linejoin="round" d="M9 22h6c5 0 7-2 7-7V9c0-5-2-7-7-7H9C4 2 2 4 2 9v6c0 5 2 7 7 7z"/></g></svg></button>
        <button id="zoomOut" class="tool-icon"><?xml version="1.0" encoding="utf-8"?><svg width="800px" height="800px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M5.5 10C5.5 9.44771 5.94772 9 6.5 9H13.5C14.0523 9 14.5 9.44771 14.5 10C14.5 10.5523 14.0523 11 13.5 11H6.5C5.94772 11 5.5 10.5523 5.5 10Z" fill="#000000"/><path fill-rule="evenodd" clip-rule="evenodd" d="M1 10C1 5.02944 5.02944 1 10 1C14.9706 1 19 5.02944 19 10C19 12.125 18.2635 14.078 17.0319 15.6177L21.7071 20.2929C22.0976 20.6834 22.0976 21.3166 21.7071 21.7071C21.3166 22.0976 20.6834 22.0976 20.2929 21.7071L15.6177 17.0319C14.078 18.2635 12.125 19 10 19C5.02944 19 1 14.9706 1 10ZM10 3C6.13401 3 3 6.13401 3 10C3 13.866 6.13401 17 10 17C13.866 17 17 13.866 17 10C17 6.13401 13.866 3 10 3Z" fill="#000000"/></svg></button>
        <button id="zoomIn" class="tool-icon"><?xml version="1.0" encoding="utf-8"?><svg width="800px" height="800px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M11 6.5C11 5.94772 10.5523 5.5 10 5.5C9.44771 5.5 9 5.94772 9 6.5V9H6.5C5.94772 9 5.5 9.44771 5.5 10C5.5 10.5523 5.94772 11 6.5 11H9V13.5C9 14.0523 9.44771 14.5 10 14.5C10.5523 14.5 11 14.0523 11 13.5V11H13.5C14.0523 11 14.5 10.5523 14.5 10C14.5 9.44771 14.0523 9 13.5 9H11V6.5Z" fill="#000000"/><path fill-rule="evenodd" clip-rule="evenodd" d="M10 1C5.02944 1 1 5.02944 1 10C1 14.9706 5.02944 19 10 19C12.125 19 14.078 18.2635 15.6177 17.0319L20.2929 21.7071C20.6834 22.0976 21.3166 22.0976 21.7071 21.7071C22.0976 21.3166 22.0976 20.6834 21.7071 20.2929L17.0319 15.6177C18.2635 14.078 19 12.125 19 10C19 5.02944 14.9706 1 10 1ZM3 10C3 6.13401 6.13401 3 10 3C13.866 3 17 6.13401 17 10C17 13.866 13.866 17 10 17C6.13401 17 3 13.866 3 10Z" fill="#000000"/></svg></button>
        <button id="rotateLeft" class="tool-icon"><?xml version="1.0" encoding="utf-8"?><svg width="800px" height="800px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M7.25 22H11.75C15.5 22 17 20.5 17 16.75V12.25C17 8.5 15.5 7 11.75 7H7.25C3.5 7 2 8.5 2 12.25V16.75C2 20.5 3.5 22 7.25 22Z" stroke="#000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/><path d="M22 9C22 5.13 18.87 2 15 2L16.05 3.75" stroke="#000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg></button>
        <button id="rotateRight" class="tool-icon"><?xml version="1.0" encoding="utf-8"?><svg width="800px" height="800px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M16.75 22H12.25C8.5 22 7 20.5 7 16.75V12.25C7 8.5 8.5 7 12.25 7H16.75C20.5 7 22 8.5 22 12.25V16.75C22 20.5 20.5 22 16.75 22Z" stroke="#000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/><path d="M2 9C2 5.13 5.13 2 9 2L7.95 3.75" stroke="#000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg></button>
        <button id="flipX" class="tool-icon"><?xml version="1.0" encoding="utf-8"?><svg width="800px" height="800px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M9 22H15C20 22 22 20 22 15V9C22 4 20 2 15 2H9C4 2 2 4 2 9V15C2 20 4 22 9 22Z" stroke="#000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/><path d="M17.15 13.8201L14.11 16.8601" stroke="#000" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/><path d="M6.84998 13.8201H17.15" stroke="#000" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/><path d="M6.84998 10.1799L9.88998 7.13989" stroke="#000" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/><path d="M17.15 10.1799H6.84998" stroke="#000" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/></svg></button>
        <button id="flipY" class="tool-icon"><?xml version="1.0" encoding="utf-8"?><svg width="800px" height="800px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M9 22H15C20 22 22 20 22 15V9C22 4 20 2 15 2H9C4 2 2 4 2 9V15C2 20 4 22 9 22Z" stroke="#000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/><path d="M10.18 17.1501L7.14001 14.1101" stroke="#000" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/><path d="M10.1801 6.8501V17.1501" stroke="#000" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/><path d="M13.8199 6.8501L16.8599 9.8901" stroke="#000" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/><path d="M13.8199 17.1501V6.8501" stroke="#000" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/></svg></button>
        <button id="max" class="tool-icon"><svg xmlns="http://www.w3.org/2000/svg" width="800" height="800" fill="none" viewBox="0 0 24 24"><g stroke="#000" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"><path d="M2 9V6.5C2 4.01 4.01 2 6.5 2H9M15 2h2.5C19.99 2 22 4.01 22 6.5V9M22 16v1.5c0 2.49-2.01 4.5-4.5 4.5H16M9 22H6.5C4.01 22 2 19.99 2 17.5V15"/></g></svg></button>
        <button id="window" class="tool-icon"><svg width="800px" height="800px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"> <g> <title>Layer 1</title> <path id="svg_1" stroke-linejoin="round" stroke-linecap="round" stroke-width="1.5" stroke="#292D32" d="m9,22l6,0c5,0 7,-2 7,-7l0,-6c0,-5 -2,-7 -7,-7l-6,0c-5,0 -7,2 -7,7l0,6c0,5 2,7 7,7z"/> <path stroke="#292D32" id="svg_2" stroke-linejoin="round" stroke-linecap="round" stroke-width="1.5" d="m9.3064,17.22764l5.3872,0c2.12653,0 2.97714,-1.04553 2.97714,-3.65935l0,-3.13659c0,-2.61382 -0.85061,-3.65935 -2.97714,-3.65935l-5.3872,0c-2.12653,0 -2.97714,1.04553 -2.97714,3.65935l0,3.13659c0,2.61382 0.85061,3.65935 2.97714,3.65935z"/> </g></svg></button>
        <button id="enterFull" class="tool-icon"><?xml version="1.0" encoding="utf-8"?><svg width="800px" height="800px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M21.7092 2.29502C21.8041 2.3904 21.8757 2.50014 21.9241 2.61722C21.9727 2.73425 21.9996 2.8625 22 2.997L22 3V9C22 9.55228 21.5523 10 21 10C20.4477 10 20 9.55228 20 9V5.41421L14.7071 10.7071C14.3166 11.0976 13.6834 11.0976 13.2929 10.7071C12.9024 10.3166 12.9024 9.68342 13.2929 9.29289L18.5858 4H15C14.4477 4 14 3.55228 14 3C14 2.44772 14.4477 2 15 2H20.9998C21.2749 2 21.5242 2.11106 21.705 2.29078L21.7092 2.29502Z" fill="#000000"/><path d="M10.7071 14.7071L5.41421 20H9C9.55228 20 10 20.4477 10 21C10 21.5523 9.55228 22 9 22H3.00069L2.997 22C2.74301 21.9992 2.48924 21.9023 2.29502 21.7092L2.29078 21.705C2.19595 21.6096 2.12432 21.4999 2.07588 21.3828C2.02699 21.2649 2 21.1356 2 21V15C2 14.4477 2.44772 14 3 14C3.55228 14 4 14.4477 4 15V18.5858L9.29289 13.2929C9.68342 12.9024 10.3166 12.9024 10.7071 13.2929C11.0976 13.6834 11.0976 14.3166 10.7071 14.7071Z" fill="#000000"/></svg></button>
        <button id="exitFull" class="tool-icon"><?xml version="1.0" encoding="utf-8"?><svg width="800px" height="800px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M21.7071 3.70711L16.4142 9H20C20.5523 9 21 9.44772 21 10C21 10.5523 20.5523 11 20 11H14.0007L13.997 11C13.743 10.9992 13.4892 10.9023 13.295 10.7092L13.2908 10.705C13.196 10.6096 13.1243 10.4999 13.0759 10.3828C13.0273 10.2657 13.0004 10.1375 13 10.003L13 10V4C13 3.44772 13.4477 3 14 3C14.5523 3 15 3.44772 15 4V7.58579L20.2929 2.29289C20.6834 1.90237 21.3166 1.90237 21.7071 2.29289C22.0976 2.68342 22.0976 3.31658 21.7071 3.70711Z" fill="#000000"/><path d="M9 20C9 20.5523 9.44772 21 10 21C10.5523 21 11 20.5523 11 20V14.0007C11 13.9997 11 13.998 11 13.997C10.9992 13.7231 10.8883 13.4752 10.7092 13.295C10.7078 13.2936 10.7064 13.2922 10.705 13.2908C10.6096 13.196 10.4999 13.1243 10.3828 13.0759C10.2657 13.0273 10.1375 13.0004 10.003 13C10.002 13 10.001 13 10 13H4C3.44772 13 3 13.4477 3 14C3 14.5523 3.44772 15 4 15H7.58579L2.29289 20.2929C1.90237 20.6834 1.90237 21.3166 2.29289 21.7071C2.68342 22.0976 3.31658 22.0976 3.70711 21.7071L9 16.4142V20Z" fill="#000000"/></svg></button>
      </div>
      <div class="slideshow-image-container">
         <img class="slideshow-image" loading="lazy"/>
         <div id="slideshow-rectangle"></div>
      </div>
      <div class="slideshow-info">
         <div class="slideshow-info-header">
            <button class="slideshow-close">&#x2716;</button>
         </div>
         <div class="slideshow-info-main-body">
            <h3 class="slideshow-caption"></h3>
            <div class="slideshow-info-container"></div>
         </div>
         <div class="slideshow-info-footer">
            <div class="slideshow-arrows">
               <span class="slideshow-previous">&#706;</span>
               <span class="slideshow-count"></span>
               <span class="slideshow-next">&#707;</span>
            </div>
         </div>
      </div>
   </div>
</div>
`
            this.loadIcon = createSvgIcon(loadSVG, 'load-icon');

        this.scale = 1;
        this.rotate = 0;
        this.flipX = 1;
        this.flipY = 1;
        this.translateX = 0;
        this.translateY = 0;
        this.slides = slides;
        this.currentIndex

        document.body.insertAdjacentHTML('beforeend', this.slideShowHTML);
        this.background = document.getElementById('slideshow-background-surface');
        this.slideshow = document.getElementById(this.id);
        this.infoBox = this.slideshow.querySelector('.slideshow-info');
        this.info = this.slideshow.querySelector('.slideshow-info-container');
        this.imageContainer = this.slideshow.querySelector('.slideshow-image-container');
        this.image = this.slideshow.querySelector('.slideshow-image');
        this.caption = this.slideshow.querySelector('.slideshow-caption');
        this.close = this.slideshow.querySelector('.slideshow-close');
        this.previous = this.slideshow.querySelector('.slideshow-previous');
        this.next = this.slideshow.querySelector('.slideshow-next');
        this.count = this.slideshow.querySelector('.slideshow-count');

        this.zoomLevel = this.slideshow.querySelector('.zoom-tooltip');

        this.imageContainer.appendChild(this.loadIcon);
        this.containerRect
        this.prevRect
        this.initialRect
        this.isVisible = false;
        this.fitScale = 0;
        this.maxScreen = false;
        this.padding = 0;

        this.fullscreenElement = () => {
            if (document.fullscreenElement) {
                return document.fullscreenElement;
            }
            else if (document.msFullscreenElement) {
                return document.msFullscreenElement;
            }
            else if (document.mozFullscreen) {
                return document.mozFullscreen;
            }
            else if (document.webkitIsFullscreen) {
                return document.webkitIsFullscreen;
            } else {
                return undefined;
            }
        }
        this.requestFullscreen = (el) => {
            if (el.requestFullscreen) {
                el.requestFullscreen();
            } else if (el.webkitRequestFullscreen) { /* Safari */
                el.webkitRequestFullscreen();
            } else if (el.msRequestFullscreen) { /* IE11 */
                el.msRequestFullscreen();
            }
        }
        this.exitFullscreen = () => {
            if (document.exitFullscreen) {
                document.exitFullscreen();
            } else if (document.webkitExitFullscreen) { /* Safari */
                document.webkitExitFullscreen();
            } else if (document.msExitFullscreen) { /* IE11 */
                document.msExitFullscreen();
            }
        }

        const leftSVG = '<span><svg xmlns="http://www.w3.org/2000/svg" xml:space="preserve" width="2em" height="2em" viewBox="-35 -35 431.855 431.855"><defs><marker id="a" markerWidth="2.125" orient="auto-start-reverse" overflow="visible" preserveAspectRatio="none" viewBox="0 0 7.7 5.6"><path fill="#fff" fill-rule="evenodd" d="M-1.4-2.8 6.3 0l-7.7 2.8C0 1.169 0-1.162-1.4-2.8z"/></marker></defs><path d="M301.04 53.505H75c-10.875 0-19.724 8.843-19.724 19.713v230.9c0 10.873 8.843 19.722 19.724 19.722h226.04c10.873 0 19.722-8.844 19.722-19.722v-230.9c-.007-10.87-8.849-19.713-19.722-19.713zM338.027 0H38.007C18.44 0 2.57 15.869 2.57 35.434v306.46c0 19.573 15.87 35.442 35.437 35.442h300.02c19.569 0 35.437-15.869 35.437-35.442V35.434C373.463 15.869 357.596 0 338.023 0zm-3.296 304.12c0 18.572-15.113 33.691-33.691 33.691H75c-18.574 0-33.694-15.114-33.694-33.691V73.22c0-18.569 15.114-33.688 33.694-33.688h226.04c18.572 0 33.691 15.114 33.691 33.688z"/><path fill="none" stroke="#fff" stroke-width="46.543" marker-end="url(#a)" d="M242.21 143.11H152.2"/></svg></span>'
        const dSVG = '<span><svg xmlns="http://www.w3.org/2000/svg" xml:space="preserve" width="2em" height="2em" viewBox="-35 -35 431.855 431.855"><path d="M301.197 53.5H75.151c-10.875 0-19.718 8.842-19.718 19.713v230.909c0 10.868 8.843 19.711 19.718 19.711h226.046c10.867 0 19.71-8.843 19.71-19.711V73.218c0-10.87-8.843-19.718-19.71-19.718zM338.177 0H38.165C18.596 0 2.721 15.869 2.721 35.439v306.464c0 19.573 15.875 35.439 35.443 35.439h300.012c19.57 0 35.444-15.866 35.444-35.439V35.434C373.621 15.869 357.746 0 338.177 0zm-3.295 304.122c0 18.567-15.113 33.687-33.685 33.687H75.151c-18.574 0-33.693-15.114-33.693-33.687V73.218c0-18.569 15.114-33.688 33.693-33.688h226.046c18.566 0 33.685 15.114 33.685 33.688v230.904z"/><path d="M198.964 151.127q0 18.558-8.136 33.642-8.045 15.083-21.483 23.402-9.325 5.76-20.843 8.32-11.427 2.559-30.168 2.559H83.962V82.93h34.007q19.928 0 31.63 2.926 11.793 2.834 19.929 7.862 13.895 8.684 21.665 23.128t7.77 34.281zm-18.924-.274q0-15.998-5.576-26.968t-16.638-17.277q-8.044-4.571-17.095-6.308-9.05-1.828-21.665-1.828h-17.004v105.037h17.004q13.072 0 22.762-1.92 9.782-1.92 17.918-7.13 10.147-6.49 15.175-17.095 5.12-10.604 5.12-26.51z" aria-label="D" style="font-size:187.221px;font-family:Asap;fill:#fff;stroke-width:0" transform="skewY(-.351) scale(1.04377 .95807)"/></svg></span>';
        const rightSVG = '<span><svg xmlns="http://www.w3.org/2000/svg" xml:space="preserve" width="2em" height="2em" viewBox="-35 -35 431.855 431.855"><defs><marker id="a" markerWidth="2.125" orient="auto-start-reverse" overflow="visible" preserveAspectRatio="none" viewBox="0 0 7.7 5.6"><path fill="#fff" fill-rule="evenodd" d="M-1.4-2.8 6.3 0l-7.7 2.8C0 1.169 0-1.162-1.4-2.8z"/></marker></defs><path d="M301.04 53.505H75c-10.875 0-19.724 8.843-19.724 19.713v230.9c0 10.873 8.843 19.722 19.724 19.722h226.04c10.873 0 19.722-8.844 19.722-19.722v-230.9c-.007-10.87-8.849-19.713-19.722-19.713zM338.027 0H38.007C18.44 0 2.57 15.869 2.57 35.434v306.46c0 19.573 15.87 35.442 35.437 35.442h300.02c19.569 0 35.437-15.869 35.437-35.442V35.434C373.463 15.869 357.596 0 338.023 0zm-3.296 304.12c0 18.572-15.113 33.691-33.691 33.691H75c-18.574 0-33.694-15.114-33.694-33.691V73.22c0-18.569 15.114-33.688 33.694-33.688h226.04c18.572 0 33.691 15.114 33.691 33.688v230.9z"/><path fill="none" stroke="#fff" stroke-width="46.543" marker-end="url(#a)" d="M71.279 143.11h90.01"/></svg></span>';
        const eSVG = '<span><svg xmlns="http://www.w3.org/2000/svg" xml:space="preserve" width="2em" height="2em" viewBox="-35 -35 431.855 431.855"><path d="M301.197 53.5H75.151c-10.875 0-19.718 8.842-19.718 19.713v230.909c0 10.868 8.843 19.711 19.718 19.711h226.046c10.867 0 19.71-8.843 19.71-19.711V73.218c0-10.87-8.843-19.718-19.71-19.718zM338.177 0H38.165C18.596 0 2.721 15.869 2.721 35.439v306.464c0 19.573 15.875 35.439 35.443 35.439h300.012c19.57 0 35.444-15.866 35.444-35.439V35.434C373.621 15.869 357.746 0 338.177 0zm-3.295 304.122c0 18.567-15.113 33.687-33.685 33.687H75.151c-18.574 0-33.693-15.114-33.693-33.687V73.218c0-18.569 15.114-33.688 33.693-33.688h226.046c18.566 0 33.685 15.114 33.685 33.688v230.904z"/><path d="M83.533 92.333H72.037v-17.45h11.496v2.063h-9.175v4.781h9.175v2.063h-9.175v6.48h9.175z" aria-label="E" style="font-size:24px;font-family:Asap;fill:#fff;stroke-width:0" transform="matrix(8.14229 0 0 7.47376 -498.912 -481.612)"/></svg></span>';
        const qSVG = '<span><svg xmlns="http://www.w3.org/2000/svg" xml:space="preserve" width="2em" height="2em" viewBox="-35 -35 431.855 431.855"><path d="M301.197 53.5H75.151c-10.875 0-19.718 8.842-19.718 19.713v230.909c0 10.868 8.843 19.711 19.718 19.711h226.046c10.867 0 19.71-8.843 19.71-19.711V73.218c0-10.87-8.843-19.718-19.71-19.718zM338.177 0H38.165C18.596 0 2.721 15.869 2.721 35.439v306.464c0 19.573 15.875 35.439 35.443 35.439h300.012c19.57 0 35.444-15.866 35.444-35.439V35.434C373.621 15.869 357.746 0 338.177 0zm-3.295 304.122c0 18.567-15.113 33.687-33.685 33.687H75.151c-18.574 0-33.693-15.114-33.693-33.687V73.218c0-18.569 15.114-33.688 33.693-33.688h226.046c18.566 0 33.685 15.114 33.685 33.688v230.904z"/><path d="M189.641 229.507q-4.838 1.21-9.595 1.694-4.677.564-9.596.564-14.03 0-22.577-7.74-8.466-7.66-9.192-22.013-1.935.322-3.79.403-1.774.161-3.467.161-12.66 0-23.06-4.193-10.322-4.193-17.579-12.176-7.257-7.982-11.208-19.593-3.87-11.611-3.87-26.528 0-14.676 3.87-26.287 3.87-11.692 11.289-19.997 7.096-7.902 17.578-12.095 10.563-4.193 22.98-4.193 12.901 0 23.142 4.274 10.32 4.193 17.497 12.014 7.338 8.064 11.208 19.755 3.951 11.692 3.951 26.529 0 22.012-9.03 37.09-8.951 15.079-24.11 21.126.323 9.193 4.354 14.272 4.032 5.08 14.675 5.08 3.306 0 7.822-1.048 4.596-.968 6.531-1.774h2.177zm-19.03-89.421q0-23.384-10.482-36.043-10.482-12.74-28.624-12.74-18.304 0-28.786 12.74-10.402 12.659-10.402 36.043 0 23.625 10.644 36.204 10.643 12.498 28.544 12.498 17.9 0 28.463-12.498 10.644-12.58 10.644-36.204z" aria-label="Q" style="font-size:165.136px;font-family:Asap;fill:#fff;stroke-width:0" transform="scale(1.02895 .97186)"/></svg></span>';
        const zSVG = '<span><svg xmlns="http://www.w3.org/2000/svg" xml:space="preserve" width="2em" height="2em" viewBox="-35 -35 431.855 431.855"><path d="M301.2 53.5H75.15c-10.875 0-19.718 8.842-19.718 19.713v230.91c0 10.868 8.843 19.711 19.718 19.711H301.2c10.867 0 19.71-8.843 19.71-19.711v-230.9c0-10.87-8.843-19.718-19.71-19.718zM338.18 0H38.17C18.601 0 2.726 15.869 2.726 35.439v306.46c0 19.573 15.875 35.439 35.443 35.439h300.01c19.569 0 35.444-15.866 35.444-35.439V35.429c.001-19.565-15.874-35.434-35.443-35.434zm-3.295 304.12c0 18.567-15.113 33.687-33.685 33.687H75.15c-18.574 0-33.693-15.114-33.693-33.687V73.22c0-18.569 15.114-33.688 33.693-33.688H301.2c18.566 0 33.685 15.114 33.685 33.688v230.9z"/><path fill="#fff" stroke-width="0" d="M196.208 208.468H81.133v-16.115l90.416-98.878H84.497V78.06h109.53v15.678l-91.31 99.32H196.2z" aria-label="Z"/></svg></span>';
        const xSVG = '<span><svg xmlns="http://www.w3.org/2000/svg" xml:space="preserve" width="2em" height="2em" viewBox="-35 -35 431.855 431.855"><path d="M301.197 53.5H75.151c-10.875 0-19.718 8.842-19.718 19.713v230.909c0 10.868 8.843 19.711 19.718 19.711h226.046c10.867 0 19.71-8.843 19.71-19.711V73.218c0-10.87-8.843-19.718-19.71-19.718zM338.177 0H38.165C18.596 0 2.721 15.869 2.721 35.439v306.464c0 19.573 15.875 35.439 35.443 35.439h300.012c19.57 0 35.444-15.866 35.444-35.439V35.434C373.621 15.869 357.746 0 338.177 0zm-3.295 304.122c0 18.567-15.113 33.687-33.685 33.687H75.151c-18.574 0-33.693-15.114-33.693-33.687V73.218c0-18.569 15.114-33.688 33.693-33.688h226.046c18.566 0 33.685 15.114 33.685 33.688v230.904z"/><path d="m85.35 74.883-6.024 8.625 6.012 8.825h-2.684l-4.757-7.184-4.875 7.184H70.49l6.082-8.72-5.941-8.73h2.672l4.7 7.09 4.804-7.09z" aria-label="X" style="font-size:24px;font-family:Asap;fill:#fff;stroke-width:0" transform="matrix(8.45075 0 0 7.47376 -520.314 -481.612)"/></svg></span>';
        const mSVG = '<span><svg xmlns="http://www.w3.org/2000/svg" xml:space="preserve" width="2em" height="2em" viewBox="-35 -35 431.855 431.855"><path d="M301.197 53.5H75.151c-10.875 0-19.718 8.842-19.718 19.713v230.909c0 10.868 8.843 19.711 19.718 19.711h226.046c10.867 0 19.71-8.843 19.71-19.711V73.218c0-10.87-8.843-19.718-19.71-19.718zM338.177 0H38.165C18.596 0 2.721 15.869 2.721 35.439v306.464c0 19.573 15.875 35.439 35.443 35.439h300.012c19.57 0 35.444-15.866 35.444-35.439V35.434C373.621 15.869 357.746 0 338.177 0zm-3.295 304.122c0 18.567-15.113 33.687-33.685 33.687H75.151c-18.574 0-33.693-15.114-33.693-33.687V73.218c0-18.569 15.114-33.688 33.693-33.688h226.046c18.566 0 33.685 15.114 33.685 33.688v230.904z"/><path d="M87.576 92.333h-2.32V77.297l-4.852 10.231h-1.382l-4.817-10.23v15.035h-2.168v-17.45h3.164l4.653 9.715 4.5-9.715h3.222z" aria-label="M" style="font-size:24px;font-family:Asap;fill:#fff;stroke-width:0" transform="matrix(7.51653 0 0 7.47376 -463.129 -480.877)"/></svg></span>';
        const tabSVG = '<span><svg xmlns="http://www.w3.org/2000/svg" xml:space="preserve" width="2.5em" height="2em" viewBox="35 -35 431.855 431.855"><path stroke="null" d="M410.712 53.5H101.64c-14.869 0-26.96 8.842-26.96 19.713v230.91c0 10.867 12.091 19.71 26.96 19.71h309.072c14.859 0 26.95-8.843 26.95-19.71V73.217c0-10.87-12.091-19.718-26.95-19.718zM461.275 0H51.07C24.313 0 2.607 15.87 2.607 35.44v306.463c0 19.573 21.706 35.44 48.461 35.44h410.205c26.757 0 48.463-15.867 48.463-35.44V35.434C509.737 15.87 488.03 0 461.275 0zm-4.506 304.122c0 18.567-20.663 33.687-46.057 33.687H101.64c-25.396 0-46.068-15.114-46.068-33.687V73.218c0-18.569 20.665-33.688 46.068-33.688h309.072c25.385 0 46.057 15.114 46.057 33.688v230.904z"/><g aria-label="TAB" style="font-size:165.131px;font-family:Asap;fill:#fff;stroke-width:0"><path d="M203.55 133.26h-39.49v114.997h-14.698V133.26h-39.49v-15.415h93.678zM296.634 248.257H280.97l-10.837-36.347H222.33l-10.838 36.347h-14.92l40.232-130.412h19.597zm-31.028-51.237-19.374-64.023-19.449 64.023zM396.77 208.144q0 9.721-3.118 17.166-3.118 7.444-8.388 12.261-6.235 5.78-13.733 8.233-7.423 2.453-18.928 2.453H313.41V117.845h32.735q12.1 0 18.112 1.051 6.012 1.051 11.505 4.38 6.087 3.766 8.834 9.721 2.746 5.868 2.746 14.101 0 9.284-4.008 15.853-4.008 6.48-10.69 10.422v.7q11.21 2.716 17.668 11.65 6.457 8.845 6.457 22.42zm-24.719-58.769q0-4.73-1.336-7.97-1.336-3.24-4.305-5.255-3.49-2.364-8.463-2.89-4.973-.613-12.322-.613h-17.518v37.66h19.003q6.903 0 10.986-.788 4.082-.875 7.571-3.503 3.489-2.627 4.9-6.744 1.484-4.204 1.484-9.897zm9.427 59.47q0-7.883-2.004-12.525t-7.275-7.883q-3.563-2.19-8.684-2.802-5.048-.701-12.323-.701h-23.085v48.521h19.448q9.65 0 15.811-1.139 6.161-1.226 10.095-4.379 4.157-3.415 6.087-7.795 1.93-4.379 1.93-11.298z"/></g></svg></span>';
        const fSVG = '<span><svg xmlns="http://www.w3.org/2000/svg" xml:space="preserve"  width="2em" height="2em" viewBox="-35 -35 431.855 431.855"><path d="M301.2 53.5H75.15c-10.875 0-19.718 8.842-19.718 19.713v230.91c0 10.868 8.843 19.711 19.718 19.711H301.2c10.867 0 19.71-8.843 19.71-19.711v-230.9c0-10.87-8.843-19.718-19.71-19.718zM338.18 0H38.17C18.601 0 2.726 15.869 2.726 35.439v306.46c0 19.573 15.875 35.439 35.443 35.439h300.01c19.569 0 35.444-15.866 35.444-35.439V35.429c.001-19.565-15.874-35.434-35.443-35.434zm-3.295 304.12c0 18.567-15.113 33.687-33.685 33.687H75.15c-18.574 0-33.693-15.114-33.693-33.687V73.22c0-18.569 15.114-33.688 33.693-33.688H301.2c18.566 0 33.685 15.114 33.685 33.688v230.9z"/><path fill="#fff" d="M100.77 224.65q-6.487 0-9.435-1.273-2.653-1.273-2.653-3.395V82.062q0-6.365 9.14-6.365h90.516q5.602 0 5.602 6.365v3.395q0 6.365-5.602 6.365h-73.12v53.683h68.403q5.896 0 5.896 6.366v3.395q0 6.365-5.896 6.365h-68.404v58.351q0 2.122-2.653 3.395-2.654 1.273-9.435 1.273z" aria-label="F" style="inline-size:10.611;white-space:pre"/></svg></span>'
        this.infoIconText = `
            <ul class="tooltip-slideshow-info">
                <li><span>Next slide:</span><span>${rightSVG} or ${dSVG}</span></li>
                <li><span>Previous Slide:</span><span>${leftSVG} or ${qSVG}</span></li>
                <li><span>Rotate Clockwise:</span><span>${eSVG}</span></li>
                <li><span>Rotate Anticlockwise:</span><span>${qSVG}</span></li>
                <li><span>Horizontal Flip:</span><span>${zSVG}</span></li>
                <li><span>Vertical Flip:</span><span>${xSVG}</span></li>
                <li><span>Maximize/Windowed:</span><span>${mSVG} or ${tabSVG}</span></li>
                <li><span>Enter/Exit Fullscreen:</span><span>${fSVG}</span></li>
            </ul>
            `;

        tooltip(document.getElementById('slideshow-info'), this.infoIconText, "top-end", "mouseover");

        const resizeObserver = new ResizeObserver((entries) => {
            this.showImage();
        })

        this.imageContainer.addEventListener('wheel', e => {
            if (e.buttons === 1) {
                this.rotateRecenter(true)
            } else {
                this.zoom(e)
            }
        }, { passive: true })

        this.imageContainer.addEventListener('mousedown', e => {
            const isCtrlPressed = e.getModifierState('Control')

            const imgHasBiggerWidth = this.prevRect.width > this.containerRect.width;
            const imgHasBiggerHeight = this.prevRect.height > this.containerRect.height;

            if ((imgHasBiggerHeight || imgHasBiggerWidth) && !isCtrlPressed) {
                this.drag(e, this.image)
            } else {
                this.mouseSelection(e, this.zoomToSelection);
            }
        })

        this.background.addEventListener('mousedown', e => {
            if (e.target !== this.background) { return }
            e.preventDefault();
            this.hide();
        })

        this.hide = () => {
            removeEventListener('keydown', this.keydownHandler);
            this.background.style.display = "none";
            this.isVisible = false;
            resizeObserver.disconnect();
            this.removeWillChange();
            document.documentElement.style.overflow = "initial";
        }

        this.show = (index = this.currentIndex) => {
            addEventListener('keydown', this.keydownHandler);
            this.background.style.display = "block";
            this.setIndex(index);
            this.isVisible = true;
            this.addWillChange();
            document.documentElement.style.overflow = "hidden";
        }

        this.close.addEventListener("click", this.hide);

        this.maxMode = () => {
            this.infoBox.style.display = "none";
            this.slideshow.style.cssText += 'height: 100%; width: 100%';
            document.querySelector('#max.tool-icon').style.display = "none";
            document.querySelector('#window.tool-icon').style.display = "flex";
        }

        this.windowMode = () => {
            this.infoBox.style.display = "flex";
            this.slideshow.style.cssText += 'height: 90%; width: 95%';
            document.querySelector('#max.tool-icon').style.display = "flex";
            document.querySelector('#window.tool-icon').style.display = "none";
        }


        this.keydownHandler = (e) => {
            if (e.key === "ArrowRight" || e.key === "d") {
                e.preventDefault();
                this.currentIndex = this.currentIndex + 1 > this.slides.length - 1 ? 0 : this.currentIndex + 1;
                this.setIndex(this.currentIndex);
            } else if (e.key === "ArrowLeft" || e.key === "a") {
                e.preventDefault();
                this.currentIndex = this.currentIndex - 1 < 0 ? this.slides.length - 1 : this.currentIndex - 1;
                this.setIndex(this.currentIndex);
            }
            if (e.key === "e") {
                e.preventDefault();
                this.rotateRecenter(true);
            }
            if (e.key === "q") {
                e.preventDefault();
                this.rotateRecenter(false);
            }
            if (e.key === "z") {
                e.preventDefault();
                this.flipX = -this.flipX;
                this.image.style.transform = this.assembleTransform();
            }
            if (e.key === "x") {
                e.preventDefault();
                this.flipY = -this.flipY;
                this.image.style.transform = this.assembleTransform();
            }
            if (e.key === "f") {
                e.preventDefault();
                if (!this.fullscreenElement()) {
                    resizeObserver.disconnect();
                    this.requestFullscreen(this.slideshow);
                } else if (this.fullscreenElement() === this.slideshow) {
                    this.exitFullscreen();
                }
            }
            if (e.key === "m" || e.key === "Tab") {
                e.preventDefault();

                if (this.fullscreenElement() === this.slideshow) { return }

                if (!this.maxScreen) {
                    this.maxMode();
                    this.maxScreen = true;
                } else {
                    this.windowMode()
                    this.maxScreen = false;
                }
            }
            if (e.key === "Escape") {
                e.preventDefault();
                this.hide();
            }
        }

        this.next.addEventListener('click', e => {
            e.preventDefault();
            this.currentIndex = this.currentIndex + 1 > this.slides.length - 1 ? 0 : this.currentIndex + 1;
            this.setIndex(this.currentIndex);
        })

        this.previous.addEventListener('click', e => {
            e.preventDefault();
            this.currentIndex = this.currentIndex - 1 < 0 ? this.slides.length - 1 : this.currentIndex - 1;
            this.setIndex(this.currentIndex);
        })


        document.querySelector('#zoomIn.tool-icon').addEventListener('click', e => {
            e.preventDefault();
            this.zoom(e, 1);
        })

        document.querySelector('#zoomOut.tool-icon').addEventListener('click', e => {
            e.preventDefault();
            this.zoom(e, 2);
        })

        document.querySelector('#rotateRight.tool-icon').addEventListener('click', e => {
            e.preventDefault();
            this.rotateRecenter(true);
        })

        document.querySelector('#rotateLeft.tool-icon').addEventListener('click', e => {
            e.preventDefault();
            this.rotateRecenter(false);
        })

        document.querySelector('#flipX.tool-icon').addEventListener('click', e => {
            e.preventDefault();
            this.flipX = -this.flipX;
            this.image.style.transform = this.assembleTransform();
        })

        document.querySelector('#flipY.tool-icon').addEventListener('click', e => {
            e.preventDefault();
            this.flipY = -this.flipY;
            this.image.style.transform = this.assembleTransform();
        })

        document.querySelector('#max.tool-icon').addEventListener('click', e => {
            e.preventDefault();
            this.maxMode();
            this.maxScreen = true;
        })

        document.querySelector('#window.tool-icon').addEventListener('click', e => {
            e.preventDefault();
            this.windowMode();
            this.maxScreen = false;
        })

        document.querySelector('#enterFull.tool-icon').addEventListener('click', e => {
            e.preventDefault();
            resizeObserver.disconnect();
            this.requestFullscreen(this.slideshow);
        })

        document.querySelector('#exitFull.tool-icon').addEventListener('click', e => {
            e.preventDefault();
            this.exitFullscreen();
        })
        document.querySelector('#ogSize.tool-icon').addEventListener('click', e => {
            e.preventDefault();
            this.showImage(1);
        })
        document.querySelector('#fitToScreen.tool-icon').addEventListener('click', e => {
            e.preventDefault();
            this.showImage();
        })

        addEventListener("fullscreenchange", (e) => {
            if (!this.isVisible) { return }
            if (this.fullscreenElement() === this.slideshow) {
                this.infoBox.style.display = "none";
                this.slideshow.style.cssText += 'height: 100%; width: 100%; border: none';
                document.querySelector('#enterFull.tool-icon').style.display = "none";
                document.querySelector('#exitFull.tool-icon').style.display = "flex";

                document.querySelector('#max.tool-icon').style.display = "none";
                document.querySelector('#window.tool-icon').style.display = "none";
            } else if (!this.fullscreenElement()) {
                this.infoBox.style.display = "flex";
                this.slideshow.style.cssText += 'height: 90%; width: 95%; border: 1px solid #ced4da;';
                document.querySelector('#enterFull.tool-icon').style.display = "flex";
                document.querySelector('#exitFull.tool-icon').style.display = "none";

                document.querySelector('#max.tool-icon').style.display = "flex";
                document.querySelector('#window.tool-icon').style.display = "none";
            }
            //  showImage method will be triggered since initiallizing the observe will call the observer
            resizeObserver.observe(this.slideshow);

        });

        this.assembleTransform = () => {
            return `scaleX(${this.scale * this.flipX}) scaleY(${this.scale * this.flipY}) rotate(${this.rotate}deg)`;
        }

        this.setIndex = (index) => {
            resizeObserver.disconnect();
            const slide = this.slides[index];
            this.info.innerHTML = "";
            this.info.appendChild(slide.info);
            this.image.src = photosArray[index];
            this.caption.innerText = slide.caption;
            this.currentIndex = index;

            this.loadIcon.style.display = "block";
            this.image.style.display = "none";

            if (this.image.complete) {
                //  showImage method will be triggered since initiallizing the observe will call the observer
                resizeObserver.observe(this.slideshow);
            } else {
                this.image.addEventListener('load', e => {
                    //  showImage method will be triggered since initiallizing the observe will call the observer
                    resizeObserver.observe(this.slideshow);
                }, { once: true })
            }
            this.count.innerText = `${this.currentIndex + 1}/${this.slides.length}`;
        }

        this.showImage = (customScale = null) => {

            this.loadIcon.style.display = "none";
            this.image.style.display = "block";
            this.reset();
            this.padding = 0;
            this.image.style.padding = `${this.padding}px`;

            // issue: if I store prevRect to initialRect then initialRect values change seemingly by themselves?
            // same if I declare image rect to a seperate var then asign it to the prevRect and initialRect
            this.prevRect = this.image.getBoundingClientRect();
            this.initialRect = this.image.getBoundingClientRect();

            this.containerRect = this.imageContainer.getBoundingClientRect();

            let maxRatio = 1;
            let maxWidthRatio = this.containerRect.width / (this.prevRect.width - this.padding * 2);
            let maxHeightRatio = this.containerRect.height / (this.prevRect.height - this.padding * 2);

            if ((this.prevRect.height - this.padding * 2) * maxWidthRatio >= this.containerRect.height) {
                maxRatio = maxHeightRatio;
            }
            else if ((this.prevRect.width - this.padding * 2) * maxHeightRatio > this.containerRect.width) {
                maxRatio = maxWidthRatio;
            }

            this.fitScale = maxRatio; // retain the fit to screen ratio
            this.scale = customScale ? customScale : maxRatio;

            this.image.style.transform = this.assembleTransform();

            // store new height/width values to rect var
            this.prevRect.height = this.prevRect.height * this.scale;
            this.prevRect.width = this.prevRect.width * this.scale;

            // prevent image from not being wholly scrollable
            let scaleOffsetX = (this.prevRect.width - this.prevRect.width / this.scale) / 2;
            let scaleOffsetY = (this.prevRect.height - this.prevRect.height / this.scale) / 2;

            let centerX = (this.containerRect.width - this.prevRect.width) / 2;
            let centerY = (this.containerRect.height - this.prevRect.height) / 2;

            let left = this.prevRect.width < this.containerRect.width ? scaleOffsetX + centerX : scaleOffsetX;
            let top = this.prevRect.height < this.containerRect.height ? scaleOffsetY + centerY : scaleOffsetY;

            this.image.style.translate = `${left}px ${top}px`;

            //   this.image.style.transform = `translate(${-centerX}, ${-centerY})`;

            this.zoomLevel.innerText = `${Math.round(100 * this.scale)}%`; // indicate percentage zoomed

            this.displayAppropriateIcon();

        }

        this.zoom = (e, btnZoom = 0) => {

            // to be used to find scale ratio after each zoom level
            let prevScale = this.scale;

            if (e?.wheelDelta > 0 || btnZoom == 1) {// scroll up
                this.scale = this.scale * 1.1;
            }

            if (e?.wheelDelta < 0 || btnZoom == 2) {// scroll down
                this.scale = this.scale / 1.1;
            }

            // moderate the scale level as to snap to 100% of the image and to fit to screen scale value.
            this.scaleControl(prevScale);

            // indicate percentage zoomed
            this.zoomLevel.innerText = `${Math.round(100 * this.scale)}%`;

            // apply transform
            this.image.style.transform = this.assembleTransform();

            // the new rect
            let rect = this.image.getBoundingClientRect();

            // position our image depending on the scale and rotation
            const pos = this.positionImage(rect);

            // -1 to 1 values indicating where our pointer is positioned relative to the center.
            // center is 0 0
            let ratioX = !btnZoom ? (e?.offsetX / this.containerRect.width) * 2 - 1 : 0;
            let ratioY = !btnZoom ? (e?.offsetY / this.containerRect.height) * 2 - 1 : 0;

            // the width ratio between the next and the previous one (not the initial one)
            let scaleRatio = rect.width / this.prevRect.width;

            // the length our center has moved away from the local view
            // found by getting the difference of the scaled container and the unscaled.
            // remember: the container width/height are also the width/height of the image in view.
            // if the image in view is scaled (became longer and taller) then the center in view has moved
            let centerOffsetX = (this.containerRect.width * scaleRatio - this.containerRect.width) / 2;
            let centerOffsetY = (this.containerRect.height * scaleRatio - this.containerRect.height) / 2;

            // choose between default center and offset center
            let centerX = this.prevRect.width < this.containerRect.width ? -pos.centerX : centerOffsetX;
            let centerY = this.prevRect.height < this.containerRect.height ? -pos.centerY : centerOffsetY;

            // zoom to where the pointer is pointing
            this.translateX = this.translateX * scaleRatio - centerX - centerX * ratioX;
            this.translateY = this.translateY * scaleRatio - centerY - centerY * ratioY;

            const threshold = this.getThresholds(pos);

            this.translateX += threshold.X;
            this.translateY += threshold.Y;

            this.image.style.translate = `${pos.left + this.translateX}px ${pos.top + this.translateY}px`;
                this.prevRect = rect;

            this.displayAppropriateIcon();
        }

        this.drag = (e, image) => {
            if (e.button !== 0) { return };
            e.preventDefault();
            this.move = move.bind(this);
            this.raf = raf.bind(this);
            this.stopDrag = stopDrag.bind(this);
            this.inertia = inertia.bind(this);
            let pos = this.positionImage(this.prevRect);
            let samples = [];

            window.addEventListener("mousemove", this.raf);
            window.addEventListener("mouseup", this.stopDrag);

            // will store last three pos values (difference between previous mouse position and current)
            // this will help is form an approximation of the dragging direction just before mouseup


            function raf(e) {
                requestAnimationFrame((timestamp) => { this.move(e, timestamp) })
            }

            let prevTime
            let curMouseX = e.clientX, curMouseY = e.clientY, posX = 0, posY = 0;

            function move(e, timestamp) {

                if (prevTime === timestamp) {
                    return
                };

                prevTime = timestamp;

                posX = curMouseX - e.clientX;
                posY = curMouseY - e.clientY;

                curMouseX = e.clientX; // replace previous X position with current
                curMouseY = e.clientY;// replace previous Y position with current

                const threshold = this.getThresholds(pos, posX, posY);

                this.translateX -= posX - threshold.X;
                this.translateY -= posY - threshold.Y;

                image.style.translate = `${pos.left + this.translateX}px ${pos.top + this.translateY}px`;

                if (samples.length == 4) {
                    samples.shift();
                };

                samples.push({ x: this.translateX, y: this.translateY, ts: performance.now() });
            }

            function stopDrag() {
                this.inertia(samples)
                window.removeEventListener("mousemove", this.raf);
                window.removeEventListener("mouseup", this.stopDrag);

            }

            let isMousedown = false;


            function inertia(sample) {
                // deduct the first point in the sample from the last to get point coords from 0,0

                if(sample.length < 4){return}
                const x = sample[sample.length - 1].x - sample[0].x;
                const y = sample[sample.length - 1].y - sample[0].y;

                // https://byjus.com/maths/distance-between-two-points-formula/#:~:text=What%20is%20Distance%20Between%20Two,%E2%80%93%20y1)%C2%B2).
                const distance = Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2));

                const speed = distance / (sample[sample.length - 1].ts - sample[0].ts)


                // Get the angle in radians of our point (which should be our pointer dragging direction)
                const angle = Math.atan2(y, x);

                let prevTimestamp = performance.now()
                let easing = 1;
                function scroll() {
                    let pos = this.positionImage(this.prevRect)

                    if (isMousedown) { return }
                    // add the ratio of a and h to X, o and h to Y
                    const timestamp = performance.now();
                    let timeBetweenFrames = timestamp - prevTimestamp;
                    prevTimestamp = timestamp;

                    //container.scrollBy( ((Math.cos(angle) * speed) * timeBetweenFrames) * easing, -(((Math.sin(angle) * speed) * timeBetweenFrames) * easing))

                    this.translateX += ((Math.cos(angle) * speed) * timeBetweenFrames) * easing
                    this.translateY += ((Math.sin(angle) * speed) * timeBetweenFrames) * easing

                    const threshold = this.getThresholds(pos);

                    this.translateX += threshold.X;
                    this.translateY += threshold.Y;

                    this.image.style.translate = `${pos.left + this.translateX}px ${pos.top + this.translateY}px`


                        //  easing-= easing > 0.5 ? 0.05 : 0.02
                        easing -= (easing * 0.04)

                    if (easing > 0.01 && !isMousedown) {
                        requestAnimationFrame(scroll.bind(this));
                    }
                }


                requestAnimationFrame(scroll.bind(this));

                // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/atan2
                function calcAngleDegrees(x, y) {
                    return (Math.atan2(y, x) * 180) / Math.PI;
                }

                addEventListener("mousedown", e => {
                    isMousedown = true
                }, { once: true })

            }
        }

        this.mouseSelection = (e, zoomToSelection) => {
            if (e.button !== 0) { return };
            e.preventDefault();
            const rectangle = document.getElementById("slideshow-rectangle");
            rectangle.style.display = "block";

            const offsetX = e.offsetX
            const offsetY = e.offsetY

            rectangle.style.left = `${offsetX + rectangle.parentNode.scrollLeft}px`;
            rectangle.style.top = `${offsetY + rectangle.parentNode.scrollTop}px`;

            addEventListener("mousemove", move);
            addEventListener("mouseup", zoom);
            addEventListener("contextmenu", stopDrag);

            let currentX = e.clientX, currentY = e.clientY, posX = 0, posY = 0;
            function move(eMove) {

                posX -= currentX - eMove.clientX;
                posY -= currentY - eMove.clientY;
                currentX = eMove.clientX; // replace previous X position with current
                currentY = eMove.clientY;// replace previous Y position with current

                if (posX > 0) {

                    rectangle.style.width = `${posX}px`;
                    rectangle.style.left = `${offsetX + rectangle.parentNode.scrollLeft}px`;
                } else {
                    rectangle.style.width = `${-posX}px`;
                    rectangle.style.left = `${posX + offsetX + rectangle.parentNode.scrollLeft}px`;
                }

                if (posY > 0) {
                    rectangle.style.height = `${posY}px`;
                    rectangle.style.top = `${offsetY + rectangle.parentNode.scrollTop}px`;
                } else {
                    rectangle.style.height = `${-posY}px`;
                    rectangle.style.top = `${posY + offsetY + rectangle.parentNode.scrollTop}px`;
                }
            }

            function stopDrag(e) {
                e?.preventDefault();
                removeEventListener("mousemove", move);
                removeEventListener("contextmenu", stopDrag);
                removeEventListener("mouseup", zoom);
                rectangle.style.cssText = "left: 0px; top: 0px; height: 0px; width: 0px; display: none";
            }

            function zoom(e) {
                e.preventDefault()
                let rect = rectangle.getBoundingClientRect();
                zoomToSelection(rect);
                stopDrag();
            }

        }

        this.zoomToSelection = (selectionRect) => {
            if (selectionRect.width <= 3 && selectionRect.height <= 3) { return };
            //persisting issues:
            // select and change slide

            this.prevRect = this.image.getBoundingClientRect();
            // width/height of our image before being scaled
            let priorWidth = this.prevRect.width;
            let priorHeight = this.prevRect.height;

            // the pixels needed for the photo to be centered
            let priorCenterX = (this.containerRect.width - this.prevRect.width) / 2;
            let priorCenterY = (this.containerRect.height - this.prevRect.height) / 2;

            // how much the photo is shifted from the center
            let scrollCenterOffsetX = this.prevRect.width > this.containerRect.width ? Math.abs(this.translateX) + priorCenterX : 0;
            let scrollCenterOffsetY = this.prevRect.height > this.containerRect.height ? Math.abs(this.translateY) + priorCenterY : 0;

            // get the scale of the image before resetting & updating
            let priorScale = this.scale;

            // reset our slideshow
            this.reset(false);

            // find the scale for the selection so it fits the screen
            let maxRatio = 1;
            let maxWidthRatio = this.containerRect.width / selectionRect.width;
            let maxHeightRatio = this.containerRect.height / selectionRect.height;

            if (selectionRect.height * maxWidthRatio >= this.containerRect.height) {
                maxRatio = maxHeightRatio;
            }
            else if (selectionRect.width * maxHeightRatio > this.containerRect.width) {
                maxRatio = maxWidthRatio;
            }

            // have to take into acccount the current scale of our image
            this.scale = maxRatio * priorScale;
            this.image.style.transform = this.assembleTransform();

            // the difference between the previous and the next scale
            // needed as we won't always be zooming in from scale 1
            let scaleDiff = (this.scale / priorScale);

            // our new image height and width
            this.prevRect.height = this.prevRect.height * scaleDiff;
            this.prevRect.width = this.prevRect.width * scaleDiff;

            // the height and width difference of our image before being scaled and the container
            let imageSizeDiffX = (this.containerRect.width - priorWidth) / 2;
            let imageSizeDiffY = (this.containerRect.height - priorHeight) / 2;

            // the left and top values of our selection within the container
            let selectionleft = selectionRect.left - this.containerRect.left;
            let selectionTop = selectionRect.top - this.containerRect.top;

            // the left and top of selection based on the image
            const selectionDisplaceX = selectionleft - imageSizeDiffX;
            const selectionDisplaceY = selectionTop - imageSizeDiffY;

            // the height and width difference of our scaled selection and the container. used for centering
            let selectionSizeDiffX = (this.containerRect.width - selectionRect.width * scaleDiff) / 2;
            let selectionSizeDiffY = (this.containerRect.height - selectionRect.height * scaleDiff) / 2;

            //const rectangle = document.getElementById("slideshow-rectangle");
            //rectangle.style.cssText += `height: ${selectionRect.height * (this.scale / priorScale)}px; width: ${selectionRect.width * (this.scale / priorScale)}px; left: ${(x - imageSizeDiffX) * (this.scale / priorScale)+ scrollCenterOffsetX* (this.scale / priorScale)}px; top: ${(y - imageSizeDiffY) * (this.scale / priorScale)+ scrollCenterOffsetY* (this.scale / priorScale)}px`;

            const pos = this.positionImage(this.prevRect)

            this.translateX = -(selectionDisplaceX * scaleDiff - selectionSizeDiffX + scrollCenterOffsetX * scaleDiff);
            this.translateY = -(selectionDisplaceY * scaleDiff - selectionSizeDiffY + scrollCenterOffsetY * scaleDiff);

            const threshold = this.getThresholds(pos);
            console.log(this.translateX, this.translateY)

            this.translateX += threshold.X;
            this.translateY += threshold.Y;

            this.image.style.translate = `${pos.left + this.translateX}px ${pos.top + this.translateY}px`;

            this.zoomLevel.innerText = Math.round(100 * this.scale) + "%"; // indicate percentage zoomed

            this.displayAppropriateIcon();
        }

        this.positionImage = (rect = null) => {
            if (!this.initialRect) { return };

            if (!rect) { rect = this.image.getBoundingClientRect() };

            let center = this.rotatedCoords(0, 0, this.rotate);

            center.x += rect.width / 2;
            center.y += rect.height / 2;

            const rotatedDiffCx = center.x - (this.initialRect.width * this.scale) / 2
            const rotatedDiffCy = center.y - (this.initialRect.height * this.scale) / 2

            // transform-origin is set to default (center)
            // so when scaling we have to make sure the image's top and left position don't become negative when scale is over 1,
            // and the image doesn't drift off to the bottom right when scaled down. Essentially this works the same as transform-origin 0 0 but
            // with the benefit of the focus being to the top-left even after the image is rotated.
            // formula is: get current width/height and remove that from the initial width/height resulting in the amount of px the image has scaled.
            // devide by two since the image is scaled equally in all directions

            let scaleOffsetX = (this.initialRect.width * this.scale - this.initialRect.width) / 2;
            let scaleOffsetY = (this.initialRect.height * this.scale - this.initialRect.height) / 2;

            // Get X & Y values for centering the image within the container.
            // If the image is rotated the document won't consider this change and will act as if the image was never rotated
            // but getBoundingClientRect will consider this change and will provide the new width/height values
            // in this case we have to acquire the width as understood from the document - from the rect's height and vice versa for height
            let centerX = (this.containerRect.width - rect.width) / 2;
            let centerY = (this.containerRect.height - rect.height) / 2;

            // if the image is larger than it's container move it back into the container
            // if image width/height is bigger than the container's then stop centering since we need our scroll action to do it's thing (zoom where the pointer is).
            let left = rect.width < this.containerRect.width ? scaleOffsetX + centerX + rotatedDiffCx : scaleOffsetX + rotatedDiffCx;
            let top = rect.height < this.containerRect.height ? scaleOffsetY + centerY + rotatedDiffCy : scaleOffsetY + rotatedDiffCy;

            return { left: left, top: top, scaleOffsetX: scaleOffsetX, scaleOffsetY: scaleOffsetY, centerX: centerX, centerY: centerY, rotatedDiffCx: rotatedDiffCx, rotatedDiffCy: rotatedDiffCy, rect: rect };
        }

        this.rotateRecenter = (rotation) => {
            const rect = this.image.getBoundingClientRect();
            let pos = this.positionImage(rect);

            let rotateDir;

            if (rotation) { // if positive rotation
                this.rotate = Math.min(360, this.rotate + 9);
                rotateDir = 1;
            } else { // if negative rotation
                this.rotate = Math.max(-360, this.rotate - 9);
                rotateDir = -1;
            }
            if (this.rotate === 360 || this.rotate === -360) { this.rotate = 0 }; // default the -360 and 360 to zero

            this.image.style.transform = this.assembleTransform();
            pos = this.positionImage();

            // update our precRect with the new width/height
            this.prevRect.width = pos.rect.width;
            this.prevRect.height = pos.rect.height;

            const unrotatedWidth = this.initialRect.width * this.scale;
            const unrotatedHeight = this.initialRect.height * this.scale;

            // if scaled initial width/height is smaller than the view then get center pos else the scrolled left/top pos
            // Math abs the translateX & Y point since the negative translate transformation moves to the left/top and positive to the right/bottom
            const viewX = rect.width < this.containerRect.width ? -(this.containerRect.width - rect.width) / 2 : Math.abs(this.translateX);
            const viewY = rect.height < this.containerRect.height ? -(this.containerRect.height - rect.height) / 2 : Math.abs(this.translateY);

            // rotation matrix assumes origin of the rectange to the bottom left
            // so we have to translate the coordinates of our view's center on the image with that origin in mind
            const viewCenterX = viewX + this.containerRect.width / 2;
            const viewCenterY = rect.height - viewY - this.containerRect.height / 2; // translate Y in cartesian coord system

            const pointRotation = this.rotatedCoords(viewCenterX - rect.width / 2, viewCenterY - rect.height / 2, 9 * rotateDir); // we rotate it around the center of the image

            // since the image's transform-origin is the center of the original width/height we add those center values
            // plus the difference of the original center point and the rotated center point
            // minus our local view's half width/center to move our new point in the view's center

            // unrotatedWidth is added to simulate the rotation as if it initially was 0 degees. The actual rotation might have started from 9 or 18..n degrees etc
            // Add the minus sign since we used Math.abs when rotating the point and convert it to a back to a translate XY
            const newPositionX = -(pointRotation.x + unrotatedWidth/2 + pos.rotatedDiffCx - this.containerRect.width / 2);
            const newPositionY = -(-pointRotation.y + unrotatedHeight/2 + pos.rotatedDiffCy - this.containerRect.height / 2);

            this.translateX = pos.rect.width < this.containerRect.width ? 0 : newPositionX;
            this.translateY = pos.rect.height < this.containerRect.height ? 0 : newPositionY;

            const threshold = this.getThresholds(pos);

            this.image.style.translate = `${pos.left + this.translateX}px ${pos.top + this.translateY}px`;
        }

        this.rotatedCoords = (x, y, deg) => {
            // https://www.mathsisfun.com/sine-cosine-tangent.html
            // Sohcahtoa
            // sine cosine and tagent are ratios of sides
            // youtube.com/watch?v=OYuoPTRVzxY
            // https://gamedev.stackexchange.com/questions/86755/how-to-calculate-corner-positions-marks-of-a-rotated-tilted-rectangle

            // rotation matrix assumes a counter-clockwise rotation, as such we have to translate our rotation to match that
            let theta = 360 - deg === 360 ? 0 : 360 - deg

            let X = x * Math.cos(this.toRadians(theta)) - y * Math.sin(this.toRadians(theta));
            let Y = x * Math.sin(this.toRadians(theta)) + y * Math.cos(this.toRadians(theta));

            return { x: X, y: Y }
        }

        this.toRadians = (deg) => {
            // https://www.mathsisfun.com/geometry/radians.html
            return deg * (Math.PI / 180);
        }

        this.getThresholds = (pos, moveX = 0, moveY = 0) => {
            // pos.left and pos.top are so the image is does not scale out of the container in top left and brings it back in
            // this.translateX & this.translateY is the amount offseted from the top & left via dragging or zooming
            let thresholdX = 0, thresholdY = 0

            if (pos.rect.width <= this.containerRect.width) {
                thresholdX = -this.translateX;
            }
            // if image was dragged out of the container on the right
            else if (-(this.translateX - moveX) >= pos.rect.width - this.containerRect.width) {
                thresholdX = -(this.translateX - moveX) - (pos.rect.width - this.containerRect.width);
                // if offsetX (translateX) minus the pos.left is below 0 ~ unaltered image translate is minus
            }
            // if translate would be below zero - removing posX that's pushing the image in the container with offsetX (translateX)
            else if (-(this.translateX - moveX) < 0) {
                thresholdX = -(this.translateX - moveX);
            }

            if (pos.rect.height <= this.containerRect.height) {
                thresholdY = -this.translateY;
            }
            else if (-(this.translateY - moveY) >= pos.rect.height - this.containerRect.height) {
                thresholdY = -(this.translateY - moveY) - (pos.rect.height - this.containerRect.height);
            }
            else if (-(this.translateY - moveY) < 0) {
                thresholdY = -(this.translateY - moveY);
            }

            return { X: thresholdX, Y: thresholdY }
        }

        this.reset = (transform = true) => {
            // const rectangle = document.getElementById("slideshow-rectangle");
            // rectangle.style.cssText += "left: 0px; top: 0px; height: 0px; width: 0px;";

            if (transform) {
                this.rotate = 0;
                this.flipX = 1;
                this.flipY = 1;
            }
            this.translateX = 0;
            this.translateY = 0;
            this.scale = 1;
            this.image.style.transform = this.assembleTransform();

            // this.image.style.top = "0px";
            //this.image.style.left = "0px";
            // this.imageContainer.dispatchEvent(new Event('wheel')) // scrollHeight/scrollWidth remains the same even after programmaticaly changing src on the img element, this is a hack to reset them
        }

        this.displayAppropriateIcon = () => {
            if (Math.round(this.scale * 100) !== Math.round(this.fitScale * 100)) {
                document.querySelector('#fitToScreen.tool-icon').style.display = "flex";
                document.querySelector('#ogSize.tool-icon').style.display = "none";
            } else {
                document.querySelector('#fitToScreen.tool-icon').style.display = "none";
                document.querySelector('#ogSize.tool-icon').style.display = "flex";
            }
        }

        this.scaleControl = (prevScale) => {
            if (prevScale < 1 && this.scale > 1 || prevScale > 1 && this.scale < 1) { //snap to original size
                this.scale = 1;
            }
            else if ((prevScale > this.fitScale && this.scale < this.fitScale) || (prevScale < this.fitScale && this.scale > this.fitScale)) { //snap to fit to screen size
                this.scale = this.fitScale;
            }
            else if (this.scale < 0.01) { //lower bound
                this.scale = 0.01;
            }
            else if (this.scale > 100) { // upper bound
                this.scale = 100;
            }
        }

        this.addWillChange = () => {
            this.image.style.willChange = "transform";
        }

        this.removeWillChange = () => {
            this.image.style.willChange = "auto";
        }
    }

    set index(index) {
        this.setIndex(index);
    }

    set setCaption(text) {
        this.caption.innerText = text;
    }

}

    let slidesData = [];

    let photos = Array.from(document.querySelectorAll('img'));
    let photosArray = photos.map(el => el.src)
    let img = document.createElement('img');
    document.body.appendChild(img);
    img.style.cssText = "position: fixed; left: 0; right: 0; top: 0; bottom: 0; margin: auto; height: 90%; display: none; pointer-events: none; z-index: 9999999;"

    for (let i = 0; i < photos.length; i++) {
        let itemArray = {}

        const photo = photos[i]
        let caption = photo.alt
        let info = document.createElement('div')
        info = extractIfo(info)

        itemArray.caption = caption
        itemArray.info = info
        itemArray.index = i;

        slidesData.push(itemArray)

        photo.dataset.value = i;
        photo.removeAttribute('onclick');

        // photo.addEventListener('mouseover', ()=>{
        //     img.src = photosArray[i]
        //     img.style.display = "block"
        // })
        photo.addEventListener('mouseout', () => {
            img.style.display = "none"
        })
        photo.addEventListener('click', e => photoClickHandler(e, i))
        // photo.parentNode.style.height = "auto" // prevent the default action of cropping the image.
        // photo.parentNode.parentNode.parentNode.style.height = "min-content"

    }

    const slideshow = new Slideshow("slideshow_photos", slidesData);

    function photoClickHandler(e, index) {
        e.preventDefault()
        slideshow.show(index);
    }

    function extractIfo(infoElement) {
        infoElement = infoElement.cloneNode(true);
        let buttons = Array.from(infoElement.getElementsByTagName('button'));
        let inputs = Array.from(infoElement.getElementsByTagName('input'));

        buttons.forEach(button => {
            button.parentNode.remove()
        })

        inputs.forEach(input => {
            input.parentNode.remove()
        })

        Array.from(infoElement.children).forEach(child => {
            let name = child.innerText.trim().split(':')[0];
            child.innerHTML = child.innerText.replace(name, `<b>${name}</b>`)
        })

        let div = document.createElement("div");
        div.innerText = "Wow, such info, much wow\n loren ipsum and some other shit"

        return div;
    }
    appendCSS()
    function appendCSS() {
        let style = document.createElement("style");
        let css = `

    `;

        style.innerHTML = css;
        style.type = "text/css";
        document.head.appendChild(style);
    }

    function tooltipCreate(tooltip, element, comment, placement, arrow, type) {

        let elRect = element.getBoundingClientRect();

        let offsetArrow = 8;

        let centeredTip = (elRect.width - tooltip.offsetWidth) / 2;
        let centeredArrow = (tooltip.offsetWidth / 2) - (arrow.offsetWidth / 2);
        let top = elRect.top - tooltip.offsetHeight + Math.ceil(scrollY) - 20;
        let bottom = elRect.top + elRect.height + Math.ceil(scrollY) + 20;
        let center = elRect.left + centeredTip + Math.ceil(scrollX);
        let start = center - centeredArrow + offsetArrow;
        let end = center + centeredArrow - offsetArrow;

        let yPlacement, xPlacement, arrowX

        if (placement.indexOf("bottom") > -1) {
            if (bottom + tooltip.offsetHeight > tooltip.parentElement.offsetHeight) {
                yPlacement = top
                cssStyle(arrow, "bottom: -8px; top: initial; transform: rotate(180deg)");
                if (type !== "menu") {
                    tooltip.className = "tooltip tip-bottom";
                }
            } else {
                yPlacement = bottom
                cssStyle(arrow, "bottom: initial; top: -8px; transform: rotate(0deg)");
                if (type !== "menu") {
                    tooltip.className = "tooltip tip-top";
                }
            }
        }
        if (placement.indexOf("top") > -1) {
            if (top < 0) {
                yPlacement = bottom;
                cssStyle(arrow, "bottom: initial; top: -8px; transform: rotate(180deg)");
                if (type !== "menu") {
                    tooltip.className = "tooltip tip-top";
                }
            } else {
                yPlacement = top;
                cssStyle(arrow, "bottom: -8px; top: initial; transform: rotate(0deg)");
                if (type !== "menu") {
                    tooltip.className = "tooltip tip-bottom";
                }
            }

        }
        if (placement.indexOf("start") > -1) {
            if (start < 0) {
                xPlacement = start - start;
                arrowX = offsetArrow - start;
            } else {
                xPlacement = start;
                arrowX = offsetArrow;
            }
        }
        if (placement.indexOf("end") > -1) {
            if (end + tooltip.offsetWidth > tooltip.parentElement.offsetWidth) {
                xPlacement = end - (end + tooltip.offsetWidth - tooltip.parentElement.offsetWidth);
                arrowX = offsetArrow + (end + tooltip.offsetWidth - tooltip.parentElement.offsetWidth);
            } else {
                xPlacement = end;
                arrowX = offsetArrow;
            }
        }

        if (placement == "top-center") {
            placeToolTip(yPlacement, center, centeredArrow, 'left');
        }
        if (placement == "top-start") {
            placeToolTip(yPlacement, xPlacement, arrowX, 'right');
        }
        if (placement == "top-end") {
            placeToolTip(yPlacement, xPlacement, arrowX, 'left');
        }
        if (placement == "bottom-center") {
            placeToolTip(yPlacement, center, centeredArrow, 'left');
        }
        if (placement == "bottom-start") {
            placeToolTip(yPlacement, xPlacement, arrowX, 'right');
        }
        if (placement == "bottom-end") {
            placeToolTip(yPlacement, xPlacement, arrowX, 'left');
        }

        function placeToolTip(side, bodyPos, arrowPos, prop) {
            cssStyle(tooltip, `top: ${side}px; left: ${bodyPos}px;`);
            arrow.style[prop] = `${arrowPos}px`;
        }

    }

    function tooltip(element, comment, placement, event, type = "text") {
        const container = document.createElement('div');
        const message = document.createElement('span');
        const arrowUp = document.createElement('div');
        const arrowDown = document.createElement('div');
        const close = document.createElement('span')

        close.innerText = "\u2716";

        container.className = "tooltip"
        message.className = "tooltip_message"
        arrowUp.className = "arrow-up"
        arrowDown.className = "arrow-down"
        arrowDown.className = "arrow-down"
        close.className = "close";
        container.dataset.visible = false;
        tooltipCSS();

        if (type === "text") {
            message.innerHTML = comment;
        } else if (type === "prompt") {
            message.innerText = "";
            typeof comment !== "string" ? message.appendChild(comment) : message.innerHTML = comment;
            container.appendChild(close);
        } else if (type === "menu") {
            message.innerText = "";
            message.appendChild(comment);
        }

        const arrow = getArrow(placement);

        container.appendChild(message);
        container.appendChild(arrowUp);
        container.appendChild(arrowDown);

        document.body.appendChild(container);

        element.addEventListener(event, mouseActionHandler);
        close.addEventListener('click', hideTooltip);

        function getArrow(placement) {
            if (placement.indexOf('top') > -1) {
                if (type !== "menu") {
                    container.className += ' tip-bottom';
                }
                return arrowDown;
            }
            if (placement.indexOf('bottom') > -1) {
                if (type !== "menu") {
                    container.className += ' tip-top';
                }
                return arrowUp;
            }
        }

        function mouseActionHandler() {
            tooltipCreate(container, element, comment, placement, arrow, type);
            let isVisible = container.dataset.visible === "true";

            window.addEventListener("mousewheel", hideTooltip);

            if (type === "text") {
                displayTooltip();
                element.addEventListener('mouseout', hideTooltip);
            } else {
                if (!isVisible) {
                    window.addEventListener('mousedown', mousedownHandler);
                    container.addEventListener('mouseout', mouseoutClick);
                    container.addEventListener('mouseover', mouseoverClick)
                    displayTooltip();
                } else {
                    hideTooltip();
                }

            }
        }

        function mousedownHandler(e) {
            if (e.target === element) return;
            hideTooltip(e)
        }

        function mouseoutClick(e) {
            window.addEventListener('mousedown', mousedownHandler);
        }

        function mouseoverClick(e) {
            window.removeEventListener('mousedown', mousedownHandler);
        }

        function displayTooltip() {
            container.style.pointerEvents = "initial"
            container.style.opacity = "1";
            if (type !== "menu") {
                arrow.style.opacity = "1";
            }
            container.style.pointerEvents = "all";
            container.dataset.visible = true;
        }

        function hideTooltip(e) {
            container.style.pointerEvents = "none"
            arrow.style.opacity = "0";
            container.style.opacity = "0";
            container.style.pointerEvents = "none";
            container.dataset.visible = false;
            element.removeEventListener('mouseout', hideTooltip);
            window.removeEventListener("mousewheel", hideTooltip);

        }

        return container
    }


    function tooltipCSS() {
        let style = document.createElement("style");
        let css = `
    :root {
        --main: #5d7288;
        --tooltip-background: #ffffff82;
        --tooltip-accent: #383838;
        --tooltip-color: #383838;
        --tooltip-border: #222222;
        --tooltip-input: #e9e9e9a8;
        --tooltip-hover: #d6d6e4c9;
        --tooltip-active: #c5c5d4c9;
        --tooltip-seperator: #cbcbcc;
        --tooltip-icon: #7e7e7e;
        --border-color: #dadce0;
        --shadow: #76767670;
        --input-border: #aba6cd;
    }
    .tooltip {
        padding: 8px;
        background-color: var(--tooltip-background);
        color: var(--tooltip-color);
        border: 1px solid var(--border-color);
        border-radius: 4px;
        position: absolute;
        -webkit-transition: background-color 0.15s ease-in;
        transition: opacity 0.15s ease-in;
        opacity: 0;
        backdrop-filter: blur(2px);
        box-shadow: 4px 5px 7px -1px var(--shadow);
        line-height: 1em;
        font-weight: 600;
        font-size: 13px;
        pointer-events: none;
}
    .tip-top {
        border-top: 2px solid var(--main);
    }
    .tip-bottom {
        border-bottom: 2px solid var(--main);
    }
    .arrow-down {
        content: "";
        background-color: var(--tooltip-accent);
        position: absolute;
        width: 13px;
        height: 8px;
        bottom: -8px;
        opacity: 0;
        pointer-events: none;
        transition: opacity 0.15s ease-in;
        clip-path: polygon(0 0, 50% 100%, 100% 0);
        text-align: -webkit-center;
    }
    .arrow-up {
        content: "";
        background-color: var(--tooltip-accent);
        position: absolute;
        width: 13px;
        height: 8px;
        top: -8px;
        opacity: 0;
        pointer-events: none;
        transition: opacity 0.15s ease-in;
        clip-path: polygon(50% 0%, 0% 100%, 100% 100%);
        text-align: -webkit-center;
    }
    .close {
        background-color: transparent;
        color: var(--tooltip-active);
        border-radius: 3px;
        border: none;
        float: right;
        height: 1em;
        width: 1em;
        cursor: pointer;
        font-size: 0.5em;
    }
    .tooltip button {
        background-color: var(--body);
        outline: none;
        border: 1px solid var(--border-color);
        border-radius: 4px;
        color: var(--tooltip-accent);
        cursor: pointer;
        padding: initial;
        overflow: hidden;
        position: relative;
        font-variation-settings: "wght"470;
        height: 29px;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        transition: transform 0.1s ease-in;
        user-select: none;
        background-color: var(--tooltip-input);
        border: none;
        color: var(--tooltip-color);
        width: 61px;
        font-variation-settings: "wght"410;
        margin-left: 3px;
        margin-top: 5px;
        float: right;
    }
    .tooltip button:hover {
        border: 1px solid var(--input-border);
        transform: translate(0px, -2px);
    }
    .tooltip button:active {
        transform: translate(0px, 0px);
    }
    `;

        style.innerHTML = css;
        style.type = "text/css";
        document.head.appendChild(style);
    }

    function cssStyle(el, string) {
        let styles = string.split(';');
        styles = styles.map(val => val.trim())

        styles.forEach(style => {
            style = style.split(':');
            el.style[style[0]] = style[1];
        })
    }
})();
