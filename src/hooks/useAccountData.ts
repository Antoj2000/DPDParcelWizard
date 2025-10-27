// 


import { useEffect, useState, useCallback } from 'react';
import { Alert } from 'react-native';
import { accountService } from '../api/accountService';
import type { AccountProfile, Address } from '../models/account';


export function useAccountData(){
    const [profile, setProfile] = useState<AccountProfile | null>(null);
    const [loading, setLoading] = useState(true);


    // initial load
    useEffect(() => {
        (async () => {
            try {
                const p = await accountService.getProfile();
                setProfile(p);
            } catch(e) {
                Alert.alert('Error', 'Failed to load account profile.');
            } finally {
                setLoading(false);
            }
        })();
    }, []);

    //useCallback to avoid re-creating the function on every render
    const updateAddress = useCallback(async (address: Address) => {
        try{
            const updated = await accountService.updateAddress(address);
            setProfile(updated);
        } catch (e) {
            Alert.alert('Error', 'Could not updated address');
        }
    }, []);

    return { loading, profile, updateAddress };
}