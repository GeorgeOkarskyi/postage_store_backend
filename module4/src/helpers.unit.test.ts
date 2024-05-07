import { validateInput, shortenPublicHoliday } from './helpers'; 
import {  PublicHoliday, PublicHolidayShort } from './types'; 

describe('validateInput', () => {
  const currentYear = new Date().getFullYear();
  
  it('Should validate supported country and current year', () => {
    expect(() => {
      validateInput({ country: 'GB', year: currentYear });
    }).not.toThrow();
  });

  it('throws an error for unsupported countries', () => {
    const country = 'US';
    expect(() => {
      validateInput({ country: country });
    }).toThrow(`Country provided is not supported, received: ${country}`);
  });

  it('throws an error for a year that is not the current year', () => {
    const nextYear = new Date().getFullYear() + 1;
    expect(() => {
      validateInput({ country: 'GB', year: nextYear });
    }).toThrow(`Year provided not the current, received: ${nextYear}`);
  });

  it('does not throw an error when only a supported country is provided without year', () => {
    expect(() => {
      validateInput({ country: 'GB' });
    }).not.toThrow();
  });

  it('does not throw an error when only the current year is provided without country', () => {
    expect(() => {
      validateInput({ year: currentYear });
    }).not.toThrow();
  });

  it('throws no error when neither country nor year is provided', () => {
    expect(() => {
      validateInput({});
    }).not.toThrow();
  });
});

describe('shortenPublicHoliday', () => {
  it('correctly extracts name, localName, and date from a PublicHoliday object', () => {
    const input_hiliday: PublicHoliday = {
        date: 'test date',
        localName: 'test local name',
        name: 'test name',
        countryCode: 'test country code',
        fixed: true,
        global: true,
        counties: null,
        launchYear: 1967,
        types: ['test type']
    };

    const expectedOutput: PublicHolidayShort = {
      name: input_hiliday.name,
      localName: input_hiliday.localName,
      date: input_hiliday.date,
    };

    expect(shortenPublicHoliday(input_hiliday)).toEqual(expectedOutput);
  });
});