let importAll = (requireContext) => requireContext.keys().map(requireContext);
try {
  importAll(require.context('../icons', true, /\.svg$/));
} catch (error) {
  console.error(error);
}