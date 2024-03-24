import { socialIcons } from "./data"
import Image from "next/image"

const Copyright = () => {
  return (
    <div className="pt-[3rem]">
        <div className="flex flex-col-reverse md:flex-row gap-y-[1rem] justify-between">
            <p className="text-gray-500 text-sm">
            © 2024 Trankeep. All rights reserved.
            </p>
            <div className="flex gap-2">
               {
                socialIcons.map((icon, index) => (
                    <Image src={icon} alt="social icon" width={20} height={20} key={index}/>
                ))
               } 
            </div>
        </div>
    </div>
  )
}

export default Copyright