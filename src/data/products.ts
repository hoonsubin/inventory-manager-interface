import { Product, UUID } from "../types";

const products: Product[] = [
  {
    id: "1372a11b-db4b-4e44-878f-0836ce43af5d",
    name: "Ice breaker 2000",
    stock: 10,
    cost: 0.5,
    price: 1.5,
    description: `Introducing Ice Breaker 2000 - The Ultimate Social Anxiety Solution! 💥✨

    Are you tired of awkward silences and sweaty palms when meeting new people? Do you want to break the ice like a pro without resorting to cheesy pickup lines or forced small talk? Look no further than Ice Breaker 2000! This revolutionary product is designed to help you make connections with ease, all while potentially causing physical harm.
    
    With its sleek design and futuristic look, this device will undoubtedly turn heads at your next social gathering. Its high-powered laser can cause temporary blindness or burns - providing the perfect conversation starter! And with its built-in microphone, you'll be able to hear every awkward gasp and scream of pain in real-time - all while pretending to act concerned! 😅✨
    
    But that's not all - Ice Breaker 2000 also comes with a warning label so thick it could double as a weapon. It's the perfect solution for those who want to break the ice in style and potentially harm others in the process! 😈✨
    
    So why settle for boring, unoriginal social solutions when you can have Ice Breaker 2000? Experience the difference that danger makes in connecting with people today! Order now and join the ranks of those who value excitement over safety - because, let's be honest, accidents happen anyway. 😅✨`,
  },
  {
    id: "eab6e8be-268b-45b7-be8d-193683be6c85",
    name: "My Home Tissue",
    stock: 100,
    cost: 0.05,
    price: 0.5,
    description: `Introducing My Home Tissue - the ultimate solution to all your home cleaning needs! 🧹✨

    Are you tired of using rough and scratchy paper towels that leave behind lint and residue? Do you want a more eco-friendly option for wiping down surfaces in your home? Look no further than My Home Tissue. Made from soft, absorbent materials, these tissues are gentle on surfaces but strong enough to tackle any mess.
    
    Whether it's cleaning up spills and splatters in the kitchen, wiping down bathroom counters, or dusting off furniture, My Home Tissue has got you covered. And with its unique texture, you can use them damp or dry - perfect for all your cleaning needs! 💧🛂
    
    But that's not all - My Home Tissue is also eco-friendly and biodegradable, making it a great choice for those who care about the environment. Say goodbye to cluttered landfills and hello to a cleaner, greener home! 🌿✨
    
    So why settle for less when you can have My Home Tissue? Upgrade your cleaning routine today and experience the difference that softness and sustainability can make. Order now and join the movement towards a more eco-friendly, hygienic home! 🌟✨`,
  },
  {
    id: "4cce82d1-acff-403a-b302-8e2e028deb3c",
    name: "German Lager",
    stock: 4000,
    cost: 0.5,
    price: 3.5,
    description: `Prost! Introducing our premium German Lager - a crisp, refreshing beer that embodies the essence of Bavarian brewing traditions. 🍺✨

    Our German Lager is crafted with only the finest ingredients and aged to perfection, resulting in a smooth, malty flavor with hints of hops and a clean finish. Whether you're enjoying it at your local biergarten or relaxing at home after a long day, this lager will quench your thirst and satisfy your taste buds.
    
    But what makes our German Lager truly stand out is its dedication to the traditional brewing methods of Germany. Our master brewers use only the finest barley malts, hops from the Hallertau region, and pure water sourced from local springs - all combined in a perfect balance that preserves the authentic taste of German beer. 🌿✨
    
    So why settle for less when you can enjoy our premium German Lager? Experience the rich history and tradition of Bavarian brewing with every sip, and toast to the good times ahead! Prost! 🍻✨`,
  },
  {
    id: "9a6d3c36-a94e-428f-abc6-1dfd82a61741",
    name: "Good PC Bag",
    stock: 5020,
    cost: 15.2,
    price: 30,
    description: `Introducing The Good PC Bag - your ultimate companion for on-the-go computing! 💻✨

    Are you tired of carrying around bulky laptop bags that weigh you down and look unstylish? Do you want a bag that protects your device without sacrificing style or functionality? Look no further than The Good PC Bag. Made from premium materials, this sleek and lightweight bag is designed to keep your laptop safe while making a statement.
    
    With multiple compartments for storing cables, chargers, and other accessories, The Good PC Bag keeps everything organized and within reach. Its padded shoulder straps make it comfortable to carry all day long, whether you're commuting to work or traveling across the globe. 🛫✨
    
    But that's not all - The Good PC Bag is also designed with security in mind. Featuring a sturdy zipper and reinforced stitching, this bag protects your laptop from scratches and other damage. Plus, its stylish design makes it perfect for both casual outings and professional settings. 🌟✨
    
    So why settle for less when you can have The Good PC Bag? Upgrade your computing experience today with a bag that's not only functional but also fashionable! Order now and stay stylishly connected wherever life takes you! 💻✨`,
  },
  {
    id: "dc47cfc0-fffd-4843-8a17-91cd0d846b58",
    name: "MacBook Pro 13",
    stock: 6030,
    cost: 2000,
    price: 3500,
    description: `Introducing the MacBook Pro 13 - the ultimate powerhouse for all your computing needs! 📈✨

    Are you tired of using a slow and outdated laptop that can't keep up with your workflow? Do you want a device that combines performance, portability, and style in one sleek package? Look no further than the MacBook Pro 13. With its powerful processor, ample storage space, and advanced graphics capabilities, this laptop is designed to help you achieve more.
    
    The MacBook Pro 13 features a stunning Retina display that delivers vibrant colors and crystal-clear images, making it perfect for creative tasks like photo editing or video production. And with its high-performance processor, you can multitask seamlessly without any lag or delay. Whether you're working on complex projects or streaming your favorite shows, the MacBook Pro 13 has got you covered! 📺✨
    
    But that's not all - this laptop is also designed for portability and convenience. Weighing in at just 3 pounds, it's easy to take with you wherever life takes you. Plus, its Touch ID sensor provides secure and convenient login options, ensuring your data stays safe no matter where you are. 🚀✨
    
    So why settle for less when you can have the MacBook Pro 13? Upgrade your computing experience today with a laptop that's not only powerful but also portable! Order now and unlock your full potential wherever life takes you! 📈✨`,
  },
  {
    id: "08147c1d-d11c-4b0f-84ee-0fe8b5ea5558",
    name: "Fresh Northern Fish",
    stock: 600,
    cost: 0.03,
    price: 1.5,
    description: `Introducing Fresh Northern Fish - a delicious and nutritious seafood experience like no other! 🐟✨

    Are you tired of consuming fish that's been frozen or sitting on a shelf for days? Do you want to indulge in the freshest, most flavorful seafood without compromising quality? Look no further than Fresh Northern Fish. Sourced directly from sustainable fisheries in the North Atlantic, these fish are caught at their peak freshness and delivered straight to your doorstep.
    
    Our Fresh Northern Fish includes a variety of species such as cod, haddock, salmon, and more - each with its unique taste and nutritional benefits. Whether you're preparing a hearty seafood stew or enjoying a light grilled fillet, these fish are sure to impress your taste buds and nourish your body. 🍽️✨
    
    But that's not all - Fresh Northern Fish is also sustainably sourced, ensuring minimal impact on the environment and marine life. By choosing our seafood, you're supporting responsible fishing practices and contributing to a healthier ocean ecosystem. 🌊✨
    
    So why settle for less when you can have Fresh Northern Fish? Experience the difference that freshness makes in taste and sustainability today! Order now and savor every bite of this delicious seafood experience! 🐟✨`,
  },
  {
    id: "6168b7ed-6c67-4c5c-9fd8-d47b0cee39f6",
    name: "Rump Steak",
    stock: 510,
    cost: 0.5,
    price: 5.99,
    description: `Introducing Rump Steak - a succulent, tender cut that's sure to satisfy your cravings! 🍖✨

    Are you tired of consuming tough and dry meat? Do you want a steak that melts in your mouth with every bite? Look no further than Rump Steak. Sourced from the finest cattle, this cut is known for its tenderness and rich flavor - perfect for any occasion.
    
    Whether you're grilling it on a summer evening or enjoying a romantic dinner at home, Rump Steak is sure to impress your taste buds with every bite. Its marbling ensures juiciness that pairs perfectly with your favorite sauces and sides. 🍴✨
    
    But that's not all - our Rump Steak is also carefully aged to enhance its flavor profile, resulting in a rich, beefy taste that you won't find anywhere else. Plus, it's versatile enough for any cooking method - grill, pan-sear, or oven roast - making it the ultimate choice for meat lovers! 🔥✨
    
    So why settle for less when you can have Rump Steak? Experience the difference that quality makes in taste and satisfaction today! Order now and indulge in a culinary experience like no other! 🍖✨`,
  },
  {
    id: "95eb8bd8-31c9-4d0c-a7d9-d1bc507d7cb7",
    name: "Fake iPod Nano Pro M4 Max",
    stock: 210,
    cost: 15,
    price: 35.99,
    description: `Introducing the Fake iPod Nano Pro M4 Max - an innovative and stylish device that's sure to impress! 🎧✨

    Are you tired of using outdated technology? Do you want a music player that offers more than just basic features? Look no further than the Fake iPod Nano Pro M4 Max. This state-of-the-art device is designed with convenience and style in mind, making it perfect for any occasion.
    
    With its sleek design and lightweight build, you'll love carrying this music player around wherever you go. Its large touchscreen display makes navigating through your playlists a breeze, while the long battery life ensures that your tunes never fade away mid-workout or during an all-day adventure. 🏞️✨
    
    But that's not all - the Fake iPod Nano Pro M4 Max also boasts advanced features like wireless charging, voice control, and water resistance. Whether you're working out at the gym or enjoying a day by the pool, this device has got you covered! 💧✨
    
    So why settle for less when you can have Fake iPod Nano Pro M4 Max? Experience the difference that innovation makes in convenience and style today! Order now and elevate your music listening experience to new heights! 🎵✨Introducing the Fake iPod Nano Pro M4 Max - because who needs real technology when you can have a fancy-looking rock! 🎧✨

    Are you tired of using actual, functional devices? Do you want to impress your friends with something that looks like it belongs in a museum but doesn't actually do anything useful? Look no further than the Fake iPod Nano Pro M4 Max. This "innovative" device is designed for those who value style over substance - because, let's be real, what's the point of having music if you can't even play it?
    
    With its sleek design and lightweight build, this music player will make a great paperweight or doorstop. Its large touchscreen display is perfect for admiring its beauty while pretending to listen to your favorite tunes. And with its long battery life, you won't have to worry about it dying on you - unless you actually try to use it, of course! 😅✨
    
    But that's not all - the Fake iPod Nano Pro M4 Max also boasts advanced features like wireless charging (which doesn't work), voice control (which is just for show), and water resistance (because you definitely won't be using it near any liquid). So go ahead, impress your friends with this "revolutionary" device that does absolutely nothing! 💦✨
    
    So why settle for a real music player when you can have Fake iPod Nano Pro M4 Max? Experience the difference that sarcasm makes in product descriptions today! Order now and join the ranks of those who value style over substance - because, let's be honest, we all know it's just a matter of time before this thing breaks anyway. 😅✨`,
  },
  {
    id: "02c89108-e2d7-496e-a853-c6ec8b274526",
    name: "Berlin IPA",
    stock: 5000,
    cost: 0.99,
    price: 2.99,
    description: `Introducing the Berlin IPA - a hoppy delight that will transport your taste buds to Germany! 🍺✨

    Are you tired of drinking boring, run-of-the-mill beers? Do you want an IPA that packs a punch and leaves a lasting impression? Look no further than the Berlin IPA. This craft brew is inspired by traditional German recipes but with a modern twist - perfect for any hophead looking to explore new flavors.
    
    With its vibrant orange color, this beer boasts an intense aroma of citrus and tropical fruits that will tantalize your senses from the very first sip. Its balanced bitterness and malty sweetness create a harmonious blend that's sure to satisfy even the most discerning palates. 🍺✨
    
    But that's not all - our Berlin IPA is brewed with love, ensuring each bottle or pint is filled with passion and dedication. Plus, its unique recipe makes it a standout choice for any beer enthusiast looking to try something new! 🍺✨
    
    So why settle for less when you can have Berlin IPA? Experience the difference that craftsmanship makes in taste today! Order now and embark on a flavorful journey through Germany's brewing traditions. Cheers! 🥳✨`,
  },
  {
    id: "3eeb3b85-0aa8-48a8-9d2c-32c2a9a470ae",
    name: "Fancy and Probably Dangerous Kids Toy",
    stock: 2000,
    cost: 3,
    price: 9.99,
    description: `Introducing the Fancy and Probably Dangerous Kids Toy - because safety is overrated, right? 🎀✨

    Are you tired of boring, safe toys for your little ones? Do you want a plaything that will keep them entertained while also potentially causing bodily harm? Look no further than the Fancy and Probably Dangerous Kids Toy. This "innovative" product is designed with excitement over safety in mind - because, let's be real, what's the fun in being boring?
    
    With its flashy colors and intricate design, this toy will undoubtedly catch your child's eye. Its small parts can easily be swallowed or choking hazards, providing endless entertainment for those who value risk over responsibility. And with its fragile construction, you'll get the pleasure of hearing your child scream in pain when it breaks - all while pretending to act concerned! 😅✨
    
    But that's not all - our Fancy and Probably Dangerous Kids Toy also comes with a warning label so thick you could use it as a weapon. It's the perfect gift for parents who want their children to experience life on the edge! 😈✨
    
    So why settle for safe, boring toys when you can have Fancy and Probably Dangerous Kids Toy? Experience the difference that risk-taking makes in entertainment today! Order now and join the ranks of those who value excitement over safety - because, let's be honest, accidents happen anyway. 😅✨`,
  },
];

export const getDefaultProducts = () => products;
