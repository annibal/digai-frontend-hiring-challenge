import { ButtonHTMLAttributes, ReactNode, useState } from "react";
import { twMerge } from "tailwind-merge";
import "./RecorderButton.css";
import { PiSpinnerGapFill } from "react-icons/pi";


export interface IRecorderButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement> {
  icon: ReactNode;
  label: ReactNode;
  active?: boolean;
  disabled?: boolean;
}

export default function RecorderButton({
  icon,
  label,
  active,
  disabled,
  color = "indigo",
  onClick,
  ...restProps
}: IRecorderButtonProps) {
  const [isLoading, setIsLoading] = useState(false)

  const handleClick = async (e) => {
    setIsLoading(true);
    await onClick(e);
    setIsLoading(false);
  }

  return (
    <div
      className={twMerge("recorder-button w-1/6", disabled && !active && "opacity-60")}
      style={{
        perspectiveOrigin: "center",
        perspective: "400px",
      }}
    >
      <p
        className={twMerge(
          "-mt-10 mb-2 h-8",
          active ? `text-gray-900` : "text-gray-500",
          "flex justify-center items-end text-center",
          "leading-none text-xs tracking-widest font-medium title-font uppercase"
        )}
      >
        {label}
      </p>
      <button
        {...restProps}
        disabled={disabled}
        className={twMerge(
          "recorder-button__button",
          active && "recorder-button__button--active",
          disabled && !active && "recorder-button__button--disabled",
          "py-6 w-full",
          "overflow-hidden",
          "relative flex justify-center items-center",
          "border-b-2 border-x-2 border-gray-300",
          `text-gray-600 bg-white`,
          disabled
            ? "text-gray-400"
            : "cursor-pointer hover:bg-gray-50 hover:text-gray-700",
          "rounded-b-lg focus:outline-none"
        )}
        style={{
          transition: active
            ? "transform .4s cubic-bezier(0, 0, 0.07, 1.43)"
            : "transform .4s cubic-bezier(1, -1, 0.1, 2.15)",
          transformOrigin: "top center",
          ...(active ? { transform: "rotateX(-30deg)" } : {}),
        }}
        onClick={handleClick}
      >
        <span
          className={twMerge(
            `text-gray-600 bg-white text-xl md:text-3xl`,
            disabled && !active && "opacity-50",
          )}
        >
          {isLoading ? <PiSpinnerGapFill className="animate-spin text-purple-600"/> : icon}
        </span>
      </button>
    </div>
  );
}
