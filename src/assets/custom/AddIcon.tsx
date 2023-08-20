import React from 'react';
import {SvgXml} from 'react-native-svg';

const AddIcon = ({
  color = 'white',
  size = 28,
}: {
  color?: string;
  size?: number;
}) => {
  return (
    <SvgXml
      xml={`
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="16" cy="16" r="16" fill="url(#paint0_linear_44_1196)"/>
        <path d="M8 12V10C8 9.46957 8.21071 8.96086 8.58579 8.58579C8.96086 8.21071 9.46957 8 10 8H12M8 20V22C8 22.5304 8.21071 23.0391 8.58579 23.4142C8.96086 23.7893 9.46957 24 10 24H12M20 8H22C22.5304 8 23.0391 8.21071 23.4142 8.58579C23.7893 8.96086 24 9.46957 24 10V12M20 24H22C22.5304 24 23.0391 23.7893 23.4142 23.4142C23.7893 23.0391 24 22.5304 24 22V20M13 16C13 16.7956 13.3161 17.5587 13.8787 18.1213C14.4413 18.6839 15.2044 19 16 19C16.7956 19 17.5587 18.6839 18.1213 18.1213C18.6839 17.5587 19 16.7956 19 16C19 15.2044 18.6839 14.4413 18.1213 13.8787C17.5587 13.3161 16.7956 13 16 13C15.2044 13 14.4413 13.3161 13.8787 13.8787C13.3161 14.4413 13 15.2044 13 16Z" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        <defs>
        <linearGradient id="paint0_linear_44_1196" x1="16" y1="0" x2="16" y2="32" gradientUnits="userSpaceOnUse">
        <stop stop-color="#8CE977"/>
        <stop offset="1" stop-color="#D3F59D"/>
        </linearGradient>
        </defs>
      </svg>      
      `}
      width={size}
      height={size}
    />
  );
};

export default AddIcon;
