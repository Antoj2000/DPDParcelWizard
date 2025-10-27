
// Import type definitions for account related models.
import type {
    AccountProfile,
    Address,
    EmailAddress,
    PhoneNumber,
} from '../models/account';


export interface AccountService {
    // fetches current account profile
    getProfile(): Promise<AccountProfile>;
    updateAddress(address: Address): Promise<AccountProfile>;
    addPhone(phone: Omit<PhoneNumber, 'id'>): Promise<AccountProfile>;
}

// Temp in-memory mock data (swap for real HTTP API later)
let MOCK: AccountProfile = { 
    pwid: 'PW130628',
    name: 'Anthony Johnson',
    address : { 
        line1: '123 Grafton Street',
        city: 'Dublin 2',
        county: 'Dublin',
        eircode: 'D02 XY45',
    },
    phones: [
        { id: 'p1', label: 'Primary', phoneNumber: '+353877766382' },
        { id: 'p2', label: 'Secondary', phoneNumber: '+353879009088' },
    ], 
    emails: [],
};


// Artificial latency to mimic delay
const delay = (ms = 250) => new Promise(r => setTimeout(r, ms));
const rid = () => Math.random().toString(36).slice(2, 9);

export const accountService: AccountService = {
    async getProfile() {
        await delay();
        return JSON.parse(JSON.stringify(MOCK));
    },
    async updateAddress(address){
        await delay();
        MOCK = { ...MOCK, address };
        return JSON.parse(JSON.stringify(MOCK));
    },

    async addPhone(phone){
        await delay();
        MOCK = {
            ...MOCK,
            phones: [...MOCK.phones, { ...phone, id: rid()}],
        };
        return JSON.parse(JSON.stringify(MOCK));
    }
}