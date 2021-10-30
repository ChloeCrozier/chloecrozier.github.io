const fs = require('fs');
const csv = require('csv-parser');

const geojson = JSON.parse(fs.readFileSync('./data.json', 'utf8'));
const input = [];
const data = {};

fs.createReadStream('data.csv')
  .pipe(csv({ separator: '\t' }))
  .on('data', (data) => input.push(data))
  .on('end', () => {
    input.forEach(row => {
      const properties = {};
      Object.keys(row).forEach(key => {
        const value = row[key];
        if (key === "State") {
          key = "name";
        }
        properties[key.toLowerCase()] = value;
      })
      data[row.State] = properties;
    });
    geojson.features.forEach(feature => {
      const name = feature.properties.name;
      feature.properties = data[name];
    });
    
    fs.writeFileSync('./data.json', JSON.stringify(geojson, null, 4));    
  });