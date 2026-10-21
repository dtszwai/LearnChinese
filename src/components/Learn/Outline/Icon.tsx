import React from 'react';

// Geometry from the supplied RegexLearn sidebar; colors come from the site theme.
const shapes = {
  arrow: (<path d="M470.6 169.4C483.1 181.9 483.1 202.1 470.6 214.6L205.3 480H896C913.7 480 928 494.3 928 512 928 529.7 913.7 544 896 544H205.3L470.6 809.4C483.1 821.9 483.1 842.1 470.6 854.6 458.1 867.1 437.9 867.1 425.4 854.6L105.4 534.6C92.9 522.1 92.9 501.9 105.4 489.4L425.4 169.4C437.9 156.9 458.1 156.9 470.6 169.4Z" fillRule="evenodd" clipRule="evenodd"></path>),
  check: (<path d="M192 544L448 800 832 224" fill="none" strokeWidth="64" strokeLinecap="round" strokeLinejoin="round"></path>),
  play: (<path d="M224 241.2C224 204.7 263.1 181.5 295.1 199.1L787.5 470C820.7 488.2 820.7 535.8 787.5 554.1L295.1 824.9C263.1 842.5 224 819.3 224 782.8V241.2Z" fill="none" strokeWidth="64" strokeLinecap="round" strokeLinejoin="round"></path>),
  lock: (<path d="M512 64C388.3 64 288 164.3 288 288V416C217.3 416 160 473.3 160 544V832C160 902.7 217.3 960 288 960H736C806.7 960 864 902.7 864 832V544C864 473.3 806.7 416 736 416V288C736 164.3 635.7 64 512 64ZM672 416V288C672 199.6 600.4 128 512 128 423.6 128 352 199.6 352 288V416H672Z" fillRule="evenodd" clipRule="evenodd"></path>),
};

export default function Icon({ name, className }: { name: keyof typeof shapes; className?: string }) {
  return <svg className={className} aria-hidden='true' viewBox='0 0 1024 1024' fill='currentColor' stroke='currentColor'>{shapes[name]}</svg>;
}
