console.log('Building content...')

const fs = require('fs')
const crypto = require('crypto')
const sharp = require("sharp");

const mappings = []

const folders = fs.readdirSync('./src/content');

folders.forEach(folder => {
  try {
    const files = fs.readdirSync(`./src/content/${folder}`)
    if (files.includes('index.json')) {
      const index = JSON.parse(fs.readFileSync(`./src/content/${folder}/index.json`, { encoding: 'utf-8'}))

      index['parentFolder'] = folder;

      if (!index.uuid) {
        index.uuid = crypto.randomUUID()
      }

      index['imageFilenames'] = []
      const imageEndings = ['.jpg', '.JPG', '.png', '.PNG', '.tiff', '.TIFF']
      files.forEach(file => {
        if (imageEndings.some(ending => file.endsWith(ending))) {
          index['imageFilenames'].push(file)
        }
      })

      const content = fs.readFileSync(`./src/content/${folder}/index.md`, { encoding: 'utf-8' }) ?? ''
      index['content'] = content

      mappings.push(index)
    }
  } catch (e) {

  }
})

// ROUTES.TXT for parametrized Angular SSG
let contentsToWriteToFile = ''
mappings.forEach(map => {
  contentsToWriteToFile += (contentsToWriteToFile === '' ? '' : '\n') + `/p/${map.uuid}`
  contentsToWriteToFile += (contentsToWriteToFile === '' ? '' : '\n') + `/g/${map.uuid}`
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
