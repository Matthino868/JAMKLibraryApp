const Button = ({ text, onClick }) => {
    return (
        <button
            onClick={onClick}
            className="bg-pink-500 text-white px-4 py-2 rounded-md hover:bg-white hover:text-pink-800 transition"
        >
            {text}
        </button>
    );
}

export default Button;