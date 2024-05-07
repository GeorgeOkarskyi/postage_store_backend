import axios from 'axios';
import { getListOfPublicHolidays, checkIfTodayIsPublicHoliday, getNextPublicHolidays } from './public-holidays.service';
import { PUBLIC_HOLIDAYS_API_URL } from '../config';


jest.mock('../helpers', () => ({
    validateInput: jest.fn(),
    shortenPublicHoliday: jest.fn((holiday) => holiday),
}));

const MOCK_PUBLIC_HOLIDAYS_ARRAY = [
    {
        name: 'test name 1',
        localName: 'test local name 1',
        date: 'test date 1',
    },
    {
        name: 'test name 2',
        localName: 'test local name 2',
        date: 'test date 2',
    },
    {
        name: 'test name 3',
        localName: 'test local name 3',
        date: 'test date 3',
    }
];
const MOCK_PUBLICATION_YEAR = 2024;
const MOCK_PUBLICATION_COUNTRY = 'GB';

describe('getListOfPublicHolidays', () => {
    it('should return list of public holidays', async () => {
        jest.spyOn(axios, 'get').mockImplementation(() => Promise.resolve({ data: MOCK_PUBLIC_HOLIDAYS_ARRAY }));

        const publicHolidaysResponse = await getListOfPublicHolidays(MOCK_PUBLICATION_YEAR, MOCK_PUBLICATION_COUNTRY);

        expect(publicHolidaysResponse).toEqual(MOCK_PUBLIC_HOLIDAYS_ARRAY);
    });

    test('should call API with proper arguments', async () => {
        const axiosGetSpy = jest.spyOn(axios, 'get').mockImplementation(() => Promise.resolve({ data: MOCK_PUBLIC_HOLIDAYS_ARRAY }));
      
        await getListOfPublicHolidays(MOCK_PUBLICATION_YEAR, MOCK_PUBLICATION_COUNTRY);

        expect(axiosGetSpy).toHaveBeenCalledWith(`${PUBLIC_HOLIDAYS_API_URL}/PublicHolidays/${MOCK_PUBLICATION_YEAR}/${MOCK_PUBLICATION_COUNTRY}`);
    });

    test('should return empty array if the request was rejected', async () => {
        jest.spyOn(axios, 'get').mockImplementation(() => Promise.reject(new Error()));
        const publicHolidaysResponse = await getListOfPublicHolidays(MOCK_PUBLICATION_YEAR, MOCK_PUBLICATION_COUNTRY);

        expect(publicHolidaysResponse).toEqual([]);
    });

    afterEach(() => {
        jest.clearAllMocks();
    });
})

describe('checkIfTodayIsPublicHoliday', () => {
    it('should return true', async () => {
        jest.spyOn(axios, 'get').mockImplementation(() => Promise.resolve({ data: [], status: 200 }));
        const checkIfTodayIsPublicHolidayResponse = await checkIfTodayIsPublicHoliday(MOCK_PUBLICATION_COUNTRY);
        
        expect(checkIfTodayIsPublicHolidayResponse).toEqual(true);
    });

    it('should return false', async () => {
        jest.spyOn(axios, 'get').mockImplementation(() => Promise.reject(new Error()));

        const checkIfTodayIsPublicHolidayResponse = await checkIfTodayIsPublicHoliday(MOCK_PUBLICATION_COUNTRY);

        expect(checkIfTodayIsPublicHolidayResponse).toEqual(false);
    });

    it('should call API with proper arguments', async () => {
        const axiosGetSpy = jest.spyOn(axios, 'get').mockImplementation(() => Promise.resolve({ data: [], status: 200 }));
      
        await checkIfTodayIsPublicHoliday(MOCK_PUBLICATION_COUNTRY);

        expect(axiosGetSpy).toHaveBeenCalledWith(`${PUBLIC_HOLIDAYS_API_URL}/IsTodayPublicHoliday/${MOCK_PUBLICATION_COUNTRY}`);
    });
    
    afterEach(() => {
        jest.clearAllMocks();
    });
})

describe('getNextPublicHolidays', () => {
    it('should return list of next public holidays', async () => {
        jest.spyOn(axios, 'get').mockImplementation(() => Promise.resolve({ data: MOCK_PUBLIC_HOLIDAYS_ARRAY }));

        const nextPublicHolidaysResponse = await getNextPublicHolidays(MOCK_PUBLICATION_COUNTRY);

        expect(nextPublicHolidaysResponse).toEqual(MOCK_PUBLIC_HOLIDAYS_ARRAY);
    });

    test('should call API with proper arguments', async () => {
        const axiosGetSpy = jest.spyOn(axios, 'get').mockImplementation(() => Promise.resolve({ data: MOCK_PUBLIC_HOLIDAYS_ARRAY }));
      
        await getNextPublicHolidays(MOCK_PUBLICATION_COUNTRY);

        expect(axiosGetSpy).toHaveBeenCalledWith(`${PUBLIC_HOLIDAYS_API_URL}/NextPublicHolidays/${MOCK_PUBLICATION_COUNTRY}`);
    });

    test('should return empty array if the request was rejected', async () => {
        jest.spyOn(axios, 'get').mockImplementation(() => Promise.reject(new Error()));
        const nextPublicHolidaysResponse = await getNextPublicHolidays(MOCK_PUBLICATION_COUNTRY);

        expect(nextPublicHolidaysResponse).toEqual([]);
      });

    afterEach(() => {
        jest.clearAllMocks();
    });
})