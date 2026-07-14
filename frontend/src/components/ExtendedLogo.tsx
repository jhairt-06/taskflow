export default function ExtendedLogo() {
    return (
        <svg
            className="w-full h-16"
            viewBox="0 0 500 80"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            preserveAspectRatio="none"
        >
            <path
                d="M 0 40 C 60 40, 80 15, 125 15 C 170 15, 200 65, 250 65 C 300 65, 330 15, 375 15 C 420 15, 440 40, 500 40"
                stroke="#F0F0F0"
                strokeWidth="3"
                strokeLinecap="round"
            />

            <circle cx="125" cy="15" r="10.5" fill="#C084FC" />
            <circle cx="250" cy="65" r="7.5" fill="#60A5FA" />
            <circle cx="375" cy="15" r="12.5" fill="#2DD4BF" />
        </svg>
    );
}