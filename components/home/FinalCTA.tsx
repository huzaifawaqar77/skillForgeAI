'use client'

import {useEffect} from 'react'
import gsap from 'gsap'
import {ScrollTrigger} from 'gsap/all'
import Counter from '@/components/Counter'
import {ShieldCheck, LockKeyhole, Users} from 'lucide-react'
import Image from 'next/image'
import {Avatar1, Avatar2, Avatar3, Avatar4} from '@/app/static/static'


gsap.registerPlugin(ScrollTrigger)

const FinalCTA = () => {
    useEffect(() => {
        gsap.set('.cta-heading', {y: 40, opacity: 0, scale: 0.95})
        gsap.set('.cta-content', {y: 30, opacity: 0})
        gsap.set('.cta-counter', {y: 20, opacity: 0})
        gsap.set('.cta-avatars', {y: 20, opacity: 0})

        gsap.to('.cta-heading', {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 1.5,
            scrollTrigger: {
                trigger: '.cta-heading',
                start: 'top 85%',
                scrub: true,
            },
        })

        gsap.to(['.cta-content', '.cta-counter', '.cta-avatars'], {
            y: 0,
            opacity: 1,
            duration: 1.5,
            stagger: 0.3,
            scrollTrigger: {
                trigger: '.cta-content',
                start: 'top 90%',
                scrub: true,
            },
        })
    }, [])

    return (
        <section className="final-cta-section lg:px-8 px-6 py-20 max-w-[1600px] mx-auto text-center space-y-10">
            {/* Headline */}
            <h2 className="cta-heading text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
                Ready to <span className="gradient-primary">Transform Your Career?</span>
            </h2>

            {/* Description */}
            <p className="cta-content text-lg max-w-2xl mx-auto text-zinc-700">
                Join thousands of professionals who are already building the skills that matter for tomorrow's
                opportunities.
            </p>

            {/* CTA Button */}
            <div className="cta-content space-y-2">
                <button
                    className="bg-indigo-600 text-white px-8 py-3 rounded-full text-lg font-semibold hover:bg-indigo-700 transition">
                    Start Free Trial
                </button>
                <p className="text-sm text-zinc-500">No credit card required • 2-minute setup</p>
            </div>

            {/* Counter & Avatars */}
            <div className="cta-counter flex flex-col md:flex-row items-center justify-center gap-4 mt-8">
                <Counter
                    value={50000}
                    suffix="+"
                    className="text-black text-5xl font-bold"
                    icon={Users}
                    iconClassName="text-indigo-500 w-10 h-10"
                />
                <p className="text-zinc-600 text-md">Professionals have already joined</p>
            </div>

            {/* Avatars */}
            <div className="cta-avatars flex justify-center gap-[-12px] md:gap-[-16px] overflow-hidden">
                {[Avatar1, Avatar2, Avatar3, Avatar4].map((img, i) => (
                    <Image
                        key={i}
                        src={img}
                        alt={`User avatar ${i + 1}`}
                        width={48}
                        height={48}
                        className="rounded-full border-2 border-white -ml-3 shadow-md object-cover"
                    />
                ))}
            </div>

            {/* Trust Badges */}
            <div className="cta-content flex flex-wrap justify-center items-center gap-6 mt-8 text-zinc-500 text-sm">
                <div className="flex items-center space-x-2">
                    <ShieldCheck className="text-green-600 w-5 h-5"/>
                    <span>Enterprise-grade Security</span>
                </div>
                <div className="flex items-center space-x-2">
                    <LockKeyhole className="text-blue-500 w-5 h-5"/>
                    <span>End-to-End Encryption</span>
                </div>
                <div className="flex items-center space-x-2">
                    <ShieldCheck className="text-yellow-500 w-5 h-5"/>
                    <span>GDPR & SOC 2 Compliant</span>
                </div>
            </div>
        </section>
    )
}

export default FinalCTA
