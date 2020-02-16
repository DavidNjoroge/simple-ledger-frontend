import { LedgerDetailInterface } from "../../shared/interfaces/LedgerInterface";
import {Card} from "react-bootstrap";
import React from "react";


export interface  LedgerOverviewProps {
    selectedLedger?: LedgerDetailInterface
}

export default function LedgerOverview (props:  LedgerOverviewProps) {
    let balance = 0;
    if(props.selectedLedger) {
        balance = props.selectedLedger?.ledgerSummary.credit - props.selectedLedger?.ledgerSummary.debit
    }
    return (
        <Card>
            <Card.Body>
                <Card.Title>
                    Ledger: {props.selectedLedger?.ledger?.name}
                </Card.Title>
                <Card.Subtitle className="mb-2 text-muted">
                    LedgerAccounts:{' '}
                    <strong>{props.selectedLedger?.accounts?.length}</strong>
                </Card.Subtitle>
                <Card.Subtitle className="mb-2 text-muted">
                    Credit: <strong>{props.selectedLedger?.ledgerSummary?.credit}</strong>
                </Card.Subtitle>
                <Card.Subtitle className="mb-2 text-muted">
                    Debit: <strong>{props.selectedLedger?.ledgerSummary?.debit}</strong>
                </Card.Subtitle>

                <Card.Subtitle className="mb-2 text-muted">
                    Balance: <strong>{balance}</strong>
                </Card.Subtitle>
            </Card.Body>
        </Card>
    )
}
