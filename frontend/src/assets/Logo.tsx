function Logo(props: { className?: string; color?: string }) {
    return (
        <svg
            version="1.0"
            xmlns="http://www.w3.org/2000/svg"
            width="30.000000pt"
            height="30.000000pt"
            viewBox="0 0 30.000000 30.000000"
            preserveAspectRatio="xMidYMid meet"
            className={props?.className}
        >
            <g
                transform="translate(0.000000,30.000000) scale(0.100000,-0.100000)"
                fill={props?.color ?? "#000000"}
                stroke="none"
            >
                <path
                    d="M82 260 c-56 -34 -67 -117 -22 -165 11 -12 20 -33 20 -48 0 -26 2
-27 50 -27 36 0 50 4 50 14 0 7 14 19 30 26 21 9 30 19 30 36 0 13 8 27 17 33
16 9 16 11 1 28 -9 10 -19 29 -23 43 -10 42 -51 80 -84 80 -17 0 -13 -86 4
-100 34 -28 -6 -87 -42 -64 -25 15 -28 42 -8 64 11 12 15 31 13 59 l-3 41 -33
-20z"
                />
            </g>
        </svg>
    );
}

export default Logo;
