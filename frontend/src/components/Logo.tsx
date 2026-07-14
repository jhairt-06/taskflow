export default function Logo( {width, height}: {width: number; height: number}, ) {
    return (
        <svg width={width} height={height} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M3 20C7 20 7 10 12 10C17 10 17 22 22 22C27 22 27 12 29 12"
                  stroke="#3E5CFF" strokeWidth="2.4" strokeLinecap="round"/>
            <circle cx="7" cy="16.4" r="2.1" fill="#8B5CF6"/>
            <circle cx="17" cy="15.2" r="2.1" fill="#3E5CFF"/>
            <circle cx="26" cy="17.6" r="2.1" fill="#14B8A6"/>
        </svg>
    )
}