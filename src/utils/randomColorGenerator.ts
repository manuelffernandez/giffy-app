const randomColorGenerator = (): string => {
  const colors = [
    'primary',
    'secondary',
    'error',
    'warning',
    'info',
    'success',
  ];
  const variants = ['main', 'light', 'dark'];

  const randomColor = colors[Math.floor(Math.random() * (colors.length - 1))];
  const randomVariant =
    variants[Math.floor(Math.random() * (variants.length - 1))];

  return randomColor.concat('.').concat(randomVariant);
};

export default randomColorGenerator;
