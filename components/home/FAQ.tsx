'use client'

import {useEffect, useState} from 'react'
import {Plus, Minus} from 'lucide-react'
import gsap from 'gsap'
import {ScrollTrigger} from 'gsap/all'

gsap.registerPlugin(ScrollTrigger)

const faqs = [
    {
        question: 'How accurate is the AI skill assessment?',
        answer:
            'Our AI uses multiple data sources and has been trained on thousands of professional profiles with 94% accuracy rate.',
    },
    {
        question: "Can I use this if I'm a complete beginner?",
        answer:
            'Absolutely! Our AI adapts to your current level and creates appropriate learning paths for beginners to experts.',
    },
    {
        question: 'How often is the industry data updated?',
        answer:
            'We update our industry insights daily using real-time job market data and trend analysis.',
    },
    {
        question: 'Is my data secure?',
        answer:
            'Yes, we use enterprise-grade security with end-to-end encryption and never share your personal data.',
    },
    {
        question: 'Can I cancel anytime?',
        answer:
            'Yes, you can cancel your subscription at any time with no hidden fees or penalties.',
    },
]

export default function FAQ() {
    const [openIndex, setOpenIndex] = useState<number | null>(null)

    useEffect(() => {
        gsap.set('.faq-heading', {y: 30, opacity: 0, scale: 0.9})
        gsap.set('.faq-item', {y: 40, opacity: 0})

        gsap.to('.faq-heading', {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 1.8,
            ease: 'power1.out',
            scrollTrigger: {
                trigger: '.faq-heading',
                start: 'top 85%',
                end: 'bottom 30%',
                scrub: true,
            },
        })

        gsap.to('.faq-item', {
            y: 0,
            opacity: 1,
            stagger: 0.2,
            duration: 1.5,
            ease: 'power1.out',
            scrollTrigger: {
                trigger: '.faq-item',
                start: 'top 90%',
                end: 'bottom center',
                scrub: true,
            },
        })
    }, [])

    const toggleIndex = (index: number) => {
        setOpenIndex(openIndex === index ? null : index)
    }

    return (
        <section className="faq-section lg:px-8 px-6 py-20 max-w-[1600px] mx-auto">
            <h2 className="faq-heading text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-12 text-center">
                Frequently Asked <span className="gradient-primary">Questions</span>
            </h2>

            <div className="space-y-6">
                {faqs.map((faq, index) => {
                    const isOpen = index === openIndex
                    return (
                        <div
                            key={index}
                            className={`faq-item border-b border-zinc-300 pb-4 transition-all duration-300`}
                        >
                            <button
                                onClick={() => toggleIndex(index)}
                                className="w-full flex items-center justify-between text-left"
                            >
                <span className="text-lg md:text-xl font-medium text-black">
                  {faq.question}
                </span>
                                <span className="ml-4 text-black">
                  {isOpen ? <Minus className="w-5 h-5"/> : <Plus className="w-5 h-5"/>}
                </span>
                            </button>
                            {isOpen && (
                                <p className="mt-3 text-zinc-600 text-base md:text-lg">
                                    {faq.answer}
                                </p>
                            )}
                        </div>
                    )
                })}
            </div>
        </section>
    )
}
