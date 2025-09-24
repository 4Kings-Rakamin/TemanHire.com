'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';

export default function DashNavbarClient({
  displayName,
  avatarUrl,
  initials,
}: {
  displayName: string;
  avatarUrl?: string;
  initials: string;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  // Close on outside click / ESC
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) setIsOpen(false);
    }
    function handleEsc(e: KeyboardEvent) {
      if (e.key === 'Escape') setIsOpen(false);
    }
    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleEsc);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEsc);
    };
  }, []);

  return (
    <header className="sticky top-0 z-40 border-b bg-white/70 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        {/* Logo (match site style) */}
        <Link href="/dashboard" aria-label="Beranda Dashboard">
          <Image src="/TemanHire.svg" alt="TemanHire" width={148} height={50} priority />
        </Link>

        {/* Desktop nav (keep order: Dashboard, Konsultasi, Avatar, Sign out) */}
        <nav className="hidden items-center gap-8 lg:flex">
          <ul className="flex items-center gap-8">
            <li>
              <Link
                href="/dashboard"
                className="relative pb-1.5 text-sm text-gray-800 transition-all hover:font-semibold after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-0 after:bg-[#0097b2] after:transition-all after:duration-300 hover:after:w-full"
              >
                Dashboard
              </Link>
            </li>
            <li>
              <Link
                href="/dashboard/consult"
                className="relative pb-1.5 text-sm text-gray-800 transition-all hover:font-semibold after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-0 after:bg-[#0097b2] after:transition-all after:duration-300 hover:after:w-full"
              >
                Konsultasi
              </Link>
            </li>
            <li>
              <Link
                href="/dashboard/cvocr"
                className="relative pb-1.5 text-sm text-gray-800 transition-all hover:font-semibold after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-0 after:bg-[#0097b2] after:transition-all after:duration-300 hover:after:w-full"
              >
                ScanCV
              </Link>
            </li>
            <li>
              <Link
                href="/dashboard/news"
                className="relative pb-1.5 text-sm text-gray-800 transition-all hover:font-semibold after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-0 after:bg-[#0097b2] after:transition-all after:duration-300 hover:after:w-full"
              >
                News
              </Link>
            </li>
          </ul>

          {/* Right cluster: displayName (sm+), avatar, sign out */}
          <div className="flex items-center gap-3">
            <span className="hidden text-sm text-gray-600 sm:block">{displayName}</span>

            {avatarUrl ? (
              <Image
                src={avatarUrl}
                alt={displayName}
                width={32}
                height={32}
                className="h-8 w-8 rounded-full object-cover ring-1 ring-black/5"
              />
            ) : (
              <div className="grid h-8 w-8 place-items-center rounded-full border text-xs font-semibold text-gray-700">
                {initials}
              </div>
            )}

            {/* Sign out matches site button vibe */}
            <form action="/logout" method="post">
              <button
                className="rounded-md border px-3 py-1.5 text-sm text-gray-800 transition hover:bg-black/5"
                aria-label="Keluar"
              >
                Sign out
              </button>
            </form>
          </div>
        </nav>

        {/* Mobile trigger */}
        <button
          className="inline-block lg:hidden"
          aria-label="Buka menu"
          aria-expanded={isOpen}
          aria-controls="dash-mobile-menu"
          onClick={() => setIsOpen((s) => !s)}
        >
          <Image src="/menu.svg" alt="menu" width={32} height={32} />
        </button>

        {/* Mobile dropdown */}
        <div
          ref={menuRef}
          id="dash-mobile-menu"
          className={`absolute right-4 top-16 w-60 rounded-xl bg-white shadow-lg ring-1 ring-black/5 lg:hidden transition-[opacity,transform] duration-200 origin-top-right ${
            isOpen ? 'opacity-100 scale-100' : 'pointer-events-none opacity-0 scale-95'
          }`}
          role="menu"
          aria-hidden={!isOpen}
        >
          <div className="flex flex-col p-2">
            <Link
              href="/dashboard"
              role="menuitem"
              className="rounded-lg px-4 py-2 text-gray-800 transition hover:bg-gray-100 hover:text-[#0097b2]"
              onClick={() => setIsOpen(false)}
            >
              Dashboard
            </Link>
            <Link
              href="/dashboard/consult"
              role="menuitem"
              className="rounded-lg px-4 py-2 text-gray-800 transition hover:bg-gray-100 hover:text-[#0097b2]"
              onClick={() => setIsOpen(false)}
            >
              Konsultasi
            </Link>
            <Link
              href="/dashboard/cvocr"
              role="menuitem"
              className="rounded-lg px-4 py-2 text-gray-800 transition hover:bg-gray-100 hover:text-[#0097b2]"
              onClick={() => setIsOpen(false)}
            >
              ScanCV
            </Link>
            <Link
              href="/dashboard/news"
              role="menuitem"
              className="rounded-lg px-4 py-2 text-gray-800 transition hover:bg-gray-100 hover:text-[#0097b2]"
              onClick={() => setIsOpen(false)}
            >
              News
            </Link>

            <div className="my-2 border-t border-gray-100" />

            {/* Avatar + name (compact) */}
            <div className="flex items-center gap-3 px-4 py-2">
              {avatarUrl ? (
                <Image src={avatarUrl} alt={displayName} width={28} height={28} className="h-7 w-7 rounded-full object-cover" />
              ) : (
                <div className="grid h-7 w-7 place-items-center rounded-full border text-[11px] font-semibold text-gray-700">
                  {initials}
                </div>
              )}
              <span className="truncate text-sm text-gray-700">{displayName}</span>
            </div>

            <form action="/logout" method="post" className="px-2 pb-2">
              <button
                role="menuitem"
                className="w-full rounded-lg border bg-white px-4 py-2 text-left text-sm text-gray-800 transition hover:bg-gray-100"
              >
                Sign out
              </button>
            </form>
          </div>
        </div>
      </div>
    </header>
  );
}
