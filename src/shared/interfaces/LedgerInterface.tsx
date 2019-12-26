
export default interface LedgerInterface {
    id: number
    name: string
    description?: string
    credit: number
    debit: number
    status: string
    dateCreated: string
} 

export interface LedgerDetailInterface {
    ledger?: LedgerInterface
    accounts?: any[]
    transactions?: any[]
    ledgerSummary?: LedgerSummaryInterface
}

export interface LedgerSummaryInterface {
    credit: number
    debit: number
}
