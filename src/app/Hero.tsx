import React from "react";

const Hero: React.FC = () => (
  <div
    className="hero min-h-screen"
    style={{
      backgroundImage:
        "url(https://img.daisyui.com/images/stock/photo-1507358522600-9f71e620c44e.webp)",
    }}
  >
    <div className="hero-overlay"></div>
    <div className="hero-content text-neutral-content text-center">
      <div className="max-w-2xl">
        <h1 className="mb-5 text-6xl font-bold">
          Check your Front End skills in 5 minutes
        </h1>
        <p className="mb-5 ">
          10 short tests on React, TypeScript and GraphQL — immediately see your
          weak spots and get recommendations
        </p>
        <button className="btn btn-primary">Choose Test</button>
      </div>
    </div>
  </div>
);

export default Hero;
