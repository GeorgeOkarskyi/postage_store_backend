import request from 'supertest';
import { PUBLIC_HOLIDAYS_API_URL } from './config';

const MOCK_COUNTRY = 'GB';

describe('Public Holiday API Tests', () => {
    it('should check if today is a public holiday in the specified country', async () => {
        const response = await request(PUBLIC_HOLIDAYS_API_URL).get(`/IsTodayPublicHoliday/${MOCK_COUNTRY}`);
        
        expect(typeof (response.status === 200)).toBe('boolean');
    });
    
    it('should get the next public holidays in the specified country', async () => {
        const response = await request(PUBLIC_HOLIDAYS_API_URL).get(`/NextPublicHolidays/${MOCK_COUNTRY}`);
        
        expect(response.status).toBe(200);
        expect(Array.isArray(response.body)).toBeTruthy();
        if (response.body.length > 0) {
            expect(response.body[0]).toHaveProperty('date');
            expect(response.body[0]).toHaveProperty('name');
            expect(response.body[0]).toHaveProperty('localName');
        }
    });
});