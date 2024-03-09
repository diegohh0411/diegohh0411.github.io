console.log('Building content...')

const fs = require('fs')
const crypto = require('crypto')
const sharp = require("sharp");

const mappings = []

const folders = fs.readdirSync('./src/content');

function isUUID(str) {
  // Regular expression to validate UUID format
  const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/;
  return uuidRegex.test(str);
}
// mappings.ts file creation
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
          if (!isUUID(file.substring(0, file.length - 4))) {
            const newFileName = `${crypto.randomUUID()}.${file.slice(-3)}`
            fs.rename(`./src/content/${folder}/${file}`, `./src/content/${folder}/${newFileName}`, (err) => {
              if (err) throw err;
              console.log(`File [${file}] renamed to [${newFileName}]`)
            })

            index['imageFilenames'].push(newFileName)
          } else {
            index['imageFilenames'].push(file)
          }
        }
      })

      index['videoFilenames'] = []
      const videoEndings = ['.mp4', '.MP4']
      files.forEach(file => {
        if (videoEndings.some(ending => file.endsWith(ending))) {
          index['videoFilenames'].push(file)
        }
      })

      index['content'] = fs.readFileSync(`./src/content/${folder}/index.md`, {encoding: 'utf-8'}) ?? ''

      mappings.push(index)
    }
  } catch (e) {

  }
})

// ROUTES.TXT for parametrized Angular SSG
let contentsToWriteToFile = ''
mappings.forEach(mapping => {
  contentsToWriteToFile += (contentsToWriteToFile === '' ? '' : '\n') + `/p/${mapping.uuid}`
  mapping.imageFilenames.forEach(filename => {
    contentsToWriteToFile += '\n' + `/g/${mapping.uuid}/${filename}`
  })
})
fs.writeFileSync('./routes.txt', contentsToWriteToFile)

// Image & video optimization
mappings.forEach(mapping => {
  mapping.imageFilenames.forEach(filename => {
    fs.access('./src/assets/' + filename + '_800.jpg', fs.constants.F_OK, (err) => {
      if (err) {
        // File does not exist, so create it.
        sharp('./src/content/' + mapping.parentFolder + '/' + filename)
          .resize(800)
          .jpeg({mozjpeg: true})
          .toFile('./src/assets/' + filename + '_800.jpg',
            (err, _info) => {
              err ? console.error(err) : null
              console.log(`Optimized file [${filename}]`)
            })
      }
    })

    fs.access('./src/assets/' + filename + '_full.jpg', fs.constants.F_OK, (err) => {
      if (err) {
        sharp('./src/content/' + mapping.parentFolder + '/' + filename)
          .jpeg({mozjpeg: true})
          .toFile('./src/assets/' + filename + '_full.jpg',
            (err, _info) => {
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
