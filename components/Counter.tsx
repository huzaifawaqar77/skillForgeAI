'use client'

import {useEffect, useState} from 'react'
import type {LucideIcon} from 'lucide-react'

type CounterProps = {
    value: number
    suffix?: string
    className?: string
    icon?: LucideIcon
    iconClassName?: string
}

export default function Counter({
                                    value,
                                    suffix = '',
                                    className = '',
                                    icon: Icon,
                                    iconClassName = '',
                                }: CounterProps) {
    const [count, setCount] = useState(0)

    useEffect(() => {
        let start = 0
        const duration = 2000
        const incrementTime = 16
        const steps = duration / incrementTime
        const increment = value / steps

        const counter = setInterval(() => {
            start += increment
            if (start >= value) {
                setCount(value)
                clearInterval(counter)
            } else {
                setCount(Number(start.toFixed(1)))
            }
        }, incrementTime)

        return () => clearInterval(counter)
    }, [value])

    return (
        <div className={`flex items-center space-x-2 ${className}`}>
            {Icon && <Icon className={`w-6 h-6 text-black ${iconClassName}`}/>}
            <span className="text-black font-bold text-4xl">
        {count}
                {suffix}
      </span>
        </div>
    )
}
