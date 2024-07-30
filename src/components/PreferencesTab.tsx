"use client";
import { MoonIcon, SunIcon, Volume2, VolumeX } from "lucide-react";
import { Button } from "./ui/button";
import { useTheme } from "next-themes";
import { usePreferences } from "@/store/usePreferences";


const PreferencesTab = () => {
	const { setTheme } = useTheme();

	const { soundEnabled, setSoundEnabled } = usePreferences();

	return (
		<div className='flex flex-wrap gap-2 px-1 md:px-2'>
			<Button
				variant={"outline"}
				size={"icon"}
				onClick={() => {
					setTheme("light");
				}}
			>
				<SunIcon className='size-[1.2rem] text-muted-foreground' />
			</Button>
			<Button
				variant={"outline"}
				size={"icon"}
				onClick={() => {
					setTheme("dark");
				}}
			>
				<MoonIcon className='size-[1.2rem] text-muted-foreground' />
			</Button>
		</div>
	);
};
export default PreferencesTab;
