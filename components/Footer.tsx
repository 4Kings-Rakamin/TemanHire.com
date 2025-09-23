import { FOOTER_CONTACT_INFO, FOOTER_LINKS, SOCIALS } from '@/constants'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const Footer = () => {
  return (
    <footer id="contact_us" className=" flexCenter mb-24">
      <div className="padding-container max-container flex w-full flex-col gap-14 pt-5">
        <div className="flex flex-col items-start justify-center gap-[10%] md:flex-row">
          <Link href="/" className="mb-10">
            <Image src="/TemanHire.svg" alt="logo" width={148} height={50} />
          </Link>

          <div className="flex flex-wrap gap-10 sm:justify-between md:flex-1">
            {FOOTER_LINKS.map((col) => (
              <FooterColumn key={col.title} title={col.title}>
                <ul className="regular-14 flex flex-col gap-4 text-gray-30">
                  {col.links.map(({ label, href }) => (
                    <li key={`${col.title}-${label}`}>
                      {/^https?:\/\//i.test(href) ? (
                        <a
                          href={href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="hover:underline"
                        >
                          {label}
                        </a>
                      ) : (
                        <Link href={href} className="hover:underline">
                          {label}
                        </Link>
                      )}
                    </li>
                  ))}
                </ul>
              </FooterColumn>
            ))}

            <div className="flex flex-col gap-5">
              <FooterColumn title={FOOTER_CONTACT_INFO.title}>
                <ul className="regular-14 flex flex-col gap-3 text-gray-30">
                  {FOOTER_CONTACT_INFO.links.map((item) => {
                    // Optional: jadikan tel/mailto kalau cocok
                    const isPhone = /^\+?[0-9\- ]+$/.test(item.value)
                    const isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(item.value)
                    const href = isPhone ? `tel:${item.value}` : isEmail ? `mailto:${item.value}` : undefined

                    return (
                      <li key={item.label} className="flex gap-4 md:flex-col lg:flex-row">
                        <p className="whitespace-nowrap">{item.label}:</p>
                        {href ? (
                          <a href={href} className="medium-14 whitespace-nowrap text-blue-70 hover:underline">
                            {item.value}
                          </a>
                        ) : (
                          <span className="medium-14 whitespace-nowrap text-blue-70">{item.value}</span>
                        )}
                      </li>
                    )
                  })}
                </ul>
              </FooterColumn>
            </div>

            <div className="flex flex-col gap-5">
              <FooterColumn title={SOCIALS.title}>
                <ul className="regular-14 flex items-center gap-4 text-gray-30">
                  {SOCIALS.links.map((iconPath) => (
                    <li key={iconPath}>
                      {/* Nanti ganti <span> jadi <a href="..."> kalau sudah punya URL */}
                      <span className="inline-flex h-6 w-6 items-center justify-center opacity-80">
                        <Image src={iconPath} alt="" width={24} height={24} />
                      </span>
                    </li>
                  ))}
                </ul>
              </FooterColumn>
            </div>
          </div>
        </div>

        <div className="border bg-gray-20" />
        <p className="regular-14 w-full text-center text-gray-30">
          Ver 0.9.5 TemanHire | All rights reserved
        </p>
      </div>
    </footer>
  )
}

type FooterColumnProps = {
  title: string
  children: React.ReactNode
}

const FooterColumn = ({ title, children }: FooterColumnProps) => {
  return (
    <div className="flex flex-col gap-5">
      <h4 className="bold-18 whitespace-nowrap">{title}</h4>
      {children}
    </div>
  )
}

export default Footer
