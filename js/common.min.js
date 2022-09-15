const MAX_ENEMY = 7;
const HEIGHT_ELEM = 120;

const score    = document.querySelector('.score'),
			start    = document.querySelector('.start'),
			gameArea = document.querySelector('.gameArea'),
			wrapArea = document.querySelector('.wrapArea'),
			car      = document.createElement('div'),
			topScore = document.getElementById('topScore'),
			mir      = document.querySelector('.game');

const easeaudio = new Audio('music/music1.mp3');
			easeaudio.volume = 0.2;
			easeaudio.loop = true;
const normalaudio = new Audio('music/music2.mp3');
			normalaudio.volume = 0.2;
			normalaudio.loop = true;
const hardaudio = new Audio('music/music3.mp3');
			hardaudio.volume = 0.2;
			hardaudio.loop = true;

const crash  = new Audio('music/crash.mp3');
			crash.volume = 0.2;
const rabota = new Audio('music/rabota.mp3');
			rabota.volume = 0.3;
const zagloh = new Audio('music/zagloh.mp3');
			zagloh.volume = 0.2;





// querySelector() - возвращает первый элемент документа, который соответствует указанному селектору			
// addEventListener() - это встроенная функция в JavaScript, которая принимает событие для прослушивания и второй аргумент, который вызывается всякий раз, когда описанное событие запускается.
/* classList - это свойство, которое открывает нам доступ к четырём методам.
add – добавление класса;
remove – удаление класса;
toggle – переключение класса;
contains – проверка наличия класса у элемента.
*/
// event - объект события
// requestAnimationFrame() - метод для отрисовки анимации 
// createElement() - добавить/создать элемент
// appendChild() - добавить вложенный элемент






car.classList.add('car');
const countSection = Math.floor(document.documentElement.clientHeight / HEIGHT_ELEM);
gameArea.style.height = countSection * HEIGHT_ELEM;

start.addEventListener('click', startGame);
document.addEventListener('keydown', startRun);
document.addEventListener('keyup', stopRun);

const keys = {
	ArrowUp: false,
	ArrowDown: false,
	ArrowRight: false,
	ArrowLeft: false
};

const setting = {
	start: false,
	score: 0,
	speed: 0,
	traffic: 0,
	level: 0
};





let level = setting.level

const result = parseInt(localStorage.getItem('nfjs_score', setting.score));
console.log("result", result)

topScore.textContent = result ? result : 0;


const addLocalStorage = () => {
	if	(result < setting.score) {
		localStorage.setItem('nfjs_score', setting.score);
		topScore.textContent = setting.score;
	}
}


function getQuantityElements(heightElement) {
	return (gameArea.offsetHeight / heightElement) + 1;

}

function startGame(event) {
	
	const target = event.target;
	wrapArea.innerHTML = '';

	if(target === start) return;

	switch (target.id){
		case 'ease':
			setting.speed = 4;
			setting.traffic = 4;
			easeaudio.play();
			rabota.play();
			
		break;
		case 'normal':
			setting.speed = 6;
			setting.traffic = 3;
			normalaudio.play();
			rabota.play();
		break;
		case 'hard':
			setting.speed = 8;
			setting.traffic = 2.5;
			hardaudio.play();
			rabota.play();
		break;

	}
	
	start.classList.add('hide');
	gameArea.innerHTML = '';

	
	for (let i = 0; i < getQuantityElements(HEIGHT_ELEM); i++) {
		const line = document.createElement('div');
		line.classList.add('line');
		line.style.top = (i * HEIGHT_ELEM) +'px';
		line.style.height = (HEIGHT_ELEM / 2) + 'px';
		line.y = i * HEIGHT_ELEM;
		gameArea.appendChild(line);

	}


	
	for (let i = 0; i < 1 ; i++) {
		const tree = document.createElement('div');
		tree.classList.add('tree');
		tree.style.top = (i * HEIGHT_ELEM) +'px';
		tree.y = i * HEIGHT_ELEM / 2;
		wrapArea.appendChild(tree);

	}


	for (let i = 0; i < getQuantityElements(HEIGHT_ELEM); i++) {
		const line = document.createElement('div');
		line.classList.add('line');
		line.style.top = (i * HEIGHT_ELEM) +'px';
		line.style.height = (HEIGHT_ELEM / 2) + 'px';
		line.y = i * HEIGHT_ELEM;
		gameArea.appendChild(line);

	}

	for (let i = 0; i < getQuantityElements(HEIGHT_ELEM * setting.traffic); i++ ){
		const enemy = document.createElement('div');
		const randomEnemy = Math.floor(Math.random() * MAX_ENEMY) + 1;
		enemy.classList.add('enemy');
		const periodEnemy = -HEIGHT_ELEM * setting.traffic * (i + 1);
		enemy.y = periodEnemy < 100 ? -100 * setting.traffic * (i + 1) : periodEnemy;
		enemy.style.top = enemy.y + 'px';
		enemy.style.background = `transparent url(images/dest/enemy${randomEnemy}.png) center / cover no-repeat`;
		gameArea.append(enemy);
		enemy.style.left = Math.floor(Math.random() * (gameArea.offsetWidth - enemy.offsetHeight )) + 'px';
	}

	setting.score = 0;
	setting.start = true;
	gameArea.append(car);
	car.style.left = gameArea.offsetWidth / 2 - car.offsetWidth / 2;
	car.style.top = 'auto';
	car.style.bottom = '10px';
	setting.x = car.offsetLeft;
	setting.y = car.offsetTop;
	requestAnimationFrame(playGame);
}





