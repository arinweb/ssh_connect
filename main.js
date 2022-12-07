// VARIABLES LIST
var topBtn = document.querySelector(".topBtn");
var menu = document.querySelector(".menu");
var openMenu = document.querySelector(".menuBtn");
var closeMenu = document.querySelector(".closeBtn");




window.addEventListener("scroll", () => {

	var outScroll = window.scrollY;
	var help = document.querySelector(".help");
	var progressbar = document.querySelector(".progressbar");
	var bar = document.querySelectorAll(".progressbar .bar");

	var bodyClientHeight = document.body.clientHeight;


	var barPercent = ((outScroll * 100) / (bodyClientHeight - window.innerHeight));



	bar.forEach((e, len) => {
		e.style.width = `${barPercent}%`;
		e.style.transition = (len > 0) ? (len/1+"s"): "";
	});


	if (scrollY >= help.offsetHeight) {
		topBtn.classList.add("topBtn-Active");
		progressbar.classList.add("progressbar-Active");
	} else {
		topBtn.classList.remove("topBtn-Active");
		progressbar.classList.remove("progressbar-Active");
	}



	// REVEAL ANIMATIONS
	const reveals = document.querySelectorAll(".reveal");

	for (revealLen = 0; revealLen < reveals.length; revealLen++) {

		const windowHeight = window.innerHeight;
		const revealTop = reveals[revealLen].getBoundingClientRect().top;

		if (revealTop < windowHeight) {
			reveals[revealLen].classList.add("active");
		} else {
			reveals[revealLen].classList.remove("active");
		}
	}




});



topBtn.addEventListener("click", () => {
	scrollTo({
		top: 0,
		behavior: "smooth"
	});
});


function autoWrite(txt = "TEST", className = ".autoWriteText",
	speed = 10,
	delay = 0,
	infiniteMode = false,
	startCharacter = 0, i = 0, out = "", delayType = false) {
	setTimeout(() => {
		if (i < txt.length+1) {
			out = txt.slice(startCharacter, i);
			document.querySelector(className).innerHTML = out;
			i++;
			if (delayType) {
				delay = 0;
			} else {
				delay = 0;
				delayType = true;
			}
			setTimeout(function () {
				autoWrite(txt, className, speed, delay, infiniteMode, startCharacter, i, out, delayType);
			}, speed);
		}
	},
		delay);
	if (infiniteMode) {
		if (i == txt.length+1) {
			autoWrite(txt, className, speed, delay, infiniteMode, startCharacter, 0, "", delayType);
		}
	}
}
window.onload = () => {
	autoWrite(`
		Merhaba
		<h1>Hoşgeldiniz<br>
		<a click class="bizeUlas" href="tel:+905555555555">Bize Ulaşın</a><br>
		</h1>
		<i>+90 555 555 55 55</i>
		`, ".autoWriteText");





	function menuToggle() {
		menu.classList.toggle("menu-Active");
	}
	openMenu.addEventListener("click", menuToggle);
	closeMenu.addEventListener("click", menuToggle);




	function lineEffectTouch(e) {
		var x = e.touches[0].clientX;
		var y = e.touches[0].clientY;
		var effect = document.createElement("div");
		effect.style.position = "fixed";
		effect.style.background = "#400f8250";
		effect.style.boxShadow =
		"0px 0px 50px 10px #400f82,"
		+"0px 0px 100px 10px #400f82";
		effect.style.borderRadius = "5px";
		effect.style.top = y+"px";
		effect.style.left = x+"px";
		effect.style.width = "10px";
		effect.style.height = "10px";
		effect.style.zIndex = "100";
		document.body.appendChild(effect);
		setTimeout(() => {
			effect.remove();
		}, 100);
	}


	function lineEffectMouse(e) {
		var x = e.clientX;
		var y = e.clientY;
		var effect = document.createElement("div");
		effect.style.position = "fixed";
		effect.style.background = "#400f8250";
		effect.style.boxShadow =
		"0px 0px 50px 10px #400f82,"
		+"0px 0px 100px 10px #400f82";
		effect.style.borderRadius = "5px";
		effect.style.top = y+"px";
		effect.style.left = x+"px";
		effect.style.width = "10px";
		effect.style.height = "10px";
		effect.style.zIndex = "100";
		document.body.appendChild(effect);
		setTimeout(() => {
			effect.remove();
		}, 100);
	}


	window.addEventListener("mousestart", lineEffectMouse);
	window.addEventListener("mousemove", lineEffectMouse);
	window.addEventListener("touchmove", lineEffectTouch);
	window.addEventListener("touchstart", lineEffectTouch);

	// WEATHER API
	weatherRefresh();
}




