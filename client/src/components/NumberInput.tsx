

// @ts-ignore
const NumberInput = ({ value, onChange }) => {
    return (
        <div className={"flex flex-col gap-2 w-40 inline-flex"}>
            <label>Quantity</label>
            <div className="relative">
                <input
                    className="w-full border border-gray-300 rounded text-center"
                    onChange={e => {
                        const newVal = e.target.value;

                        // Check for non-strings and empty
                        if (/^\d*$/.test(newVal)) {
                            onChange(newVal === '' ? 1 : parseInt(newVal, 10));
                        }
                    }}
                    value={value}
                />

                {/* Minus button */}
                <button
                    disabled={value === 1}
                    className="absolute left-2 top-1/2 transform -translate-y-1/2 w-6 h-6 text-gray-400 "
                    onClick={() => {
                        onChange(value - 1);
                    }}
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="size-6"
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14" />
                    </svg>
                </button>

                {/* Plus button */}
                <button
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 w-6 h-6 text-gray-400"
                    onClick={() => {
                        onChange(value + 1);
                    }}
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="size-6"
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                    </svg>
                </button>
            </div>
        </div>
    );
};

export default NumberInput;
