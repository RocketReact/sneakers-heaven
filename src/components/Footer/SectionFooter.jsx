import {Link} from "react-router-dom";
import {useState} from "react";

export default function SectionFooter({
                                          resources= false,
                                          help = false,
                                          company = false,
                                          promotions = false,
                                          resourcesLinks = [{text: '', to:''}],
                                          textSection = ''
                                      }) {

    const [isOpen, setOpen] = useState({resources, help, company, promotions});

    const fnToggle = (id) => {
        setOpen(prev => ({...prev, [id]: !prev[id],
        }))
    }


    return <div className='flex flex-col'>
        <hr className='lg:hidden' />
        <div
            className='flex flex-row items-center justify-between
                lg:justify-center mt-6 hover:cursor-pointer '
            onClick={() => fnToggle('resources')}
        >
            <h3>{textSection}</h3>
            <span
                className={`${isOpen.resources? 'rotate-180' : 'rotate-0'}
                           text-gray-400 hover:text-gray-600
                            hover:cursor-pointer mt-1 lg:hidden
                            transition-transform ease-out duration-500
                           `}
            >
                ▼
               </span>
        </div>

        <div className={`transition-all duration-500 ease-out overflow-hidden ${
            isOpen.resources ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0'
        } mb-7`}
        >
            <ul className='space-y-3 mt-4 text-cyan-800'>
                {resourcesLinks.map((link, index) =>
                    <li key={index}><Link to={link.to}>{link.text}</Link></li>)
                }


            </ul>
        </div>
    </div>
}