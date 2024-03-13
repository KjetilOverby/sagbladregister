/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-return */
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import React from "react";

interface ServInputMTProps {
  bfsValue: string;
  setBfsValue: React.Dispatch<
    React.SetStateAction<{
      bfs1: string;
      bfs2: string;
      bfs3: string;
      bfs4: string;
      bfs5: string;
      bfs6: string;
      bfs7: string;
      bfs8: string;
      bfs9: string;
      bfs10: string;
      bfs11: string;
      bfs12: string;
      bfs13: string;
      bfs14: string;
      bfs15: string;
    }>
  >;
}

const ServInputMT = ({ setBfsValue, bfsValue }: ServInputMTProps) => {
  const labels = [
    "SERV 402",
    "SERV 403",
    "SERV 404",
    "SERV 405",
    "SERV 407",
    "SERV 409",
    "SERV 411",
    "SERV 412",
    "SERV 418",
    "SERV 419",
    "SERV 423",
    "SERV 427",
    "SERV 452",
    "SERV 474",
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

export default ServInputMT;
