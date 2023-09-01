module.exports = {
  'apps/backend/**/*.+(ts|tsx)': (files) => {
    return files.map(
      (file) => `npx tsc-files --noEmit -p apps/backend/tsconfig.json ${file}`,
    );
  },
  '**/*.+(js|jsx|ts|tsx|css|less|scss|md|json)': ['prettier --write'],
};
