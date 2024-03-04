const fs = require('fs')
const crypto = require('crypto')
const sharp = require("sharp");

const mappings = []

const folders = fs.readdirSync('./src/content');

folders.forEach(folder => {
  try {
    const files = fs.readdirSync(`./src/content/${folder}`)
    if (files.includes('index.md')) {
      const indexContent = fs.readFileSync(`./src/content/${folder}/index.md`, { encoding: 'utf-8'})
      const lines = indexContent.split('\n')

      const frontMatterVariables = {}
      let content = ''

      let numberOfTimesThatThreeDashesHaveAppeared = 0;
      for (let i = 0; i < lines.length; i++) {
        if (lines[i].trim() === "---") {
          numberOfTimesThatThreeDashesHaveAppeared += 1;
        } else if (numberOfTimesThatThreeDashesHaveAppeared === 1) {
          const keyAndValue = lines[i].split(':')
          keyAndValue.forEach((keyOrValue, i) => {
            keyAndValue[i] = keyOrValue.trim()
          })

          frontMatterVariables[keyAndValue[0]] = keyAndValue[1];
        } else {
          content += lines[i] + '\n';
        }
      }

      frontMatterVariables['content'] = content;

      frontMatterVariables['parentFolder'] = folder;

      if (!frontMatterVariables.uuid) {
        frontMatterVariables.uuid = crypto.randomUUID()
      }

      frontMatterVariables['imageFilenames'] = []
      const imageEndings = ['.jpg', '.JPG', '.png', '.PNG', '.tiff', '.TIFF']
      files.forEach(file => {
        if (imageEndings.some(ending => file.endsWith(ending))) {
          frontMatterVariables['imageFilenames'].push(file)
        }
      })

      mappings.push(frontMatterVariables)
    }
  } catch (e) {

  }
})

let contentsToWriteToFile = ''
mappings.forEach(map => {
  contentsToWriteToFile += (contentsToWriteToFile === '' ? '' : '\n') + `/p/${map.uuid}`
})
fs.writeFileSync('./routes.txt', contentsToWriteToFile)

mappings.forEach(mapping => {
  mapping.imageFilenames.forEach(filename => {

    fs.access('./src/assets/' + filename + '_800.jpg', fs.constants.F_OK, (err) => {
      if (err) {
        // File does not exist, so create it.
        sharp('./src/content/' + mapping.parentFolder + '/' + filename)
          .resize(800)
          .jpeg({mozjpeg: true})
          .toFile('./src/assets/' + filename + '_800.jpg',
            (err, info) => {
              err ? console.error(err) : null
            })
      }
    })

    fs.access('./src/assets/' + filename + '_full.jpg', fs.constants.F_OK, (err) => {
      if (err) {
        sharp('./src/content/' + mapping.parentFolder + '/' + filename)
          .jpeg({mozjpeg: true})
          .toFile('./src/assets/' + filename + '_full.jpg',
            (err, info) => {
              err ? console.error(err) : null
            })
      }
    })
   })
})

fs.writeFileSync(
  './src/content/mappings.ts',
  `export const mappings = ${JSON.stringify(mappings)}`,
)
