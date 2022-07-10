import React from 'react';

type VideoProps =
  | {
      src: string;
      start: number;
      site: 'Youtube';
    }
  | {
      src: string;
      start?: never;
      site: 'Bilibili';
    };

const Video = ({ src, start, site }: VideoProps) => (
  <div className='video-responsive'>
    <iframe
      src={
        site === 'Youtube'
          ? `https://www.youtube-nocookie.com/embed/${src}?start=${start}&origin=https://learnchinese.vercel.app/`
          : `https://player.bilibili.com/player.html?bvid=${src}&high_quality=1&danmaku=0`
      }
      frameBorder='0'
      allow='accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
      allowFullScreen
    />
  </div>
);

export const Youtube = ({ children, id, start = 0 }) => <Video src={children ?? id} start={start} site='Youtube' />;

export const Bilibili = ({ children, id }) => <Video src={children ?? id} site='Bilibili' />;
