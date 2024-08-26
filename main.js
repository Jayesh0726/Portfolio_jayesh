import gsap, { Power1, Power2, Power4 } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import LocomotiveScroll from 'locomotive-scroll';
import * as THREE from 'three';
import 'remixicon/fonts/remixicon.css'
import SplitType from 'split-type';

gsap.registerPlugin(ScrollTrigger);
const locomotiveScroll = new LocomotiveScroll();



const world = {
	geoPlane: {
		width: 400,
		height: 400,
		widthSegments: 50,
		heightSegments: 50
	}
}

function generatePlane() {
	plane.geometry.dispose()
	
	plane.geometry = new THREE.PlaneGeometry( world.geoPlane.width,  world.geoPlane.height, world.geoPlane.widthSegments, world.geoPlane.heightSegments );
	const {array} = plane.geometry.attributes.position;
const randomValues = [];
for(let i = 0; i < array.length; i++){
	if(i % 3 === 0){
		const x = array[i];
	const y = array[i + 1];
	const z = array[i + 2];

	array[i] = x + (Math.random() - 0.5) * 3;	
	array[i + 1] = y +( Math.random() - 0.5) * 3;	
	array[i + 2] = z +( Math.random() - 0.5) * 5;
	}	

	randomValues.push(Math.random() * Math.PI * 2 )
}


plane.geometry.attributes.position.randomsValues = randomValues;
plane.geometry.attributes.position.originalposition = plane.geometry.attributes.position.array

	
	
	const colors = [];
	for (let i = 0; i < plane.geometry.attributes.position.count; i++){
		colors.push(0, .070, 1);
	}

	plane.geometry.setAttribute(
		'color',
		new THREE.BufferAttribute(new Float32Array(colors), 3)
	)
}
const raycaster = new THREE.Raycaster();
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, innerWidth / innerHeight, 0.1, 1000 );

const renderer = new THREE.WebGLRenderer();
renderer.setSize( innerWidth, innerHeight );
renderer.setPixelRatio(devicePixelRatio);

const container = document.querySelector('#threePlane');
container.appendChild(renderer.domElement);


camera.position.z = 50;

const geometry = new THREE.PlaneGeometry( world.geoPlane.width,
	world.geoPlane.height,
	world.geoPlane.widthSegments,
	world.geoPlane.heightSegments );
const material = new THREE.MeshPhongMaterial( { side: THREE.DoubleSide, flatShading:true , vertexColors: true} );
const plane = new THREE.Mesh( geometry, material );
scene.add( plane );

generatePlane();


const Light = new THREE.DirectionalLight( 0xffffff, 1 );
Light.position.set(0,1,1);
scene.add( Light );

const backLight = new THREE.DirectionalLight( 0xffffff, 1 );
backLight.position.set(0,0,-1);
scene.add( backLight );
const mouse = {
	x : undefined,
	y: undefined
}
let frame = 0;
function animate() {
	requestAnimationFrame( animate );
	renderer.render( scene, camera );
	raycaster.setFromCamera(mouse, camera);
	frame += 0.01;
const {array, originalposition , randomsValues} = plane.geometry.attributes.position
for(let i = 0 ; i < array.length ; i+= 3){

	array[i] = originalposition[i] + Math.cos(frame + randomsValues[i]) * 0.01;

	array[i + 1] = originalposition[i + 1] + Math.sin(frame + randomsValues[i + 1]) * 0.01;
}

plane.geometry.attributes.position.needsUpdate = true;
	const intersects = raycaster.intersectObject(plane)
	if(intersects.length > 0){
		const { color } = intersects[0].object.geometry.attributes

		// vertex 1
		color.setX(intersects[0].face.a, 0)
		color.setY(intersects[0].face.a, 0.278)
		color.setZ(intersects[0].face.a, 1)

		// vertex 2
		color.setX(intersects[0].face.b, 0)
		color.setY(intersects[0].face.b, 0.278)
		color.setZ(intersects[0].face.b, 1)

		// vertex 3
		color.setX(intersects[0].face.c, 0)
		color.setY(intersects[0].face.c, 0.278)
		color.setZ(intersects[0].face.c, 1)

	    intersects[0].object.geometry.attributes.color.needsUpdate = true

		const initialColor = {
			r: 0,
			g: 0.070,
			b: 1
		}

		const hoverColor = {
			r: 0,
			g: 0.278,
			b: 1
		}
		gsap.to( hoverColor, {
			r: initialColor.r,
			g: initialColor.g,
			b: initialColor.b,
			duration: 1,
			onUpdate: () => {
			// vertex 1
			color.setX(intersects[0].face.a, hoverColor.r)
			color.setY(intersects[0].face.a, hoverColor.g)
			color.setZ(intersects[0].face.a, hoverColor.b)

			// vertex 2
			color.setX(intersects[0].face.b, hoverColor.r)
			color.setY(intersects[0].face.b, hoverColor.g)
			color.setZ(intersects[0].face.b, hoverColor.b)

			// vertex 3
			color.setX(intersects[0].face.c, hoverColor.r)
			color.setY(intersects[0].face.c, hoverColor.g)
			color.setZ(intersects[0].face.c, hoverColor.b)

			color.needsUpdate = true;
			}
		})
	}
}

