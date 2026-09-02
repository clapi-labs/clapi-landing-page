import { useState } from 'react';

export default function Faq({ items }) {
  const [openIndex, setOpenIndex] = useState(null);

  return (
    <div className="mx-auto flex max-w-2xl flex-col gap-3">
      {items.map((item, i) => {
        const open = openIndex === i;
        return (
          <div key={item.q} className="overflow-hidden rounded-card bg-white shadow-card">
            <button
              type="button"
              onClick={() => setOpenIndex(open ? null : i)}
              aria-expanded={open}
              className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left"
            >
              <span className="font-semibold text-ink">{item.q}</span>
              <span
                className={`shrink-0 text-brand transition-transform duration-300 ${open ? 'rotate-45' : ''}`}
                aria-hidden="true"
              >
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M8 2V14M2 8H14" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" />
                </svg>
              </span>
            </button>
            <div
              className={`grid transition-[grid-template-rows] duration-300 ease-out ${
                open ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'
              }`}
            >
              <div className="overflow-hidden">
                <p className="px-6 pb-5 leading-relaxed text-ink/80">{item.a}</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
