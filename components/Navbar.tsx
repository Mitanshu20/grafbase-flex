import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { NavLinks } from '@/constants'
import AuthProviders from './AuthProviders'
import { getCurrentUser } from '@/lib/session'
import { signOut } from 'next-auth/react';
import ProfileMenu from './ProfileMenu'
export const Navbar = async() => {

    const session=await getCurrentUser();

  return (
    <nav className="flexBetween navbar">
        <div className="flex-1 flexStart gap-10">
            <Link href="/">
                <Image
                src="/logo.svg"
                width={115}
                height={43}
                alt="Flexxible"
                />
            </Link>
            <ul className="xl:flex hidden text-small gap-7">
            {NavLinks.map((link) => (
                // Check if the link should open in a new tab (replace with your own condition)
                // For example, let's open the "Chat Support" link in a new tab
                link.key === 'Chat Support' || link.key === 'Video Support' ? (
                <a href={link.href} target="_blank" rel="noopener noreferrer" key={link.key}>
                    {link.text}
                </a>
                ) : (
                <Link href={link.href} key={link.key}>
                    {link.text}
                </Link>
                )
            ))}

            </ul>
        </div>
        <div className="flexCenter gap-4">
            {session?.user ? (
                <>
                <ProfileMenu session={session} />

                <Link href="/create-project">
                    Sharework
                    </Link>
                   
                </>
            ) : (
                <AuthProviders />
            ) }

        </div>
    </nav>
  )
}

export default Navbar