import LedgerInterface from "../interfaces/LedgerInterface";

export function getLatestLedger(ledgers:LedgerInterface[]): LedgerInterface | null {
    const activeLedgers = ledgers.filter((ledger: LedgerInterface) => ledger.status === 'ACTIVE');
    if(activeLedgers.length === 1 ) {
        return activeLedgers[0];
    }
    const sortedLedgers =  activeLedgers.sort((a, b) => {
        const firstDate: any = new Date(a.dateCreated);
        const secondDate: any = new Date(b.dateCreated);
        return secondDate - firstDate
    });

    if (sortedLedgers.length > 1) {
        return sortedLedgers[0]
    } else {
        return null
    }
}
