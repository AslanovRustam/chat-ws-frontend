import React, { CSSProperties } from "react";
import { PuffLoader } from "react-spinners";

type Props = { color?: string; loading?: boolean; size?: number };

const override: CSSProperties = {
  display: "block",
  margin: "0 ",
  borderColor: "white",
};

function Loader({ color, loading, size = 150 }: Props) {
  return (
    <PuffLoader
      color={color}
      loading={loading}
      cssOverride={override}
      size={size}
      aria-label="Loading Spinner"
      data-testid="loader"
    />
  );
}

export default Loader;
