import React, { FC } from 'react';
import styled from '@emotion/styled';

const Component: FC<{ className?: string }> = ({ className }) => <div className={className}></div>;

const StyledComponent = styled(Component)`
  font-size: 48px;
  width: 1em;
  height: 1em;
  position: relative;
  border: 2px solid #2563ebaa;
  border-radius: 1em;
  animation-duration: 2s;
  animation-timing-function: ease;
  animation-delay: 0s;
  animation-iteration-count: infinite;
  animation-direction: normal;
  animation-fill-mode: none;
  animation-play-state: running;
  animation-name: spin;

  @keyframes spin {
    0% {
      transform: rotate(0deg);
      border-radius: 1em;
    }
    20% {
      transform: rotate(0deg);
    }
    30%,
    60% {
      border-radius: 0.25em;
    }
    70% {
      transform: rotate(180deg);
    }
    100% {
      transform: rotate(180deg);
      border-radius: 1em;
    }
  }
`;

export const Loader = StyledComponent;
