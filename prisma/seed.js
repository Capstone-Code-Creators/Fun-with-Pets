const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()
const bcrypt = require('bcryptjs');
const main = async() => {
    // CREATE USERS
    const user1 = await prisma.user.create({
        data: {
            firstName: "Shaggy",
            lastName: "Rogers",
            username: "ZoinksScoob68",
            location: "Crystal Cove, California",
            email: "makingSandwichesShaggy@mysteryinc.com",
            profilePic: "https://static.wikia.nocookie.net/oneyplays/images/8/82/Shaggy_Rogers.png/revision/latest/scale-to-width-down/1000?cb=20180907203725",
            // password: await bcrypt.hash("ripCaseyKasem2014", 10)
            password: "ripCaseyKasem2014",
        },
    });
    const user2 = await prisma.user.create({
        data: {
            firstName: "Jon",
            lastName: "Arbuckle",
            username: "selfInsertJim",
            location: "Muncie, Indiana",
            email: "poorCartoonist@pawsinc.com",
            profilePic: "https://i.kym-cdn.com/entries/icons/original/000/039/527/jon-arbuckle-dancing.jpg",
            // password: await bcrypt.hash("dontHitOdie1976", 5),
            password: "dontHitOdie1976" 
        },
    });
    const user3 = await prisma.user.create({
        data: {
            firstName: "Tommy",
            lastName: "Baumeister",
            username: "TommyB",
            location: "Mineapolis, Minnesota",
            email: "TommyB@petbook.com",
            // password: await bcrypt.hash("TOMMYB123", 5),
            password: "TOMMYB123",
        },
    });
    const user4 = await prisma.user.create({
        data: {
            firstName: "Boone",
            lastName: "Waldvogel",
            username: "BooneW",
            location: "Toledo, Ohio",
            email: "BooneW@petbook.com",
            // password: await bcrypt.hash("BOONEW123", 5),
            password: "BOONEW123",
        },
    });
    const user5 = await prisma.user.create({
        data: {
            firstName: "Nathan",
            lastName: "Kim",
            username: "NathanK",
            location: "Queens, New York",
            email: "NateK@petbook.com",
            // password: await bcrypt.hash("NathanK123", 5),
            password: "NATHANK123",
        },
    });

    //CREATE PETS
    await prisma.pet.create({
        data: {
            type: "Dog",
            breed: "Great Dane",
            name: "Scooby Doo",
            image: "https://qph.cf2.quoracdn.net/main-qimg-8e595dad8bd78189b295a0034b6490f6.webp",
            userId: 1,
        },
    });
    await prisma.pet.create({
        data: {
            type: "Dog",
            breed: "Dachschund/Terrier Mix",
            name: "Odie",
            image: "https://en.wikipedia.org/wiki/Odie#/media/File:Odie_the_Dog.svg",
            userId: 2,
        },
    });
    await prisma.pet.create({
        data: {
            type: "Cat",
            breed: "Orange Tabby",
            name: "Garfield",
            image: "https://static.independent.co.uk/s3fs-public/thumbnails/image/2018/06/19/09/garfield.jpg?width=1200&height=1200&fit=crop",
            userId: 2,
        },
    });
    await prisma.pet.create({
        data: {
            type: "Dog",
            breed: "Canis Lupus (Grey Wolf)",
            name: "Hyde",
            image: "https://en.wikipedia.org/wiki/Wolf#/media/File:Eurasian_wolf_2.jpg",
            userId: 3,
        },
    });
    await prisma.pet.create({
        data: {
            type: "Cat",
            breed: "Panthera Tigris (Bengal Tiger)",
            name: "Ozzy",
            image: "https://encrypted-tbn1.gstatic.com/licensed-image?q=tbn:ANd9GcRG87OqwveVRysa7M-3cPvsmaCfrwLKJMJ9h7skQZKXoTSIOx-Z9DOqEwjcEn2q_jtUu2NWHAhJkoGC9iE",
            userId: 4,
        },
    });
    await prisma.pet.create({
        data: {
            type: "Fish",
            breed: "Moorish Idol",
            name: "Gill",
            image: "https://www.waikikiaquarium.org/wp-content/uploads/2013/11/moorish_idol_620.jpg",
            userId: 5,
        },
    });
    await prisma.pet.create({
        data: {
            type: "Lizard",
            breed: "Bearded Dragon",
            name: "Drakaris",
            image: "https://media.thebeardeddragon.org/images/sandfire-red-bearded-dragon-close-up-sz4.jpg",
            userId: 5,
        },
    });

    // CREATE DUMMY POSTS
    await prisma.post.create({
        data: {
            title: "First Post Ever",
            content: "This is the first post on the site, I'd better say something meaningful... Birds are tiny dinosaurs.",
            postImg: "https://www.rd.com/wp-content/uploads/2018/06/BNB16_1471813357616_648_preview_maxWidth_1600_maxHeight_1600.jpg",
            userId: 5,
            likes: 2,
            dislikes: 7,
        },
    });

    // CREATE DUMMY REPLIES
    await prisma.reply.create({
        data: {
            content: "I disagree, you are a fool",
            postId: 1,
            userId: 1,
        },
    });
    await prisma.reply.create({
        data: {
            content: "I agree, but you are still a fool",
            postId: 1,
            userId: 2,
        },
    });

};

main();