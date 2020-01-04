
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
    ledger: LedgerInterface
    accounts: AccountInterface[]
    transactions: TransactionInterface[]
    ledgerSummary: LedgerSummaryInterface
}

export interface LedgerSummaryInterface {
    credit: number
    debit: number
}

export interface TransactionInterface {
    account: AccountInterface
    description?: string
    referenceNumber?: string
    amount: number
}

export interface AccountInterface {
    id:number
    name: string
    accountType: string
    description?: string
}
