import React, { useRef, useState } from "react";
import { Box } from "@mui/system";
import { imgArray } from "./componentsImages";

const Game = ({ gameState, setGameState, score, setScore }) => {
  let requestRef = useRef();
  let currentDroppable = null;
  const fieldRef = useRef();
  const [fallState, setFallState] = useState(true);
  const [idx, setIdx] = useState(Math.floor(Math.random() * imgArray.length));
  const [x, setX] = useState(Math.floor(Math.random() * 1000));
  const [y, setY] = useState(90);

  const garbageStyle = {
    position: "absolute",
    width: `120px`,
    left: `${x}px`,
    top: `${y}px`,
  };

  const increaseNum = () => {
    var gar = document.getElementById("gar");
    if (y <= 680) {
      gar.hidden = true;
      let elemBelow = document.elementFromPoint(x, y);
      gar.hidden = false;

      // mousemove events may trigger out of the window (when the gar is dragged off-screen)
      // if clientX/clientY are out of the window, then elementFromPoint returns null
      if (!elemBelow) return;

      // potential droppables are labeled with the class "droppable" (can be other logic)
      let droppableBelow = elemBelow.closest(".droppable");

      if (currentDroppable !== droppableBelow) {
        // we're flying in or out...
        // note: both values can be null
        //   currentDroppable=null if we were not over a droppable before this event (e.g over an empty space)
        //   droppableBelow=null if we're not over a droppable now, during this event

        currentDroppable = droppableBelow;
        if (currentDroppable) {
          // the logic to process "flying in" of the droppable
          setScore((score) => score + 1);
          setIdx(Math.floor(Math.random() * imgArray.length));
          setX(Math.floor(Math.random() * 1000));
          clearInterval(requestRef.current);
          setY(90);
          gar.onmouseup = null;
          setFallState(true);
        }
      }
      setY((y) => {
        return y + 1;
      });
    } else {
      setIdx(Math.floor(Math.random() * imgArray.length));
      setX(Math.floor(Math.random() * 1000));
      clearInterval(requestRef.current);
      setY(90);
    }
  };
  if (gameState && fallState) {
    requestRef.current = requestAnimationFrame(increaseNum);
  } else {
    clearInterval(requestRef.current);
  }

  const handleMouseDown = (event) => {
    var gar = document.getElementById("gar");
    setFallState(false);
    clearInterval(requestRef.current);
    let shiftX = event.clientX - gar.getBoundingClientRect().left;
    let shiftY = event.clientY - gar.getBoundingClientRect().top;

    gar.style.position = "absolute";
    gar.style.zIndex = 1000;

    function moveAt(pageX, pageY) {
      gar.style.left = pageX - shiftX + "px";
      gar.style.top = pageY - shiftY + "px";
    }

    // move our absolutely positioned gar under the pointer
    moveAt(event.pageX, event.pageY);

    function onMouseMove(event) {
      moveAt(event.pageX, event.pageY);

      gar.hidden = true;
      let elemBelow = document.elementFromPoint(event.clientX, event.clientY);
      gar.hidden = false;

      setX(event.pageX - shiftX);
      setY(event.pageY - shiftY);

      // mousemove events may trigger out of the window (when the gar is dragged off-screen)
      // if clientX/clientY are out of the window, then elementFromPoint returns null
      if (!elemBelow) return;

      // potential droppables are labeled with the class "droppable" (can be other logic)
      let droppableBelow = elemBelow.closest(".droppable");

      if (currentDroppable !== droppableBelow) {
        // we're flying in or out...
        // note: both values can be null
        //   currentDroppable=null if we were not over a droppable before this event (e.g over an empty space)
        //   droppableBelow=null if we're not over a droppable now, during this event

        currentDroppable = droppableBelow;
        if (currentDroppable) {
          // the logic to process "flying in" of the droppable
          setScore((score) => score + 1);
          setIdx(Math.floor(Math.random() * imgArray.length));
          setX(Math.floor(Math.random() * 1000));
          clearInterval(requestRef.current);
          setY(90);
          document.removeEventListener("mousemove", onMouseMove);
          gar.onmouseup = null;
          setFallState(true);
        }
      }
    }

    // (2) move the gar on mousemove
    document.addEventListener("mousemove", onMouseMove);

    // (3) drop the gar, remove unneeded handlers
    gar.onmouseup = function () {
      document.removeEventListener("mousemove", onMouseMove);
      gar.onmouseup = null;
      setFallState(true);
      // requestRef.current = requestAnimationFrame(increaseNum);
    };

    gar.ondragstart = function () {
      return false;
    };
  };

  return (
    <>
      <div
        className="garbage w-max"
        ref={fieldRef}
        style={garbageStyle}
        id="gar"
        onMouseDown={gameState ? handleMouseDown : null}
      >
        <img src={imgArray[idx]} alt="Garbage" />
      </div>
      <div className="absolute bottom-4 left-1/3 w-28 lg:w-40 droppable">
        <img src="/images/dustbin.png" alt="Dustbin" />
      </div>
    </>
  );
};

export default Game;
