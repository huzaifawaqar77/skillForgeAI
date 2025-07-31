'use client'

import Link from 'next/link'
import {Mail, Phone, Linkedin, Twitter, Github, ShieldCheck, BadgeCheck} from 'lucide-react'

export default function Footer() {
    // @ts-ignore
    // @ts-ignore
    return (
        <footer className="bg-zinc-900 text-white px-6 py-12">
            <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
                {/* Company Info */}
                <div>
                    <div className="flex items-center space-x-3 mb-4">
                        <div
                            className="bg-white text-black font-bold w-10 h-10 flex items-center justify-center rounded-full">
                            YC
                        </div>
                        <span className="text-xl font-semibold">YourCompany</span>
                    </div>
                    <p className="text-sm text-zinc-400 mb-4">
                        Empowering developers with modern tools and open-source solutions.
                    </p>
                    <div className="flex items-center space-x-2 text-sm text-zinc-400">
                        <Mail className="w-4 h-4"/>
                        <span>support@yourcompany.com</span>
                    </div>
                    <div className="flex items-center space-x-2 text-sm text-zinc-400 mt-1">
                        <Phone className="w-4 h-4"/>
                        <span>+1 (555) 123-4567</span>
                    </div>
                </div>

                {/* Quick Links */}
                <div>
                    <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
                    <ul className="space-y-2 text-sm">
                        <li><Link href="/about" className="hover:underline">About Us</Link></li>
                        <li><Link href="/privacy" className="hover:underline">Privacy Policy</Link></li>
                        <li><Link href="/terms" className="hover:underline">Terms of Service</Link></li>
                        <li><Link href="/support" className="hover:underline">Contact Support</Link></li>
                        <li><Link href="/blog" className="hover:underline">Blog / Resources</Link></li>
                    </ul>
                </div>

                {/* Social & Newsletter */}
                <div>
                    <h4 className="text-lg font-semibold mb-4">Connect with Us</h4>
                    <div className="flex space-x-4 mb-4">
                        <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                            <Linkedin className="w-5 h-5 hover:text-blue-400"/>
                        </a>
                        <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
                            <Twitter className="w-5 h-5 hover:text-blue-300"/>
                        </a>
                        <a href="https://github.com" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
                            <Github className="w-5 h-5 hover:text-gray-400"/>
                        </a>
                    </div>
                    <form className="flex flex-col mt-4 ">
                        <label htmlFor="newsletter" className="text-sm mb-1">Subscribe to our newsletter</label>
                        <div className="flex">
                            <input
                                type="email"
                                id="newsletter"
                                placeholder="Your email"
                                className="w-full px-3 py-2 text-white rounded-l-md"
                            />
                            <button type="submit" className="bg-blue-600 px-4 rounded-r-md hover:bg-blue-500">
                                Subscribe
                            </button>
                        </div>
                    </form>
                </div>

                {/* Legal */}
                <div>
                    <h4 className="text-lg font-semibold mb-4">Legal</h4>
                    <p className="text-sm text-zinc-400 mb-2">
                        © {new Date().getFullYear()} YourCompany. All rights reserved.
                    </p>
                    <div className="flex items-center space-x-4 mt-2">
                        <ShieldCheck className="w-6 h-6 text-green-500"/>
                        <BadgeCheck className="w-6 h-6 text-blue-500"/>
                    </div>
                </div>
            </div>
        </footer>
    )
}
