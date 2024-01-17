import React, { FC, useEffect } from 'react';
import { TIcons } from '../types/carsSettingsTypes';

type TPreloadImagesProps = {
  iconsUrls: TIcons[]
}

const PreloadImages: FC<TPreloadImagesProps> = ({ iconsUrls }) => {

  useEffect(() => {
    iconsUrls.forEach(url => {
      const img = new Image();
      img.src = url.url;
    });
  }, [iconsUrls]);

  return (
    <></>
  );
};

export default React.memo(PreloadImages);