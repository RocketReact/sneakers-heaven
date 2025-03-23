
//Reused Button on Login & Checkout

export default function Button({ isAuthenticated, onClick, onLogOut, styleBtn, loginText, logoutText }) {
   const defaultStyleBtn = '' +
       'ml-5 text-sm font-bold text-gray-400 ' +
       'hover:cursor-pointer hover:text-gray-500 underline underline-offset-3';

    return (
        <div className="text-left  ">
            {!isAuthenticated ? (
                <button
                    onClick={onClick}
                    type="submit" className={defaultStyleBtn || styleBtn}>
                    {loginText || "Continue"}
                </button>
            ) : (
                <button onClick={onLogOut} className={defaultStyleBtn || styleBtn}>
                    {logoutText || "Log Out"}
                </button>
            )}
        </div>
    );
}