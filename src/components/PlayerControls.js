import Popover from "@material-ui/core/Popover";
import Slider from "@material-ui/core/Slider";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import Tooltip from "@material-ui/core/Tooltip";
import FastForwardIcon from "@material-ui/icons/FastForward";
import FastRewindIcon from "@material-ui/icons/FastRewind";
import FullScreenIcon from "@material-ui/icons/Fullscreen";
import PauseIcon from "@material-ui/icons/Pause";
import PlayArrowIcon from "@material-ui/icons/PlayArrow";
import VolumeOff from "@material-ui/icons/VolumeOff";
import VolumeUpIcon from "@material-ui/icons/VolumeUp";
import React, { forwardRef } from "react";
import "./style.css";

const useStyles = makeStyles({
  controlsWrapper: {
    position: "absolute",
    top: 0,
    left: 202,
    right: 202,
    bottom: 0,
    background: "rgba(0,0,0,0.6)",
    display: "flex",
    flexDirection: "column",
    height: "85vh",
    zIndex: 1,
  },
  controlIcons: {
    color: "#777",
    fontSize: 50,
    transform: "scale(0.9)",
    "&:hover": {
      color: "#fff",
      transform: "scale(1)",
    },
    outline: "none",
    border: "none",
    boxShadow: "none",
  },
  bottomIcons: {
    color: "#999",
    "&:hover": {
      color: "#fff",
    },
  },

  volumeSlider: {
    width: 100,
  },
});

function ValueLabelComponent(props) {
  const { children, open, value } = props;

  return (
    <Tooltip open={open} enterTouchDelay={0} placement="top" title={value}>
      {children}
    </Tooltip>
  );
}

const PrettoSlider = withStyles({
  root: {
    color: "#52af77",
    height: 8,
  },
  thumb: {
    height: 24,
    width: 24,
    backgroundColor: "#fff",
    border: "2px solid currentColor",
    marginTop: -8,
    marginLeft: -12,
    "&:focus, &:hover, &$active": {
      boxShadow: "inherit",
    },
  },
  active: {},
  valueLabel: {
    left: "calc(-50% + 4px)",
  },
  track: {
    height: 8,
    borderRadius: 4,
  },
  rail: {
    height: 8,
    borderRadius: 4,
  },
})(Slider);

export default forwardRef(
  (
    {
      onPlayPause,
      playing,
      onRewind,
      onFastForward,
      muted,
      onMute,
      onVolumeChange,
      onVolumeSeekUp,
      volume,
      playbackRate,
      onPlaybackRateChange,
      OnToggleFullScreen,
      played,
      onSeek,
      onSeekMouseDown,
      onSeekMouseUp,
      elapsedTime,
      totalDuration,
      onChangeDisplayFormat,
    },
    ref
  ) => {
    const classes = useStyles();
    const [anchorEl, setAnchorEl] = React.useState(null);

    const handlePopover = (event) => {
      setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
      setAnchorEl(null);
    };

    const open = Boolean(anchorEl);
    const id = open ? "playbackrate-popover" : undefined;

    return (
      <div className={classes.controlsWrapper} ref={ref} style={{}}>
        {/* <div
          className=" d-flex flex-row"
          // direction="row"
          // alignItems="center"
          // justifyContent="space-between"
          style={{ padding: 16 }}
        >
          <div className="text-light">Video Title</div>
        </div> */}

        <div
          className=" d-flex flex-row justify-content-center"
          style={{ marginTop: "auto", marginBottom: "auto" }}
        >
          <button
            onClick={onRewind}
            type="button"
            className={`btn  ${classes.controlIcons}`}
          >
            <FastRewindIcon fontSize="inherit" />
          </button>

          <button
            onClick={onPlayPause}
            type="button"
            className={`btn  ${classes.controlIcons}`}
          >
            {playing ? (
              <PauseIcon fontSize="inherit" />
            ) : (
              <PlayArrowIcon fontSize="inherit" />
            )}
          </button>

          <button
            onClick={onFastForward}
            type="button"
            className={`btn  ${classes.controlIcons}`}
          >
            <FastForwardIcon fontSize="inherit" />
          </button>
        </div>

        <div
          className=" d-flex flex-row justify-content-start align-items-center"
          // container
          // direction="row"
          // alignItems="center"
          // justifyContent="center"
          style={{ padding: 16 }}
        >
          <PrettoSlider
            min={0}
            max={100}
            value={played * 100}
            ValueLabelComponent={(props) => (
              <ValueLabelComponent {...props} value={elapsedTime} />
            )}
            onChange={onSeek}
            onMouseDown={onSeekMouseDown}
            onChangeCommitted={onSeekMouseUp}
          />
        </div>
        <div
          className="d-flex flex-row align-items-center"
          style={{ padding: 16 }}
        >
          <button type="button" className={`btn  ${classes.bottomIcons}`}>
            {playing ? (
              <PauseIcon onClick={onPlayPause} fontSize="large" />
            ) : (
              <PlayArrowIcon onClick={onPlayPause} fontSize="large" />
            )}
          </button>

          <button
            onClick={onMute}
            type="button"
            className={`btn  ${classes.bottomIcons}`}
          >
            {muted ? (
              <VolumeOff fontSize="large" />
            ) : (
              <VolumeUpIcon fontSize="large" />
            )}
          </button>
          <Slider
            min={0}
            max={100}
            value={volume * 100}
            className={classes.volumeSlider}
            onChange={onVolumeChange}
            onChangeCommitted={onVolumeSeekUp}
          />

          <div
            className=""
            style={{ marginLeft: 16, color: "#fff", cursor: "pointer" }}
            onClick={onChangeDisplayFormat}
          >
            {elapsedTime}/{totalDuration}
          </div>
          <div
            className={classes.bottomIcons}
            style={{ marginLeft: "auto", marginRight: 20, cursor: "pointer" }}
            onClick={handlePopover}
          >
            {playbackRate}X
          </div>
          <Popover
            id={id}
            open={open}
            anchorEl={anchorEl}
            onClose={handleClose}
            anchorOrigin={{
              vertical: "top",
              horizontal: "center",
            }}
            transformOrigin={{
              vertical: "bottom",
              horizontal: "center",
            }}
          >
            <div className="d-flex flex-column-reverse">
              {[0.5, 1, 1.5, 2].map((rate) => (
                <button
                  onClick={() => onPlaybackRateChange(rate)}
                  style={{
                    color: rate === playbackRate ? "secondary" : "default",
                  }}
                >
                  {rate}
                </button>
              ))}
            </div>
          </Popover>
          <div
            className={classes.bottomIcons}
            style={{ marginRight: 20, cursor: "pointer" }}
            onClick={OnToggleFullScreen}
          >
            <FullScreenIcon fontSize="large" />
          </div>
        </div>
      </div>
    );
  }
);
