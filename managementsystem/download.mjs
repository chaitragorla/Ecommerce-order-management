import fs from 'fs';
import https from 'https';

const downloadFile = (url, dest) => {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(dest);
    https.get(url, {
      headers: { 'User-Agent': 'Mozilla/5.0' }
    }, (response) => {
      if (response.statusCode === 301 || response.statusCode === 302) {
        return downloadFile(response.headers.location, dest).then(resolve).catch(reject);
      }
      if (response.statusCode !== 200) {
        return reject(new Error(`Failed to get '${url}' (${response.statusCode})`));
      }
      response.pipe(file);
      file.on('finish', () => file.close(resolve));
    }).on('error', (err) => fs.unlink(dest, () => reject(err)));
  });
};

const searchAndDownload = (query, dest) => {
  return new Promise((resolve, reject) => {
    const searchUrl = `https://en.wikipedia.org/w/api.php?action=query&prop=pageimages&format=json&piprop=original&titles=${encodeURIComponent(query)}`;
    https.get(searchUrl, { headers: { 'User-Agent': 'Mozilla/5.0' } }, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', async () => {
        try {
          const json = JSON.parse(data);
          const pages = json.query.pages;
          const pageId = Object.keys(pages)[0];
          if (pageId === '-1' || !pages[pageId].original) {
            return reject(new Error('No image found for ' + query));
          }
          const imageUrl = pages[pageId].original.source;
          console.log(`Downloading ${imageUrl} to ${dest}`);
          await downloadFile(imageUrl, dest);
          resolve();
        } catch (e) {
          reject(e);
        }
      });
    });
  });
};

async function run() {
  try {
    if (!fs.existsSync('./public')) fs.mkdirSync('./public');
    await searchAndDownload('Bathroom scale', './public/smart-scale.jpg');
    console.log('Scale downloaded successfully');
    await searchAndDownload('Oura (company)', './public/smart-ring.jpg');
    console.log('Ring downloaded successfully');
  } catch (error) {
    console.error(error);
  }
}

run();
