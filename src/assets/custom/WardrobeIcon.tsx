import React from 'react';
import {SvgXml} from 'react-native-svg';

const WardrobeIcon = ({
  color = 'white',
  size = 28,
}: {
  color?: string;
  size?: number;
}) => {
  return (
    <SvgXml
      xml={`
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M9.536 6.91C9.536 5.855 10.486 5 11.66 5C12.833 5 13.784 5.855 13.784 6.91C13.784 7.405 13.604 7.857 13.292 8.197C12.695 8.847 11.802 9.502 11.802 10.346V10.63M11.802 10.63C12.5417 10.618 13.2677 10.8307 13.884 11.24L16 12.668M11.802 10.63C11.0686 10.6348 10.3537 10.862 9.751 11.28L2.655 16.27C1.383 17.165 2.087 19 3.703 19H20.298C21.931 19 22.623 17.131 21.317 16.25L19 14.69" stroke="${color}" stroke-width="2" stroke-linecap="round"/>
      </svg>
      `}
      width={size}
      height={size}
    />
  );
};

export default WardrobeIcon;
