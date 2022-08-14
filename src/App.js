import './App.css';
import moment from 'moment';

(function loadYoutubeIFrameAPIScript() {
	const tag = document.createElement("script");
	tag.src = "https://www.youtube.com/iframe_api";

	const firstScriptTag = document.getElementsByTagName("script")[0];
	firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

	tag.onload = setupPlayer;
})();

var player, playing = false;

function setupPlayer() {
	window.YT.ready(() => {
		player = new window.YT.Player('yt-video', {
			height: '315',
			width: '560',
			videoId: '4r4N0gpfqLA',
			playerVars: { 'autoplay': 1 },
			events: {
				'onStateChange': onPlayerStateChange
			}
		});
	});	
}

function onPlayerStateChange(event) {
	let vid = document.getElementById("yt-video");

	if (event.data == window.YT.PlayerState.PLAYING) {
		if (vid.style.animationIterationCount == "0") {
			vid.style.animationIterationCount = "infinite";
		}
		vid.style.animationPlayState = "running";
		playing = true;
	} else if (event.data == window.YT.PlayerState.PAUSED) {
		vid.style.animationPlayState = "paused";
		playing = false;
	} else if (event.data == window.YT.PlayerState.ENDED) {
		vid.style.animationPlayState = "paused";
		vid.style.animationIterationCount = "0";
		vid.style.border = "3px solid black";

		playing = false;
	}
}

var streamInfo = undefined;

function App() {
  if (!streamInfo) {
    streamInfo = JSON.parse(getStreamInfo());
  }

  if (streamInfo.live === false) {
    // Not live... Sadge...
    var lastStreamedUTC = moment.unix(Math.trunc(streamInfo.lastLive / 1000)).utc();
    var timeNowUTC = moment.utc();
    
    var diffDays = timeNowUTC.diff(lastStreamedUTC, 'days');
    var diffHours = timeNowUTC.diff(lastStreamedUTC, 'hours') - (diffDays * 24);
    var diffMinutes = (timeNowUTC.diff(lastStreamedUTC, 'minutes') - (diffDays * 1440)) % 60;
    var diffSeconds = (timeNowUTC.diff(lastStreamedUTC, 'seconds') - (diffDays * 86400)) % 60;
    var diffMilliseconds = (timeNowUTC.diff(lastStreamedUTC, 'milliseconds') - (diffDays * 86400000)) % 1000;
    var msAsString = (diffMilliseconds < 10 ? '0' : '') + (diffMilliseconds < 100 ? '0' : '') + `${diffMilliseconds}`

    return (
      <div className="App">
        <header className="App-header">
          <p>
            Time since NegNeg left us:<br/>
            {diffDays} days, {diffHours} hours, {diffMinutes} minutes, {diffSeconds}.{msAsString} seconds
          </p>
          <img src= {process.env.PUBLIC_URL + "/sadge.png"} className='sadge' onClick={ () => gottem() } />
          <p className="msg">
			  <div id="yt-video"></div>
		  </p>
        </header>
      </div>
    );
  } else {
    // POGGIES LIVE!
    return (
      <div className="App">
        <header className="App-header">
          <a href='https://twitch.tv/negnegtm'>
            <img src= {process.env.PUBLIC_URL + "/POGGIES.png"} />
            <p>HOLY SHIT NEGNEG IS LIVE CLICK HERE NOW</p>
            <img src= {process.env.PUBLIC_URL + '/blazeit.gif'} />
          </a>
        </header>
      </div>
    );
  }
}

function getStreamInfo() {
  let req = new XMLHttpRequest();
  req.open('GET', 'https://ehv66vu4rpt2zcwtlp7uw6jt4e0oplor.lambda-url.us-east-2.on.aws/', false);
  req.send();
  return req.responseText;
}

var s3k = [ ['EVAN', 'https://twitch.tv/evan_gao'], ['WHODAT', 'https://twitch.tv/whodat950'], ['SYKIK', 'https://twitch.tv/sykiklive'], ['ROBYN', 'https://twitch.tv/water_addict'], ['AVGHANS', 'https://twitch.tv/avghans'], ['ASPECTICOR', 'https://twitch.tv/aspecticor'] ];
var currentS3K = s3k[Math.floor(Math.random() * s3k.length)];

function gottem() {
  /* Check if someone is live instead? */
  let randomS3K = undefined;

  // Loop until its a unique person. This should stop repeats.
  do {
    randomS3K = s3k[Math.floor(Math.random() * s3k.length)];
  } while (randomS3K[0] == currentS3K[0]);

  currentS3K = randomS3K;

  document.getElementsByClassName('sadge')[0].src = process.env.PUBLIC_URL + '/RIPBOZO.gif';
  document.getElementsByClassName('msg')[0].innerHTML = `<a href="${currentS3K[1]}">TIME TO WATCH ${currentS3K[0]} INSTEAD<br /><img src="${process.env.PUBLIC_URL}/OMEGADANCE.gif"></a>`;
  document.title = "RIPBOZO";
}

export default App;
