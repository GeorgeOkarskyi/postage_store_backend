import csv from 'csvtojson';
import fs from 'fs';

const CSV_FILE_DIR = './csv/books.csv';
const TXT_FILE_DIR = './output/results.txt';
const OUTPUT_DIR = './output';

const READ_STREAM_ERROR_MESSAGE = 'Read Stream Error:';
const WRITE_STREAM_ERROR_MESSAGE = 'Write Stream Error:';
const CONVERTING_ERROR_MESSAGE = 'Error converting the CSV to JSON';
const CONVERTING_SUCCESS_MESSAGE = 'CSV file has been succesfuly created';

if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR);
}

const readStream = fs.createReadStream(CSV_FILE_DIR);
const writeStream =fs.createWriteStream(TXT_FILE_DIR);

readStream.on('error', (error) => console.error(READ_STREAM_ERROR_MESSAGE, error.message));
writeStream.on('error', (error) => console.error(WRITE_STREAM_ERROR_MESSAGE, error.message));

readStream.pipe(csv())
    .on('data', (row) => {
        const jsonObj = JSON.parse(row.toString());

        const formatedObject = {
            book: jsonObj.Book,
            author: jsonObj.Author,
            price: jsonObj.Price
        }

        writeStream.write(JSON.stringify(formatedObject)+'\n')
    })
    .on('error', (error) => {
        console.error(CONVERTING_ERROR_MESSAGE, error.message);
    })
    .on('end', () => {
        console.log(CONVERTING_SUCCESS_MESSAGE);
    })