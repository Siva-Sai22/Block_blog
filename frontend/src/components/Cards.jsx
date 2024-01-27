import img1 from "../assets/img1.png";
import img2 from "../assets/img2.png";
import img3 from "../assets/img3.png";
import { useState, useRef, useEffect } from "react";

function Cards() {
  return (
    <>
      <div className="mx-auto w-[min(100vw,1120px)]">
        <p className="mx-2 mt-10 text-2xl">Featured</p>
        <p className="mx-2  mb-6 text-gray-500">
          The most interesting content collected by our team.
        </p>
        <div className="grid-cols-lay grid gap-4">
          <Card colSpanFull={true} image={img1}></Card>
          <Card image={img2}></Card>
          <Card image={img3}></Card>
          <Card image={img2}></Card>
          <Card image={img3}></Card>
          <Card image={img2}></Card>
          <Card image={img3}></Card>
        </div>
      </div>
    </>
  );
}

function Card({ colSpanFull, image }) {
  const cardClass = colSpanFull ? "col-span-full" : "";
  const cardRef = useRef(null);
  const [isNarrow, setIsNarrow] = useState(false);

  useEffect(() => {
    const updateCardWidth = () => {
      if (cardRef.current) {
        setIsNarrow(cardRef.current.clientWidth < 500);
      }
    };

    updateCardWidth();
    window.addEventListener("resize", updateCardWidth);
    return () => {
      window.removeEventListener("resize", updateCardWidth);
    };
  }, []);

  return (
    <div
      ref={cardRef}
      className={`flex w-full ${isNarrow ? "flex-col" : "flex-row"} rounded-2xl border-2 border-solid ${cardClass}`}
    >
      <img
        src={image}
        alt=""
        className={`w-1/2 rounded-2xl ${isNarrow ? "w-full" : ""}`}
      />
      <div className="border-l-2 p-4">
        <p className={`mb-4 ${isNarrow ? "text-xl font-bold" : "text-3xl"}`}>
          What builders can learn from RetroPGF 3: separating the signal from
          the noise
        </p>
        <p>By Carl Cervone</p>
      </div>
    </div>
  );
}

export default Cards;
