import React from "react";

const InfoComponent = ({
  title,
  text,
  span,
  bg,
  listTitle,
  list,
}: {
  title: string;
  text: string;
  span: string;
  bg: string;
  listTitle: string;
  list: string[];
}) => {
  return (
    <div className={`card absolute w-80 ${bg} z-[100] text-blue-800 shadow-xl`}>
      <div className="card-body">
        <h2 className="card-title">{title}</h2>
        <p className="text-xs">
          {text} <span className="text-green-200">{span}</span>
        </p>
        <div>
          <h1>{listTitle}</h1>
          <ul>
            {list.map((item: string, index: number) => (
              <li className="text-xs" key={index}>
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default InfoComponent;