animate();

const componentsOfLeft = [
    { name: "React.js", image: "./Images/React-icon.svg" },
    { name: "Node.js", image: "./Images/Node.js_logo.svg" },
    { name: "Tailwind", image: "./Images/tailwind-css-2.svg" },
    { name: "Express.js", image: "./Images/Express.svg" },
    { name: "MongoDb", image: "./Images/mongodb-original.svg" }
  ];

  const componentsOfRight = [
    { name: "Html", image: "./Images/html5-icon-7.jpg"},
    { name: "css", image: "./Images/css3-icon-28.jpg"},
    { name: "javascript", image: "./Images/jsLogo.png"},
    { name: "bootstrap", image: "./Images/bootstrap.png"},
    { name: "gsap", image: "./Images/gsap.png"},
  ]

  function generateComponentHTML(component) {
    return `
      <div class="flex items-center gap-5">
      <div class="w-[3.8rem] h-[3.8rem] overflow-hidden rounded-full bg-slate-100 p-2 flex justify-center items-center">
	  <img class="object-cover object-center" src='${component.image}' alt="${component.name}-icon">
      </div>
      <h1>${component.name}</h1>
      </div>
    `;
  }
  
// Function to generate the HTML for all components
function generateAllComponentsHTML(components) {
    return components.map(component => generateComponentHTML(component)).join('');
  }
  
  // Get the container elements where you want to append the components
  const Leftcontainers = document.querySelectorAll('.leftSlides');
  const Rightcontainers = document.querySelectorAll('.rightSlides');
  // Generate and append the HTML for all components for each container
  Leftcontainers.forEach(container => {
    container.innerHTML = generateAllComponentsHTML(componentsOfLeft).repeat(3);
  });

  Rightcontainers.forEach(container => {
    container.innerHTML = generateAllComponentsHTML(componentsOfRight).repeat(3);
  });

  let nav = document.querySelector('nav')

  window.addEventListener('wheel',(event)=>{
		if(event.deltaY > 0){
			nav.style.opacity = '0'
			nav.style.top = '-100%'
			gsap.to('.markque',{
				transform: 'translateX(-400%)',
				repeat:-1,
				duration: 6,
				ease:'none',
			})
			gsap.to('.markque img', {
				rotate:0,
			})
		} else {
			nav.style.opacity = '1'
			nav.style.top = '0%'
			gsap.to('.markque',{
				transform: 'translateX(-200%)',
				repeat:-1,
				duration:6,
				ease: 'none',
			})
			gsap.to('.markque img', {
				rotate:-180,
			})
		}
  })


let openMenu = document.querySelector('.openMenuBar');
let closeMenu = document.querySelector('.closeMenuBar');
let Home = document.querySelector('#HomeMenu');
let About = document.querySelector('#AboutMenu');
let Project = document.querySelector('#ProjectMenu');
let Experience = document.querySelector('#ExperienceMenu');
let Contact = document.querySelector('#ContactMenu');


let timeline = gsap.timeline();
timeline.to('.menuSlider',{
	right: 0,
	duration: 0.7,
	ease: "power1.in"
})
timeline.from('.menuItems',{
	x:150,
	opacity:0,
	duration:0.3,
	stagger: 0.1,
})

