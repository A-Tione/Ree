current_branch=$(git rev-parse --abbrev-ref HEAD)
mv -f docs/* ./
yarn doc
git add .
git commit -m 'update docs pre'
git push origin "$current_branch"
git checkout pre
git merge "$current_branch" -m 'merge'
git push origin pre
git checkout "$current_branch"