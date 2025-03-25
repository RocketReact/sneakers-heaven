import {Link} from "react-router-dom";
import {useState} from "react";

export default function SectionFooter({
                                          resourcesLinks = [{text: '', to:''}],
                                          textSection = ''
                                      }) {

    const [isOpen, setOpen] = useState(false);

    const fnToggle = () => {
        setOpen(!isOpen);
    };
console.log (isOpen)

    return <div
        className='flex flex-col '>
        <hr className='lg:hidden' />

        <div
            className='flex flex-row items-center justify-between
        mt-6 hover:cursor-pointer lg:hover:cursor-default lg:items-start lg:justify-start

'       onClick={fnToggle}
        >
            <h3>{textSection}</h3>
        <div
            className='lg:hidden'

        >
            <span
                className='text-gray-400 hover:text-gray-600 hover:cursor-pointer mt-1 inline-block duration-500 ease-out'
                style={{ transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.5s ease-out' }}
            >
                ▼
               </span>

        </div>
        </div>

        <div className={`transition-all duration-500 ease-out overflow-hidden ${
            isOpen? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        } lg:max-h-200 lg:opacity-100 mb-7`}
        >
            <ul className='space-y-3 mt-4 text-cyan-800'>
                {resourcesLinks.map((link, index) =>
                    <li key={index}><Link to={link.to}>{link.text}</Link></li>)
                }
            </ul>
        </div>
    </div>
}