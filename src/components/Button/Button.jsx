
export default function Button({ isAuthenticated, onClick, onLogOut, styleBtn, loginText, logoutText }) {
   const defaultStyleBtn = 'bg-black text-sm rounded-full p-3 pr-5 pl-5 text-white font-extralight hover:bg-gray-400 hover:cursor-pointer active:scale-90 duration-200'

    return (
        <div className="justify-self-center mt-10">
            {!isAuthenticated ? (
                <button
                    onClick={onClick}
                    type="submit" className={defaultStyleBtn || styleBtn}>
                    {loginText || "Continue"} {/* Текст по умолчанию — "Continue" */}
                </button>
            ) : (
                <button onClick={onLogOut} className={defaultStyleBtn || styleBtn}>
                    {logoutText || "Log Out"} {/* Текст по умолчанию — "Log Out" */}
                </button>
            )}
        </div>
    );
}