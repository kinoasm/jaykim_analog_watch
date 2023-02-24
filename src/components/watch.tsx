import React from 'react';
import styled from 'styled-components';

const WatchContainer = styled.div`
  display: flex;
  padding: 10px 10px 10px 10px;
  align-items: center;
  justify-content: center;
  height: 100%;
  background-color: #f7f7f7;
`;

const WatchFace = styled.div`
  position: relative;
  width: 400px;
  height: 400px;
  border-radius: 50%;
  background-color: #fff;
  box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.1);
`;

const Text = styled.div<{ top: number; left: number }>`
  position: absolute;
  top: ${({ top }) => top}px;
  left: ${({ left }) => left}px;
`;

const Hand = styled.div<{
  degrees: number;
  length: number;
  width: number;
  color: string;
}>`
  position: absolute;
  top: 50%;
  left: 50%;
  transform-origin: 0% 0%;
  transform: translate(-50%, -100%) rotate(${(props) => props.degrees}deg);
  transition: ${(props) =>
    props.degrees >= 353 || props.degrees < 2
      ? 'none'
      : 'transform 0.5s ease-in-out'};
  &::before {
    content: '';
    position: absolute;
    width: ${(props) => props.width}px;
    height: ${(props) => props.length}px;
    background-color: ${(props) => props.color};
    border-radius: 4px;
    border: 1px solid white;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
  }
`;

const Hands = {
  Hour: styled(Hand)`
    z-index: 3;
  `,
  Minutes: styled(Hand)`
    z-index: 2;
  `,
  Seconds: styled(Hand)`
    z-index: 1;
  `,
};

const Watch = () => {
  const [handsAngles, setHandsAngles] = React.useState<{
    hours: number;
    minutes: number;
    seconds: number;
  }>({
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  React.useEffect(() => {
    const intervalId = setInterval(() => {
      const now = new Date();
      const [hours, minutes, seconds] = [
        now.getHours(),
        now.getMinutes(),
        now.getSeconds(),
      ];
      const handsAngles = {
        hours: (hours * 30 + minutes * 0.5) % 360,
        minutes: (minutes * 6 + seconds * 0.1) % 360,
        seconds: (seconds * 6) % 360,
      };
      setHandsAngles(handsAngles);
    }, 1000);

    return () => {
      clearInterval(intervalId);
    };
  }, []);
  return (
    <WatchContainer>
      <WatchFace>
        <Text top={190} left={380}>
          3
        </Text>
        <Text top={370} left={200}>
          6
        </Text>
        <Text top={190} left={10}>
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
    </WatchContainer>
  );
};

export default Watch;
