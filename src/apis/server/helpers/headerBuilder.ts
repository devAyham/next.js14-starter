interface Props {
  [key: string]: string;
}

export function headerBuilder(props?: Props) {
  return {
    ...props,
  };
}