timeline.from(closeMenu,{
	opacity:0
})
timeline.pause()
openMenu.addEventListener('click',()=>{
	timeline.play()
})
closeMenu.addEventListener('click',()=>{
	timeline.reverse()
})
Experience.addEventListener('click',()=>{
	timeline.reverse()
})
Home.addEventListener('click',()=>{
	timeline.reverse()
})
About.addEventListener('click',()=>{
	timeline.reverse()
})
Project.addEventListener('click',()=>{
	timeline.reverse()
})
Contact.addEventListener('click',()=>{
	timeline.reverse()
})

addEventListener('mousemove', (e)=>{
	mouse.x = (e.clientX / innerWidth) * 2 - 1;
	mouse.y = -(e.clientY / innerHeight) * 2 + 1;
	
})

function home(){
	gsap.set(".technicalSkills", {scale: 5}
	)
	
	var tl = gsap.timeline({
		scrollTrigger: {
		  trigger: ".home",
		  start: "top top",
		  end: "bottom top",
		  scrub: 2
		}
	})
	tl
	.to("#threePlane", {
		'--clip' : "0%",
		ease: Power2,
	}, 'a')
	.to(".technicalSkills", {
	scale: 1,
	ease: Power2
	}, 'a')
	.to(".leftSlides", {
	xPercent: -10,
	stagger: .03,
	ease: Power4
	}, 'b')
	.to(".rightSlides", {
	xPercent: 10,
	stagger: .03,
	ease: Power4
	}, 'b')
}

home();

let customCursor = document.querySelector('.customCursor');
let prall1 = document.querySelector('.prLinks1');
let prall2 = document.querySelector('.prLinks2');
let prall3 = document.querySelector('.prLinks3');
let main = document.querySelector('#main');
let prj1 = document.querySelector('.prj1');
function Cursor(item, cursor){

item.addEventListener('mouseenter', ()=>{

	gsap.to(cursor, {
		scale: 1
	})
})

item.addEventListener('mouseleave', ()=>{
	gsap.to(cursor, {
		scale: 0
	})
})

main.addEventListener('mousemove', (event)=>{
	console.log(event.x, event.y);
	gsap.to(cursor, {
		x: event.x,
		y: event.y,
		duration: .2,
	})
})

}



Cursor(main,customCursor);
Cursor(prall1, prj1);



{/* function prCursor(prall){
	prall.addEventListener('mouseenter',()=>{
		gsap.to(,{
			scale: 5
		})
	})
	prall.addEventListener('mouseleave',()=>{
		gsap.to(,{
			scale: 1
		})
	})
} */}

let hideCursor = document.querySelectorAll('.hideCursor');
hideCursor.forEach((items) =>{
	items.addEventListener('mouseenter',()=>{
		customCursor.style.display = 'none';
	})
	items.addEventListener('mouseleave',()=>{
		customCursor.style.display = 'block';
	})

})


function strings(){
	let initialPath = "M 40 100 Q 1000 100 1880 100";
	let finalPath = "M 40 100 Q 1000 100 1880 100";
	let string = document.getElementById('string');
	
	string.addEventListener('mousemove', (event)=>{
		initialPath = `M 40 100 Q ${event.x} ${event.y/3} 1880 100`;
		console.log(initialPath)
		gsap.to('svg path', {
			attr: {d:initialPath},
			duration:0.2,
			ease: 'power3.Out'
		})
	})
	
	string.addEventListener('mouseleave', ()=>{
		gsap.to('svg path', {
			attr: {d:finalPath},
			duration:1.5,
			ease: 'elastic.out(1.75,0.3)'
		})
	})
}

function projects(){
	gsap.to('.projects',{
		scrollTrigger: {
			trigger: ".projectsection",
			pin: true,
			start: "top top",
			end: 'bottom, bottom',
			endTrigger: '.last',
			scrub: 3
		},
		y: '-304%',
		ease: Power1,
	})
}


let aboutme = document.querySelector('.aboutMe');
function textanimation(text){
	let char = new SplitType(text , {types: 'chars,words'})
	gsap.from(char.chars, {
		scrollTrigger: {
			trigger: text,
			start: 'top 70%',
			end: 'bottom 75%',
			scrub: true
		},
		opacity: 0.3,
		stagger: 0.1
	})
}

textanimation(aboutme);

strings();
projects();