import csv from 'csvtojson';
import { Parser } from 'json2csv';
import fs from 'fs';
import { Request } from 'express';
import { VALIDATION_MAP } from './joi.constants';

export const validateBody = (req: Request) => {
    const schemaKey = `${req.method} ${req.baseUrl}`

    return VALIDATION_MAP[schemaKey].validate(req.body);
}

export async function findItemsInCsv<T>(csvFilePath: string, conditionCallback: (json: any) => boolean): Promise<T[]> {
  return (await getItemsFromCsv<T>(csvFilePath)).filter(conditionCallback);
}

export async function getItemsFromCsv<T>(csvFilePath: string): Promise<Array<T>> {
  return await csv().fromFile(csvFilePath);
}

export async function writteCsv<T>(csvFilePath: string, csvJsonArray: T[]): Promise<T[]> {
  const parser = new Parser();
  const csvData = parser.parse(csvJsonArray);
  
  await fs.promises.writeFile(csvFilePath, csvData);
  
  return csvJsonArray;
}

export async function updateCsv<T>(csvFilePath: string, modifierFunction: (item: T) => T): Promise<T[]> {
  const csvJson = await getItemsFromCsv(csvFilePath);
  const updatedCsvJson = csvJson.map((item: T) => modifierFunction(item));

  return await writteCsv(csvFilePath, updatedCsvJson);
}

export async function addItemCsv<T>(csvFilePath: string, item: T): Promise<T> {
  const csvJsonArray: T[] = await getItemsFromCsv(csvFilePath);
  csvJsonArray.push(item);

  await writteCsv(csvFilePath, csvJsonArray);

  return item;
}

export async function deleteItemFromCsv<T extends { id: string }>(csvFilePath: string, itemId: string): Promise<Boolean> {
  const csvJsonArray: T[] = await getItemsFromCsv(csvFilePath);
  const itemIndex = csvJsonArray.findIndex(csvJsonItem => csvJsonItem.id === itemId);

  csvJsonArray.splice(itemIndex, 1);

  await writteCsv(csvFilePath, csvJsonArray);

  return true;
}