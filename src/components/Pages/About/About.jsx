import { FaHandshake } from "react-icons/fa";
import { GiOctogonalEye, GiMaterialsScience } from "react-icons/gi";
import imageSEO from '../../../img/leodicaprio.webp'
import imageCTO from '../../../img/johansson scarlett.webp'
import imageDesigner from '../../../img/tom cruise.webp'
import { Helmet } from "react-helmet-async";


export default function About() {
    return (
        <div className="bg-gray-100 py-16 px-6 lg:px-8 font-extralight">

            <Helmet>
                <title>About Us | Sneaker Haven </title>
                <meta name="description" content="
                Learn more about Sneaker Haven,
                our mission, values, and the team behind the brand." />

                {/* Open Graph (Facebook, LinkedIn) */}
                <meta property="og:title" content="About Us - Sneaker Haven" />
                <meta property="og:description" content="Best Nike, Reebok, New Balance, Asics sneakers ." />
                <meta property="og:image" content="https://example.com/about-us-image.jpg" />
                <meta property="og:image:alt" content="Team photo of Sneaker Haven" />
                <meta property="og:type" content="website" />
                <meta property="og:url" content="https://example.com/about-us" />

                {/* Twitter/X */}
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:title" content="About Us - Sneaker Haven" />
                <meta name="twitter:description" content="Meet the people and the story behind Sneaker Haven." />
                <meta name="twitter:image" content="https://example.com/about-us-image.jpg" />

                {/* Canonical URL */}
                <link rel="canonical" href="http://localhost:3000/about-us"/>
            </Helmet>

            <div className="max-w-7xl mx-auto text-center">
                <h1 className="text-4xl text-gray-900 sm:text-5xl font-extralight">
                    About Us
                </h1>
                <p className="mt-4 text-lg text-gray-600 sm:mt-6">
                    We are a team of dedicated professionals committed to delivering exceptional services and solutions to our clients.
                </p>
            </div>

            <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 max-w-7xl mx-auto">
                <div className="bg-white p-6 rounded-lg shadow-md">
                   <span aria-hidden="true">
                       <FaHandshake
                           className="h-16 mx-auto size-30 text-emerald-400"
                           aria-label="Handshake icon"
                       />
                   </span>

                        <h3 className="mt-4 text-xl font-semibold text-gray-900">Our Mission</h3>
                    <p className="mt-2 text-gray-600">
                        To deliver outstanding services that empower our clients to achieve their goals.
                    </p>
                </div>

                <div className="bg-white p-6 rounded-lg shadow-md">

                    <span aria-hidden="true">
                    <GiOctogonalEye
                        className="h-16 mx-auto size-30 text-blue-400"
                        aria-label="OctogonalEye icon"
                    />
                    </span>

                    <h3 className="mt-4 text-xl font-semibold text-gray-900">Our Vision</h3>
                    <p className="mt-2 text-gray-600">
                        To be recognized as a leading provider in our industry, driven by innovation and client satisfaction.
                    </p>
                </div>

                <div className="bg-white p-6 rounded-lg shadow-md">
                    <GiMaterialsScience
                        className="h-16 mx-auto size-30 text-yellow-400"

                    />

                    <h3 className="mt-4 text-xl font-semibold text-gray-900">Our Values</h3>
                    <p className="mt-2 text-gray-600">
                        We value integrity, excellence, and teamwork in everything we do.
                    </p>
                </div>
            </div>

            <div className="mt-16 max-w-4xl mx-auto text-center">
                <h2 className="text-2xl font-extralight text-gray-900 sm:text-3xl">
                    Meet Our Team
                </h2>
                <p className="mt-4 text-lg text-gray-600">
                    We take pride in our talented and passionate team who make everything possible.
                </p>

                <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    <div className="bg-white p-6 rounded-lg shadow-md text-center">
                        <img
                            className="w-24 h-24 mx-auto rounded-full"
                            src= {imageSEO}
                            alt="Team Member"
                        />
                        <h3 className="mt-4 text-xl font-semibold text-gray-900">Leonardo DiCaprio</h3>
                        <p className="text-gray-600">CEO</p>
                    </div>

                    <div className="bg-white p-6 rounded-lg shadow-md text-center">
                        <img
                            className="w-24 h-24 mx-auto rounded-full"
                            src= {imageCTO}
                            alt="Team Member"
                        />
                        <h3 className="mt-4 text-xl font-semibold text-gray-900">Scarlett Johansson </h3>
                        <p className="text-gray-600">CTO</p>
                    </div>

                    <div className="bg-white p-6 rounded-lg shadow-md text-center">
                        <img
                            className="w-24 h-24 mx-auto rounded-full"
                            src= {imageDesigner}
                            alt="Team Member"
                        />
                        <h3 className="mt-4 text-xl font-semibold text-gray-900">Tom Cruise</h3>
                        <p className="text-gray-600">Designer</p>
                    </div>
                </div>
            </div>
        </div>
    );
}