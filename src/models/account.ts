export type PWID = string;

export interface Address {
    title: string;
    line1: string;
    line2?: string;
    line3: string;
    line4: string;
    eircode: string;
    isDefault: boolean;
}

export type LabelType = 'Primary' | 'Secondary' | 'Other';

export interface PhoneNumber{
    id: string;
    label: LabelType;
    //e164 could be used as this refers to the international phone number format
    phoneNumber: string;
}

export interface EmailAddress{
    id: string;
    label: LabelType;
    email: string;
}

export interface AccountProfile { 
    pwid: PWID;
    name: string;
    address: Address;
    phones: PhoneNumber[];
    emails: EmailAddress[];
}