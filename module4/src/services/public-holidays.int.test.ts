import { getListOfPublicHolidays, checkIfTodayIsPublicHoliday, getNextPublicHolidays } from './public-holidays.service';
import { PublicHolidayShort } from '../types';

const MOCK_PUBLICATION_YEAR = 2024;
const MOCK_PUBLICATION_COUNTRY_GB = 'GB';
const MOCK_PUBLICATION_COUNTRY_NUMBER_OF_HOLLIDAYS_GB = 15;
const MOCK_UNSUPORTED_PUBLICATION_COUNTRY_US = 'US';


describe('getListOfPublicHolidays', () => {
    it('should return list of public holidays', async () => {
        const publicHolidaysResponse: PublicHolidayShort[] = await getListOfPublicHolidays(MOCK_PUBLICATION_YEAR, MOCK_PUBLICATION_COUNTRY_GB);

        expect(publicHolidaysResponse.length).toEqual(MOCK_PUBLICATION_COUNTRY_NUMBER_OF_HOLLIDAYS_GB);
    })

    it('should trow an error that country provided is not supported', async () => {
        const publicHolidaysResponse: Promise<PublicHolidayShort[]> = getListOfPublicHolidays(MOCK_PUBLICATION_YEAR, MOCK_UNSUPORTED_PUBLICATION_COUNTRY_US);

        expect(publicHolidaysResponse).rejects.toThrow(`Country provided is not supported, received: ${MOCK_UNSUPORTED_PUBLICATION_COUNTRY_US}`);
    })
})

describe('checkIfTodayIsPublicHoliday', () => {
    it('should return false', async () => {
        const checkIfTodayIsPublicHolidayResponse: Boolean = await checkIfTodayIsPublicHoliday(MOCK_PUBLICATION_COUNTRY_GB);
        
        expect(checkIfTodayIsPublicHolidayResponse).toEqual(false);
    })
})

describe('getNextPublicHolidays', () => {
    it('should return list of next public holidays', async () => {
        const nextPublicHolidaysResponse: PublicHolidayShort[] = await getNextPublicHolidays(MOCK_PUBLICATION_COUNTRY_GB);

        expect(nextPublicHolidaysResponse.length).toEqual(MOCK_PUBLICATION_COUNTRY_NUMBER_OF_HOLLIDAYS_GB);
    })

    it('should trow an error that country provided is not supported', async () => {
        const nextPublicHolidaysResponse: Promise<PublicHolidayShort[]> = getNextPublicHolidays(MOCK_UNSUPORTED_PUBLICATION_COUNTRY_US);

        expect(nextPublicHolidaysResponse).rejects.toThrow(`Country provided is not supported, received: ${MOCK_UNSUPORTED_PUBLICATION_COUNTRY_US}`);
    })
})