"use client";
import { useState, useEffect } from 'react';
import LoadingComponent from '@/components/loading-component';
import { PortfolioComponent } from '../components/portfolio';

export default function Home() {
  const [loading, setLoading] = useState(0);
  const [showProfile, setShowProfile] = useState(false);

  useEffect(() => {
    // Simulate loading progress
    const interval = setInterval(() => {
      setLoading((prevLoading) => {
        if (prevLoading >= 100) {
          clearInterval(interval);
          setTimeout(() => setShowProfile(true), 500); // Pause for 500ms at 100%
          return 100;
        }
        return prevLoading + 1; // Increment loading by 1% every interval
      });
    }, 40); // Adjust the time interval (50ms) to speed up or slow down the loading

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      {loading < 100 || !showProfile ? (
        <LoadingComponent loading={loading} />
      ) : (
        <PortfolioComponent />
      )}
    </>
  );
}
