// 

import { StyleSheet } from 'react-native';
import { Colors as c} from './colors';


export const GlobalStyles = StyleSheet.create({ 
    container: { 
        flex: 1,
        padding: 16,
        backgroundColor: c.background, 
    },
    header: {
        alignItems: 'center',
        marginBottom: 24,
    },
    title: {
        fontSize: 24,
        fontWeight: '600',  //Boldness of text
        marginTop: 8,
        color: c.dpdRed,
    },
    subtitle: {
        color: c.mutedText,
        fontSize: 14,
        marginTop: 4,
    },
    sectionHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 12,
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderColor: c.border,
    },
    sectionTitle:{
        fontSize: 18,
        fontWeight: '500',
    },
    sectionContent:{
        paddingVertical: 12,
        gap: 12,
    },
    label: {
        fontWeight: '600',
        color: c.blackText,
    },
    value:{
        fontSize: 14,
        color: c.blackText,
    }
});