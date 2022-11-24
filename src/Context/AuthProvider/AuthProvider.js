import React, { createContext } from 'react';
export const AuthContext = createContext()
const AuthProvider = ({ children }) => {
    const user = { name: 'sajedul' }
    return (
        <div>
            <AuthContext.Provider value={user}>
                {children}
            </AuthContext.Provider>
        </div>
    );
};

export default AuthProvider;