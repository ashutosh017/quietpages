import { Heart } from "lucide-react";
import Link from "next/link";
import { FaDiscord, FaGithub, FaLinkedin, FaYoutube } from "react-icons/fa";
import { FaSquareXTwitter } from "react-icons/fa6";

export function Footer() {
  return (
    <footer className=" z-20 py-4 mx-2 bg-transparent ">
      <div className="w-full  mx-auto flex flex-col lg:flex-row lg:px-60  px-4 py-2 gap-2 lg:gap-8 items-end ">
        <div className=" flex relative   right-0 bottom-0   lg:justify-evenly gap-4 lg:gap-6 opacity-80">
          <Link
            href="https://x.com/ashutosh__018"
            target="_blank"
            referrerPolicy="no-referrer"
          >
            <FaSquareXTwitter size={30} />
          </Link>
          <Link
            href={"https://www.linkedin.com/in/ashutosh017/"}
            target="_blank"
            referrerPolicy="no-referrer"
          >
            <FaLinkedin size={30} />
          </Link>
          <Link
            href={"https://github.com/ashutosh017"}
            target="_blank"
            referrerPolicy="no-referrer"
          >
            <FaGithub size={30} />
          </Link>
          <Link
            href={"https://www.youtube.com/@ashutosh__018"}
            target="_blank"
            referrerPolicy="no-referrer"
          >
            <FaYoutube size={30} />
          </Link>
          {/* <Link
                  href={"https://www.youtube.com/@ashutosh__018"}
                  target="_blank"
                  referrerPolicy="no-referrer"
                >
                  <FaDiscord size={30} />
                </Link> */}
        </div>
        <div className="text-sm text-balance text-muted-foreground ">
          © {new Date().getFullYear()} QuietPages. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
