# Move to front-end folder
cd front-end/

# Build web app
yarn build

# Copy all of file and folder in build folder to path "../back-end/public/"
cp -a build/. ../back-end/public/

# Move to back-end folder
cd ../back-end/

# Build back-end
yarn build

# Move to smart-light folder
cd ..

# Add all
git add .

# Commit
git commit -m "new update"

# Push to Github
git push