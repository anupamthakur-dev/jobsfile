import { CircleAlert, icons, type LucideIcon, type LucideProps } from "lucide-react"

type IconProps = {
	iconName: string
} & LucideProps

function Icon({ iconName, ...props }: IconProps) {
	const LucideIcon = (icons as Record<string, LucideIcon>)[iconName] ?? CircleAlert

	return <LucideIcon {...props} />
}

export default Icon