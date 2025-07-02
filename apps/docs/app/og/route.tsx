import { ImageResponse } from "next/og";

async function loadAssets(): Promise<
  { name: string; data: Buffer; weight: 400 | 600; style: "normal" }[]
> {
  const [
    { base64Font: normal },
    { base64Font: mono },
    { base64Font: semibold },
  ] = await Promise.all([
    import("./geist-regular-otf.json").then((mod) => mod.default || mod),
    import("./geistmono-regular-otf.json").then((mod) => mod.default || mod),
    import("./geist-semibold-otf.json").then((mod) => mod.default || mod),
  ]);

  return [
    {
      name: "Geist",
      data: Buffer.from(normal, "base64"),
      weight: 400 as const,
      style: "normal" as const,
    },
    {
      name: "Geist Mono",
      data: Buffer.from(mono, "base64"),
      weight: 400 as const,
      style: "normal" as const,
    },
    {
      name: "Geist",
      data: Buffer.from(semibold, "base64"),
      weight: 600 as const,
      style: "normal" as const,
    },
  ];
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const title = searchParams.get("title");
  const description = searchParams.get("description");

  const [fonts] = await Promise.all([loadAssets()]);

  return new ImageResponse(
    (
      <div
        tw="flex h-full w-full bg-black text-white"
        style={{ fontFamily: "Geist Sans" }}
      >
        <div tw="flex border absolute border-stone-700 border-dashed inset-y-0 left-16 w-[1px]" />
        <div tw="flex border absolute border-stone-700 border-dashed inset-y-0 right-16 w-[1px]" />
        <div tw="flex border absolute border-stone-700 inset-x-0 h-[1px] top-16" />
        <div tw="flex border absolute border-stone-700 inset-x-0 h-[1px] bottom-16" />
        <div tw="flex absolute flex-row bottom-24 right-24 text-white">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 1353.18 313.41"
            width="200"
            height="46"
          >
            <g>
              <g>
                <path
                  d="M476.85,110.17c-18.48,0-37.43,4.16-52.18,11.43l15.86,33.23c7.94-7.32,22.13-12.34,35.28-12.34
            c14.35,0,29.65,6.29,29.65,23.91v4.54l-1.76-1.29c-8.43-6.18-20.02-9.74-31.81-9.74c-23.31,0-48.38,12.86-48.38,41.04
            c0,29.65,25.07,43.13,48.38,43.13c14.32,0,27.49-5.2,36.1-14.3l0.96-1l8.56,12.7h31.54v-70.89
            C549.05,126.03,511.75,110.17,476.85,110.17z M485.75,210.7c-11.5,0-18.37-6.16-18.37-12.12c0-5.98,6.43-12.37,18.37-12.37
            c8.81,0,16.84,5.65,16.84,11.86C502.59,204.79,494.72,210.7,485.75,210.7z"
                  fill="currentColor"
                />
              </g>
              <g>
                <path
                  d="M649.52,180.68l0.38-0.6l37.41-59.7h-40.52l-17.86,28.56l-18.88-28.56h-40.48l36.99,56.32l-40.5,64.77h40.55l20.82-33.01
            l21.58,33.01h40.5L649.52,180.68z"
                  fill="currentColor"
                />
              </g>
              <rect
                x="705.73"
                y="120.38"
                width="40.95"
                height="121.09"
                fill="currentColor"
              />
              <g>
                <path
                  d="M831.37,117.91c-41.46,0-66.22,23.55-66.22,63.01s24.76,63.01,66.22,63.01c41.48,0,66.24-23.55,66.24-63.01
            S872.86,117.91,831.37,117.91z M831.37,212.86c-18.99,0-29.47-11.34-29.47-31.94s10.48-31.94,29.47-31.94
            c19.02,0,29.49,11.34,29.49,31.94S850.39,212.86,831.37,212.86z"
                  fill="currentColor"
                />
              </g>
              <g>
                <path
                  d="M994.66,117.91c-15.61,0-26.27,4.96-35.63,16.59l-1.29,1.6l-5.07-15.73H916.1v121.09h40.95v-80.14l0.2-0.29
            c5.52-7.9,11.99-12.06,18.66-12.06c6.92,0,15.17,3.27,15.17,18.86v73.62h40.95v-76.82
            C1032.02,143.31,1025.53,117.91,994.66,117.91z"
                  fill="currentColor"
                />
              </g>
              <path
                d="M1183.54,282.44V260.9h12.66c2.15,0,3.78-0.78,4.88-2.33c1.11-1.55,1.67-3.7,1.67-6.44V120.34h22.65v131.56
          c0,9.7-2.35,17.21-7.05,22.54c-4.7,5.33-11.34,7.99-19.93,7.99H1183.54z"
                fill="currentColor"
              />
              <path
                d="M1298.28,237.25c-10.21,0-19.48-1.5-27.81-4.5c-8.33-3-15.78-7.49-22.37-13.49l13.43-16.54
          c6.29,4.74,12.49,8.29,18.6,10.66c6.11,2.37,12.16,3.55,18.15,3.55c8.96,0,15.67-1.39,20.15-4.16c4.48-2.78,6.72-6.94,6.72-12.49
          c0-4.29-1.5-7.33-4.5-9.1c-3-1.78-6.92-2.94-11.77-3.5c-4.85-0.55-10.05-1.02-15.6-1.39c-4.66-0.37-9.29-0.94-13.88-1.72
          c-4.59-0.78-8.77-2.18-12.55-4.22c-3.77-2.04-6.79-5.05-9.05-9.05c-2.26-4-3.39-9.36-3.39-16.1c0-12.21,3.74-21.35,11.21-27.42
          c7.47-6.07,18.61-9.1,33.42-9.1c9.03,0,17.43,1.22,25.2,3.66c7.77,2.44,15.06,6.18,21.87,11.21l-13.66,16.54
          c-5.77-3.7-11.46-6.47-17.04-8.33s-11.05-2.78-16.38-2.78c-7.7,0-13.47,1.31-17.32,3.94c-3.85,2.63-5.77,6.57-5.77,11.82
          c0,3.48,1.33,5.98,4,7.49c2.66,1.52,6.18,2.5,10.55,2.94c4.37,0.44,9.06,0.85,14.1,1.22c4.81,0.3,9.68,0.83,14.6,1.61
          c4.92,0.78,9.46,2.28,13.6,4.5c4.14,2.22,7.47,5.51,9.99,9.88c2.51,4.37,3.77,10.33,3.77,17.88c0,12.36-4.02,21.61-12.05,27.75
          C1326.5,234.18,1314.41,237.25,1298.28,237.25z"
                fill="currentColor"
              />
              <ellipse
                cx="726.2"
                cy="83.11"
                rx="20.47"
                ry="20.26"
                fill="currentColor"
              />
              <ellipse
                cx="1213.57"
                cy="80.89"
                rx="14.72"
                ry="14.56"
                fill="currentColor"
              />
              <g>
                <path
                  d="M1061.3,264.74l74.31-158.96h28.29l-74.31,158.96H1061.3z"
                  fill="currentColor"
                />
              </g>
            </g>
            <path
              d="M190.61,188.37c0.74,0.9,1.45,1.83,2.16,2.8c-17.55,2.28-31.95,3.53-40.11-0.42c-3.97-1.93-4.48-4.76-4.63-5.32
        c-1.1-4.31,1.89-8.88,6.32-10.67c3.45-1.42,6.85-2.12,10.1-2.12C173.26,172.64,182.08,177.94,190.61,188.37z"
              fill="currentColor"
            />
            <path
              d="M300.43,49.8H116.18c-37.84,0-68.51,30.68-68.51,68.51v108.66c0,37.83,30.67,68.51,68.51,68.51h91.38l0.7-4.28
        c0.07-0.4,5.98-38.04-2.82-71.67c-17.65,2.91-44.42,5.46-62.98-1.37c-13.14-4.83-21.62-14.63-23.88-27.6
        c-3.16-18.12,7.13-36.42,24.48-43.49c11.81-4.81,42.36-12.3,70.7,22.37c3.23,3.95,6.21,8.32,8.87,12.99
        c28.95-16.42,42.38-41.16,42.52-41.43l3.33-6.27l26.48,13.67l-3.28,6.37c-0.76,1.47-18.16,34.61-57.72,55.56
        c10.56,38.47,4.77,79.5,3.9,85.15h62.57c37.83,0,68.51-30.68,68.51-68.51V118.31C368.94,80.48,338.26,49.8,300.43,49.8z
        M224.83,140.8c-9.13,0-16.53-7.32-16.53-16.36c0-9.03,7.4-16.36,16.53-16.36s16.53,7.33,16.53,16.36
        C241.36,133.48,233.96,140.8,224.83,140.8z M260.74,109.31c-9.13,0-16.53-7.32-16.53-16.36c0-9.03,7.4-16.36,16.53-16.36
        s16.53,7.33,16.53,16.36C277.27,101.99,269.87,109.31,260.74,109.31z"
              fill="currentColor"
            />
            <g>
              <g>
                <path
                  d="M207.56,295.48l-0.46,2.79l29.48,4.91l1.19-7.1c0.02-0.1,0.05-0.3,0.09-0.6H207.56z"
                  fill="#FFFFFF"
                />
              </g>
            </g>
          </svg>
        </div>
        <div tw="flex flex-col absolute w-[896px] justify-center inset-32">
          <div
            tw="tracking-tight flex-grow-1 flex flex-col justify-center leading-[1.1]"
            style={{
              textWrap: "balance",
              fontWeight: 600,
              fontSize: title && title.length > 20 ? 64 : 80,
              letterSpacing: "-0.04em",
            }}
          >
            {title}
          </div>
          <div
            tw="text-[40px] leading-[1.5] flex-grow-1 text-stone-400"
            style={{
              fontWeight: 500,
              textWrap: "balance",
            }}
          >
            {description}
          </div>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 628,
      fonts,
    }
  );
}
