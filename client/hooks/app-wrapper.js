import { createContext, useContext, useState } from 'react';

const AppContext = createContext(undefined);

function AppWrapper({ children }) {
  	const [show, setShow] = useState(false)


  	return (
    		<AppContext.Provider 
			value={{
				show,
				setShow
			}}
	  	>
      		{children}
    		</AppContext.Provider>
  	);
}

function useAppContext() {
  	return useContext(AppContext);
}

export { AppWrapper, useAppContext }
