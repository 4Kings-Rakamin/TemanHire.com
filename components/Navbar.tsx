"use client";

import { NAV_LINKS } from "@/constants";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";
import Button from "./Button";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  // Tutup saat klik di luar
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    }
    // Tutup saat tekan Escape
    function handleEsc(e: KeyboardEvent) {
      if (e.key === "Escape") setIsOpen(false);
    }
    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEsc);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEsc);
    };
  }, []);

  return (
    <nav className="flexBetween max-container padding-container relative z-30 py-5">
      {/* Logo */}
      <Link href="/">
        <Image src="/TemanHire.svg" alt="logo" width={148} height={50} />
      </Link>

      {/* Desktop nav */}
      <ul className="hidden h-full gap-12 lg:flex">
        {NAV_LINKS.map((link) => (
          <li key={link.key}>
            <Link
              href={link.href}
              className="relative regular-16 text-gray-50 flexCenter cursor-pointer pb-1.5 transition-all hover:font-bold
                         after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-0 after:bg-[#0097b2] after:transition-all after:duration-300 hover:after:w-full"
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>

      {/* Desktop button */}
      <div className="hidden lg:flexCenter gap-3">
        <Button
          type="button"
          title="Masuk"
          icon="/user.svg"
          variant="btn_dark_green"
          href="/login"
        />
        <Button
          type="button"
          title="Daftar"
          icon="/singup.svg" // bisa bikin ikon baru atau reuse yg ada
          variant="btn_dark_blue"
          href="/signup"
        />
      </div>


      {/* Mobile menu trigger */}
      <button
        className="inline-block lg:hidden cursor-pointer"
        aria-label="Buka menu"
        aria-expanded={isOpen}
        aria-controls="mobile-menu"
        onClick={() => setIsOpen((s) => !s)}
      >
        <Image src="/menu.svg" alt="menu" width={32} height={32} />
      </button>

      {/* Mobile dropdown */}
      <div
        ref={menuRef}
        id="mobile-menu"
        className={`absolute right-5 top-20 w-56 rounded-xl bg-white shadow-lg ring-1 ring-black/5 lg:hidden
                    transition-[opacity,transform] duration-200 origin-top-right
                    ${isOpen ? "opacity-100 scale-100" : "pointer-events-none opacity-0 scale-95"}`}
        role="menu"
        aria-hidden={!isOpen}
      >
        <div className="flex flex-col p-2">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.key}
              href={link.href}
              role="menuitem"
              className="rounded-lg px-4 py-2 text-gray-800 hover:bg-gray-100 hover:text-[#0097b2] transition"
              onClick={() => setIsOpen(false)}
            >
              {link.label}
            </Link>
          ))}
          <div className="mt-2 border-t border-gray-100 pt-2">
            <Button
              type="button"
              title="Login"
              icon="/user.svg"
              variant="btn_dark_green"
              href="/login"
            />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
