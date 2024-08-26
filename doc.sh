current_branch=$(git rev-parse --abbrev-ref HEAD)
mv -f docs/* ./
yarn doc
git add .
git commit -m 'update docs preview'
git push origin "$current_branch"
git checkout preview
git merge "$current_branch" -m 'merge'
git push origin preview
git checkout "$current_branch"