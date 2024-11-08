/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable react-hooks/rules-of-hooks */
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck

import FilbehandlingMain from "~/filbehandling/FilbehandlingMain";

const filbehandling = ({ theme }) => {
  // eslint-disable-next-line react-hooks/rules-of-hooks

  return (
    <div>
      <FilbehandlingMain theme={theme} />
    </div>
  );
};

export default filbehandling;
