import { useId } from "react";
import { Label } from "@/registry/new-york/ui/label";
import { RadioGroup, RadioGroupItem } from "@/registry/new-york/ui/radio-group";
import { Badge } from "@/registry/new-york/ui/badge";
import {
  Card,
  CardHeader,
  CardContent, // added
  CardTitle,
  CardDescription,
  CardFooter, // added
} from "@/registry/new-york/ui/card";

export default function CardRadio() {
  const id = useId();
  return (
    <Card className="h-full min-h-[300px] sm:min-h-[400px] shadow-none flex flex-col">
      <CardHeader className="pb-3 sm:pb-4">
        <CardTitle className="text-lg sm:text-xl">
          <Badge variant="secondary" className="text-xs">
            Card Radio
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-2 flex-1 px-3 sm:px-6">
        <RadioGroup defaultValue="1" className="grid gap-2 sm:gap-3">
          {/* Radio card #1 */}
          <Label
            htmlFor={`${id}-1`}
            className="group flex items-start gap-2 sm:gap-3 border border-input rounded-md p-3 sm:p-4 cursor-pointer data-[state=checked]:border-primary transition"
          >
            <RadioGroupItem
              value="1"
              id={`${id}-1`}
              aria-describedby={`${id}-1-description`}
              className="shrink-0 after:absolute after:inset-0 mt-0.5"
            />
            <svg
              className="shrink-0 w-6 h-4 sm:w-8 sm:h-6"
              width={32}
              height={24}
              viewBox="0 0 32 24"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              <rect width="32" height="24" rx="4" fill="#252525" />
              <path
                d="M19.0537 6.49742H12.9282V17.5026H19.0537V6.49742Z"
                fill="#FF5A00"
              />
              <path
                d="M13.3359 12C13.3359 9.76408 14.3871 7.77961 16 6.49741C14.8129 5.56408 13.3155 5 11.6822 5C7.81295 5 4.68221 8.13074 4.68221 12C4.68221 15.8693 7.81295 19 11.6822 19C13.3155 19 14.8129 18.4359 16 17.5026C14.3848 16.2385 13.3359 14.2359 13.3359 12Z"
                fill="#EB001B"
              />
              <path
                d="M27.3178 12C27.3178 15.8693 24.1871 19 20.3178 19C18.6845 19 17.1871 18.4359 16 17.5026C17.6333 16.2181 18.6641 14.2359 18.6641 12C18.6641 9.76408 17.6129 7.77961 16 6.49741C17.1848 5.56408 18.6822 5 20.3155 5C24.1871 5 27.3178 8.15113 27.3178 12Z"
                fill="#F79E1B"
              />
            </svg>
            <div className="grid grow gap-1 sm:gap-2 min-w-0">
              <CardTitle className="text-sm sm:text-base truncate">
                Label{" "}
                <span className="text-muted-foreground text-xs font-normal">
                  (Sublabel)
                </span>
              </CardTitle>
              <CardDescription
                id={`${id}-1-description`}
                className="text-xs text-muted-foreground leading-tight"
              >
                You can use this card with a label and a description.
              </CardDescription>
            </div>
          </Label>

          {/* Radio card #2 */}
          <Label
            htmlFor={`${id}-2`}
            className="group flex items-start gap-2 sm:gap-3 border border-input rounded-md p-3 sm:p-4 cursor-pointer data-[state=checked]:border-primary transition"
          >
            <RadioGroupItem
              value="2"
              id={`${id}-2`}
              aria-describedby={`${id}-2-description`}
              className="shrink-0 after:absolute after:inset-0 mt-0.5"
            />
            <svg
              className="shrink-0 w-6 h-4 sm:w-8 sm:h-6"
              width={32}
              height={24}
              viewBox="0 0 32 24"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              <g clipPath="url(#vc-a)">
                <path
                  fill="#252525"
                  d="M28 0H4a4 4 0 0 0-4 4v16a4 4 0 0 0 4 4h24a4 4 0 0 0 4-4V4a4 4 0 0 0-4-4Z"
                />
                <path
                  fill="#fff"
                  d="m15.884 8.262-1.604 7.496h-1.94l1.604-7.496h1.94Z"
                />
                <path
                  fill="#fff"
                  fillRule="evenodd"
                  d="M26.207 15.758H28l-1.567-7.496H24.78a.882.882 0 0 0-.826.55l-2.91 6.946h2.037l.404-1.12h2.488l.235 1.12Zm-2.165-2.656 1.021-2.815.587 2.815h-1.608Z"
                  clipRule="evenodd"
                />
                <path
                  fill="#fff"
                  d="M21.144 13.31c.005-1.183-.975-1.698-1.76-2.11-.526-.276-.964-.506-.957-.861.007-.27.263-.555.823-.628.277-.036 1.044-.065 1.913.335l.34-1.59a5.23 5.23 0 0 0-1.815-.331c-1.917 0-3.265 1.018-3.276 2.477-.013 1.08.963 1.681 1.697 2.04.756.368 1.01.604 1.006.932-.005.503-.604.726-1.16.734-.945.015-1.506-.247-1.95-.454l-.042-.02-.352 1.643c.454.208 1.29.39 2.156.398 2.038 0 3.371-1.006 3.377-2.565ZM13.112 8.262 9.97 15.758H7.92L6.374 9.775c-.094-.368-.175-.503-.46-.658-.467-.253-1.237-.49-1.914-.638l.046-.217h3.3c.42 0 .798.28.894.763l.817 4.338 2.018-5.101h2.037Z"
                />
              </g>
              <defs>
                <clipPath id="vc-a">
                  <path fill="#fff" d="M0 0h32v24H0z" />
                </clipPath>
              </defs>
            </svg>
            <div className="grid grow gap-1 sm:gap-2 min-w-0">
              <CardTitle className="text-sm sm:text-base truncate">
                Label{" "}
                <span className="text-muted-foreground text-xs font-normal">
                  (Sublabel)
                </span>
              </CardTitle>
              <CardDescription
                id={`${id}-2-description`}
                className="text-xs text-muted-foreground leading-tight"
              >
                You can use this card with a label and a description.
              </CardDescription>
            </div>
          </Label>
        </RadioGroup>
      </CardContent>
      <CardFooter className="text-xs text-muted-foreground p-3 sm:p-4 pt-0">
        You can use it to select options in a more visual way.
      </CardFooter>
    </Card>
  );
}
