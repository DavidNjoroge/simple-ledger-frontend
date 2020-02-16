import * as React from 'react';
import './TransactionTable.css';
import {Table} from "react-bootstrap";
import {
    LedgerSummaryInterface,
    TransactionInterface
} from "../../shared/interfaces/LedgerInterface";

export interface  TransactionTableProps {
    transactions?: TransactionInterface[]
    ledgerSummary?: LedgerSummaryInterface
}

export default function TransactionTable (props:  TransactionTableProps) {
    return (
        <div>
            <Table striped bordered hover size="sm">
                <thead>
                    <tr>
                        <th>Account Name</th>
                        <th>Account Type</th>
                        <th>Reference Number</th>
                        <th className="text-right">Debit</th>
                        <th className="text-right">Credit</th>
                    </tr>
                </thead>
                <tbody>
                    {
                props.transactions?.map(transaction =>
                    <tr>
                        <td>{transaction.account.name}</td>
                        <td>{transaction.account.accountType}</td>
                        <td>{transaction.referenceNumber}</td>
                        <td className="text-right">
                            { transaction.account.accountType === 'LIABILITY' &&
                            transaction.amount
                            }
                        </td>
                        <td className="text-right padding-sm">
                            { transaction.account.accountType === 'ASSET' &&
                                transaction.amount
                            }
                        </td>

                    </tr>
                )
                    }

                    <tr>
                        <th colSpan={3}>sub total</th>
                        <th className="text-right padding-sm">{props.ledgerSummary?.debit}</th>
                        <th className="text-right padding-sm">{props.ledgerSummary?.credit}</th>
                    </tr>

                </tbody>
            </Table>

            <div className="d-flex flex-row-reverse">
                <div className="d-flex padding-left--sm transaction-total">
                    <div><strong>Total</strong></div>
                    <div>3000</div>
                </div>
            </div>
        </div>

    );
}
