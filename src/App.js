import logo from './logo.svg';
import './App.css';
import { useEffect } from 'react';
import {Howl, Howler} from 'howler';

// import n from '/Notification.mp3';


function App() {

  const soundPlay=()=>{
    var sound = new Howl({
      src: '/Notification.mp3',
      html5:true
    });
    sound.play();
  }
 
  return (
    <div className="App">
      
      <button name="click" onClick={soundPlay}>Click</button>
      <textarea name="text" wrap="soft" style={{overflowY:"scroll", resize:"none"}}></textarea>
      <NotifyAlert/>
    </div>
  );
}

export default App;



const NotifyAlert=()=>{
  useEffect(() => {
    var oldTitle = document.title;
    var msg = "New!";
    var timeoutId;
    var blink = function() { document.title = document.title == msg ? oldTitle : msg; };
    var clear = function() {
        clearInterval(timeoutId);
        document.title = oldTitle;
        window.onmousemove = null;
        timeoutId = null;
    };

    const onFocus = () => {
      console.log('Tab is in focus');
      clear();
    };
    
    // User has switched away from the tab (AKA tab is hidden)
    const onBlur = () => {
      console.log('Tab is blurred');
      timeoutId = setInterval(blink, 1000);

    };
    
        if (!timeoutId) {
          window.addEventListener('focus', onFocus);
      window.addEventListener('blur', onBlur);
        }
  });

  return<></>
}