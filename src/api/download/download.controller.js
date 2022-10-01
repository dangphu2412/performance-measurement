import { CREATED } from 'http-status';
import { create } from 'html-pdf';
import { readFile } from 'fs/promises';
import { render } from 'ejs';
import { getBrowser } from './download-service.config';

async function getFile() {
  const template = await readFile(`${__dirname}/template.ejs`, {
    encoding: 'utf-8'
  });
  return render(template);
}

export const downloadViaPhantom = async (req, res) => {
    try {
      const file = await getFile();

      const fileData = await new Promise((resolve, reject) => {
        create(file, {
          timeout: '100000'
        }).toBuffer((err, buffer) => {
          if (err) reject(err);
          resolve(buffer);
        });
      });

      return res.status(CREATED).send(fileData.toString('utf-8'));
    } catch (err) {
      return res.status(400).send('ERROR');
    }
  };

export const downloadViaPuppeteer = async (req, res) => {
    try {
      const file = await getFile();
      const page = await getBrowser().newPage();

      await page.setContent(file);

      const pdfFile = await page.pdf();

      await page.close();

      return res
        .status(CREATED)
        .send(pdfFile.toString('utf-8'));
    } catch (err) {
      return res.status(400).send('ERROR');
    }
  };
