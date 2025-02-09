export default function About() {
    return (
        <div className="bg-gray-100 py-16 px-6 lg:px-8">
            <div className="max-w-7xl mx-auto text-center">
                <h1 className="text-4xl font-bold text-gray-900 sm:text-5xl">
                    About Us
                </h1>
                <p className="mt-4 text-lg text-gray-600 sm:mt-6">
                    We are a team of dedicated professionals committed to delivering exceptional services and solutions to our clients.
                </p>
            </div>

            <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 max-w-7xl mx-auto">
                <div className="bg-white p-6 rounded-lg shadow-md">
                    <img
                        className="h-16 mx-auto"
                        src="https://via.placeholder.com/64"
                        alt="Mission Icon"
                    />
                    <h3 className="mt-4 text-xl font-semibold text-gray-900">Our Mission</h3>
                    <p className="mt-2 text-gray-600">
                        To deliver outstanding services that empower our clients to achieve their goals.
                    </p>
                </div>

                <div className="bg-white p-6 rounded-lg shadow-md">
                    <img
                        className="h-16 mx-auto"
                        src="https://via.placeholder.com/64"
                        alt="Vision Icon"
                    />
                    <h3 className="mt-4 text-xl font-semibold text-gray-900">Our Vision</h3>
                    <p className="mt-2 text-gray-600">
                        To be recognized as a leading provider in our industry, driven by innovation and client satisfaction.
                    </p>
                </div>

                <div className="bg-white p-6 rounded-lg shadow-md">
                    <img
                        className="h-16 mx-auto"
                        src="https://via.placeholder.com/64"
                        alt="Values Icon"
                    />
                    <h3 className="mt-4 text-xl font-semibold text-gray-900">Our Values</h3>
                    <p className="mt-2 text-gray-600">
                        We value integrity, excellence, and teamwork in everything we do.
                    </p>
                </div>
            </div>

            <div className="mt-16 max-w-4xl mx-auto text-center">
                <h2 className="text-2xl font-bold text-gray-900 sm:text-3xl">
                    Meet Our Team
                </h2>
                <p className="mt-4 text-lg text-gray-600">
                    We take pride in our talented and passionate team who make everything possible.
                </p>

                <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    <div className="bg-white p-6 rounded-lg shadow-md text-center">
                        <img
                            className="w-24 h-24 mx-auto rounded-full"
                            src="https://via.placeholder.com/96"
                            alt="Team Member"
                        />
                        <h3 className="mt-4 text-xl font-semibold text-gray-900">John Doe</h3>
                        <p className="text-gray-600">CEO</p>
                    </div>

                    <div className="bg-white p-6 rounded-lg shadow-md text-center">
                        <img
                            className="w-24 h-24 mx-auto rounded-full"
                            src="https://via.placeholder.com/96"
                            alt="Team Member"
                        />
                        <h3 className="mt-4 text-xl font-semibold text-gray-900">Jane Smith</h3>
                        <p className="text-gray-600">CTO</p>
                    </div>

                    <div className="bg-white p-6 rounded-lg shadow-md text-center">
                        <img
                            className="w-24 h-24 mx-auto rounded-full"
                            src="https://via.placeholder.com/96"
                            alt="Team Member"
                        />
                        <h3 className="mt-4 text-xl font-semibold text-gray-900">Alice Brown</h3>
                        <p className="text-gray-600">Designer</p>
                    </div>
                </div>
            </div>
        </div>
    );
}