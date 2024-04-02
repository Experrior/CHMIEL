import * as React from "react"
const GradientSvg = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={675} height={"100%"} {...props}>
        <defs>
            <filter id="a" width="120%" height="120%" x="-10%" y="-10%">
                <feFlood floodOpacity={0} result="BackgroundImageFix" />
                <feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
                <feGaussianBlur result="effect1_foregroundBlur" stdDeviation={167} />
            </filter>
        </defs>
        <path fill="#132F45" d="M0 0h675v900H0z" />
        <g filter="url(#a)">
            <circle cx={14} cy={58} r={371} fill="#369ED1" />
            <circle cx={570} cy={860} r={371} fill="#132F45" />
            <circle cx={649} cy={627} r={371} fill="#369ED1" />
            <circle cx={378} cy={70} r={371} fill="#369ED1" />
            <circle cx={168} cy={275} r={371} fill="#132F45" />
            <circle cx={21} cy={"100%"} r={371} fill="#369ED1" />
        </g>
    </svg>
)
export default GradientSvg
