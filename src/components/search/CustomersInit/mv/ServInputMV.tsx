/* eslint-disable @typescript-eslint/no-unsafe-argument */
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import React from "react";

interface ServInputMVProps {
  bfsValue: string;
  setBfsValue: React.Dispatch<
    React.SetStateAction<{
      bfs1: string;
      bfs2: string;
      bfs3: string;
      bfs4: string;
      bfs5: string;
      bfs6: string;
    }>
  >;
}

const ServInputMV = ({ setBfsValue, bfsValue }: ServInputMVProps) => {
  const labels = [
    "SERV 764",
    "SERV 402",
    "SERV 407",
    "SERV 411",
    "SERV 427",
    "REKLAMASJON",
  ];

  return (
    <div>
      <div className="rounded-xl border border-neutral p-1">
        {labels.map((label, index) => (
          <label key={index} className="label cursor-pointer">
            <span className="label-text">{label}</span>
            <input
              onChange={(e) =>
                setBfsValue({
                  ...bfsValue,
                  [`bfs${index + 1}`]: e.currentTarget.value,
                })
              }
              type="checkbox"
              className="checkbox"
              value={label}
            />
          </label>
        ))}
      </div>
    </div>
  );
};

export default ServInputMV;
