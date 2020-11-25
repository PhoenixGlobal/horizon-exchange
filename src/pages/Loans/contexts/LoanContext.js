import React, { createContext, useContext, useEffect, useState } from 'react';
import hznJSConnector from 'utils/hznJSConnector';

const LoanContext = createContext(null);

export const LoanProvider = ({ children }) => {
	const [contractType, setContractType] = useState('sETH');
	const [contract, setContract] = useState(null);

	useEffect(() => {
		const getSelectedContract = async () => {
			const {
				snxJS: { EtherCollateral, EtherCollateralsUSD },
			} = hznJSConnector;
			if (contractType === 'sETH') {
				setContract(EtherCollateral.contract);
			} else {
				setContract(EtherCollateralsUSD.contract);
			}
		};
		getSelectedContract();
	}, [contractType]);

	return (
		<LoanContext.Provider value={{ contract, setContract, contractType, setContractType }}>
			{children}
		</LoanContext.Provider>
	);
};

export const useLoanContext = () => useContext(LoanContext);
