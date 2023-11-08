const Annotation = (fileContent) => {
  // Regular expression to match ((ABC|XYZ))
  const regex = /\(\((.+?)\|\|(.+?)\)\)/g;
  // Create the <Annotate> element
  // ((ABC|XYZ)) -> <Annotate title="XYZ">ABC</Annotate>
  return fileContent.replaceAll(regex, `<Annotate title="$2">$1</Annotate>`);
};

export default Annotation;
