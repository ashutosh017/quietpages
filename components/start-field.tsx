import React from 'react';

const StarField = () => {
  // Generate stars with random positions and animation delays
  const generateStars = (count: number, className: string) => {
    return Array.from({ length: count }, (_, i) => (
      <div
        key={i}
        className={className}
        style={{
          left: `${Math.random() * 100}%`,
          top: `${Math.random() * 100}%`,
          animationDelay: `${Math.random() * 3}s`,
          animationDuration: `${3 + Math.random() * 2}s`
        }}
      />
    ));
  };

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none -z-40">
      {/* Background gradient - adapts to theme */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-200 via-white to-slate-300 dark:from-black dark:via-neutral-900 dark:to-black transition-colors duration-500" />
      
      {/* Small stars */}
      <div className="absolute inset-0">
        {generateStars(100, 'star-small')}
      </div>
      
      {/* Medium stars */}
      <div className="absolute inset-0">
        {generateStars(50, 'star-medium')}
      </div>
      
      {/* Large stars */}
      <div className="absolute inset-0">
        {generateStars(20, 'star-large')}
      </div>
      
      {/* Shooting stars */}
      {/* <div className="absolute inset-0">
        {generateStars(5, 'shooting-star')}
      </div> */}
    </div>
  );
};

export default StarField;