

export default interface LedgerInterface {
    name: string
    description?: string
    credit: number
    debit: number
    ledgerAccounts?: any[]
    transactions?: any[]
    status: string
} 
