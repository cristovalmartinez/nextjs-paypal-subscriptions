'use client';

import { configureAutoTrack } from 'aws-amplify/analytics';
import { useEffect } from 'react';

export const PageEventTracking = () => {
  useEffect(() => {
    configureAutoTrack({
      enable: true,
      type: 'event',
      // OPTIONAL, additional options for the tracked event.
      options: {
        events: ['click'],
        selectorPrefix: 'data-amplify-analytics-',
      },
    });
  }, []);

  return null;
};
