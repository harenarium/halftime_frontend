// write_subway_entries.js

const fs = require('fs');
const subwayJSON = require('./subway_entrance_locations.json')

let data = subwayJSON.data
let entryData = {}
let entries = data.forEach((entry) => {
  let e = entry.slice(0)
  entryData[ e[10] ] = [e[11], e[12]] 
})
fs.writeFile('output.json', JSON.stringify(entryData), (err) => {
  if (err) throw err;

  console.log('Saved.')
})