function playGame(){	

	setting.level = Math.floor(setting.score / 6000);  

	if (setting.level !== level) {
		level = setting.level;
		setting.speed += 1;
	}

// Мой код

const elemMir = document.querySelector('.tree');


if (setting.level < 5)  {
	mir.style.background = 'url(images/dest/ease.png)';
  } else if (setting.level >= 5 && setting.level < 10 ) {
	mir.style.background = 'url(images/dest/normal.png)';
	elemMir.style.background = `transparent url('images/dest/kaktus.png') center / cover no-repeat`;
  } else mir.style.background = 'url(images/dest/hard.png)',
         elemMir.style.background =`transparent url('images/dest/cherep.png') center / cover no-repeat`


// Конец кода


	if (setting.start){
		setting.score += setting.speed;
		score.innerHTML = 'Score<br>' + setting.score;
		moveRoad();
		moveEnemy();
		moveTree();
		if (keys.ArrowLeft && setting.x > 0) {
			setting.x -= setting.speed; 
			car.classList.add('rotateleft');
		} else car.classList.remove('rotateleft');
		if(keys.ArrowRight && setting.x < (gameArea.offsetWidth - car.offsetWidth)) { 
			setting.x += setting.speed;
			car.classList.add('rotateRight');
		} else car.classList.remove('rotateRight');
		if(keys.ArrowUp && setting.y > 0){
			setting.y -= setting.speed;
		}
		if(keys.ArrowDown && setting.y < (gameArea.offsetHeight - car.offsetHeight)) {
			setting.y += setting.speed;
		}

		car.style.left = setting.x + 'px';
		car.style.top = setting.y + 'px';

		requestAnimationFrame(playGame);
	}
}





function startRun(event) {	
	
	if (keys.hasOwnProperty(event.key)) {
		event.preventDefault();
		keys[event.key] = true;
	}
}

function stopRun(event) {
	
	if (keys.hasOwnProperty(event.key)) {
		event.preventDefault();
		keys[event.key] =false;
	}
}

function moveRoad() {
	let lines = document.querySelectorAll('.line');
	lines.forEach(function(line){
		line.y += setting.speed;
		line.style.top = line.y + 'px';

		if(line.y >= gameArea.offsetHeight){
			line.y = -HEIGHT_ELEM;	
		}

	});
}

function moveTree() {
	let trees = document.querySelectorAll('.tree');
	trees.forEach(function(tree){
		tree.y += setting.speed / 1.5;
		tree.style.top = tree.y + 'px';

		if(tree.y >= gameArea.offsetHeight){
			tree.y = -HEIGHT_ELEM;	
		}

	});
}


function moveEnemy() {
	let enemy = document.querySelectorAll('.enemy');
	enemy.forEach(function(item){
		let carRect = car.getBoundingClientRect();
		let enemyRect = item.getBoundingClientRect();
		if (carRect.top <= enemyRect.bottom - 3 &&
				carRect.right >= enemyRect.left + 5 &&
				carRect.left <= enemyRect.right - 5 &&
				carRect.bottom >= enemyRect.top + 3) {
				setting.start = false;	
				console.warn('ДТП');
				start.classList.remove('hide');
				start.style.top = score.offsetHeight;
				addLocalStorage();
				crash.play();
				zagloh.play();
				rabota.pause();
				easeaudio.pause();
				normalaudio.pause();
				hardaudio.pause();
		}

	item.y += setting.speed / 2;
	item.style.top = item.y + 'px';
	
	if(item.y >= gameArea.offsetHeight) {
		item.y = -HEIGHT_ELEM * setting.traffic;
		item.style.left = Math.floor(Math.random() * (gameArea.offsetWidth - item.offsetWidth )) + 'px';
		
	}
	

	});
}
