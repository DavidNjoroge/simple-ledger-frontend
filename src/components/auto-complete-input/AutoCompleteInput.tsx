
import React from "react";
import {AccountInterface} from "../../shared/interfaces/LedgerInterface";


export interface  AutoCompleteInputProps {
    searchedAccounts?: AccountInterface[];
    selectedAccount?: AccountInterface;
    autoCompleteInput: any;
    selectAccount: any;
}


export default function AutoCompleteInput(props: AutoCompleteInputProps) {
    return (
        <div>
            <div className="form-group sample-autocomplete">
                {!props.selectedAccount? (
                    <div className="sample-autocomplete-select">
                        <input autoComplete="off" onChange={props.autoCompleteInput} type="text" className="form-control" placeholder="search" required />

                        {
                            (!!props.searchedAccounts && props.searchedAccounts?.length > 0 )? (
                                <select multiple className="form-control" size={2} onChange={props.selectAccount}>
                                    {
                                        props.searchedAccounts?.map((account, index) =>
                                            <option value={account.id} key={index}>{account.name}</option>
                                        )
                                    }
                                </select>
                            ): null
                        }

                    </div>
                ): (
                    <div className="sample-autocomplete-select">
                        <select className="form-control" disabled={true}>
                            <option>{props.selectedAccount?.name}</option>
                        </select>
                    </div>
                )
                }
            </div>

        </div>
    )

}
