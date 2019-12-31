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
    <Table striped bordered hover size="sm">
        <thead>
            <tr>
                <th>Account Name</th>
                <th>Account Type</th>
                <th>referenceNumber</th>
                <th>Debit</th>
                <th>Credit</th>
            </tr>
        </thead>
        <tbody>
        {
            props.transactions?.map(transaction =>
                <tr>
                    <td>{transaction.account.name}</td>
                    <td>{transaction.account.accountType}</td>
                    <td>{transaction.referenceNumber}</td>
                    <td>
                        { transaction.account.accountType === 'LIABILITY' &&
                        transaction.amount
                        }
                    </td>
                    <td>
                        { transaction.account.accountType === 'ASSET' &&
                            transaction.amount
                        }
                    </td>

                </tr>
            )
        }

        <tr>
            <th colSpan={3}>Total</th>
            <th>{props.ledgerSummary?.debit}</th>
            <th>{props.ledgerSummary?.credit}</th>
        </tr>

        </tbody>
    </Table>
    );
}
