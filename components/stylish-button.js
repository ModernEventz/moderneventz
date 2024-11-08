"use client";
import React from "react";

function  StylishButton({ text, icon, color, onClick }) {
  const bgColor =
    {
      yellow: "bg-[#F8E44F]",
      purple: "bg-[#C1BFF9]",
      teal: "bg-[#7EE7D6]",
    }[color] || "bg-[#F8E44F]";

  const roundedClass = icon ? "rounded-full" : "rounded-[6px]";

  return (
    <button
      className={`font-poppins text-white border-2 border-white bg-[#b4245d] ${roundedClass} px-4 py-2`}
    
    >
      <div className="flex items-center justify-center">
        {icon && <i className={`fas ${icon} mr-2 text-black`}></i>}
        {text}
      </div>
    </button>
  );
}

function StylishButtonStory() {
  const handleClick = () => {
    alert("Button clicked!");
  };

  return (
    <div className="flex flex-col space-y-4">
      <StylishButton
        text="Click me"
        icon="fa-star"
        color="yellow"
        onClick={handleClick}
      />
      <StylishButton
        text="Purple Button"
        icon="fa-heart"
        color="purple"
        onClick={handleClick}
      />
      <StylishButton text="Teal No Icon" color="teal" onClick={handleClick} />
    </div>
  );
}

export default StylishButton;