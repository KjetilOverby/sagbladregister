type BladeType = {
  type: string;
  side: string;
};

type BladeCellProps = {
  blade: BladeType;
};
const TypesArticle: React.FC<BladeCellProps> = ({ blade, articleTypes }) => {
  let newProperty;
  const matchingBlade = articleTypes?.find((item) => item.blade === blade.type);

  if (matchingBlade) {
    if (Array.isArray(matchingBlade.art)) {
      newProperty =
        blade.side === "Høyre" ? matchingBlade.art[0] : matchingBlade.art[1];
    } else {
      newProperty = matchingBlade.art;
    }
  }

  return (
    <td className="font-bold text-neutral">
      <span className="text-xs font-normal text-neutral">{newProperty}</span>
    </td>
  );
};

export default TypesArticle;
