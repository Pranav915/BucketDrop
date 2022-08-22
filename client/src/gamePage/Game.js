import React, { useRef } from "react";
import { imgArray } from "./componentsImages";

const Game = ({
  gameState,
  setGameState,
  score,
  setScore,
  idx,
  x,
  y,
  setIdx,
  setX,
  setY,
  fallState,
  setFallState,
}) => {
  let requestRef = useRef();
  let currentDroppable = null;
  const fieldRef = useRef();

  const garbageStyle = {
    position: "absolute",
    width: `120px`,
    left: `${x}px`,
    top: `${y}px`,
  };

  const increaseNum = () => {
    var gar = document.getElementById("gar");
    if (y <= 680 && window.innerHeight - gar.getBoundingClientRect().top > 10) {
      gar.hidden = true;
      let elemBelow = document.elementFromPoint(x, y);
      gar.hidden = false;

      if (!elemBelow) return;

      let droppableBelow = elemBelow.closest(".droppable");

      if (currentDroppable !== droppableBelow) {
        currentDroppable = droppableBelow;
        if (currentDroppable) {
          setScore((score) => score + 1);
          setIdx(Math.floor(Math.random() * imgArray.length));
          setX(
            Math.floor(
              (Math.random() * window.innerWidth * 17) / 20 +
                window.innerWidth / 20
            )
          );
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
      setX(
        Math.floor((Math.random() * window.innerWidth * 17) / 20) +
          window.innerWidth / 20
      );
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
      if (
        (pageX > 0 || pageX < window.innerWidth) &&
        (pageY > 0 || pageY < window.innerHeight)
      ) {
        gar.style.left = pageX - shiftX + "px";
        gar.style.top = pageY - shiftY + "px";
      }
    }

    moveAt(event.pageX, event.pageY);

    function onMouseMove(event) {
      if (
        event.pageX > window.innerWidth - window.innerWidth / 20 ||
        event.pageY > window.innerHeight - window.innerHeight / 20 ||
        event.pageX < window.innerWidth / 15 ||
        event.pageY < 110
      ) {
        document.removeEventListener("mousemove", onMouseMove);
        if (event.pageX > window.innerWidth - window.innerWidth / 12) {
          setX(window.innerWidth - window.innerWidth / 12);
        } else if (event.pageX < window.innerWidth / 15) {
          setX(window.innerHeight / 14);
        }
        gar.onmouseup = null;
        setFallState(true);
        return;
      }
      moveAt(event.pageX, event.pageY);

      gar.hidden = true;
      let elemBelow = document.elementFromPoint(event.clientX, event.clientY);
      gar.hidden = false;

      setX(event.pageX - shiftX);
      setY(event.pageY - shiftY);

      if (!elemBelow) return;

      let droppableBelow = elemBelow.closest(".droppable");

      if (currentDroppable !== droppableBelow) {
        currentDroppable = droppableBelow;
        if (currentDroppable) {
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

    document.addEventListener("mousemove", onMouseMove);

    gar.onmouseup = function () {
      document.removeEventListener("mousemove", onMouseMove);
      gar.onmouseup = null;
      setFallState(true);
    };

    gar.ondragstart = function () {
      return false;
    };
  };

  return (
    <>
      <div>
        <div
          className="garbage w-max"
          ref={fieldRef}
          style={garbageStyle}
          id="gar"
          onMouseDown={gameState ? handleMouseDown : null}
        >
          <img src={imgArray[idx]} alt="Garbage" />
        </div>
        <div className="absolute bottom-4 " style={{ width: "100%" }}>
          <img
            src="/images/dustbin.png"
            alt="Dustbin"
            className="m-auto w-28 lg:w-40 droppable"
          />
        </div>
      </div>
    </>
  );
};

export default Game;
