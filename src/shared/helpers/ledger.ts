import LedgerInterface from "../interfaces/LedgerInterface";

export function getLatestLedger(ledgers:LedgerInterface[]) {
    const sortedLedgers =  ledgers.sort((a, b) => {
        const firstDate: any = new Date(a.dateCreated);
        const secondDate: any = new Date(b.dateCreated);
        return secondDate -firstDate
    }).filter(ledger => ledger.status === 'ACTIVE');

    if (sortedLedgers.length > 1) {
        return sortedLedgers[0]
    } else {
        return null
    }
}