function getDayName(dateStr, locale) {
	var date = new Date(dateStr);
	return date.toLocaleDateString(locale, {
		weekday: 'long'
	});
}





function weatherSuccess (position) {
	const weatherApi = {
		lat: position.coords.latitude,
		lon: position.coords.longitude,
		type: "metric",
		appid: "065adafa957b3dd0444d218e2da3cb86"
	}

	const weatherUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${weatherApi.lat}&lon=${weatherApi.lon}&units=${weatherApi.type}&appid=${weatherApi.appid}`;


	fetch(weatherUrl).then(e => e.json()).then(e => wList(e));


}

function wList(e) {
	document.querySelector(".weatherContainer .list ul").innerHTML = "";
	var iconId,
	wIcon,
	box,
	day,
	date = {
		length: 0
	},
	dateKeyStatus,
	i = 0,
	i2 = 0;




	[...e.list].forEach((e, len) => {


		const dateSplit = e.dt_txt.split(" ");

		var dateKeys = Object.keys(date);
		dateKeyStatus = dateKeys.find(e => (e == dateSplit[0]));


		if (dateKeyStatus !== undefined) {

			i++;

			const obj = {
				[dateSplit[1]]: {
					time: dateSplit[1],
					detail: e
				},
				[i]: {
					time: dateSplit[1],
					detail: e
				},
				length: i
			}
			Object.assign(date[dateSplit[0]].times, obj);
			Object.assign(date[i2-1].times, obj);



		} else {

			i = 0;

			Object.assign(date, {
				[dateSplit[0]]: {
					year: dateSplit[0],
					times: {
						[dateSplit[1]]: {
							time: dateSplit[1],
							detail: e
						},
						[i]: {
							time: dateSplit[1],
							detail: e
						},
						length: i
					}
				}
			});
			Object.assign(date, {
				[i2]: {
					year: dateSplit[0],
					times: {
						[dateSplit[1]]: {
							time: dateSplit[1],
							detail: e
						},
						[i]: {
							time: dateSplit[1],
							detail: e
						},
						length: i
					}
				}
			});


			date.length++;
			i2++;

		}



	});


	for (dateLen = 0; dateLen < date.length; dateLen++) {
		var out = date[dateLen];




		const iconId = out.times[0].detail.weather[0].id;

		if (iconId >= 200 && iconId <= 232) {
			wIcon = "storm.png";
		} else if (iconId >= 300 && iconId <= 321) {
			wIcon = "cloudy.png";
		} else if (iconId >= 500 && iconId <= 531) {
			wIcon = "heavy-rain.png";
		} else if (iconId >= 600 && iconId <= 622) {
			wIcon = "snow.png";
		} else if (iconId >= 800 && iconId <= 804) {
			wIcon = "sunny.png";
		}

		wIcon = `img/weather_img/${wIcon}`;
		day = ["Bugün",
			"Yarın"];

		if (dateLen+1 <= day.length) {
			var year = day[dateLen];
		} else {
			var year = getDayName(out.year, "tr-TR");
		}


		box = document.createElement("li");
		box.classList.add("reveal");
		box.innerHTML = `
		<img src="${wIcon}" class="image"/>
		<div class="infoBox">
		<p class="date">${year}</p>
		<b class="celcius">${Math.floor(out.times[0].detail.main.temp)} &#8451;<i class=""></i></b>
		</div>
		`;


		document.querySelector(".weatherContainer .list ul").appendChild(box);



	}
}

function weatherError (position) {
	console.log(position);
	document.querySelector(".weatherContainer .list ul").innerHTML = `
	<button onclick="weatherRefresh()" class="wRefresh">Tekrar Dene</button>
	`;
}



function weatherRefresh() {

	document.querySelector(".weatherContainer .list ul").innerHTML = `<i class="fa-solid fa-rotate fa-spin" style="font-size:4rem;padding:100px 0px;"></i>`;

	navigator.geolocation.getCurrentPosition(weatherSuccess, weatherError);

}


// form control
const formContainer = document.querySelector(".formContainer");
const form = formContainer.querySelector("form");
const postAll = form.querySelectorAll("input,textarea");


postAll.forEach(e => {


	e.addEventListener("input", (text) => {

		if (text.target.value == "") {
			text.target.style.borderBottom = "2px solid red";
		} else {
			text.target.style.borderBottom = "2px solid yellowgreen";
		}

	});


});