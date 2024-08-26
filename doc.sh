current_branch=$(git rev-parse --abbrev-ref HEAD)
yarn doc
git checkout preview echo $(git rev-parse --abbrev-ref HEAD)
mv -f docs/* ./
git add .
git commit -m 'update docs preview'
git push origin preview
git checkout "$current_branch"