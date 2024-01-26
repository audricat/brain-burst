import { useContext } from "react";
import SoundContext from "../context/SoundContext";
import MusicOn from "../assets/MusicOn.png";
import MusicOff from "../assets/MusicOff.png";

const TopNavBar = () => {
  const { isPlaying, playMusic, pauseMusic } = useContext(SoundContext);

  return (
    <nav className="top-navbar-container">
      <ul>
        <li></li>
        <li></li>
        <li id="music-container">
          {isPlaying ? (
            <button onClick={() => pauseMusic()} className="music-btn">
              <img src={MusicOn} alt="music-on-img" className="music-btn-img" />
            </button>
          ) : (
            <button onClick={() => playMusic()} className="music-btn">
              <img
                src={MusicOff}
                alt="music-off-img"
                className="music-btn-img"
              />
            </button>
          )}
        </li>
      </ul>
    </nav>
  );
};

export default TopNavBar;
