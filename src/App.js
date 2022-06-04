import './App.css';
import moment from 'moment';

function App() {
  var lastStreamedUTC = moment.utc('28 May 2022 04:03:12');
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
        <p className="msg"></p>
      </header>
    </div>
  );
}

var s3k = [ ['EVAN', 'https://twitch.tv/evan_gao'], ['WHODAT', 'https://twitch.tv/whodat950'], ['SYKIK', 'https://twitch.tv/sykiklive'] ];

function gottem() {
  /* Check if someone is live instead? */
  let randomS3K = s3k[Math.floor(Math.random() * s3k.length)];
  console.log(randomS3K);

  document.getElementsByClassName('sadge')[0].src = process.env.PUBLIC_URL + '/RIPBOZO.gif';
  document.getElementsByClassName('msg')[0].innerHTML = `<a href="${randomS3K[1]}">TIME TO WATCH ${randomS3K[0]} INSTEAD<br /><img src="${process.env.PUBLIC_URL}/OMEGADANCE.gif"></a>`;
  document.title = "RIPBOZO";
}

export default App;
