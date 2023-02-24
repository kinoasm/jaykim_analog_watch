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
  &.tooltip {
    background-color: beige;
    border: solid 1px black;
    box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.1);
    color: #121212;
  }
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

export { WatchContainer, WatchFace, Hands, Text };
