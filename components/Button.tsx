import React from 'react'
import Image from 'next/image'
import Link from 'next/link'

type ButtonProps = {
  type?: 'button' | 'submit' | 'reset';
  title: string;
  icon?: string;
  variant: string;
  full?: boolean;
  href?: string;      // 🔗 untuk link
  external?: boolean; // 🌍 kalau true = link eksternal
}

const Button = ({ 
  type = 'button', 
  title, 
  icon, 
  variant = '', 
  full, 
  href, 
  external 
}: ButtonProps) => {
  
  const baseClass = `flexCenter gap-3 rounded-full border px-5 py-3 ${variant} ${full ? 'w-full' : ''}`

  // 🔗 Jika ada href
  if (href) {
    if (external) {
      return (
        <a 
          href={href} 
          target="_blank" 
          rel="noopener noreferrer" 
          className={baseClass}
        >
          {icon && <Image src={icon} alt={title} width={22} height={22} />}
          <p className="bold-16 whitespace-nowrap">{title}</p>
        </a>
      )
    }

    return (
      <Link href={href} className={baseClass}>
        {icon && <Image src={icon} alt={title} width={22} height={22} />}
        <p className="bold-16 whitespace-nowrap">{title}</p>
      </Link>
    )
  }

  // 🖱 Kalau tidak ada href → button biasa
  return (
    <button type={type} className={baseClass}>
      {icon && <Image src={icon} alt={title} width={22} height={22} />}
      <p className="bold-16 whitespace-nowrap">{title}</p>
    </button>
  )
}

export default Button
