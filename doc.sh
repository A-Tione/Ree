current_branch=$(git rev-parse --abbrev-ref HEAD)
yarn doc
git checkout preview
mv -f docs/* ./
git add .
git commit -m 'update docs preview'
git push
git checkout "$current_branch"