import React from "react";

export default function WhatsappButton() {
	const phoneNumber = "+13074001963"; // E.164 without plus for wa.me
	const messageUrl = `https://wa.me/${phoneNumber}`;

	return (
		<a
			href={messageUrl}
			target="_blank"
			rel="noopener noreferrer"
			aria-label="Chat on WhatsApp"
			className="fixed bottom-9 right-10 z-[100] inline-flex h-20 w-20 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg transition-transform hover:scale-105 hover:bg-primary focus:outline-none focus:ring-2 focus:ring-white/40"
		>
			{/* WhatsApp logo (SVG) */}
			<svg
				xmlns="http://www.w3.org/2000/svg"
				viewBox="0 0 32 32"
				aria-hidden="true"
				className="h-7 w-7"
			>
				<path
					fill="currentColor"
					d="M19.11 17.5c-.27-.13-1.6-.78-1.84-.87c-.24-.09-.41-.13-.58.13c-.17.26-.67.87-.82 1.05c-.15.17-.3.2-.56.07c-.27-.13-1.13-.42-2.15-1.34c-.79-.7-1.32-1.57-1.48-1.84c-.15-.26-.02-.4.11-.53c.11-.11.26-.28.39-.43c.13-.15.17-.26.26-.43c.09-.17.04-.32-.02-.45c-.07-.13-.58-1.39-.79-1.9c-.21-.51-.42-.44-.58-.45c-.15-.01-.32-.01-.49-.01c-.17 0-.45.06-.69.32c-.24.26-.91.89-.91 2.16c0 1.27.93 2.5 1.06 2.67c.13.17 1.83 2.8 4.44 3.92c.62.27 1.1.43 1.47.55c.62.2 1.18.17 1.62.1c.5-.08 1.6-.65 1.83-1.28c.23-.63.23-1.17.16-1.28c-.07-.11-.24-.17-.51-.3m-3.1 6.16h-.01a7.48 7.48 0 0 1-3.82-1.05l-.27-.16l-2.84.74l.76-2.77l-.18-.28a7.47 7.47 0 1 1 6.36 3.52m6.38-13.85A9.38 9.38 0 0 0 7.5 24.25L6 29.75l5.62-1.47a9.37 9.37 0 0 0 4.53 1.16h.01a9.38 9.38 0 0 0 6.63-16.01"
				/>
			</svg>
		</a>
	);
}


