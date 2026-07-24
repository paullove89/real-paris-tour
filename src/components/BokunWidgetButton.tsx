"use client";

import Script from "next/script";

type BokunWidgetButtonProps = {
  buttonId: string;
  dataSrc: string;
  loaderSrc: string;
  label?: string;
};

export function BokunWidgetButton({
  buttonId,
  dataSrc,
  loaderSrc,
  label = "Book now",
}: BokunWidgetButtonProps) {
  return (
    <>
      <Script src={loaderSrc} strategy="afterInteractive" />
      <button
        className="bokunButton"
        disabled
        id={buttonId}
        data-src={dataSrc}
        data-testid="widget-book-button"
      >
        {label}
      </button>
      <style jsx>{`
        #${buttonId} {
          display: inline-block;
          padding: 10px 20px;
          background: #408c3d;
          border-radius: 5px;
          box-shadow: none;
          font-weight: 600;
          font-size: 16px;
          text-decoration: none;
          text-align: center;
          color: #ffffff;
          border: none;
          cursor: pointer;
          transition: background 0.2s ease;
        }

        #${buttonId}:hover {
          background: #285726;
        }

        #${buttonId}:active {
          background: #30682e;
        }
      `}</style>
    </>
  );
}