import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { WatchContainer, WatchFace, Text, Hands } from './styles';
import { watchActions } from '../../ducks/watch';

import { RootState } from '../../app/store';

const Watch = () => {
  const dispatch = useDispatch();
  const { handsAngles, timeNow, tooltipPosition } = useSelector(
    (state: RootState) => state.watch
  );
  const watchContainerRef = React.useRef<HTMLDivElement>(null);

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    if (watchContainerRef.current) {
      dispatch(
        //@ts-ignore
        watchActions.showTooltip({
          top: event.clientY - 40,
          left: event.clientX + 10,
        })
      );
    }
  };

  const handleMouseLeave = () => {
    dispatch(watchActions.hideTooltip());
  };

  useEffect(() => {
    const intervalId = setInterval(() => {
      //@ts-ignore
      dispatch(watchActions.updateTimeAndHands());
    }, 1000);

    return () => {
      clearInterval(intervalId);
    };
  }, [dispatch]);

  return (
    <WatchContainer
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      ref={watchContainerRef}
    >
      <WatchFace>
        <Text top={185} left={380}>
          3
        </Text>
        <Text top={370} left={195}>
          6
        </Text>
        <Text top={185} left={10}>
          9
        </Text>
        <Text top={0} left={190}>
          12
        </Text>
        <Hands.Hour
          degrees={handsAngles.hours}
          width={6}
          length={100}
          color="black"
        />
        <Hands.Minutes
          degrees={handsAngles.minutes}
          width={5}
          length={160}
          color="black"
        />
        <Hands.Seconds
          degrees={handsAngles.seconds}
          width={3}
          length={180}
          color="black"
        />
      </WatchFace>
      {tooltipPosition.show && (
        <Text
          top={tooltipPosition.top}
          left={tooltipPosition.left}
          className="tooltip"
        >
          {timeNow}
        </Text>
      )}
    </WatchContainer>
  );
};

export default Watch;
