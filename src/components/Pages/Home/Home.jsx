import Banner from "../../Banner/Banner.jsx";
import AllProducts from "../../AllProducts/AllProducts.jsx";
import {Helmet} from "react-helmet-async";

const Home = () => {
    return (
        <div >
            <Helmet>
                <title>Nike Shop</title>
                <meta
                    name="description"
                    content="Welcome to Sneaker Haven, your ultimate online destination for sneakers! Explore shoes from top brands like Nike, Adidas, Converse, and more. Shop trendy styles, exclusive collaborations, and sports sneakers with fast shipping and easy returns."
                />
                <meta property="og:title" content="Sneaker Haven - Online Sneaker Shop" />
                <meta
                    property="og:description"
                    content="Explore the best collection of sneakers online at Sneaker Haven. Shop from top brands, trendy styles, and exclusive releases. Perfect for all your sneaker needs!"
                />
                <meta property="og:image" content="https://example.com/og-image-sneakers.jpg" />
                <meta property="og:url" content="https://example.com" />
                <meta property="og:type" content="website" />
            </Helmet>
            <Banner />


            <AllProducts/>
            <section className=" text-gray-800 m-10 lg:mr-40 lg:ml-40">
                <h1 className="text-center font-bold text-2xl mb-5 mt-10">
                    Welcome to Sneaker Haven – Your Ultimate Online Sneaker Destination
                </h1>

                <h2 className='font-bold text-lg mb-4'>Our Brands </h2>
                <p className="mb-4 font-light">
                    <span className='ml-2'>Explore</span> a massive collection of footwear from top brands like <strong>Nike</strong>,{' '}
                    <strong>Adidas</strong>, <strong>Puma</strong>, <strong>Reebok</strong>,{' '}
                    <strong>Converse</strong>, <strong>New Balance</strong>, and more. Whether you’re looking for
                    stylish casual sneakers, high-performance running shoes, basketball kicks, or exclusive
                    limited-edition releases, we’ve got something for everyone. At Sneaker Haven, we bring you the
                    perfect blend of comfort, quality, and style to match your everyday needs and elevate your
                    sneaker game.
                </p>
                <h2 className='font-bold text-lg mb-4'> Uniq sneakers for you</h2>
                <p className="mb-4 font-light">
                    <span className='ml-2'>Our</span> catalog covers everything from classic designs to cutting-edge trends, ensuring you stay
                    ahead in streetwear fashion. Enjoy <strong>exclusive deals</strong>, discounted prices, and
                    seasonal sales on some of the most iconic sneaker collections. Looking for something unique?
                    Check out our selection of trendy collaborations and sneakers that turn heads!
                </p>
                <h2 className='font-bold text-lg mb-4'> Sneakers for all</h2>

                <p className="mb-4 font-light">
                    <span className='ml-2'>We</span> offer a wide range of sizes for <strong>men</strong>, <strong>women</strong>, and{' '}
                    <strong>kids</strong>, so the whole family can step out in style. Our detailed size guides and
                    customer reviews ensure you pick the perfect fit every time. Plus, our fast shipping and
                    hassle-free returns make your shopping experience easy and enjoyable. No matter what your sneaker
                    preference—<strong>retro aesthetics</strong>, <strong>bold modern designs</strong>, or{' '}
                    <strong>sports-specific performance shoes</strong>—we’ve got it. Don’t miss out on our
                    hand-picked recommendations, bestsellers, and new arrivals launched every week!
                </p>
                <h2 className='font-bold text-lg mb-4'> We are working for you</h2>
                <p className="mb-4 font-light">
                    <span className='ml-2'>Sneaker</span> Haven is more than just a store—it’s a <strong>community</strong>. Join our newsletter or
                    follow us on social media to stay updated with <strong>exclusive drops</strong>,{' '}
                    <strong>sneakerhead tips</strong>, and upcoming releases. Whether you need inspiration for your
                    next sneaker choice or you’re hunting for a collector’s grail, Sneaker Haven is the one-stop
                    destination that truly understands your passion for sneakers. Start stepping up your sneaker game
                    today—<strong>shop with us now!</strong>
                </p>
            </section>


        </div>
    );
};

export default Home;