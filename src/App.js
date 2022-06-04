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
        <p class="msg"></p>
      </header>
    </div>
  );
}

function gottem() {
  document.getElementsByClassName('sadge')[0].src = process.env.PUBLIC_URL + '/RIPBOZO.gif';
  document.getElementsByClassName('msg')[0].innerHTML = `<a href="https://twitch.tv/evan_gao">TIME TO WATCH EVAN INSTEAD<br /><img src="${process.env.PUBLIC_URL}/OMEGADANCE.gif"></a>`;
  document.title = "RIPBOZO";
}

export default App;
