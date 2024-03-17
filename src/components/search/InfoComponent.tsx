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
    <div className={`card absolute w-96 ${bg} text-blue-700 shadow-xl`}>
      <div className="card-body">
        <h2 className="card-title">{title}</h2>
        <p className="text-xs">
          {text} <span className="text-yellow-400">{span}</span>
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
