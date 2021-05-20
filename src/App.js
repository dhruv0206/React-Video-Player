import { makeStyles } from "@material-ui/core/styles";
import React, { useRef, useState } from "react";
import ReactPlayer from "react-player";
import screenfull from "screenfull";
import PlayerControls from "./components/PlayerControls";
import "./components/style.css";

const useStyles = makeStyles({
  playerWrapper: {
    width: "100%",
    position: "relative",
    flex: 1,
  },
});

const format = (seconds) => {
  if (isNaN(seconds)) {
    return "00:00";
  }
  const date = new Date(seconds * 100);
  const hh = date.getUTCHours();
  const mm = date.getUTCMinutes();
  const ss = date.getUTCSeconds().toString().padStart(2, "0");
  if (hh) {
    return `${hh}:${mm.toString().padStart(2, "0")}:${ss}`;
  }

  return `${mm}:${ss}`;
};

let count = 0;

function App() {
  const classes = useStyles();
  const [state, setState] = useState({
    playing: true,
    muted: true,
    volume: 0.5,
    playbackRate: 1.0,
    played: 0,
    seeking: false,
  });

  const [timeDisplayFormat, settimeDisplayFormat] = useState("normal");

  const { playing, muted, volume, playbackRate, played, seeking } = state;

  const playerRef = useRef(null);
  const playerContainerRef = useRef(null);
  const controlsRef = useRef(null);

  const handlePlayPause = () => {
    setState({ ...state, playing: !state.playing });
  };

  const handleRewind = () => {
    playerRef.current.seekTo(playerRef.current.getCurrentTime() - 10);
  };

  const handleFastForward = () => {
    playerRef.current.seekTo(playerRef.current.getCurrentTime() + 10);
  };

  const handleMute = () => {
    setState({ ...state, muted: !state.muted });
  };
  const handleVolumeChange = (e, newValue) => {
    setState({
      ...state,
      volume: parseFloat(newValue / 100),
      muted: newValue === 0 ? true : false,
    });
  };

  const handleVolumeSeekUp = (e, newValue) => {
    setState({
      ...state,
      volume: parseFloat(newValue / 100),
      muted: newValue === 0 ? true : false,
    });
  };

  const handlePlaybackRateChange = (rate) => {
    setState({ ...state, playbackRate: rate });
  };

  const toggleFullScreen = () => {
    screenfull.toggle(playerContainerRef.current);
  };

  const handleProgress = (changeState) => {
    console.log(changeState);

    if (count > 2) {
      controlsRef.current.style.visibility = "hidden";
      count = 0;
    }

    if (controlsRef.current.style.visibility == "visible") {
      count += 1;
    }

    if (!state.seeking) {
      setState({ ...state, ...changeState });
    }
  };

  const handleSeekChange = (e, newValue) => {
    setState({ ...state, played: parseFloat(newValue / 100) });
  };

  const handleSeekMouseDown = (e) => {
    setState({ ...state, seeking: true });
  };

  const handleSeekMouseUp = (e, newValue) => {
    setState({ ...state, seeking: false });
    playerRef.current.seekTo(newValue / 100);
  };

  const handleChangeDisplayFormat = () => {
    settimeDisplayFormat(
      timeDisplayFormat === "normal" ? "remaining" : "normal"
    );
  };

  const handleMouseMove = () => {
    controlsRef.current.style.visibility = "visible";
    count = 0;
  };

  const currentTime = playerRef.current
    ? playerRef.current.getCurrentTime()
    : "00:00";

  const duration = playerRef.current
    ? playerRef.current.getDuration()
    : "00:00";

  const elapsedTime =
    timeDisplayFormat === "normal"
      ? format(currentTime)
      : `-${format(duration - currentTime)}`;
  const totalDuration = format(duration);
  return (
    <>
      <div class="alert alert-primary" role="alert">
        <strong>Video Player</strong>
      </div>
      <div
        ref={playerContainerRef}
        className={classes.playerWrapper}
        onMouseMove={handleMouseMove}
      >
        <ReactPlayer
          ref={playerRef}
          width="100%"
          height="85vh"
          // url="http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4
          //   "
          url="http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/SubaruOutbackOnStreetAndDirt.mp4"
          muted={muted}
          playing={playing}
          volume={volume}
          playbackRate={playbackRate}
          onProgress={handleProgress}
        />
        <PlayerControls
          ref={controlsRef}
          onPlayPause={handlePlayPause}
          playing={playing}
          onRewind={handleRewind}
          onFastForward={handleFastForward}
          muted={muted}
          onMute={handleMute}
          onVolumeChange={handleVolumeChange}
          onVolumeSeekUp={handleVolumeSeekUp}
          volume={volume}
          playbackRate={playbackRate}
          onPlaybackRateChange={handlePlaybackRateChange}
          OnToggleFullScreen={toggleFullScreen}
          played={played}
          onSeek={handleSeekChange}
          onSeekMouseDown={handleSeekMouseDown}
          onSeekMouseUp={handleSeekMouseUp}
          elapsedTime={elapsedTime}
          totalDuration={totalDuration}
          onChangeDisplayFormat={handleChangeDisplayFormat}
        />
      </div>
    </>
  );
}

export default App;
